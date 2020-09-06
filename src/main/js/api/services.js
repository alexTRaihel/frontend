import Vue from 'vue'

const services = Vue.resource('http://localhost:5100/services{/id}');

export default {
    getAll: () => services.get(),
    getById: (id) => services.get({id: id}),
    add: (service)=> services.save({}, service),
    update: (service) => services.update({id: service.id}, service)
}