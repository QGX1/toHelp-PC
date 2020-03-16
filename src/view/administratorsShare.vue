<template>
    <div id="administShare">
        <el-tabs v-model="activeName"  style="margin-left:1rem">
            <el-tab-pane label="用户分享管理" name="first"></el-tab-pane>
            <shareUser></shareUser>
        </el-tabs>
    </div>
</template>
<script>
import shareUser from "../components/Administrators/shareUser.vue";

export default {
  name: "administShare",
  props: {
  },
  components: {
    shareUser
  },
  data() {
    return {
      activeName:'first'
    };
  },
  watch: {

  }
};
</script>

<style scoped>
#administShare {
  background: #ffffff;
  width: 95%;
  margin: 2rem auto;
  border-radius: 1%;
}
</style>

