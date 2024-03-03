<script setup lang="ts">
import MapView from './components/MapView.vue';
import SettingsDrawer from './components/SettingsDrawer.vue';
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
