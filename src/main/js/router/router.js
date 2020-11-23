import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../page/ProfilePage.vue'
import Services from '../page/ServicePage.vue'
import Map from '../page/MapPage.vue'
import Error from '../page/ErrorPage.vue'
import Vui from '../page/Vui.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Map },
    { path: '/profile', component: Profile },
    { path: '/map', component: Map},
    { path: '/vui', component: Vui},
    { path: '/services/:id?', component: Services, props: true},
    { path: '*', component: Error },
];

export default new VueRouter({
    mode: 'hash',
    routes,
});

// mode: 'history'