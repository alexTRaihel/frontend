import Vue from 'vue'

export default {
    login: (usercredentials) => Vue.http.post('http://localhost:5004/auth/login', JSON.stringify(usercredentials),
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin'
        })
}