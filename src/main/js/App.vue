<template>
    <div>
        <v-btn class="ma-2" tile color="indigo" @click="showPage('/map')" :disabled="$route.path === '/map'">Map</v-btn>
        <v-btn class="ma-2" tile color="indigo" @click="showPage('/profile')" :disabled="$route.path === '/profile'">Profile</v-btn>
        <v-btn class="ma-2" tile color="indigo" @click="showPage('/services')" :disabled="$route.path === '/services'">Services</v-btn>
        <v-btn class="ma-2" tile color="indigo" @click="showPage('/vui')" :disabled="$route.path === '/vui'">Vui</v-btn>
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
    input,
    textarea{
        height: 18px;
        margin: 12px 12px;
        width: 277px;
        padding: 4px;
        border: 1px solid #999;
        border-radius: 3px;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0);
        transition: .17s linear;
    }

    select{
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
</style>