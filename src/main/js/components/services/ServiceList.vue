<template>
    <div class="services-list">
        <div class="services-list_cards" v-if="services && services.length > 0" v-for="service in services" :key="service.id">
            <div class="card-item">
                {{service}}
            </div>
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
                'loadServicesAction']),
        }
    }
</script>

<style scoped>
    .services-list_cards{
        display: flex;
    }
</style>