import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from "vue";
import { createPinia } from 'pinia'
// import piniaPersis from 'pinia-plugin-persist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue";
import router from './router';
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import primeVueImport from './primeVueImport.js'


const app = createApp(App)

const pinia = createPinia();
// pinia.use(piniaPersis);
pinia.use(piniaPluginPersistedstate)

app.use(VueVirtualScroller)

app.use(pinia)
app.use(router)

primeVueImport(app);

app.mount('#app')
