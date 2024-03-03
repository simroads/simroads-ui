<script setup lang="ts">
import { gameToLngLat, lngLatToGame, type SimMap } from '@/models/simMap'
import { useMapStore } from '@/stores/map'
import { LngLatBounds, Marker } from 'maplibre-gl'
import { computed, watch } from 'vue'
import { ref, h, getCurrentInstance, render } from 'vue'
import { useMap } from 'vue-maplibre-gl'
import { useRoute, useRouter } from 'vue-router'
import RoutePin from './RoutePin.vue'
import { onUnmounted } from 'vue'

const mapStore = useMapStore()
const route = useRoute()
const router = useRouter()
const markers = ref([] as any[])
const canAdd = ref(false)
const canRemove = ref(false)
const instance = getCurrentInstance()
const maplibre = useMap()

onUnmounted(() => {
  markers.value.forEach((m: Marker) => m.remove())
})

const createMarkerHTML = (m: Marker) => {
  const mountEl = document.createElement('div')
  mountEl.style.position = 'absolute'
  const vNode = h(RoutePin, {
    me: m,
    markers: markers,
    cursor: computed(() => (canRemove.value ? 'pointer' : 'move')),
    onClick() {
      if (canRemove.value) {
        m.remove()
        markers.value.splice(markers.value.indexOf(m), 1)
        canRemove.value = false
        pushRoute()
      }
    }
  })
  if (vNode && instance?.appContext) vNode.appContext = instance.appContext
  render(vNode, mountEl)
  return mountEl
}
const createMarker = async ([x, z]: number[], transform = false): Promise<Marker | null> => {
  if (maplibre.map && mapStore.map) {
    const m = new Marker({ draggable: true, anchor: 'center' })
    m._element = createMarkerHTML(m)
    m.setLngLat((transform ? gameToLngLat(mapStore.map, x, z) : null) || [x, z])
    m.on('dragend', pushRoute)
    m.addTo(maplibre.map)
    return m
  }
  return null
}
const pushRoute = () => {
  if (markers.value.length >= 2) {
    router.push({
      name: 'route',
      params: {
        places: markers.value.map(
          (m: Marker) =>
            lngLatToGame(mapStore.map as SimMap, m.getLngLat())
              .map((n) => n.toFixed(2))
              .join(';') || ''
        )
      }
    })
  } else if (route.name == 'route') {
    router.push({ name: 'home' })
  }
}
const placeMarker = async () => {
  maplibre.map?.once('click', async (e) => {
    canAdd.value = false
    const marker = await createMarker(e.lngLat.toArray())
    markers.value.push(marker)
    pushRoute()
  })
  canAdd.value = true
}
const changeRemove = () => {
  canRemove.value = !canRemove.value
}

watch(
  () => route.name,
  async () => {
    if (route.name == 'route' && route.params.places.length >= 2 && markers.value.length == 0) {
      for (const i in route.params.places as string[]) {
        const p = route.params.places[i]
        const m = await createMarker(p.split(';').map(Number), true)
        if (m) markers.value.push(m)
      }

      const bounds = markers.value.reduce((bounds, m) => {
        return bounds.extend(m.getLngLat())
      }, new LngLatBounds(markers.value[0].getLngLat()))
      maplibre.map?.fitBounds(bounds, { padding: 100 })
    }
  }
)
watch(markers.value, () => {
  pushRoute()
})
</script>

<template>
  <mgl-custom-control position="top-right">
    <v-tooltip :text="$t('add_pin_route')">
      <template v-slot:activator="{ props }">
        <mgl-button type="text" v-bind="props" @click="placeMarker">
          <v-icon>mdi-map-marker-plus</v-icon>
        </mgl-button>
      </template>
    </v-tooltip>
    <v-tooltip :text="$t('remove_pin_route')">
      <template v-slot:activator="{ props }">
        <mgl-button type="text" v-bind="props" @click="changeRemove">
          <v-icon>mdi-map-marker-remove</v-icon>
        </mgl-button>
      </template>
    </v-tooltip>
    <v-snackbar v-model="canAdd">
      {{ $t('click_pin_add') }}
    </v-snackbar>
    <v-snackbar v-model="canRemove">
      {{ $t('click_pin_remove') }}
    </v-snackbar>
  </mgl-custom-control>
</template>
