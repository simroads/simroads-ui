import type { Translations, TranslationsKeys } from './translations'
import type { SimMap } from './simMap'
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
