<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import SearchControl from '@/components/controls/SearchControl.vue'
import RouteControl from '@/components/controls/RouteControl.vue'
import CardControl from '@/components/controls/CardControl.vue'

const uiStore = useUiStore()
</script>

<template>
  <SearchControl></SearchControl>
  <CardControl></CardControl>
  <mgl-navigation-control position="top-right" showCompass></mgl-navigation-control>
  <RouteControl></RouteControl>
  <mgl-custom-control position="bottom-right" noClasses>
    <v-btn icon="mdi-information" density="compact" class="bottom-right-ctrl" target="_blank" href="https://github.com/SimRoads"></v-btn>
  </mgl-custom-control>
  <mgl-custom-control position="bottom-right" noClasses>
    <v-btn
      icon="mdi-cog"
      density="compact"
      class="bottom-right-ctrl"
      @click="uiStore.toggleSettingsDrawer()"
    ></v-btn>
  </mgl-custom-control>
</template>

<style>
.bottom-right-ctrl {
  margin-right: 10px;
  margin-bottom: 10px;
  pointer-events: auto;
}

.maplibregl-ctrl-bottom-left {
  z-index: 100;
}
</style>
