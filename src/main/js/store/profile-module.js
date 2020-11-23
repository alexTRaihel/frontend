let state = {
    todos: null,
};

let getters = {
    TODOS: state => {
        return state.todos;
    },
};

let mutations = {
    SET_TODO: (state, payload) => {
        state.todos = payload;
    },

    ADD_TODO: (state, payload) => {
        state.todos.push(payload);
    },
};

let actions = {
    GET_TODO: (context, payload) => {
        context.commit('SET_TODO', data);
    },

    SAVE_TODO: (context, payload) => {
        context.commit('ADD_TODO', payload);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};