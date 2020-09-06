<template>
    <div>
        <button @click="showPage('/map')" :disabled="$route.path === '/map'">Map</button>
        <button @click="showPage('/profile')" :disabled="$route.path === '/profile'">Profile</button>
        <button @click="showPage('/services')" :disabled="$route.path === '/services'">Services</button>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
            }
        },
        mounted() {
        },
        beforeMount() {
           //this.$router.replace('/profile')
        },
        methods: {
            showPage(page){
                this.$router.push(page);
            }
        }
    }
</script>

<style>
</style>