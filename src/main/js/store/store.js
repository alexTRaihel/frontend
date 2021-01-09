import Vue from 'vue';
import Vuex from 'vuex';
import stationsApi from '../api/stations';
import servicesApi from '../api/services';
import profileModule from './profile-module';
import serviceModule from './services-module';
import stationModule from './station-module';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        locations: []
    },
    getters: {
        loading: state => state.loading,
        locations: state => state.locations
    },
    mutations: {
        setLoading(state, val){
            state.loading = val;
        },
        setLocations(state, locations){
            state.locations = locations;
        }
    },
    actions: {
        searchObjectsByParams({commit}, params) {
           stationsApi.getNear(params.latitude, params.longitude, params.radius)
               .then(result=>{
                    if (result.ok) {
                        commit('updateStationsMutation', result.body);
                    } else {
                        console.log(result.status);
                    }
               });
            servicesApi.getAll()
               .then(result=>{
                    if (result.ok){
                        commit('loadServicesMutation', result.body);
                    } else {
                        console.log(result.status);
                    }
               });
        }
    },

    modules: {
        profileModule,
        serviceModule,
        stationModule
    }
})