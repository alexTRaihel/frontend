import servicesApi from '../api/services';

let state = {
    stations: [],
};

let getters = {
    stations: state => state.stations,
};

let mutations = {
    updateStationsMutation(state, stations){
        state.stations = stations;
    }
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