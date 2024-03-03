import { getExp } from '@/models/exp'
import axios from 'axios'
import localforage from 'localforage'

const lf = localforage.createInstance({
  name: 'exp' + axios.defaults.baseURL
})

onmessage = function (e) {
  getExp(e.data, true, lf).then((m) => postMessage([e.data, m]))
}
