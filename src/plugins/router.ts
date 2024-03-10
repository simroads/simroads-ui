import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import { useMap } from 'vue-maplibre-gl'

declare module 'vue-router' {
  export interface Router {
    getFullPath: (path: string) => string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {}
    },
    {
      path: '/overlays/:prefab/:id',
      name: 'overlay',
      props: true,
      components: {
        controlInfo: () => import('@/components/cards/OverlayCard.vue')
      }
    },
    {
      path: '/route/:places([+-]?[0-9]+\\.?[0-9]+;[+-]?[0-9]+\\.?[0-9]+)+',
      name: 'route',
      props: true,
      components: {
        controlInfo: () => import('@/components/cards/RouteCard.vue')
      }
    }
  ]
})

router.getFullPath = (path: string) =>
  decodeURI(new URL(router.options.history.createHref(path), window.location.origin).href)

router.beforeEach((to, from, next) => {
  const m = useMap()
  if (to.name == 'home') next()
  const unwatch = watch(() => m.isLoaded, next)
  if (m.isLoaded) {
    unwatch()
    next()
  }
})

export default router
