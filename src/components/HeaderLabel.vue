<template>
  <div class="headboay">
    <div style="width:100%;">
      <div class="label" @click="shownavigation">
        <i class="iconfont icon-houtui" style="color:#bdbdbd;font-size:1.5rem" v-show="isGo"></i>
        <i class="iconfont icon-qianjin" style="color:#bdbdbd;font-size:1.5rem" v-show="!isGo"></i>
        <!-- <img src="../assets/more.png" style="width:41px;height:41px;margin:10px 10px 10px 15px;" /> -->
      </div>
      <div class="headsource">
        <img src="../assets/source.png" style="width:21px;height:21px;margin:20px 20px 20px 30px;">
      </div>
      <div class="headsourceinput">
        <mu-col>
          <mu-auto-complete v-model="seachValue" placeholder="输入当前要查找的内容"></mu-auto-complete>
        </mu-col>
      </div>
    </div>
    <div
      class="headsource"
      style="border-right: 0.01rem solid rgba(175, 179, 187, 0.63);border-left: 0.01rem solid rgba(175, 179, 187, 0.63);"
    >
      <el-badge class="item" type="primary" v-if='userInfo.user_limit!=3'>
        <img
          src="../assets/notice.png"
          style="width:23px;height:23px;margin:10px 20px 20px 25px;margin-left:25px;"
          @click="drawer = true"
        >
      </el-badge>
      <el-badge class="item" type="primary" :value="messageList" v-else>
        <img
          src="../assets/notice.png"
          style="width:23px;height:23px;margin:10px 20px 20px 25px;margin-left:25px;"
          @click="drawer = true"
        >
      </el-badge>
    </div>
    <div class="myself">
      <div class="block" style="margin:5px 12px 0 15px;">
        <el-avatar
          shape="square"
          :size="39"
          :src="userInfo.user_avatar?'http://39.101.193.187:8080/pictures/'+userInfo.user_avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        ></el-avatar>
      </div>
    </div>
    <div class="myself">
      <strong>
        <p>{{userInfo.user_name}}</p>
      </strong>
    </div>
    <div class="myself">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-button
            size="mini"
            slot="reference"
            style="border: none;background-color: transparent;outline: none;padding:0px;"
          >
            <img
              src="../assets/down.png"
              style="width:12px;height:12px;margin:25px 20px 20px 10px;"
            >
          </el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logOut2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="userInfo.user_limit==3">
      <!-- 内层轨道 -->
      <div>
        <el-drawer title="投诉列表" :visible.sync="drawer" size="25%">
          <div>
            <leaveMsg v-for="(item,index) in leaveList" :key="item._id" :leaveItem="item"></leaveMsg>
          </div>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "Vuex";
import leaveMsg from "../components/Administrators/leaveMessage";
import Vue from "vue";
export default {
  name: "headerlabel",
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      isCollapse: true,
      seachValue: "",
      isGo: true,
      drawer: false,
      messageList: 0,
      leaveList: [] //举报列表
    };
  },
  components: {
    leaveMsg
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    if (this.userInfo.user_limit == 3) {
      this.getRequest("/api/complaint/getComplaint", {
        users: this.userInfo.id,
        user_limit: this.userInfo.user_limit
      }).then(res => {
        if (res.data.code == 0) {
          this.leaveList = res.data.msg;
          let newArr=this.leaveList.filter(item=>{
            return item.adminstHandel==0;
          });
          this.messageList=newArr.length;
        }
      });
    }
  },
  methods: {
    ...mapActions(["logOut"]),
    shownavigation() {
      this.isGo = !this.isGo;
      this.$store.state.isCollapse = !this.$store.state.isCollapse;
    },
    logOut2() {
      this.$router.replace({ name: "Login" });
      this.logOut();
    }
  },
  watch: {
    seachValue(newVlu, oldVlu) {
      //将值传递给父组建
      this.$emit("handelSearchValue", newVlu);
    },
    "$route.path": function(newVlu, oldVlu) {
      Vue.set(this, "seachValue", "");
    }
  }
};
</script>

<style scoped>
.headboay {
  width: 100%;
  height: 4rem;
  background: white;
  display: flex;
  justify-content: space-between;
}

.label {
  width: 2rem;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-right: 0.01rem solid #f5f6fa;
  text-align: center;
}

.headsource {
  width: 73px;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.headsourceinput {
  width: 50%;
  height: 100%;
  margin-top: 17px;
}

.col {
  position: static;
}

.item {
  margin-top: 0.8rem;
  margin-right: 1.5rem;
}

.myself {
  /* width: 10rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

p {
  /* width:100px; */
  word-break: keep-all;
  white-space: nowrap;
}
</style>
<style>
.mu-badge-circle {
  width: 18px;
  height: 18px;
}

.mu-badge-float {
  top: -7px;
  right: -8px;
}

.mu-badge {
  font-size: 10px;
}
/* 外层轨道 */
.el-drawer__container ::-webkit-scrollbar {
  width: 0.2rem;
  height: 100%;
  background: #eee;
  border-radius: 0.1rem;
}
/* 内层轨道 */
.el-drawer {
  height: 100% !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
}
.el-drawer::-webkit-scrollbar-thumb {
  display: block;
  width: 0.06rem;
  margin: 0 auto;
  border-radius: 0.1rem;
  background: #ccc;
}
</style>