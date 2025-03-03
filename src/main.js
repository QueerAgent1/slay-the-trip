import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { computed } from 'vue'

// Make computed globally available
window.computed = computed

// Create and mount the app
const app = createApp(App)
app.use(router)
app.mount('#app')