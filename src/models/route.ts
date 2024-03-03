import RBush from "rbush"

export interface Node {
    id: string
    x: number
    z: number
}

export interface Link {
    type: string
    start: Node
    end: Node
    length: number
    roadSize: number
    roadId: number
    mapIds: number[]
}


export interface Route {
    start: Node
    end: Node
    links: Link[]
}

export class SimRBush extends RBush<Node> {
    toBBox(item: Node) { return {minX: item.x, minY: item.z, maxX: item.x, maxY: item.z}}
    compareMinX(a: Node, b: Node) { return a.x - b.x; }
    compareMinY(a: Node, b: Node) { return a.z - b.z; }
}