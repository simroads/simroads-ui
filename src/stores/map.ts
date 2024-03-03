import { defineStore } from 'pinia'
import type {
  ExpressionSpecification,
  LayerSpecification,
  StyleSpecification
} from 'maplibre-gl'
import { useExp } from '@/utils/exp'
import { getWorldSize, type SimMap } from '@/models/simMap'
import { i18n } from '@/plugins/i18n'
import router from '@/plugins/router'

export const useMapStore = defineStore('map', {
  state: () => ({
    map: useExp('map'),
    countries: useExp('countries'),

    colorRoads: true
  }),
  getters: {
    canLoad(state): boolean {
      return !!state.map && !!state.countries
    },
    style(state): StyleSpecification {
      return {
        version: 8,
        name: 'SimRoads default style',
        sprite: router.getFullPath('/exp/overlays/sprite'),
        glyphs:
          'https://raw.githubusercontent.com/korywka/fonts.pbf/master/{fontstack}/{range}.pbf',
        sources: {
          tiles: {
            type: 'vector',
            attribution: 'SimRoads',
            tiles: [router.getFullPath('/exp/mvt/{z}/{x}/{y}.mvt')],
            maxzoom: state.map?.zoomLimit
          }
        },
        layers: Object.entries(this.layers).map(
          ([key, value]) => ({ id: key, ...value }) as LayerSpecification
        )
      }
    },
    layers(state): { [key: string]: Partial<LayerSpecification> & { id?: string | undefined } } {
      if (!state.map || !state.countries) return {}
      const worldSize = getWorldSize(state.map)
      const roadFillColor = [
        'case',
        ['boolean', ['feature-state', 'route'], false],
        'rgb(255,0,0)',
        state.colorRoads
          ? state.countries
              .reduce(
                (acc: any, value: any, i: number) => [
                  ...acc,
                  value.id,
                  `hsl(${(i * 360) / (state.countries as any[]).length}, 50%, 50%)`
                ],
                ['match', ['get', 'country']]
              )
              .concat(['rgb(255, 200, 76)'])
          : 'rgb(255, 200, 76)'
      ] as ExpressionSpecification
      const matchCountry = [
        'literal',
        state.countries.map((c: any) => c.id)
      ] as ExpressionSpecification
      const relativeZoom = (zoomVal: number) => (zoomVal * (state.map as SimMap).zoomLimit) / 7
      const zoomBySize = (size: number) => Math.log2(worldSize/size)

      return {
        background: {
          paint: {
            'background-color': 'rgb(37, 37, 37)'
          },
          type: 'background'
        },
        bounds: {
          source: 'tiles',
          'source-layer': 'bounds',
          type: 'line',
          paint: {
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              [
                '/',
                ['get', 'size'],
                ['/', worldSize, ['^', 2, ['-', ['zoom'], Math.log2(worldSize)]]]
              ]
            ],
            'line-color': 'rgb(60, 60, 60)'
          },
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          }
        },
        'bounds-names': {
          source: 'tiles',
          'source-layer': 'bounds',
          type: 'symbol',
          minzoom: relativeZoom(4.5),
          layout: {
            'symbol-placement': 'line',
            'text-field': ['get', 'name_' + i18n.locale.value],
            'text-font': ['Roboto Thin'],
            'text-allow-overlap': true,
            'text-size': 15
          },
          paint: {
            'text-color': 'rgb(255, 200, 76)'
          }
        },
        ferries: {
          source: 'tiles',
          'source-layer': 'ferries',
          type: 'line',
          paint: {
            'line-width': 1,
            'line-color': ['case', ['boolean', ['feature-state', 'route'], false], 'rgb(255,0,0)', 'rgb(105, 105, 105)'],
            'line-dasharray': [10, 10, 10]
          },
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          }
        },
        prefabs: {
          source: 'tiles',
          'source-layer': 'prefabs',
          type: 'fill',
          paint: {
            'fill-color': [
              'match',
              ['get', 'area'],
              'field',
              'rgb(236, 203, 153)',
              'grass',
              'rgb(170, 203, 150)',
              roadFillColor
            ],
            'fill-antialias': true
          },
          filter: ['!=', 'area', 'building']
        },
        'prefab-roads': {
          source: 'tiles',
          'source-layer': 'roads',
          type: 'fill',
          paint: {
            'fill-color': roadFillColor,
            'fill-antialias': true,
            'fill-outline-color': 'rgba(0,0,0,0)',
            'fill-opacity': ['case', ['boolean', ['feature-state', 'route'], false], 0, 1]
          },
          layout: {
            'fill-sort-key': 1
          },
          filter: ['==', ['geometry-type'], 'Polygon'] //TODO: check unwanted roads
        },
        roads: {
          source: 'tiles',
          'source-layer': 'roads',
          type: 'line',
          paint: {
            'line-color': roadFillColor,
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              ['max', 1, ['zoom']],
              relativeZoom(3),
              ['*', ['get', 'size'], ['^', 2, ['-', ['zoom'], Math.log2(worldSize) - 9]]]
            ]
          },
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          filter: ['!=', ['geometry-type'], 'Polygon']
        },
        'prefab-roads-route': {
          source: 'tiles',
          'source-layer': 'roads',
          type: 'fill',
          paint: {
            'fill-color': 'rgb(255,0,0)',
            'fill-antialias': true,
            'fill-outline-color': 'rgba(0,0,0,0)',
            'fill-opacity': ['case', ['boolean', ['feature-state', 'route'], false], 1, 0]
          },
          filter: ['==', ['geometry-type'], 'Polygon'] //TODO: check unwanted roads
        },
        buildings: {
          source: 'tiles',
          'source-layer': 'prefabs',
          type: 'fill-extrusion',
          paint: {
            'fill-extrusion-color': 'rgb(225, 163, 56)',
            'fill-extrusion-height': 1000,
            'fill-extrusion-base': 0
          },
          filter: ['==', 'area', 'building']
        },
        'overlays-non-prefabs': {
          source: 'tiles',
          'source-layer': 'overlays',
          type: 'symbol',
          minzoom: zoomBySize(20000),
          layout: {
            'icon-image': ['get', 'overlay'],
            'icon-anchor': 'center',
            'icon-size': [
              'interpolate',
              ['linear'],
              ['zoom'],
              zoomBySize(20000), 0,
              zoomBySize(4000),1
            ]
          },
          paint: {
            'icon-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              zoomBySize(20000), 0,
              zoomBySize(4000),1
            ]
          },
          filter: ['all', ['==', ['get', 'prefab'], ['id']], ['!', ['in', ['id'], matchCountry]]]
        },
        'overlays-prefabs': {
          source: 'tiles',
          'source-layer': 'overlays',
          type: 'symbol',
          minzoom: zoomBySize(5000),
          layout: {
            'icon-image': ['get', 'overlay'],
            'icon-anchor': 'center',
            'icon-size': [
              'interpolate',
              ['linear'],
              ['zoom'],
              zoomBySize(5000), 0,
              zoomBySize(1000),1
            ]
          },
          paint: {
            'icon-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              zoomBySize(5000), 0,
              zoomBySize(1000),1
            ]
          },
          filter: ['all', ['!=', ['get', 'prefab'], ['id']], ['!', ['in', ['id'], matchCountry]]]
        },
        'overlays-cities': {
          source: 'tiles',
          'source-layer': 'overlays',
          type: 'symbol',
          minzoom: relativeZoom(2.5),
          layout: {
            'text-field': ['get', 'name_' + i18n.locale.value],
            'text-font': ['Roboto Medium'],
            'icon-anchor': 'center',
            'text-allow-overlap': true
          },
          paint: {
            'text-color': 'rgb(255, 200, 76)',
            'text-halo-color': 'rgb(0, 0, 0)',
            'text-halo-width': 2,
            'text-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              relativeZoom(2.5),
              0,
              relativeZoom(3.5),
              1
            ]
          },
          filter: ['!', ['to-boolean', ['get', 'overlay']]]
        },
        'overlays-countries': {
          source: 'tiles',
          'source-layer': 'overlays',
          type: 'symbol',
          layout: {
            'text-field': ['get', 'name_' + i18n.locale.value],
            'text-font': ['Roboto Medium'],
            'icon-image': ['get', 'overlay'],
            'icon-anchor': 'bottom',
            'icon-offset': [0, -5],
            'icon-size': 1,
            'icon-allow-overlap': true,
            'text-allow-overlap': true
          },
          paint: {
            'text-color': 'rgb(255, 200, 76)',
            'text-halo-color': 'rgb(0, 0, 0)',
            'text-halo-width': 2
          },
          filter: ['in', ['id'], matchCountry]
        }
      }
    }
  },
  actions: {}
})
