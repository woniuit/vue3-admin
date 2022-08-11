<template>
    <div class="login">
        <div class="form">
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
                <el-form-item label="账号" prop="name">
                    <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                </el-form-item>

                <div class="btn">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs, ref, computed } from "vue";
import { loginStore } from "@/store/login/index";
export default {
    components: {},
    setup() {
        const ruleFormRef = ref(null);
        const store = loginStore();
        let ts = reactive({
            rules: {
                name: [{ required: true, message: "请输入账号", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
            },
            ruleForm: {
                name: "coderwhy",
                password: "123456",
            },
        });
        async function submitForm() {
            ruleFormRef.value.validate((valid) => {
                if (valid) {
                    store.getLogin(ts.ruleForm)
                } else {
                    return false;
                }
            });
        }
        const storeState = computed(() => {
            return store.token;
        });
        return {
            ...toRefs(ts),
            submitForm,
            ruleFormRef,
            storeState,
        };
    },
};
</script>
<style scoped lang="less">
.login {
    width: 100%;
    height: 100vh;
    background: #000;
    position: relative;
    .form {
        width: 450px;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 50px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
