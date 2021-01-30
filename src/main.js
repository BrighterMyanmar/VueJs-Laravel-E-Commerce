import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'

const app = createApp(App);
app.config.globalProperties.$baseUrl = "http://localhost:8000/api/"
app.config.globalProperties.$assetUrl = "http://localhost:8000/uploads/"
app.use(router);
app.mount('#app');

// createApp(App).use(router).mount('#app')
