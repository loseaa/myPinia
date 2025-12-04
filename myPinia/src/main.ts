import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import {createPinia} from "pinia"
import { createPinia } from './pinia'
// console.log(createPinia);

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
