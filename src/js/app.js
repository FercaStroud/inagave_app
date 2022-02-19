import {createApp} from 'vue';
import {createI18n} from 'vue-i18n'

import Framework7 from './framework7-custom.js';
import Framework7Vue, {registerComponents} from 'framework7-vue/bundle';

import '../css/framework7-custom.less';
import '../css/icons.css';
import '../css/app.less';

import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

import messages from './messages'


import App from '../components/app.vue';

Framework7.use(Framework7Vue);

const app = createApp(App);
registerComponents(app);


import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.validateStatus = (status =>
        status === 422 ||
        status === 401 ||
        status === 403 ||
        status >= 200 &&
        status < 300
);

app.use(VueAxios, axios);

import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

// Create a new store instance.
const store = createStore({
    plugins: [createPersistedState()],
    state() {
        return {
            api: 'http://192.168.100.19:8080/api/app/',
            assets: 'http://192.168.100.19:8080/',
            //api: 'http://localhost:8000/api/app/',
            //assets: 'http://localhost:8000/',
            isLogged: false,
            isLoading: false,
            user: {
                products: [{
                    maintenances: []
                }]
            },
            withdraws: [],
            payments: [],
            prices: [],
            plants: [],
            products: [],
            locale: 'en',
            //MP_TOKEN: 'APP_USR-655f750c-4355-4210-a1c4-4e1745da9d1b',
            MP_TOKEN: 'TEST-14c03268-ce28-4220-93ef-d2f6faddbbed',
        
        }
    },
    actions: {
        setLoading({ commit }, payload) {
            commit('setLoading', payload);
        },
        getPrices({ commit }) {
            commit('setLoading', true)
            axios.get(this.state.api + 'app/get/agave/prices').then((response) => {
                commit('setPrices', response.data)
            }).catch(function (error) {
                console.log(error)

            }).finally(function () {
                commit('setLoading', false)
            });
        },
        getProducts({ commit }) {
            commit('setLoading', true)
            axios.get(this.state.api + 'get/store/products').then((response) => {
                commit('setProducts', response.data)
            }).catch(function (error) {
                console.log(error)

            }).finally(function () {
                commit('setLoading', false)
            });
        },
        getUserProducts({ commit }) {
            commit('setLoading', true)
            axios.post(this.state.api + 'get/user/products?user_id='+ this.state.user.id).then((response) => {
                commit('setUserProducts', response.data)
            }).catch(function (error) {
                console.log(error)

            }).finally(function () {
                commit('setLoading', false)
            });
        },
    },
    mutations: {
        clearUser(state) {
            state.isLogged = false;
            state.user = {
                products: [{
                    maintenances: []
                }]
            }
        },
        setUser(state, payload) {
            state.isLogged = true;
            state.user = payload;
            state.user.products = [];
        },
        setProducts(state, payload) {
            state.products = payload;
        },
        setUserProducts(state, payload) {
            state.user.products = payload;
        },
        setPrices(state, payload) {
            state.prices = payload;
        },
        setLocale(state, payload) {
            state.locale = payload;
        },
        setLoading(state, payload) {
            state.isLoading = payload;
        }
    }
})
app.use(store);


const i18n = createI18n({
    locale: 'es', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
})
app.use(i18n);
app.mount('#app');
