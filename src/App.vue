<template>
    <!-- <div>
        <router-link to="/">首页</router-link> |
        <router-link to="/about">关于</router-link>
    </div> -->
    <router-view></router-view>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "App",
});
</script>
<style scoped lang="less">
.vite {
    color: @theme-color;
    text {
        font-size: 28px;
        text-decoration: dashed;
    }
}
</style>
