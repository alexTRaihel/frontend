import Vue from 'vue'
import './api/resource'
import AppComponent from './App.vue'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import store from './store/store'
import router from './router/router'
// import 'vuetify/dist/vuetify.min.css'

Vue.use(VueResource);
Vue.use(Vuetify);

new Vue({
    vuetify: new Vuetify(),
    store,
    router,
    render: h => h(AppComponent)
}).$mount('#app');