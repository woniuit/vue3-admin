import { defineStore } from "pinia";
import router from "@/router";
import { login } from "@/service/login";
import { menuList } from "@/service/system";
import { mapMenusToRoutes } from "@/util/MotionMenu.js";
import { useRoute } from "vue-router";
export const loginStore = defineStore("main", {
    state: () => {
        return {
            token: "",
            menulist: [], //左侧菜单
        };
    },
    actions: {
        getLogin(data) {
            login(data).then((res) => {
                this.token = res.data.data.token;
                if (res.data.data.token) {
                    this.getMenuList();
                    router.push("/main");
                }
            });
        },
        async getMenuList() {
            const userMenus = await menuList();
            this.menulist = userMenus.data.data.list;
            const routes = mapMenusToRoutes(this.menulist);
            routes.forEach((route) => {
                if (route) {
                    router.addRoute("main", route);
                }
            });
        },
    },
    persist: {
        enabled: true,
        // 自定义持久化参数
        strategies: [
            {
                // 自定义key
                key: "token",
                // 自定义存储方式，默认sessionStorage
                storage: localStorage,
                // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
                paths: ["token"],
            },
            {
                key: "menulist",
                storage: localStorage,
                paths: ["menulist"],
            },
        ],
    },
});
