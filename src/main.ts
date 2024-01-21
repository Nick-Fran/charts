import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify, { iconfont: 'mdi' }).mount('#app')
