import lz4 from 'lz4js'
import { decode } from '@msgpack/msgpack'
import localforage from 'localforage'
import type { Translations, TranslationsKeys } from './translations'
import type { SimMap } from './simMap'
import axios from 'axios'
import type { SearchItem } from './search'

export interface Export {
  map: SimMap
  countries: any[]
  cities: any[]
  search: SearchItem[]
  'translations/keys': TranslationsKeys
  [key: `translations/locales/${string}`]: Translations
  [key: `overlays/${string}`]: any
  'routing/nodes': any[]
  'routing/links': any[]
}

export async function getExp<K extends keyof Export>(path: K, save = true, lfInstance?: LocalForage): Promise<Export[K]> {
  const lf = lfInstance || localforage.createInstance({
    name: 'exp' + axios.defaults.baseURL
  })
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
