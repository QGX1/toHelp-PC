<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width:700px;height:600px;background: white;"></div>
</template>
<script>
require("echarts/lib/chart/pie");
import echarts from "echarts";
export default {
  name: "zhexiantu",
  data() {
    return {
      charts: "",
      opinionDataone: ["99", "98", "99", "97", "96", "97","99"],
      opinionData1: ["99", "97", "97", "97", "97", "90","97"]
    };
  },
  created() {
    // var a;
    // let url = this.axios.urls.SYSTEM_tongjibaobiao_list;
    // this.axios.post(url, {}).then((response) => {
    // console.log(response);
    // 	console.log(response.data.data[0].money);
    // 	a = response.data.data[0].money
    // 	this.opinionDataone = a;
    // }).catch(function(error) {
    // 	console.log(error);
    // });
  },
  methods: {
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
		  text: "两周的出勤对比",
		  textStyle:{
        //文字颜色
        color:'#ccc',
        //字体风格,'normal','italic','oblique'
        fontStyle:'normal',
        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        fontWeight:'bold',
        //字体系列
        fontFamily:'sans-serif',
        //字体大小
　　　　 fontSize:16
    }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          color: ["#4472C5"],
          data: ["本周", "上周"],
          textStyle: {
            //图例文字的样式
            color: "#5284FF",
            fontSize: 16
          }
          //   data: [{ name: "借款" }, { name: "还款", icon: "rect" }]
        },
        grid: {
          left: "2%",
          right: "8%",
          bottom: "3%",
          containLabel: true
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          name: "(星期)",
          type: "category",
          boundaryGap: false,
		  data: ["1", "2", "3", "4", "5", "6","7"],
		  axisLine: {
            lineStyle:{
                // color:'#F5F5F5',//x轴的颜色
                width:2,//轴线的宽度
            }
        },
        },
        yAxis: {
          name: "出勤率(%)",
          type: "value"
        },

        series: [
          {
            name: "上周",
            type: "line",
            // stack: "总借款",
            data: this.opinionDataone,
			smooth: true,
			symbolSize: 12, //折线点的大小
			itemStyle: {
              normal: {
                color: "#FDC60C",
                borderColor: "#FDC60C",
                borderWidth: 1, //折线点内圈大小
                lineStyle: {
                  width: 3, //调整 线条的宽度  5已经很宽啦
                  color: "#FDC60C" //线条颜色
                }
              }
            }
          },
          {
            name: "本周",
            smooth: true,
            type: "line",
            symbolSize: 12, //折线点的大小
            // stack: "总还款",
            data: this.opinionData1,
            itemStyle: {
              normal: {
                color: "#5284FF",
                borderColor: "#5284FF",
                borderWidth: 1, //内圈大小
                lineStyle: {
                  width: 3, //调整 线条的宽度  5已经很宽啦
                  color: "#5284FF" //线条颜色
                }
              }
            }
          }
        ]
      });
    }
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawLine("main");
    });
  }
};
</script>
<style scoped>
* {
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>