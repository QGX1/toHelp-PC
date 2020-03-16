<template>
  <div
    class="leftbody-1"
    v-bind:class="[this.$store.state.isCollapse == true?'leftbodyclose':'leftbody']"
    :style="{height:screenHeight}"
  >
    <div class="scrollbar">
      <div>
        <img src="../assets/logo.png" style="height:4rem;width:16rem">
      </div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="RGB(33,42,57)"
        text-color="#fff"
        :collapse="this.$store.state.isCollapse"
        router
      >
        <el-menu-item index="/news" v-if="userInfo.user_limit!=3">
          <i class="el-icon-s-claim" style="font-size:25px;"></i>
          <span slot="title">信息通知</span>
        </el-menu-item>
        <el-submenu index="2" v-if="userInfo.user_limit!=3">
          <template slot="title">
            <i class="el-icon-edit-outline" style="font-size:25px;"></i>
            <span slot="title">招聘信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/publishRec">发布招聘信息</el-menu-item>
            <el-menu-item index="/managePublishRecruitment">管理招聘信息</el-menu-item>
            <!-- <el-menu-item index="2-3">班级信息管理</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" v-if="userInfo.user_limit!=3">
          <template slot="title">
            <i class="el-icon-tickets" style="font-size:25px;"></i>
            <span slot="title">员工信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/addperson">新增员工</el-menu-item>
            <el-menu-item index="/staffmanage">管理员工</el-menu-item>
            <el-menu-item index="/checkWork">考勤信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 管理员权限 -->
        <el-submenu index="4" v-if="userInfo.user_limit==3">
          <template slot="title">
            <i class="el-icon-edit-outline" style="font-size:25px;"></i>
            <span slot="title">管理员权限</span>
          </template>
          <el-menu-item-group >
            <el-menu-item index="/administratorsUser">用户管理</el-menu-item>
            <el-menu-item index="/administratorsJob">岗位管理</el-menu-item>
            <el-menu-item index="/administratorsShare">分享管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-custom" style="font-size:25px;"></i>
            <span slot="title">个人信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/changeself">个人信息修改</el-menu-item>
            <el-menu-item index="/changepsw">个人密码修改</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      screenHeight: "",
      userInfo: {}
    };
  },
  created() {
    this.screenHeight = window.screen.availHeight - 70 + "px";
  },
  mounted() {
    this.userInfo = this.$store.state.userInfo;
    // console.log('用户信息',this.userInfo);
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log('open')
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log('close')
      // console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.leftbody {
  width: 19%;
  background: RGB(33, 42, 57);
  overflow: auto;
  float: left;
  border: none;
}

.leftbodyclose {
  width: 4%;
  background: RGB(33, 42, 57);
  overflow: auto;
  float: left;
  border: none;
}

.scrollbar {
  width: 100%;
  margin: 0 auto;
}

.leftbody-1::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.leftbody-1::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.leftbody-1::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.el-menu {
  border-right: 0px;
}
</style>