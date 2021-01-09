import Vue from 'vue'

// const regions = Vue.resource('https://oxaspi6smh.execute-api.eu-central-1.amazonaws.com/default{/path}?TableName=regions_info');
const regions = Vue.resource('http://localhost:5100/regions');

export default {
    getRegionIdentity: (regionName, cityName) => regions.get({path: 'regionIdentity', regionName: regionName, cityName: cityName}),
    getAllRegionsInfo: () => regions.get({path: 'regionsInfo'})
}
