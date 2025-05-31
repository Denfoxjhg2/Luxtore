import { createStore } from 'pinia';

const store = createStore({
    state: {
        user: {
            token: null,
            data: {}
        }

    },
    actions: {},
    getters: {},
    mutations: {},
});

export default store;