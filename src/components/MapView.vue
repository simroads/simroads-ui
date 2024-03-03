<script setup lang="ts" async>
import { Popup } from 'maplibre-gl'
import MapControls from './MapControls.vue'
import { useMapStore } from '@/stores/map'
import { computed } from 'vue'
import type { MglEvent } from 'vue-maplibre-gl'
import { useRouter } from 'vue-router'

const mapStore = useMapStore()
const router = useRouter()

const backgroundColor = computed(() => {
  let color = '#000'
  for (const layer of mapStore.style.layers) {
    if (layer.type === 'background' && layer.paint) {
      color = layer.paint['background-color']?.toString() || color
    }
  }
  return color
})

const onMapLoad = (e: MglEvent) => {
  for (const layer of Object.keys(mapStore.layers).filter((l) => l.startsWith('overlays-'))) {
    e.map.on('click', layer, (event) => {
      if (event.features)
        router.push({
          name: 'overlay',
          params: {
            prefab: event.features[0].properties.prefab || event.features[0].id,
            id: event.features[0].id
          }
        })
    })
    e.map.on('mouseenter', layer, () => {
      e.map.getCanvas().style.cursor = 'pointer'
    })
    e.map.on('mouseleave', layer, () => {
      e.map.getCanvas().style.cursor = ''
    })
  }

  document.title = mapStore.map?.mapName + ' - SimRoads'
}
</script>

<template>
  <div class="map" :style="{ backgroundColor }">
    <mgl-map
      v-if="mapStore.canLoad"
      :mapStyle="mapStore.style"
      :renderWorldCopies="false"
      :attributionControl="false"
      @map:load="onMapLoad"
    >
      <MapControls />
    </mgl-map>
  </div>
</template>

<style scoped>
.map {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
