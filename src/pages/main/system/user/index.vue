<template>
    <div class="user">
        <el-switch @change="change" v-model="value3" inline-prompt active-text="是" inactive-text="否" />
        <div>文字</div>
    </div>
</template>
<script>
import { toRefs, reactive, onMounted } from "vue";
import { setTheme } from "@/util/themeUtil";
export default {
    components: {},
    setup() {
        let ts = reactive({
            value3: true,
        });
        function change(e) {
            console.log(e);
            if (e) {
                setTheme();
            } else {
                setTheme(false);
            }
        }
        onMounted(() => {
            setTheme();
        });
        return {
            ...toRefs(ts),
            change,
        };
    },
};
</script>
<style scoped lang="less">
.user {
    color: var(--theme-color);
    border-bottom: 1px solid var(--theme-boder-color);
    background-color: var(--theme-bg);
    height: 100%;
    width: 100%;
}
</style>
