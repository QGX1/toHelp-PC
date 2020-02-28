<template>
  
      <div id="pie1" style="border: 0.01rem solid #afb3bb;">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main1" style="float:left;width:500px;height:300px;"></div>
      </div>
    
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  data() {
    return {
      opinionData1: [
        { name: "邮件营销", value: "365" },
        { name: "商管营销", value: "262" },
        { name: "份额营销", value: "345" },
        { name: "掉分营销", value: "553" },
        { name: "通过营销", value: "665" }
      ],
      opinion: {
        type: Array,
        default() {
          return [
            '用户总资金',
            '公司总资金',
            '公司总借款',
            '用户总还款',
            '用户总投资'
          ];
        }
      }
    };
  },
  created() {
    var a;
    // let url = this.axios.urls.SYSTEM_tongjibaobiao_list2;
    // this.axios.post(url, {}).then((response) => {
    // 	console.log(response);
    // 	console.log(response.data.data);
    // 	a=response.data.data;
    //     this.opinionData1 =a;
    // 	this.initData();
    // }).catch(function(error) {
    // 	console.log(error);
    // });
  },
  mounted() {
    this.initData();
  },
  methods: {
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main1"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "公司经济组成形式", //主标题
          subtext: "科比金融贷款公司", //副标题
        //   x: "center" //x轴方向对齐方式
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
         
        legend: {
          orient: "vertical",
          bottom: "bottom",
          data: this.opinion
        },
        series: [
          {
            name: "数据来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.opinionData1,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
