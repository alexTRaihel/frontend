<template>
    <div class="services-form">
            <div>
                <input type="text" placeholder="name" v-model="name">
            </div>
            <div>
               <input type="radio" id="searchType" value="searchType" v-model="type">
               <label for="searchType">Search type</label>
               <br>
               <input type="radio" id="manualType" value="manualType" v-model="type">
               <label for="manualType">Manual type</label>
            </div>
            <div class="services-form_address">
                <div class="address_search-type">
                        <address-search-form
                                :updateCoordinates="updateCoordinates"
                                :disabled="isManualType"
                        ></address-search-form>
                </div>
                <div class="address_manual-type">
                    <input :disabled="!isManualType" type="text" placeholder="address" v-model="address">
                    <br/>
                    <input :disabled="!isManualType" type="number" placeholder="latitude" v-model="latitude">
                    <br/>
                    <input :disabled="!isManualType" type="number" placeholder="longitude" v-model="longitude">
                    <br/>
                    <select :disabled="!isManualType" v-model="region">
                        <template v-if="locations">
                            <option v-for="item in locations" :value="item" :key="item.id">
                                {{ item.name }}
                            </option>
                        </template>
                    </select>
                    <br/>
                    <select :disabled="region == null || !isManualType" v-model="city">
                       <template v-if="region">
                          <option v-for="item in region.cities" :value="item" :key="item.id">
                                  {{ item.name }}
                          </option>
                       </template>
                    </select>
                </div>
            </div>
            <div>
                <input type="checkbox" placeholder="access" id="access" value="1" v-model="access">
                <label for="access">Access</label>
            </div>
            <div class="services-form_save-button">
                <button @click="addService">Add</button>
            </div>
            <div class="info">
                <div>{{region}}</div>
                <div>{{city}}</div>
            </div>
    </div>
</template>

<script>

    import { mapActions,mapGetters } from 'vuex';
    import AddressSearchForm from '../location/SearchByAddressForm.vue';

    export default {
        data(){
            return {
                name: "",
                address: "",
                access: "",
                latitude: "",
                longitude: "",
                selected: "",
                region: null,
                city: null,
                type: "searchType"
            }
        },
        components: {AddressSearchForm},
        computed: {
                ...mapGetters(['locations']),
                isManualType(){
                        return this.type === 'manualType';
                }
        },
        methods: {
            ...mapActions([
                'loadServicesAction',
                'addServiceAction']),
            addService(){
                let service = {
                    name: this.name,
                    address: this.address,
                    access: this.access,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    city: this.city ? this.city.id : null
                };

                this.addServiceAction(service);
            },
            updateCoordinates(data){
                this.latitude = data.coordinates[0];
                this.longitude = data.coordinates[1];

                let administrativeAreas = this.locations.find(location => location.name.toUpperCase() === data.administrativeArea.toUpperCase());
                if (administrativeAreas){
                        this.region = administrativeAreas;
                        this.city = administrativeAreas.cities.find(city => city.name.toUpperCase() === data.locality.toUpperCase())
                }
                this.address = data.addressLine;
            }
        }
    }
</script>

<style scoped>

        .services-form{
                display: flex;
                flex-direction: column;
        }

        .services-form_address {
                display: flex;
        }

        .services-form input{
                height: 18px;
                margin: 12px 12px;
                width: 277px;
                padding: 4px;
                border: 1px solid #999;
                border-radius: 3px;
                box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0);
                transition: .17s linear;
        }

        .services-form select{
                height: 27px;
                margin: 12px 10px;
                width: 287px;
                padding: 4px;
                border: 1px solid #999;
                border-radius: 3px;
                box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0);
                transition: .17s linear;
        }

        button{
                display: inline-block;
                font-size: 11px;
                color: rgb(68,68,68);
                text-decoration: none;
                user-select: none;
                padding: .2em 0.6em;
                outline: none;
                border: 1px solid rgba(0,0,0,.1);
                border-radius: 2px;
                background: rgb(245,245,245) linear-gradient(#f4f4f4, #f1f1f1);
                transition: all .218s ease 0s;
                height: 28px;
                width: 74px;
        }

        .services-form_save-button {
                text-align: center;
        }
</style>