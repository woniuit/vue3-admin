<template>
    <div>
        <div @click="click">☆☆☆☆☆</div>
        <div>
            <div ref="echartsRef" style="width: 600px; height: 500px"></div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, ref, onMounted } from "vue";
import * as echarts from "echarts";
const props = defineProps({
    parms: {
        type: String,
        default: "",
    },
    parms2: {
        type: String,
        default: "123",
    },
});
let emits = defineEmits(["update"]);
const echartsRef = ref();
onMounted(() => {
    var myChart = echarts.init(echartsRef.value,'dark');
    myChart.setOption({
        title: {
            text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20],
            },
        ],
    });
});
function click() {
    console.log(props.parms2);
    emits("update", 2);
}
</script>
<style scoped></style>
