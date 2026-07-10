import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'

import '@mdi/font/css/materialdesignicons.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import dateformatter from './plugins/DateFormatter'
import priceFormatter from './plugins/PriceFormatter'
import vuetify from './plugins/VuetifyCustomBtn'
import { createRulesPlugin } from 'vuetify/labs/rules'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.use(Toast)
app.use(dateformatter)
app.use(priceFormatter)


import { carts } from './stores/carts'
const cart=carts()


cart.$subscribe((mutation,state)=>{
  console.log("triggered")
  const key=cart.getcartkey()
  if (key){
    localStorage.setItem(key,JSON.stringify(state.cartItems))
    console.log(`triggered subscribe !!`)
  }
},{detached:true})

app.mount('#app')
