<template>
    <div id="checkWork">
        <div style="width:96%;margin:15px;">
            <el-tabs v-model="activeName">
                <!-- <el-tab-pane label="考勤登记" name="first"></el-tab-pane> -->
                <el-tab-pane label="考勤统计" name="second" ></el-tab-pane>
            </el-tabs>
        </div>
        <router-view :searchValue2='searchValue2'></router-view>
    </div>
</template>
<script>
export default {
  props:{
    searchValue:String
  },
  data() {
    return {
      activeName: "first",
      searchValue2:''
    };
  },
  methods: {
    handleClick() {
      // if (this.activeName == "first") {
      //   // this.$router.push({ path: "/checkWork/attendancealone" });
      // } else {
      //   this.$router.push({ path: "/checkWork/attendancesta" });
      // }
    }
  },
  watch: {
    searchValue(newVlu, oldVlu) {
      
      this.searchValue2=newVlu;
      console.log("updata2", this.searchValue2);
    }
  },
};
</script>

<style scoped>
#checkWork{
    width: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 1%;
}
</style>


