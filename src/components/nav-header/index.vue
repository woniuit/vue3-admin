<template>
    <div>
        <button @click="log">退出登录</button>
    </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { loginStore } from "@/store/login/index";
import { useRouter } from "vue-router";
export default {
    components: {},
    setup() {
        const store = loginStore();
        const route = useRouter();
        function log() {
            store.$patch({
                token: "",
                menulist: [],
            });
            // console.log(route)
            route.push({
                path: "/login",
            });
        }
        return { log };
    },
};
</script>
<style scoped lang="less"></style>
