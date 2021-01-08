<template>
    <div class="services-list">
        <div class="services-list_cards" v-if="services && services.length > 0" v-for="service in services" :key="service.id">
            <div class="card-item">
                {{service}}
            </div>
            <v-btn @click="open(service.id)">open</v-btn>
            <v-btn @click="update(service)">update</v-btn>
            <v-btn @click="remove(service.id)">remove</v-btn>
        </div>
    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex'

    export default {
        data() {
            return {
            }
        },
        mounted(){
            this.loadServicesAction();
        },
        computed: mapGetters(['services']),
        methods: {
            ...mapActions([
                'loadServicesAction',
                'removeServiceAction']),
            update(service){
                console.log('implement update data');
            },
            remove(id){
                this.removeServiceAction(id);
            },
            open(id){

            }
        }
    }
</script>

<style scoped>
    .services-list_cards{
        display: flex;
    }
</style>