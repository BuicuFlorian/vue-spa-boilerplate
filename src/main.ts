import { createApp } from 'vue';

import App from './App.vue';
import { routerFactory } from './router';
import { pinia } from './stores';

const app = createApp(App);
const router = routerFactory();

app.use(pinia);
app.use(router);

app.mount('#app');
