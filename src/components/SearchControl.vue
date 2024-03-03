<script setup lang="ts">
import type { SearchItem } from '@/models/search'
import { tLoc } from '@/utils/data'
import { asyncExp } from '@/utils/exp'
import { watchDebounced } from '@vueuse/core'
import MiniSearch, { type SearchResult } from 'minisearch'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const ready = ref(false)
const searchTerm = ref('')
const i18n = useI18n()
const items = ref<SearchResult[]>([])
const item = ref<SearchResult | null>(null)
const router = useRouter()

const search = new MiniSearch<SearchItem>({
  fields: ['title', 'subtitle'],
  storeFields: ['id', 'refId', 'title', 'subtitle', 'append-icon'],
  searchOptions: {
    fuzzy: 0.2,
    boost: { title: 2 }
  }
})
const loadData = async (data: SearchItem[]) => {
  ready.value = false
  const translatedData = data.map((item) => {
    const subtitle = [
      tLoc(item.subtitle),
      [tLoc(item.city), tLoc(item.country)].filter(Boolean).join(', ')
    ]
      .filter(Boolean)
      .join(' - ')

    let icon = 'mdi-map-marker'
    switch (item.type) {
      case 'city':
        icon = 'mdi-city'
        break
      case 'country':
        icon = 'mdi-earth'
    }

    return {
      ...item,
      title: tLoc(item.title),
      subtitle: subtitle,
      'append-icon': icon
    }
  })
  await search.addAllAsync(translatedData)
  ready.value = true
}

asyncExp('search').then((data) => {
  loadData(data)
  watch(i18n.locale, () => {
    loadData(data)
  })
})

watchDebounced(
  searchTerm,
  async (val) => {
    if (val.length < 3) {
      items.value = []
      return
    }
    ready.value = false
    items.value = search.search(val).slice(0, 5)
    ready.value = true
  },
  { debounce: 500 }
)

watch(item, (val) => {
  if (val) {
    router.push({
      name: 'overlay',
      params: {
        prefab: val.refId,
        id: val.id
      }
    })
  }
})
</script>

<template>
  <mgl-custom-control position="top-left">
    <v-autocomplete
      :loading="!ready"
      density="compact"
      variant="solo"
      menu-icon=""
      :placeholder="$t('search')"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      class="search-bar"
      :items="items"
      auto-select-first
      no-filter
      v-model:search="searchTerm"
      :list-props="{ nav: true, density: 'compact' }"
      item-props
      tile
      :menu-props="{
        contentClass: 'search-bar',
        transition: 'fade-transition',
        offset: [5, -1]
      }"
      hide-no-data
      return-object
      v-model="item"
    >
    </v-autocomplete>
  </mgl-custom-control>
</template>

<style>
.search-bar {
  width: 300px;
  max-width: calc(100vw - 60px);
}
</style>
