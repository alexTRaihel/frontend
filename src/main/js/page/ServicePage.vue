<template>
    <div class="services">
        <div class="services-form">
            <services-form></services-form>
        </div>
        <div class="services-list">
            <services-list></services-list>
        </div>
        <div v-if="service" class="service-info">
            {{service}}}
        </div>
    </div>
</template>

<script>

    import ServicesList from "../components/services/ServiceList.vue";
    import ServicesForm from "../components/services/ServiceForm.vue";
    import servicesApi from '../api/services';

    export default {
        props:["id"],
        name: "Services",
        data(){
            return{
                service: null
            }
        },
        created(){

          let that = this;

          if (this.id){
               servicesApi.getById(this.id).then(result=>{
                  if (result.ok){
                      that.service = result.body;
                  }
              });
          }
        },
        components:{ServicesList,ServicesForm},
        methods: {

        }
    }
</script>

<style scoped>
    .services{
        display: flex;
    }
</style>