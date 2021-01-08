<template>
    <div class="login-page">
        <login-component></login-component>
    </div>
</template>

<script>

    import LoginComponent from "../components/profile/login/Login.vue";

    export default {
        name: "Login",
        components:{LoginComponent},
    }
</script>

<style scoped>

</style>