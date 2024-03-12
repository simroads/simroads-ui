import { type Export } from '@/models/exp'
import lz4 from 'lz4js'
import { decode } from '@msgpack/msgpack'
import localforage from 'localforage'
import axios from '@/utils/axios'
import type { SimMap } from '@/models/simMap'

const lf = localforage.createInstance({
  name: 'exp' + axios.defaults.baseURL
})

export async function getExp<K extends keyof Export>(path: K, save = true): Promise<Export[K]> {
  if (path != 'map') {
    const item = await lf.getItem<Export[K]>(path)
    if (item) return item
  }
  const req = await axios.get(`/exp/json/${path}.msgpack`, { responseType: 'arraybuffer' })
  const resp = new Uint8Array(req.data)
  let decompressed = null
  try {
    decompressed = lz4.decompress(resp)
  } catch (e) {
    throw new Error(path + ' not found!')
  }
  const item = decode<Export[K]>(decompressed)
  if ((path as string) == 'map') {
    const map = item as SimMap
    if ((await lf.getItem('timestamp')) != map.timestamp) {
      lf.setItem('timestamp', map.timestamp)
    }
  }
  if (save) lf.setItem(path, item)
  return item
}

onmessage = function (e) {
  getExp(e.data.path, e.data.save).then((m) => {
    postMessage([e.data, m])
  })
}
