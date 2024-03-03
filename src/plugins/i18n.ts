import { nextTick } from 'vue'
import { createI18n, type I18n } from 'vue-i18n'
import router from './router'
import { getExp } from '@/models/exp'

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
    getExp(`translations/locales/${locale}`),
    getExp(`translations/keys`)
  ])

  const messages = {
    ...res[0],
    ...Object.fromEntries((res[1] as string[]).map((value, i) => [res[2].keys[i], value]))
  }

  i18n.global.setLocaleMessage(locale, messages)
  return nextTick()
}

const locales = (await getExp(`translations/keys`)).locales
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

const instance = createI18n({
  locale: currentLocale,
  fallbackLocale: 'en_us',
  messages: Object.fromEntries(
    Object.keys(locales).map((key) => [key, { lang_name: locales[key] }])
  ),
  legacy: false,
  globalInjection: true
})
loadLocaleMessages(instance, instance.global.locale.value)

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
