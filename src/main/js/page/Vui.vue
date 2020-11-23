<template>
    <div>
        <h3>Test Vui</h3>
        <ul v-for="action in actions">
            <li>{{action}}</li>
        </ul>
    </div>
</template>

<script>

    import { connect, addHandler, sendMessage } from '../util/ws'

    export default {
        name: "Vui",
        data(){
            return{
                actions: []
            }
        },
        created() {

            addHandler((result)=>{
                this.actions.push(result);
                sendMessage("success");
            });

            let profile = true;

            if (profile){
                connect();
            }
        }
    }
</script>

<style scoped>

</style>