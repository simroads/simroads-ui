<script setup lang="ts">
import { useMapStore } from '@/stores/map'
import { useUiStore } from '@/stores/ui'
import { useI18n, type Locale } from 'vue-i18n'

const mapStore = useMapStore()
const uiStore = useUiStore()
const i18n = useI18n()

const getLocaleName = (locale: Locale) => {
  return i18n.getLocaleMessage(locale).lang_name
}
</script>

<template>
  <v-navigation-drawer
    v-model="uiStore.settingsDrawer"
    :location="$vuetify.display.mobile ? 'bottom' : 'right'"
    temporary
  >
    <v-list>
      <v-list-subheader>Settings</v-list-subheader>

      <v-list-item @click="mapStore.colorRoads = !mapStore.colorRoads">
        <template #append>
          <v-list-item-action start>
            <v-switch hide-details v-model="mapStore.colorRoads"></v-switch>
          </v-list-item-action>
        </template>

        <v-list-item-title>Colored roads</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-footer app>
      <v-select
        prepend-icon="mdi-translate"
        variant="outlined"
        label="Language"
        v-model="$i18n.locale"
        :items="
          $i18n.availableLocales.sort((a, b) => getLocaleName(a).localeCompare(getLocaleName(b)))
        "
        :item-title="getLocaleName"
        :item-value="(l) => l"
        density="compact"
        hide-details
      ></v-select>
    </v-footer>
  </v-navigation-drawer>
</template>

<style scoped></style>
