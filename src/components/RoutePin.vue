<template>
  <div>
    <v-avatar :style="{ cursor: props.cursor.value }" color="primary" v-if="index == 0" :size="32"
      ><v-icon icon="mdi-flag"></v-icon
    ></v-avatar>
    <v-avatar
      :style="{ cursor: props.cursor.value }"
      color="primary"
      v-else-if="index == markers.value.length - 1"
      :size="32"
    >
      <v-icon icon="mdi-flag-checkered"> </v-icon>
    </v-avatar>
    <v-badge :style="{ cursor: props.cursor.value }" color="primary" v-else :content="index"></v-badge>
  </div>
</template>

<script setup lang="ts">
import type { Marker } from 'maplibre-gl'
import { type Ref } from 'vue';
import { computed, defineProps } from 'vue'

const props = defineProps<{
  me: Marker
  markers: Ref<Marker[]>
  cursor: Ref<string>
}>()

const index = computed(() => props.markers.value.indexOf(props.me))
</script>
