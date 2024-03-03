import { nextTick, watch } from 'vue'
import { createI18n, type I18n } from 'vue-i18n'
import router from './router'
import { asyncExp } from '@/utils/exp'

export async function loadLocaleMessages(i18n: I18n, locale: string) {
  localStorage.setItem('language', locale)
  const res = await Promise.all([
    (async () => {
      try {
        return await import(`@/locales/${locale}.json`)
      } catch {
        console.info(`No translations found for ${locale}`)
        return {}
      }
    })(),
    asyncExp(`translations/locales/${locale}`),
    asyncExp(`translations/keys`)
  ])

  const messages = {
    ...res[0],
    ...Object.fromEntries((res[1] as string[]).map((value, i) => [res[2].keys[i], value]))
  }

  i18n.global.setLocaleMessage(locale, messages)
  return nextTick()
}


const instance = createI18n({
  locale: 'en_us',
  fallbackLocale: 'en_us',
  messages: {},
  legacy: false,
  globalInjection: true
})
async function initLoad() {
  const locales = (await asyncExp(`translations/keys`)).locales
  let currentLocale = 'en_us'
  for (const loc in [
    router.currentRoute.value.query.locale?.toString(),
    localStorage.getItem('language'),
    navigator.language
  ]) {
    const gameLocale = loc?.replace(/-/, '_').toLowerCase()
    if (Object.keys(locales).includes(gameLocale)) {
      currentLocale = gameLocale
      break
    }
  }
  Object.keys(locales).forEach((key) => instance.global.setLocaleMessage(key, { lang_name: locales[key] }))
  instance.global.locale.value = currentLocale

  loadLocaleMessages(instance, instance.global.locale.value)
}
initLoad()

watch(instance.global.locale, (locale) => {
  loadLocaleMessages(instance, locale)
})

router.beforeEach(async (to, from, next) => {
  const paramsLocale = (to.query.locale as string)?.replace(/-/, '_').toLowerCase()

  if (instance.global.availableLocales.includes(paramsLocale)) {
    await loadLocaleMessages(instance, paramsLocale)
    instance.global.locale.value = paramsLocale
  }

  return next()
})

export default instance

export const i18n = instance.global
