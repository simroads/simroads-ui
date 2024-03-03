import {i18n} from '@/plugins/i18n'

export type LocaleData = { localeKey?: string; defaultValue?: string } | string | null | undefined

export const tLoc = (localeData: LocaleData): string | undefined => {
  return typeof localeData !== 'string' && localeData?.localeKey && i18n.te(localeData.localeKey)
    ? i18n.t(localeData.localeKey)
    : (typeof localeData !== 'string' && localeData?.defaultValue) ||
        (typeof localeData === 'string' && localeData) ||
        undefined
}
