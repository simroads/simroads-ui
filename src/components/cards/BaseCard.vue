<script setup lang="ts">
import { computed } from 'vue'

const slots = defineSlots()

const cardSlots = computed(() => {
  return Object.fromEntries(
    Object.keys(slots)
      .filter((name) => name != 'default')
      .map((name) => [name, slots[name]])
  )
})
</script>

<template>
  <v-card elevation="0" v-bind="$attrs" class="card">
    <template v-slot:append >
      <v-btn icon="mdi-close" class="close-button" variant="text" :to="{ name: 'home' }" size="small"/>
    </template>
    <slot>
      <v-card-text>
        <v-skeleton-loader class="mx-auto border" type="paragraph"></v-skeleton-loader>
      </v-card-text>
    </slot>
    <template v-for="(_, slotName) in cardSlots" v-slot:[slotName.toString()]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}"></slot>
    </template>
  </v-card>
</template>

<style scoped>
.card {
  width: 300px;
  min-height: 70px;
  max-width: calc(100vw - 20px);
}

.close-button {
  transform: translate(20px, -15px);
}
</style>
