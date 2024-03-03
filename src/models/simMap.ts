import { MercatorCoordinate, type LngLat, type LngLatLike } from 'maplibre-gl'

export interface SimMap {
  mapName: string
  game: string
  dlc: string[]
  version: string
  mods: string[]
  size: { maxX: number; minX: number; maxZ: number; minZ: number }
  zoomLimit: number
  timestamp: number
  mapSettings: { scale: number; uiCorrections: boolean }
}

function ukTranslate(map: SimMap, x: number, z: number): [number, number] {
  if (map.mapSettings.uiCorrections && x <= -31100 && x >= -60720 && z <= -5500 && z >= -56300) {
    x = (x + 31100) * 0.75 - 31700
    z = (z + 5500) * 0.75 - 5100
  }
  return [x, z]
}

function inverseUkTranslate(map: SimMap, x: number, z: number): [number, number] {
  const upperWest = ukTranslate(map, -60720, -56300)
  const lowerEast = ukTranslate(map, -31100, -5500)
  if (
    map.mapSettings.uiCorrections &&
    x <= lowerEast[0] &&
    x >= upperWest[0] &&
    z <= lowerEast[1] &&
    z >= upperWest[1]
  ) {
    x = (x + 31700) / 0.75 - 31100
    z = (z + 5100) / 0.75 - 5500
  }
  return [x, z]
}

function translateGeoJSON(
  geoJSON: GeoJSON.Geometry,
  func: (x: number, z: number) => [number, number]
): GeoJSON.Geometry {
  if (geoJSON.type === 'Point') {
    const coords = func(geoJSON.coordinates[0], geoJSON.coordinates[1])
    return {
      ...geoJSON,
      coordinates: coords
    }
  }
  if (geoJSON.type === 'LineString') {
    const coords = geoJSON.coordinates.map((coord) => func(coord[0], coord[1]))
    return {
      ...geoJSON,
      coordinates: coords
    }
  }
  if (geoJSON.type === 'Polygon') {
    const coords = geoJSON.coordinates.map((ring) => ring.map((coord) => func(coord[0], coord[1])))
    return {
      ...geoJSON,
      coordinates: coords
    }
  }
  if (geoJSON.type === 'MultiPoint') {
    const coords = geoJSON.coordinates.map((coord) => func(coord[0], coord[1]))
    return {
      ...geoJSON,
      coordinates: coords
    }
  }
  if (geoJSON.type === 'MultiLineString') {
    const coords = geoJSON.coordinates.map((line) => line.map((coord) => func(coord[0], coord[1])))
    return {
      ...geoJSON,
      coordinates: coords
    }
  }
  if (geoJSON.type === 'MultiPolygon') {
    const coords = geoJSON.coordinates.map((poly) =>
      poly.map((ring) => ring.map((coord) => func(coord[0], coord[1])))
    )
    return {
      ...geoJSON,
      coordinates: coords
    }
  }
  if (geoJSON.type === 'GeometryCollection') {
    const geometries = geoJSON.geometries.map((geometry) => translateGeoJSON(geometry, func))
    return {
      ...geoJSON,
      geometries: geometries
    }
  }
  return geoJSON
}

export function getWorldSize(map: SimMap): number {
  return Math.max(Math.abs(map.size.maxX - map.size.minX), Math.abs(map.size.maxZ - map.size.minZ))
}

export function gameToLngLat(map: SimMap, x: number, z: number): LngLat {
  ;[x, z] = ukTranslate(map, x, z)
  return new MercatorCoordinate(
    (x - map.size.minX) / getWorldSize(map),
    (z - map.size.minZ) / getWorldSize(map)
  ).toLngLat()
}

export function lngLatToGame(map: SimMap, lngLat: LngLatLike): [number, number] {
  const mc = MercatorCoordinate.fromLngLat(lngLat)
  const x = mc.x * getWorldSize(map) + map.size.minX
  const z = mc.y * getWorldSize(map) + map.size.minZ
  return inverseUkTranslate(map, x, z)
}

export function coordsToGame(map: SimMap, lng: number, lat: number): [number, number] {
  return lngLatToGame(map, { lng, lat })
}

export function gameToCoords(map: SimMap, x: number, z: number): [number, number] {
  const lngLat = gameToLngLat(map, x, z)
  return [lngLat.lng, lngLat.lat]
}

export function lngLatToGameGeoJSON(map: SimMap, geoJSON: GeoJSON.Geometry): GeoJSON.Geometry {
  return translateGeoJSON(geoJSON, coordsToGame.bind(null, map))
}

export function gameToLngLatGeoJSON(map: SimMap, geoJSON: GeoJSON.Geometry): GeoJSON.Geometry {
  return translateGeoJSON(geoJSON, gameToCoords.bind(null, map))
}
