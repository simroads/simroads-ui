import type RBush from 'rbush'

export default function knn(
  tree: RBush<T>,
  x: number,
  y: number,
  n: number,
  predicate?: (item: T) => boolean,
  maxDistance?: number
): T[]
