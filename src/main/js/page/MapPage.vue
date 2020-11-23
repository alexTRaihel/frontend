<template>
    <div class="map">
        <div class="map-form">
            <div class="form">
                <div class="stations-form">
                    <input type="text" v-model="latitude" placeholder="latitude">
                    <br/>
                    <input type="text" v-model="longitude" placeholder="longitude">
                    <br/>
                    <input type="number" v-model="radius" placeholder="radius">
                    <br/>
                    <v-btn @click="loadData">Upload Stations</v-btn>
                </div>
            </div>
            <div class="data">
                <div class="stations">
                    <h3>Stations</h3>
                    <ul v-if="stations && stations.length > 0" v-for="station in stations" :key="station.id">
                        <li>
                            <span>{{ station.name }}</span>
                            <span>{{ station.address }}</span>
                        </li>
                    </ul>
                </div>
                <div class="services">
                    <h3>Services</h3>
                    <ul v-if="services && services.length > 0" v-for="service in services" :key="service.id">
                        <li>{{ service.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <div id="map" style="width: 1200px; height: 800px"></div>
        </div>
    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';
    import ServicesList from "../components/services/ServiceList.vue";

    export default {
        name: "MapPage",
        components:{ServicesList},
        data() {
            return {
                latitude: "53.67785",
                longitude: "23.829484",
                radius: 20000,
                map: null
            }
        },
        created(){
            ymaps.ready(this.init);
        },
        computed: mapGetters(['stations','services']),
        watch: {
            stations(val){
                this.updateStationsMapPoints(val);
            },
            services(val){
                this.updateServicesMapPoints(val);
            }
        },
        beforeDestroy(){
            if (this.map){
                this.map.destroy();
                this.map = null;
            }
        },
        methods: {
            ...mapActions([
                'searchObjectsByParams']),
            loadData(){
                let params = {
                    latitude:  this.latitude,
                    longitude: this.longitude,
                    radius: this.radius
                };
                this.searchObjectsByParams(params);
            },
            init(){
                this.map = new ymaps.Map("map", {
                    center: [53.9, 27.56],
                    zoom: 7
                });

                this.map.controls.remove("routeEditor");
                this.map.controls.add("routeEditor", {
                    float: "right"
                });
                this.map.controls.remove("zoomControl");
                this.map.controls.add(new ymaps.control.ZoomControl, {
                    float: "none",
                    position: {
                        top: 60,
                        left: 10
                    },
                    size: "large"
                });
                this.map.controls.remove("searchControl");
                this.map.controls.add("searchControl", {
                    float: "left",
                    position: {
                        top: 10,
                        left: 60
                    },
                    size: "large"
                });
                this.map.controls.remove("trafficControl");
                this.map.controls.remove("geolocationControl");
                this.map.controls.add("geolocationControl", {
                    float: "right"
                });
            },
            updateStationsMapPoints(points){

                let that = this;

                points.forEach(function(item, i, arr) {

                    let point = new ymaps.Placemark([item.latitude, item.longitude], {
                        balloonContent: item.name,
                        balloonContentHeader: item.name,
                        balloonContentBody: item.address,
                        balloonContentFooter: `<a href="#">${item.url}</a>`,
                    }, {
                        preset: 'islands#icon',
                        iconColor: '#2fb60c'
                    });

                    that.map.geoObjects
                        .add(point)
                });
            },

            updateServicesMapPoints(points){

                let that = this;

                points.forEach(function(item, i, arr) {

                    let point = new ymaps.Placemark([item.latitude, item.longitude], {
                        balloonContent: item.name,
                        balloonContentHeader: item.name,
                        balloonContentBody: item.address,
                        balloonContentFooter: `<a href="#">${item.url}</a>`,
                    }, {
                        preset: 'islands#icon',
                        iconColor: '#b6151b'
                    });

                    that.map.geoObjects
                        .add(point)
                });
            }
        }
    }
</script>

<style scoped>
    .map{
        display: flex;
    }

    .map .form{
        flex: 1;
    }

    .data{
        flex: 3;
        display: flex;
    }

    .map-form{
        min-width: 300px;
    }

</style>