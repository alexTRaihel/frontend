import Vue from 'vue'

const auth = Vue.resource('http://localhost:5001/auth{/path}');

export default {
    login: (usercredentials) => Vue.http.post('http://localhost:5001/auth/login', JSON.stringify(usercredentials),
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }),
    validate: () => auth.get({path: 'validate'}, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    })
}