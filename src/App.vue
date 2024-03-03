<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import MapView from './components/MapView.vue';
const SettingsDrawer = defineAsyncComponent(() => import('@/components/SettingsDrawer.vue'))

</script>

<template>
  <v-layout>
    <SettingsDrawer></SettingsDrawer>
    <v-main>
      <MapView></MapView>
    </v-main>
  </v-layout>
</template>

<style scoped>
</style>
