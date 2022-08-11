import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";
import { loginStore } from "@/store/login/index";
//1. 创建新的axios实例，
const service = axios.create({
    baseURL: "/api",
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 10 * 1000,
});
//开启Loading
function startLoading() {
    const loading = ElLoading.service({
        lock: true,
        text: "正在请求数据...",
        background: "rgba(0, 0, 0, 0.7)",
    });
    return loading;
}
//关闭Loading
function endLoading(loading) {
    loading.close();
}

service.defaults.headers.post["Content-Type"] = "application/json";//设置默认的
// 2.请求拦截器
service.interceptors.request.use(
    (config) => {
        //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
        //  config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
        // 携带token的拦截
        const store = loginStore()
        const token = store.token;
        if (token) {
            config.headers.Authorization = `Bearer ${store.token}`;
        }
        startLoading();
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// 3.响应拦截器
service.interceptors.response.use(
    (response) => {
        //接收到响应数据并成功后的一些共有的处理，关闭loading等
        endLoading(startLoading());
        return response;
    },
    (error) => {
        endLoading(startLoading());
        // console.log(error.response);
        /***** 接收到异常响应的处理开始 *****/
        if (error && error.response) {
            // 1.公共错误处理
            // 2.根据响应码具体处理
            switch (error.response.status) {
                case 400:
                    error.ElMessage = "错误请求";
                    break;
                case 401:
                    error.ElMessage = "未授权，请重新登录";
                    break;
                case 403:
                    error.ElMessage = "拒绝访问";
                    break;
                case 404:
                    error.ElMessage = "请求错误,未找到该资源";
                    // window.location.href = "/NotFound";
                    break;
                case 405:
                    error.ElMessage = "请求方法未允许";
                    break;
                case 408:
                    error.ElMessage = "请求超时";
                    break;
                case 500:
                    error.ElMessage = "服务器端出错";
                    break;
                case 501:
                    error.ElMessage = "网络未实现";
                    break;
                case 502:
                    error.ElMessage = "网络错误";
                    break;
                case 503:
                    error.ElMessage = "服务不可用";
                    break;
                case 504:
                    error.ElMessage = "网络超时";
                    break;
                case 505:
                    error.ElMessage = "http版本不支持该请求";
                    break;
                default:
                    error.ElMessage = `连接错误${error.response.status}`;
            }
        } else {
            // 超时处理
            if (JSON.stringify(error).includes("timeout")) {
                ElMessage.error("服务器响应超时，请刷新当前页");
            }
            error.ElMessage = "连接服务器失败";
        }

        ElMessage.error(error.response.data);
        /***** 处理结束 *****/
        //如果不需要错误处理，以上的处理过程都可省略
        return Promise.resolve(error.response);
    }
);
export default service;
