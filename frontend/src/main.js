import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import dateformatter from './plugins/DateFormatter'
import priceFormatter from './plugins/PriceFormatter'
import vuetify2 from './plugins/VuetifyCustomBtn'

const vuetify = createVuetify({
  components,
  directives,
})



import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(vuetify2)
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
