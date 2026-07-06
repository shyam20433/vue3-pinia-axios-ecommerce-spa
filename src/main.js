import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)


import { carts } from './stores/carts'
const cart=carts()

cart.$subscribe((mutation,state)=>{
  const key=cart.getcartkey()
  if (key){
    localStorage.setItem(key,JSON.stringify(state.cartItems))
  }
})

app.mount('#app')
