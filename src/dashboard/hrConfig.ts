import { createHead } from '@vueuse/head';
import { createApp } from 'vue';
import App from './hrConfig/main.vue';
import '../index.css';

const app = createApp(App);
const head = createHead();
app.use(head);
app.mount('#app');
