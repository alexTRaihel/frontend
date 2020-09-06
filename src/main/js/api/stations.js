import Vue from 'vue'

const stations = Vue.resource('http://localhost:5020/stations{/path}');

export default {
    getAll: (latitude, longitude, spanLng, spanLat) => stations.get({latitude: latitude, longitude: longitude, spanLng: spanLng, spanLat: spanLat}),
    getNear: (latitude, longitude, radius) => stations.get({path: 'near', latitude: latitude, longitude: longitude, radius: radius})
}