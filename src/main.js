// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'

// import Vue2Leaflet from 'vue2-leaflet'
//
// Vue.component('v-map', Vue2Leaflet.Map);
// Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
// Vue.component('v-marker', Vue2Leaflet.Marker);

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
