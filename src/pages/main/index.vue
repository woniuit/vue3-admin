<template>
    <div>
        <div class="common-layout">
            <el-container>
                <el-aside width="200px">
                    <nav-menu />
                </el-aside>
                <el-container>
                    <el-header>
                        <nav-header />
                    </el-header>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>
<script>
import { onMounted } from "vue";
import navMenu from "@/components/nav-menu/index.vue";
import navHeader from "@/components/nav-header/index.vue";
export default {
    components: {
        navHeader,
        navMenu,
    },
    setup() {
        onMounted(() => {});

        return {};
    },
};
</script>
<style scoped lang="less"></style>
