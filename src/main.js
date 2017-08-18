// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/bootstrap.css'

import './assets/js/jquery'
import './assets/js/bootstrap'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({el: '#app', router, store, template: '<App/>', components: {
        App
    }})
