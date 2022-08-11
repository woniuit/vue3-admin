import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "normalize.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist"; //pinia持久化
import { loginStore } from "./store/login/index";
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);
app.use(pinia)
app.use(ElementPlus);

const menustore = loginStore();
if (menustore.token) {
    await menustore.getMenuList();
}
app.use(router);


app.mount("#app");
