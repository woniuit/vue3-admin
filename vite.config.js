import { defineConfig, normalizePath } from "vite";
// import autoprefixer from "autoprefixer";
// import viteImagemin from "vite-plugin-imagemin";
// import compressPlugin from "vite-plugin-compression";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import { visualizer } from "rollup-plugin-visualizer"; //分析打包的体积大小
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve("./src/css/common.less"));

// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === "production";
console.log(isProduction);
// 填入项目的 CDN 域名地址
// const CDN_URL = "https://uat-gmp.spgacmotorsc.com";
export default defineConfig({
    // base: isProduction ? CDN_URL : "/sp",
    root: path.join(__dirname, "src"),
    // 配置代理服务器
    server: {
        port: 9494,
        proxy: {
            // 配置的代理不能超过10个
            "/api": {
                target: "http://152.136.185.210:4000",
                rewrite: (path) => path.replace(/^\/api/, ''),
                // httppathRewrite: {
                //     "^/api": "",
                // },
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
            },
        },
    },
    plugins: [
        // visualizer({
        //     // 打包完成后自动打开浏览器，显示产物体积报告
        //     open: true,
        // }),
        vue(),
        //图片压缩
        // compressPlugin({
        //     ext: ".gz", //gz br
        //     algorithm: "gzip", //brotliCompress gzip
        //     deleteOriginFile: true,
        // }),
        // viteImagemin({
        //     optipng: {
        //         optimizationLevel: 7,
        //     },
        //     // 有损压缩配置，有损压缩下图片质量可能会变差
        //     pngquant: {
        //         quality: [0.8, 0.9],
        //     },
        //     // svg 优化
        //     svgo: {
        //         plugins: [
        //             {
        //                 name: "removeViewBox",
        //             },
        //             {
        //                 name: "removeEmptyAttrs",
        //                 active: false,
        //             },
        //         ],
        //     },
        // }),
    ],
    // 自定义拆包
    build: {
        rollupOptions: {
            output: {
                // manualChunks 配置
                manualChunks: {},
            },
        },
    },
    // 别名
    resolve: {
        // 别名配置
        alias: {
            "@static": path.join(__dirname, "src/static"),
            "@": path.join(__dirname, "src"),
        },
    },
    // css 相关的配置
    css: {
        preprocessorOptions: {
            less: {
                // additionalData 的内容会在每个 less 文件的开头自动注入
                additionalData: `@import "${variablePath}";`,
            },
        },
        // 进行 PostCSS 配置
        postcss: {
            plugins: [
                // autoprefixer({
                //     // 指定目标浏览器
                //     overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
                // }),
            ],
        },
    },
});
