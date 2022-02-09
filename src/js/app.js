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
            user: {},
            withdraws: [],
            payments: [],
            plants: [],
            products: [],
            locale: 'en',
        }
    },
    mutations: {
        clearUser(state) {
            state.isLogged = false;
            state.user = {}
        },
        setUser(state, payload) {
            state.isLogged = true;
            state.user = payload;
        },
        setLocale(state, payload) {
            state.locale = payload;
        }
    }
})
app.use(store);

axios.defaults.validateStatus = (status =>
        status === 422 ||
        status === 401 ||
        status === 403 ||
        status >= 200 &&
        status < 300
);

app.use(VueAxios, axios);

const i18n = createI18n({
    locale: 'es', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
})
app.use(i18n);
app.mount('#app');
