import { getExp } from '@/models/exp'
import { SimRBush, type Link, type Node, type Route } from '@/models/route'
import axios from 'axios'
import localforage from 'localforage'
import knn from 'rbush-knn'
import tinyqueue from 'tinyqueue'

export interface RouteRequest {
  points: number[][]
}

const lf = localforage.createInstance({
  name: 'exp' + axios.defaults.baseURL
})

let nodeTree = new SimRBush().fromJSON(await lf.getItem('comp/routing/nodeTree'))
let nodes = (await lf.getItem<{ [id: string]: Node }>('comp/routing/nodes')) || {}
let links = (await lf.getItem<{ [id: string]: Link[] }>('comp/routing/links')) || {}

if (Object.keys(nodes).length == 0 || Object.keys(links).length == 0) {
  const [nn, ll] = await Promise.all([
    await getExp('routing/nodes', false),
    await getExp('routing/links', false)
  ])
  nodes = Object.fromEntries(nn.map((n: any) => [n[0], { id: n[0], x: n[1], z: n[2] }]))
  links = ll.reduce((acc: any, link: any) => {
    if (!acc[link[1]]) acc[link[1]] = []
    acc[link[1]].push({
      type: link[0],
      start: nodes[link[1]],
      end: nodes[link[2]],
      length: link[3],
      roadSize: link[4],
      roadId: link[5],
      mapIds: link[0] == 'prefab' ? link[6] : [link[5]]
    })
    return acc
  }, {})
  await lf.setItem(`comp/routing/links`, links)
  await lf.setItem(`comp/routing/nodes`, nodes)

  nodeTree = new SimRBush()
  nodeTree.load(Object.values(nodes))
  await lf.setItem('comp/routing/nodeTree', nodeTree.toJSON())
}

async function internalRoute(startId: string, endId: string): Promise<Route> {
  const infos = { [startId + '_null']: { cost: 0, link: null as Link | null } }
  const itemNodes = { [startId]: [null] as (number | null)[] }
  const [startNode, endNode] = [nodes[startId], nodes[endId]]
  if (!startNode || !endNode) throw new Error('Nodes not found')
  const getId = (i: { itemId: number | null; nodeId: string }) => i.nodeId + '_' + i.itemId
  const h = (id: string) => {
    const node = nodes && nodes[id]
    if (!node) return 0
    return Math.sqrt((node.x - endNode.x) ** 2 + (node.z - endNode.z) ** 2)
  }
  const f = (i: { itemId: number | null; nodeId: string }) => infos[getId(i)].cost + h(i.nodeId)
  const g = (link: Link) => link.length / 10
  const queue = new tinyqueue(
    [{ itemId: null as number | null, nodeId: startId }],
    (a, b) => f(a) - f(b)
  )

  while (queue.length > 0) {
    const currentNode = queue.pop()
    if (!currentNode) continue
    const currentId = currentNode.nodeId
    if (currentId === endId) {
      const links = [] as Link[]
      let id = currentNode
      while (id.nodeId !== startId) {
        const link = infos[getId(id)].link
        if (link != null) {
          links.push(link)
          id = {
            nodeId: link.start.id,
            itemId: itemNodes[link.start.id].find((i) => i != link.roadId) as unknown as number
          }
        }
      }

      return {
        start: startNode,
        end: endNode,
        links
      }
    } else if (links) {
      for (const link of links[currentId] || []) {
        if (link.roadId == infos[getId(currentNode)].link?.roadId) {
          continue
        }
        const nextId = { itemId: link.roadId, nodeId: link.end.id }
        const nextCost = infos[getId(currentNode)].cost + g(link)
        if (nextCost < (infos[getId(nextId)]?.cost || Number.POSITIVE_INFINITY)) {
          infos[getId(nextId)] = { cost: nextCost, link }
          queue.push(nextId)
          if (!itemNodes[nextId.nodeId]) itemNodes[nextId.nodeId] = []
          if (!itemNodes[nextId.nodeId].includes(link.roadId))
            itemNodes[nextId.nodeId].push(link.roadId)
        }
      }
    }
  }
  throw new Error('Route not found')
}

onmessage = async function (e) {
  const { points } = e.data as RouteRequest

  if (points.length < 2 || !nodeTree) return postMessage(null)
  const nodes = points.map(([x, z]) => knn(nodeTree, x, z, 1)[0])
  const route = [] as Promise<Route | null>[]
  for (let i = 0; i < nodes.length - 1; i++) {
    const startId = nodes[i].id
    const endId = nodes[i + 1].id
    const part = internalRoute(startId, endId)
    route.push(part)
  }

  Promise.all(route)
    .then((result) => this.postMessage(result))
    .catch((e) => {
      this.postMessage({ error: true })
      throw e
    })
}

postMessage('ready')
