<template>
    <div class="profile-page">
        <profile-component></profile-component>
    </div>
</template>

<script>

    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import ProfileComponent from "../components/profile/main/Profile.vue";

    export default {
        components:{ProfileComponent},
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