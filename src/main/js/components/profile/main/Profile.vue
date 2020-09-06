<template>
    <div>
        <div>Vehicle</div>
        <div>{{profile.username}}</div>
        <div v-if="profile && profile.vehicles">
            <ul v-for="vehicle in profile.vehicles">
                <li>
                    {{vehicle.model}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                usr: ""
            }
        },
        mounted() {
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