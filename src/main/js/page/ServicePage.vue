<template>
    <div class="services">
        <h3>Services</h3>
        <div class="services-form">
            <services-form></services-form>
        </div>
        <div class="services-list">
            <services-list></services-list>
        </div>
    </div>
</template>

<script>

    import ServicesList from "../components/services/ServiceList.vue";
    import ServicesForm from "../components/services/ServiceForm.vue";

    export default {
        name: "Services",
        components:{ServicesList,ServicesForm}
    }
</script>

<style scoped>
    .services{
        display: flex;
    }
</style>