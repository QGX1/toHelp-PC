<template>
  <div id="administratorsUser">
    <div style="width:96%;margin:15px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="普通用户管理" name="first"></el-tab-pane>
        <OrdinaryUser v-show="activeName=='first'" :searchValueUser="searchValueJob"></OrdinaryUser>
        <el-tab-pane label="商家管理" name="second"></el-tab-pane>
        <businessUser v-show="activeName!='first'" :searchValueUser="searchValueJob"></businessUser>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import OrdinaryUser from "../components/Administrators/ordinaryUser.vue";
import businessUser from "../components/Administrators/businessUser.vue";
export default {
  name: "administratorsUser",
  props: {
    searchValue: String
  },
  components: {
    OrdinaryUser,
    businessUser
  },
  data() {
    return {
      searchValueJob: "",
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log("用户管理", tab, event);
    }
  },
  watch: {
    searchValue(newVlu, oldVlu) {
      this.searchValueJob = newVlu;
    }
  }
};
</script>

<style scoped>
#administratorsUser {
  background: #ffffff;
  width: 95%;
  margin: 2rem auto;
  border-radius: 1%;
}
</style>

