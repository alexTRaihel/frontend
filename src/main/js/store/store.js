import Vue from 'vue';
import Vuex from 'vuex';
import profileApi from '../api/profile';
import stationsApi from '../api/stations';
import servicesApi from '../api/services';
import profileModule from './profile-module';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stations: [],
        services: [],
        profile: null,
        loading: false,
        locations: [
            {
                "id" : 4,
                "name" : "Гродненская область",
                "cities" : [
                    {
                        "name" : "Гродно",
                        "id" : 4000
                    },
                    {
                        "name" : "Лида",
                        "id" : 4001
                    }
                ]
            },
            {
                "id" : 5,
                "name" : "Минск",
                "cities" : [
                    {
                        "name" : "Минск",
                        "id" : 7000
                    }
                ]
            }
        ]
    },
    getters: {
        profile: state => state.profile,
        loading: state => state.loading,
        stations: state => state.stations,
        services: state => state.services,
        locations: state => state.locations
    },
    mutations: {
        updateProfileMutation(state, profile){
            state.profile = profile
        },
        addVehicleMutation(state, vehicle){
            state.profile.vehicles = [
                ...state.profile.vehicles,
                vehicle
            ]
        },
        updateStationsMutation(state, stations){
            state.stations = stations;
        },
        loadServicesMutation(state, services){
            state.services = services;
        },
        addServicesMutation(state, service){
            state.services = [
                ...state.services,
                service
            ]
        },
        setLoading(state, val){
            state.loading = val;
        }
    },
    actions: {
        async updateProfileAction({commit}, profile){
            const result =  await profileApi.updateProfile(profile);
            const data = await result.json();
            commit('updateProfileMutation', data);
        },
        addVehicleAction({commit,state}, vehicle){
            profileApi.addVehicleByOwnerId(vehicle, state.profile.id)
                .then(result=>{
                    if (result.ok){
                        commit('addVehicleMutation', result.body);
                        console.log(result.body);
                    }
                });
        },
        loadProfileById({commit}, id) {
            profileApi.getProfileById(id).then(result => {
                if (result.ok) {
                    commit('updateProfileMutation', result.body);
                    commit('setLoading', false);
                }
            });
        },
        loadServicesAction({commit}) {
            servicesApi.getAll()
                .then(result=>{
                    if (result.ok){
                        commit('loadServicesMutation', result.body);
                    } else {
                        console.log(result.status);
                    }
                });
        },
        addServiceAction({commit}, service) {
            servicesApi.add(service)
                .then(result=>{
                    if (result.ok){
                        commit('addServicesMutation', result.body);
                    }
                });
        },
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
    }
})