<template>
    <div class="side-nav">
        <v-btn class="ma-2" tile color="indigo" @click="showPage('/map')" :disabled="$route.path === '/map'">Map</v-btn>
        <v-btn class="ma-2" tile color="indigo" @click="showPage('/profile')" :disabled="$route.path === '/profile'">Profile</v-btn>
        <v-btn class="ma-2" tile color="indigo" @click="showPage('/services')" :disabled="$route.path === '/services'">Services</v-btn>
        <v-btn class="ma-2" tile color="indigo" @click="showPage('/vui')" :disabled="$route.path === '/vui'">Vui</v-btn>
    </div>
</template>

<script>
    export default {
        name: "SideNavigation",
        methods:{
            showPage(page){
                this.$router.push(page);
            }
        }
    }
</script>

<style scoped>

</style>