<template>
    <div class="nav-header">
        <div class="nav">
            <div @click="handleFlexible">
                <el-icon><Fold /></el-icon>
            </div>
            <button @click="log">退出登录</button>
        </div>
    </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { loginStore } from "@/store/login/index";
import { useRouter } from "vue-router";
import { Fold } from "@element-plus/icons-vue"; //
export default {
    components: { Fold },
    setup(props, { emit }) {
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
        function handleFlexible() {
            emit("handleFlexible");
        }
        return { log, handleFlexible };
    },
};
</script>
<style scoped lang="less">
.nav-header {
    width: 100%;
    .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
    }
}
</style>
