<script setup lang="ts">
import BaseCard from '@/components/cards/BaseCard.vue'
import { computed, watch } from 'vue'
import { useMapStore } from '@/stores/map'
import { useMap } from 'vue-maplibre-gl'
import { gameToLngLatGeoJSON } from '@/models/simMap'
import { useExpRef } from '@/utils/exp'
import { tLoc, type LocaleData } from '@/utils/data'
import type { Export } from '@/models/exp'
import { LngLatBounds, type LayerSpecification, type LngLatLike } from 'maplibre-gl'

const props = defineProps<{
  prefab: string
  id: string
}>()
const mapStore = useMapStore()
const maplibre = useMap()

const path = computed<keyof Export>(() => `overlays/${props.prefab}`)
const fullData = useExpRef(path)
const data = computed(() =>
  Array.isArray(fullData.value)
    ? fullData.value.find((el: any) => el.id == props.id)
    : fullData.value
)
const layerId = computed(() => {
  switch (data.value?.type) {
    case 'city':
      return 'overlays-cities'
    case 'country':
      return 'overlays-countries'
  }
  if (props.prefab != props.id) return 'overlays-prefabs'
  else return 'overlays-non-prefabs'
})
watch(data, (val) => val && mapGoToGeoJson(val.envelope))
const related = computed(() =>
  Array.isArray(fullData.value) ? fullData.value.filter((el: any) => el.id != props.id) : []
)
const imgUrl = computed(() =>
  URL.createObjectURL(new Blob([data.value?.icon], { type: 'image/png' }))
)

const extractGoodZoomFromLayer = (layer: LayerSpecification) => {
  let zoom = layer.minzoom || 0
  if (layer.paint) {
    const paintProps = layer.paint as any
    for (const l in paintProps) {
      if (l.endsWith('opacity')) {
        if (
          Array.isArray(paintProps[l]) &&
          paintProps[l][0] == 'interpolate' &&
          paintProps[l][2][0] == 'zoom'
        ) {
          zoom = Math.max(zoom, paintProps[l][paintProps[l].length - 2])
        }
      }
    }
  }
  return zoom
}
const mapGoToGeoJson = (geoJson: GeoJSON.Geometry) => {
  if (mapStore.map) {
    geoJson = gameToLngLatGeoJSON(mapStore.map, geoJson)
    if (geoJson.type === 'Point') {
      const layer = mapStore.layers[layerId.value]
      const layerZoom = extractGoodZoomFromLayer(layer as LayerSpecification)
      maplibre.map?.flyTo({
        center: geoJson.coordinates as [number, number],
        zoom:
          (layerId.value.endsWith('prefabs')
            ? Math.max(layerZoom, maplibre.map?.getZoom())
            : layerZoom) ||
          maplibre.map?.getZoom() ||
          0
      })
    } else if (geoJson.type == 'Polygon') {
      const bounds = geoJson.coordinates[0].reduce(
        (acc, val) => acc.extend(val as [number, number]),
        new LngLatBounds([
          geoJson.coordinates[0][0] as [number, number],
          geoJson.coordinates[0][1] as [number, number]
        ])
      )

      maplibre.map?.fitBounds(bounds, { padding: 100 })
    }
  }
}
</script>

<template>
  <BaseCard :title="tLoc(data?.title) || (data === false && $t('not_found')) || null">
    <template v-slot:prepend v-if="imgUrl">
      <v-img :src="imgUrl" :width="45"></v-img>
    </template>
    <template v-slot:prepend v-else-if="data === false">
      <v-icon class="ma-2" icon="mdi-alert" size="large"></v-icon>
    </template>
    <template v-if="data">
      <span></span>
      <v-card-subtitle v-if="data.subtitle">{{ tLoc(data.subtitle) }}</v-card-subtitle>
      <v-card-text class="pa-1" v-if="data.city || data.country">
        <v-list density="compact">
          <v-list-item
            v-for="[item, icon] in [
              [data.city, 'mdi-city'],
              [data.country, 'mdi-earth']
            ].filter(([i, _]) => i)"
            :key="item?.id"
            :prepend-icon="icon"
            :title="tLoc(item.title as LocaleData)"
            :to="{ name: 'overlay', params: { id: item.id, prefab: item.id } }"
          />
        </v-list>
      </v-card-text>
      <template v-if="related?.length > 0">
        <v-divider class="mx-4 mb-1"></v-divider>
        <v-card-title>{{ $t('in_same_place') }}</v-card-title>
        <div class="px-4">
          <v-chip-group>
            <v-chip
              v-for="r in related"
              :key="r.id"
              :to="{ name: 'overlay', params: { id: r.id, prefab: props.prefab } }"
              :text="tLoc(r.title as LocaleData)"
            />
          </v-chip-group>
        </div>
      </template>
    </template>
  </BaseCard>
</template>

<style scoped>
.card {
  width: 300px;
}
</style>
