import { type Export } from '@/models/exp'
import ExpWorker from '@/workers/exp?worker'
import { ref, type UnwrapRef, type WatchSource, watch, type ComputedRef } from 'vue'

const w = new ExpWorker()

export function asyncExp<K extends keyof Export>(path: K ,save = true): Promise<Export[K]> {
  return new Promise<Export[K]>((resolve) => {
    const ev = (e: any) => {
      if (e.data[0].path === path) {
        w.removeEventListener('message', ev)
        resolve(e.data[1] as UnwrapRef<Export[K] | undefined>)
      }
    }
    w.addEventListener('message', ev)
    w.postMessage({path, save})
  })
}

export function useExp<K extends keyof Export>(path: K) {
  const reference = ref<Export[K] | undefined>(undefined)
  asyncExp(path).then((value) => {
    reference.value = value
  })
  return reference
}

export function useExpRef<K extends keyof Export>(path: WatchSource<K>) {
  const reference = ref<Export[K] | undefined>(undefined)
  const onChange = (pathValue: K) => {
    asyncExp(pathValue).then((value) => {
      reference.value = value
    })
  }
  onChange((path as ComputedRef<K>).value || path)
  watch(path, onChange)

  return reference
}
