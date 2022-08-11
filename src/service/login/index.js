import http from "../axios";
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
 let resquest = ""

//  // get请求
//  export function getListAPI(params){
//      return http.get(`${resquest}/getList.json`,params)
//  }
 // post请求
export function login(data,headers) {
     return http.post(`/login`,data,headers)
 }
