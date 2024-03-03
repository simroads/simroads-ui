import type { LocaleData } from "@/utils/data"

export interface SearchItem {
    id: string
    refId: string
    type: string
    title: LocaleData
    subtitle: LocaleData
    city: LocaleData
    country: LocaleData
}