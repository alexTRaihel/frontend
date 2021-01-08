import servicesApi from "../api/services";

let state = {
    services: [],
};

let getters = {
    services: state => state.services,
};

let mutations = {
    loadServicesMutation(state, services){
        state.services = services;
    },
    addServicesMutation(state, service){
        state.services = [
            ...state.services,
            service
        ]
    },
    removeServicesMutation(state, id){
        const index = state.services.findIndex(item => item.id === id);
        if (index > -1){
            state.services = [
                ...state.services.slice(0, index),
                ...state.services.slice(index + 1)
            ]
        }
    },
    updateServicesMutation(state, service){
        const index = state.services.findIndex(item => item.id === service.id);
        state.services = [
            ...state.services.slice(0, index),
            service,
            ...state.services.slice(index + 1)
        ]
    },
};

let actions = {
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
    removeServiceAction({commit}, id) {
        servicesApi.remove(id)
            .then(result=>{
                if (result.ok){
                    commit('removeServicesMutation', id);
                }
            });
    },
    updateServiceAction({commit}, service) {
        servicesApi.update(service)
            .then(result=>{
                if (result.ok){
                    commit('updateServicesMutation', result.body);
                }
            });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};