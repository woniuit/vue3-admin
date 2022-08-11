export function mapMenusToRoutes(menu) {
    const router = [];
    const allRouter = [];
    //1.先去加载默认的路由
    // const allRouter = import.meta.globEager('../router/main,true, /\.js/');
    const routeFiles = import.meta.globEager("../router/main/**/*.js");
    // console.log('routeFiles',routeFiles)
    Object.values(routeFiles).forEach((key) => {
        // const route = require('../router/main' + key.split('.')[1])
        allRouter.push(key.default);
    });
    // console.log("菜单", allRouter);
    //2.根据菜单获取需要加载的路由
    const menus = () => {
        menu.forEach(item => {
            item.children.forEach(subitem => {
                if (subitem.type == 2) {
                    const route = allRouter.find((route) => {
                       return route.path == subitem.url
                    })
                    router.push(route)
                }
            })
        })
    }
    menus(menu)
    // console.log('router',router);
    return router
}
