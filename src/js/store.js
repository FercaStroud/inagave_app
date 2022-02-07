import {createStore} from 'framework7/lite';

const store = createStore({
    state: {
        isLogged: false,
        user: {},
        withdraws:[],
        payments:[],
        plants:[],
        products: []
    },
    getters: {
        user({state}) {
            return state.user;
        },
        products({state}) {
            return state.products;
        },
        isLogged({state}) {
            return state.isLogged;
        }
    },
    actions: {
        clearStorage({state}, payload) {
            state.isLogged = false;
            state.user = {};
            state.withdraws = [];
            state.payments = [];
            state.plants = [];
            state.products = [];

        },
        addProduct({state}, product) {
            state.products = [...state.products, product];
        },
        setLogin({state}, payload) {
            state.isLogged = payload;
        },
    },
})
export default store;
