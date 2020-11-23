<template>
    <div class="profile">
        <div v-if="profile">
            <div>{{profile.username}}</div>
            <div v-if="profile && profile.vehicles">
                <ul v-for="vehicle in profile.vehicles">
                    <li>
                        {{vehicle.model}}
                    </li>
                </ul>
            </div>
            <div v-if="profile">
                <vehicle-form
                ></vehicle-form>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import VehicleForm from "../vehicle/VehicleForm.vue";

    export default {
        data() {
            return {
                usr: ""
            }
        },
        components:{VehicleForm},
        created() {
            this.setLoading(true);
            this.loadProfileById("1");
        },
        computed: mapGetters(['profile','loading']),
        methods: {
            ...mapActions([
                'updateProfileAction',
                'loadProfileById']),
            ...mapMutations([
                'setLoading']),
            update(){
                this.updateProfileAction(this.usr);
            }
        }
    }
</script>

<style>
</style>