import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import {createPinia} from "pinia"
import { createPinia } from './pinia'
// console.log(createPinia);

const pinia = createPinia()
console.log(pinia);
pinia.use((info:any)=>{
    console.log(info.store);
    info.store.$subscribe((mutation,state)=>{
        console.log(mutation,state);
    })
    return {a:1231}
})

createApp(App).use(pinia).mount('#app')
