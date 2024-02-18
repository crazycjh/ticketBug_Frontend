import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from "vue";
import { createPinia } from 'pinia'
// import piniaPersis from 'pinia-plugin-persist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue";
import router from './router'
import primeVueImport from './primeVueImport.js'

const app = createApp(App)

const pinia = createPinia();
// pinia.use(piniaPersis);
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

primeVueImport(app);
// app.use(PrimeVue, { unstyled: true });


// const CustomTaiwind = usePassThrough(
//   Tailwind,
//   {
//     button: {
//       root: { class: 'mx-10 bg-teal-500 hover:bg-teal-700 cursor-pointer text-white p-3 border-none flex gap-2 rounded-xl' },
//       label: { class: 'text-white font-bold text-xl' },
//       icon: 'text-white text-2xl', // OR { class: 'text-white text-2xl' }
//     },
//     badge: {
//       // root: 'w-50px h-50px bg-teal-700 rounded-xl'
//       root: { class: 'w-50px h-50px bg-teal-700 rounded-xl' }
//     },
//   },
// )


app.mount('#app')
