/**
 * Created by mac on 17/2/4.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import cityMutations from './city/mutations'
import cityAcions from './city/actions'
import loadingMutations from './loading/mutations'
import comingMutations from './coming/mutations'
import cinemaMutations from './cinema/mutations'
Vue.use(Vuex);

const city = {
  state: {
    name: '北京',
    show: false,
    rN: 'bj',
    data: []
  },
  actions: cityAcions,
  mutations: cityMutations
}
const coming = {
  state: {
    lists:[],
  },
  mutations: comingMutations
}
const cinema = {
  state: {
    area:[],
  },
  mutations: cinemaMutations
}
const loading = {
  state: {
   stack:[],
  },
  mutations: loadingMutations
}
export default new Vuex.Store({
  modules:{
  city,
  loading,
  coming,
  cinema
  },

})
