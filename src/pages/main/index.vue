<template>
    <div class="main">
        <el-container class="main-content">
            <el-aside width="210">
                <nav-menu :isCollapse="isCollapse" />
            </el-aside>
            <el-container class="page">
                <el-header class="page-header">
                    <nav-header @handleFlexible="handleFlexible" />
                </el-header>
                <el-main class="page-content">
                    <div class="page-info">
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";
import navMenu from "@/components/nav-menu/index.vue";
import navHeader from "@/components/nav-header/index.vue";
export default {
    components: {
        navHeader,
        navMenu,
    },
    setup() {
        const ts = reactive({
            isCollapse: false,
        });
        function handleFlexible() {
            ts.isCollapse = !ts.isCollapse;
        }

        return {
            ...toRefs(ts),
            handleFlexible,
        };
    },
};
</script>
<style scoped lang="less">
.main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.main-content,
.page {
    height: 100%;
}

.page-content {
    height: calc(100% - 48px);

    .page-info {
        background-color: #fff;
        border-radius: 5px;
    }
}

.el-header,
.el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
}

.el-header {
    height: 48px !important;
}

.el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
        display: none;
    }
}

.el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
}
</style>
