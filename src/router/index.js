import { createRouter, createWebHashHistory } from "vue-router";
import { loginStore } from "@/store/login/index";
const routes = [
    {
        path: "/",
        redirect: "/main/analysis/overview",
    },
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "../pages/login.vue"),
    },
    {
        path: "/main",
        name: "main",
        component: () => import(/* webpackChunkName: "main" */ "../pages/main/index.vue"),
        // children: [] -> 根据userMenus来决定 -> children
        // children: [
        //     {
        //         path: "/main/system/user",
        //         name: "user",
        //         component: () => import(/* webpackChunkName: "user" */ "../pages/main/system/user/index.vue"),
        //     },
        // ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import(/* webpackChunkName: "not-found" */ "../pages/not-found/index.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach((to) => {
    const store = loginStore();
    if (to.path !== "/login") {
        if (!store.token) {
            return "/login";
        }
        // const allRouter = router.getRoutes()
        // console.log('所有路由', allRouter);
    }
});

export default router;
