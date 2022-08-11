/****   http.js   ****/
// 导入封装好的axios实例
import request from "./axios";

const http = {
    /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     */
    get(url, params) {
        const config = {
            method: "get",
            url: url,
        };
        if (params) config.params = params;
        return request(config);
    },
    post(url, params, headers) {
        // {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     },
        // }写在单独的请求文件中login/index
        const config = {
            method: "post",
            url: url,
        };

        if (params) {
            config.data = params;
            //配置单独的headers
            config.headers = headers;
        }
        return request(config);
    },
    put(url, params) {
        const config = {
            method: "put",
            url: url,
        };
        if (params) config.params = params;
        return request(config);
    },
    delete(url, params) {
        const config = {
            method: "delete",
            url: url,
        };
        if (params) config.params = params;
        return request(config);
    },
};
export default http;
