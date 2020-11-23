<template>
    <div class="profile-page">
        <profile-component></profile-component>
        <login-component></login-component>
    </div>
</template>

<script>

    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import ProfileComponent from "../components/profile/main/Profile.vue";
    import LoginComponent from "../components/profile/login/Login.vue";

    export default {
        components:{ProfileComponent,LoginComponent},
        computed: mapGetters(['profile','loading']),
        methods: {
            ...mapActions([
                'loadProfileById']),
            ...mapMutations([
                'setLoading']),
        }
    }
</script>

<style>
</style>