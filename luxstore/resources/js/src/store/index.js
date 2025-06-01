import { defineStore } from 'pinia';

const store = defineStore({
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