import Vue from 'vue'

const profiles = Vue.resource('http://localhost:5009/profile{/id}');
const vehicles = Vue.resource('http://localhost:5009/vehicle{/id}');

export default {
    getProfileById: id => profiles.get({id: id}),
    addProfile: profile => profiles.save({}, profile),
    updateProfile: profile => profiles.update({id: profile.id}, profile),
    addVehicleByOwnerId: (vehicle, id) => vehicles.save({id: id}, vehicle)
}