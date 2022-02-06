import { createApp } from 'vue';
import { createI18n } from 'vue-i18n'

import Framework7 from './framework7-custom.js';
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

import '../css/framework7-custom.less';
import '../css/icons.css';
import '../css/app.less';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import messages from './messages'

const i18n = createI18n({
    locale: 'en', // set locale
    fallbackLocale: 'es', // set fallback locale
    messages, // set locale messages
})

import App from '../components/app.vue';

Framework7.use(Framework7Vue);

const app = createApp(App);
registerComponents(app);

app.use(i18n);
app.mount('#app');
