<template>
    <div class="services">
        <div>
            <input type="radio" id="servicesList" value="ServicesList" v-model="servComponent">
            <label for="servicesList">ServicesList</label>
            <br>
            <input type="radio" id="servicesForm" value="ServicesForm" v-model="servComponent">
            <label for="servicesForm">ServicesForm</label>
        </div>
        <div class="services-form">
            <component :is="servComponent"></component>
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
                service: null,
                servComponent: ServicesList
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
        flex-direction: column;
        justify-content: space-between;
    }

    .services-form {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .services-list{
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-top: 20px;
    }
</style>