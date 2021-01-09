import profileApi from '../api/profile';

let state = {
    profile: null,
};

let getters = {
    profile: state => state.profile,
};

let mutations = {
    updateProfileMutation(state, profile){
        state.profile = profile
    },
    addVehicleMutation(state, vehicle){
        state.profile.vehicles = [
            ...state.profile.vehicles,
            vehicle
        ]
    }
};

let actions = {
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
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};