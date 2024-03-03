<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import BaseCard from './BaseCard.vue'
import RouteWorker from '@/workers/route?worker'
import type { RouteRequest } from '@/workers/route'
import type { Route } from '@/models/route'
import { useMap } from 'vue-maplibre-gl'
import { gameToLngLat } from '@/models/simMap'
import { useMapStore } from '@/stores/map'
import { set } from '@vueuse/core'

const props = defineProps<{
  places: string[]
}>()
const loaded = ref(false)
const ready = ref(false)
const error = ref(false)
const routes = ref<Route[] | null>(null)
const points = computed(() => props.places.map((p) => p.split(';').map(Number)))
const maplibre = useMap()
const mapStore = useMapStore()

const setFeatureState = (routes: Route[] | null, state: boolean) => {
  const layers = ['roads', 'ferries']
  routes?.forEach((r) =>
    r.links.forEach((l) =>
      l.mapIds.forEach((id) =>
        layers.forEach((layer) =>
          maplibre.map?.setFeatureState(
            { id, source: 'tiles', sourceLayer: layer },
            { route: state }
          )
        )
      )
    )
  )
}

onUnmounted(() => {
  rw.terminate()
  setFeatureState(routes.value, false)
})

watch(routes, (val, old) => {
  if (old) setFeatureState(old, false)
  if (val) setFeatureState(val, true)
})

const rw = new RouteWorker()
rw.addEventListener(
  'message',
  (e) => {
    if (e.data === 'ready') {
      ready.value = true
      doRoute(points.value)
      watch(points, (val) => doRoute(val))
    }
  },
  { once: true }
)

const doRoute = (val: number[][]) => {
  loaded.value = false
  error.value = false
  const data = { points: val } as RouteRequest
  rw.addEventListener(
    'message',
    (e) => {
      if (e.data.error) {
        error.value = true
        routes.value = null
      } else {
        routes.value = e.data
      }
      loaded.value = true
    },
    { once: true }
  )
  rw.postMessage(data)
}

const routeLength = (route: Route) => route.links.reduce((acc, leg) => acc + leg.length, 0)
const totalLenght = computed(() => {
  if (routes.value) {
    return routes.value.reduce((acc, route) => acc + routeLength(route), 0)
  }
  return 0
})

const flyTo = (index: number) => {
  if (routes.value && mapStore.map) {
    const r = routes.value[Math.max(index - 1, 0)]
    maplibre.map?.fitBounds(
      [
        gameToLngLat(mapStore.map, r.start.x, r.start.z),
        gameToLngLat(mapStore.map, r.end.x, r.end.z)
      ],
      { padding: 100 }
    )
  }
}
</script>

<template>
  <BaseCard :title="$t('route_info')" prepend-icon="mdi-directions" :loading="!ready || !loaded">
    <v-timeline direction="horizontal" v-if="routes">
      <v-timeline-item
        v-for="(route, index) in routes"
        :key="index"
        size="small"
        icon="mdi-flag"
        dot-color="primary"
        @click="flyTo(index)"
        class="pointer"
      >
        <template v-slot:icon v-if="index != 0">
          <v-badge :content="index" inline></v-badge>
        </template>
      </v-timeline-item>

      <v-timeline-item
        class="pointer"
        size="small"
        icon="mdi-flag-checkered"
        dot-color="primary"
        @click="flyTo(routes?.length || 0)"
      >
      </v-timeline-item>
    </v-timeline>
    <v-card-text class="w-100 text-center" v-else-if="error">
      <v-icon color="grey" size="64">mdi-alert</v-icon>
      <div class="text-subtitle-2 text-grey">{{ $t('route_not_found') }}</div>
    </v-card-text>
  </BaseCard>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
