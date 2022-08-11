<template>
    <div class="menu">
        <el-menu
            :collapse="isCollapse"
            @open="handleOpen"
            :default-active="activeMenu"
            background-color="#0c2135"
            text-color="#b7bdc3"
            active-text-color="#0a60bd"
            :unique-opened="true"
            @close="handleClose"
            class="el-menu-vertical-demo"
        >
            <template v-for="v in list" :key="v.url">
                <el-sub-menu v-if="v.children" :index="v.url">
                    <template #title>
                        <el-icon><Location /></el-icon>
                        {{ v.name }}
                    </template>
                    <el-menu-item v-for="vitem in v.children" :key="vitem.url" :index="vitem.url" @click="handleLink(vitem)">
                        <template #title>
                            <el-icon><Location /></el-icon>
                            {{ vitem.name }}
                        </template>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="v.url">
                    <template #title>
                        <el-icon><Location /></el-icon>
                        {{ v.name }}
                    </template>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { reactive, toRefs, computed, watch } from "vue";
import { Location } from "@element-plus/icons-vue";
import { loginStore } from "@/store/login/index";
import { useRouter, useRoute } from "vue-router";
export default {
    props: {
        isCollapse:{
            type:Boolean,
            default:false
        }
    },
    components: {
        Location,
    },
    setup() {
        const store = loginStore();
        const router = useRouter();
        const route = useRoute();
        let ts = reactive({
            // isCollapse: false,
        });
        function handleOpen(key, keyPath) {
            console.log(key, keyPath);
        }
        function handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
        function handleLink(e) {
            router.push({
                path: e.url,
            });
        }
        const list = computed(() => {
            return store.menulist;
        });

        const activeMenu = computed(() => {
            const { path } = route;
            return path;
        });

        return {
            ...toRefs(ts),
            list,
            handleOpen,
            handleClose,
            handleLink,
            activeMenu,
        };
    },
};
</script>
<style scoped lang="less">
.menu {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
        height: 100vh;
    }
    ::v-deep(.el-menu-item.is-active) {
        background-color: #409eff;
    }
}
</style>
