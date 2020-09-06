import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../page/ProfilePage.vue'
import Services from '../page/ServicePage.vue'
import Map from '../page/MapPage.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Map },
    { path: '/profile', component: Profile },
    { path: '/map', component: Map},
    { path: '/services', component: Services},
    { path: '*', component: Map },
];

export default new VueRouter({
    mode: 'history',
    routes,
});