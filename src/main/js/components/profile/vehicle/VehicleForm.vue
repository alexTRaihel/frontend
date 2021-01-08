<template>
    <div class="vehicle-form">
        <input type="text" placeholder="name" v-model="model">
        <button @click="saveVehicle">Add</button>
    </div>
</template>

<script>

    import { mapActions,mapGetters } from 'vuex';

    export default {
        name: "VehicleForm",
        data(){
            return{
                model: ""
            }
        },
        computed: mapGetters(["profile"]),
        methods: {
            ...mapActions([
                "addVehicleAction"
            ]),
            saveVehicle(){

                let vehicle = {
                    model: this.model
                };

                this.addVehicleAction(vehicle);
            }
        }
    }
</script>

<style scoped>

</style>