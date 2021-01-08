<template>
    <div class="map">
        <div class="map-form">
            <div class="form">
                <div class="stations-form">
                    <select v-model="selectedRegion">
                            <option disabled>Region</option>
                            <option v-for="location in locations" :value="location">{{location.name}}</option>
                    </select>
                    <br/>
                    <input type="number" v-model="radius" placeholder="radius">
                    <br/>
                    <v-btn @click="loadData">Show</v-btn>
                </div>
                <div>
                    {{selectedRegion}}
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
                map: null,
                objectManager: null,
                selectedRegion: "{}"
            }
        },
        created(){
            ymaps.ready(this.init);
        },
        computed: mapGetters(['stations','services','locations']),
        watch: {
            stations(val){
                this.updateStationsMapPoints(val);
            },
            services(val){
                this.updateServicesMapPoints(val);
            },
            selectedRegion(val){
                this.mapUpdate(val);
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
                    latitude:  this.selectedRegion.latitude,
                    longitude: this.selectedRegion.longitude,
                    radius: this.radius
                };
                this.searchObjectsByParams(params);
            },
            mapUpdate(region){
                if (this.map && region) {
                    this.clearMap();
                    this.map.setCenter([region.latitude, region.longitude], 8, {
                        checkZoomRange: true
                    });
                }
            },
            init(){
                this.map = new ymaps.Map("map", {
                    center: [53.9, 27.56],
                    zoom: 7
                });

                this.objectManager = new ymaps.ObjectManager({
                    clusterize: true,
                    gridSize: 64,
                    clusterIconLayout: "default#pieChart"
                });

                ymaps.borders.load('BY', {
                    lang: 'en'
                }).then(function (geojson) {
                    for (var i = 0; i < geojson.features.length; i++) {
                        var geoObject = new ymaps.GeoObject(geojson.features[i]);
                        console.log(geoObject.geometry);
                        console.log(geoObject.properties);
                    }
                });

                this.map.geoObjects.add(this.objectManager);
                this.map.controls.remove("routeEditor");
                // this.map.controls.add("routeEditor", {
                //     float: "right"
                // });
                this.map.controls.remove("zoomControl");
                this.map.controls.add(new ymaps.control.ZoomControl, {
                    float: "none",
                    position: {
                        top: 60,
                        left: 10
                    },
                    size: "small"
                });
                this.map.controls.remove("searchControl");
                // this.map.controls.add("searchControl", {
                //     float: "left",
                //     position: {
                //         top: 10,
                //         left: 60
                //     },
                //     size: "large"
                // });
                this.map.controls.remove("trafficControl");
                this.map.controls.remove("geolocationControl");
                this.map.controls.add("geolocationControl", {
                    float: "right"
                });

                // Создадим 5 пунктов выпадающего списка.
                var listBoxItems = ['Заправки', 'Станции', 'Стоянки']
                        .map(function (title) {
                            return new ymaps.control.ListBoxItem({
                                data: {
                                    content: title
                                },
                                state: {
                                    selected: true
                                }
                            })
                        }),
                    reducer = function (filters, filter) {
                        filters[filter.data.get('content')] = filter.isSelected();
                        return filters;
                    },
                    // Теперь создадим список, содержащий 5 пунктов.
                    listBoxControl = new ymaps.control.ListBox({
                        data: {
                            content: 'Фильтр',
                            title: 'Фильтр'
                        },
                        items: listBoxItems,
                        state: {
                            // Признак, развернут ли список.
                            expanded: true,
                            filters: listBoxItems.reduce(reducer, {})
                        }
                    });

                this.map.controls.add(listBoxControl);

                // Добавим отслеживание изменения признака, выбран ли пункт списка.
                listBoxControl.events.add(['select', 'deselect'], function (e) {
                    var listBoxItem = e.get('target');
                    var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
                    filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
                    listBoxControl.state.set('filters', filters);
                });

                let that = this;

                var filterMonitor = new ymaps.Monitor(listBoxControl.state);
                filterMonitor.add('filters', function (filters) {
                    // Применим фильтр.
                    that.objectManager.setFilter(getFilterFunction(filters));
                });

                function getFilterFunction(categories) {
                    return function (obj) {
                        var content = obj.properties.balloonContent;
                        return true;
                    }
                }
            },
            updateStationsMapPoints(points){

                // let that = this;
                //
                // points.forEach(function(item, i, arr) {
                //     let point = new ymaps.Placemark([item.latitude, item.longitude], {
                //         balloonContent: item.name,
                //         balloonContentHeader: item.name,
                //         balloonContentBody: item.address,
                //         balloonContentFooter: `<a href="#">${item.url}</a>`,
                //     }, {
                //         preset: 'islands#icon',
                //         iconColor: '#2fb60c'
                //     });
                //
                //     that.map.geoObjects
                //         .add(point)
                // });


                let that = this;
                //
                // points.forEach(function(item, i, arr) {
                //
                //     let point = new ymaps.Placemark([item.latitude, item.longitude], {
                //         balloonContent: item.name,
                //         balloonContentHeader: item.name,
                //         balloonContentBody: item.address,
                //         balloonContentFooter: `<a href="#">${item.url}</a>`,
                //     }, {
                //         preset: 'islands#icon',
                //         iconColor: '#b6151b'
                //     });
                //
                // });

                let features = [];

                points.forEach(function(item, i, arr) {

                    features.push({
                        type: 'Feature',
                        id: i,
                        geometry: {
                            type: 'Point',
                            coordinates: [item.latitude, item.longitude]
                        },
                        properties: {
                            balloonContent: item.name,
                            balloonContentHeader: item.name,
                            balloonContentBody: item.address,
                            balloonContentFooter: `<a href="#">${item.url}</a>`,
                        },
                        options: {
                            preset: 'islands#icon',
                            iconColor: '#2fb60c'
                        }
                    })

                });

                var collection = {
                    type: 'FeatureCollection',
                    features: features};

                that.objectManager
                    .add(collection)
            },

            clearMap(){
            },

            setNewData(){
                if (isCluster && this.objectManager.clusters.balloon.isOpen(id)) {
                    this.objectManager.clusters.balloon.setData(this.objectManager.clusters.balloon.getData());
                } else if (this.objectManager.objects.balloon.isOpen(id)) {
                    this.objectManager.objects.balloon.setData(objectManager.objects.balloon.getData());
                }
            },

            updateServicesMapPoints(points){

                let that = this;
                //
                // points.forEach(function(item, i, arr) {
                //
                //     let point = new ymaps.Placemark([item.latitude, item.longitude], {
                //         balloonContent: item.name,
                //         balloonContentHeader: item.name,
                //         balloonContentBody: item.address,
                //         balloonContentFooter: `<a href="#">${item.url}</a>`,
                //     }, {
                //         preset: 'islands#icon',
                //         iconColor: '#b6151b'
                //     });
                //
                // });

                let features = [];

                points.forEach(function(item, i, arr) {

                    features.push({
                        type: 'Feature',
                        id: i,
                        geometry: {
                            type: 'Point',
                            coordinates: [item.latitude, item.longitude]
                        },
                        properties: {
                            balloonContent: item.name,
                            balloonContentHeader: item.name,
                            balloonContentBody: item.address,
                            balloonContentFooter: `<a href="#">${item.url}</a>`,
                        },
                        options: {
                            preset: 'islands#icon',
                            iconColor: '#b6151b'
                        }
                    })

                });

                var collection = {
                    type: 'FeatureCollection',
                    features: features};

                that.objectManager
                    .add(collection)
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
        flex-direction: column;
    }

    .map-form{
        min-width: 300px;
    }

</style>