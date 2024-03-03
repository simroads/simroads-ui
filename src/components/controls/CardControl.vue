<script setup lang="ts"></script>

<template>
  <mgl-custom-control position="bottom-left" noClasses>
    <router-view
      v-slot="{ Component }"
      name="controlInfo"
      class="maplibregl-ctrl maplibregl-ctrl-group"
    >
      <transition name="slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </mgl-custom-control>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(200%);
}
</style>
