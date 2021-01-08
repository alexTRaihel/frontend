import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../page/ProfilePage.vue'
import Services from '../page/ServicePage.vue'
import Map from '../page/MapPage.vue'
import Error from '../page/ErrorPage.vue'
import Vui from '../page/Vui.vue'
import Login from '../page/LoginPage.vue'
import Evacuations from '../page/EvacuationsPage.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Map },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
    { path: '/map', component: Map},
    { path: '/vui', component: Vui},
    { path: '/evacuations', component: Evacuations},
    { path: '/services/:id?', component: Services, props: true},
    { path: '*', component: Error },
];

export default new VueRouter({
    mode: 'hash',
    routes,
});

// mode: 'history'