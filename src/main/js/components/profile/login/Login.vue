<template>
    <div class="login-component">
        <h3>Login</h3>
        <input v-model="username" type="text" placeholder="username">
        <br/>
        <input v-model="password" type="text" placeholder="password">
        <br/>
        <button @click="submit">Login</button>
        <br/>
        <span v-if="token">{{token}}</span>
    </div>
</template>

<script>

    import authApi from '../../../api/auth';
    import {setCookie} from '../../../util/utils'

    export default {
        name: "Login",
        data(){
            return{
                username: "",
                password: "",
                token: ""
            }
        },
        methods: {
            submit(){
                let login = {
                    username: this.username,
                    password: this.password
                };

                authApi.login(login).then(result=>{
                    if (result.ok){
                        // setCookie()
                        this.token = result.bodyText;
                    } else {
                        console.log(result);
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>