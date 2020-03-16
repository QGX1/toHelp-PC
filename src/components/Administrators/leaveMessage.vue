<template>
  <div id="leaveMessage">
    <!-- 主要显示的内容 -->
    <div class="leaveContent">
      <img
        :src="leaveItem.users.user_avatar?'http://192.168.43.177:8081/'+leaveItem.users.user_avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        alt="用户头像"
        class="userAvatar"
      >
      <div style="display: grid;margin-left: 0.5rem;">
        <span style="">{{leaveItem.users.user_name}}</span>
        <span class="detelBtn" @click.stop="innerDrawer=true">详情</span>
      </div>
      <div style="position: absolute;right: 1rem;" v-show="leaveItem.adminstHandel!=0">
        <img src="../../assets/p1.png" alt="" style="width:4rem;height:4rem">
      </div>
    </div>
    <!-- 显示详情 -->
    <el-drawer
      title="投诉详情"
      :append-to-body="true"
      :before-close="handleClose"
      :visible.sync="innerDrawer"
      size="40%"
    >
      <div class="detailContent">
        <el-form ref="form" :model="leaveItem" label-width="100px" label-position="right">
          <el-form-item label="投诉者" style="margin-bottom:0px">{{leaveItem.users.user_name}}</el-form-item>
          <el-form-item label="投诉对象" style="margin-bottom:0px">{{leaveItem.targets.user_name}}</el-form-item>
          <el-form-item label="投诉原因" style="margin-bottom:0px">{{leaveItem.complaint_text}}</el-form-item>
          <el-form-item label="投诉时间" style="margin-bottom:0px">{{leaveItem.date}}</el-form-item>
          <el-form-item label="证明材料" style="margin-bottom:0px">
            <div
              class="demo-image__preview"
              v-for="(imgItem,index) in leaveItem.complaint_imgs"
              :key="index"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="'http://192.168.43.177:8081/'+imgItem"
                :preview-src-list="['http://192.168.43.177:8081/'+imgItem]"
              ></el-image>
            </div>
          </el-form-item>
          <el-form-item label="" style="margin-bottom:0px">
            <el-button type="primary" @click.stop="onSubmit(leaveItem._id)">删除投诉对象</el-button>
            <el-button @click.stop="onSubmit(leaveItem._id)">已读</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="complaintTips">管理员根据核实投诉内容，给出相对应的处理</div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    leaveItem: Object
  },
  data() {
    return {
      innerDrawer: false,
      drawer: false,
      form: {}
    };
  },
  mounted() {
  },
  methods: {
    handleClose(done) {
      this.innerDrawer = false;
    },
    onSubmit(id) {
      // 向服务端发送已收到
      this.putRequest("/api/complaint/updataComplaint", {
        users: this.$store.state.userInfo.id,
        user_limit: this.$store.state.userInfo.user_limit,
        _id:id,
        adminstHandel:1//标记已读
      }).then(res => {
        this.$set(this.leaveItem,'adminstHandel',1)
        this.innerDrawer = false;
      });
    }
  }
};
</script>

<style scoped>
.complaintTips {
  border: 0.01rem solid #beb0b0;
  line-height: 2rem;
  margin-left: 0.3rem;
  border-radius: 0.1rem !important;
  letter-spacing: 0.05rem;
  color: #baa7a7;
  overflow: hidden;
}
.leaveContent {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  border: 0.01rem solid #cccccc3d;
  height: 5rem;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 0.1rem;
  width: 95%;
}
.detelBtn {
  background: #d4ebdf;
  border: 1px solid #fff;
  border-radius: 2px;
  padding: 1px;
  font-size: 0.01rem;
  letter-spacing: 0.05rem;
  color: #6e6e9a;
  cursor: grab;
}
/* .leaveContent {
  -webkit-animation: flip 1s 0.2s ease both;
  -moz-animation: flip 1s 0.2s ease both;
}
@-webkit-keyframes flip {
  0% {
    -moz-transform: perspective(400px) rotateY(0);
    -moz-animation-timing-function: ease-out;
  }
  40% {
    -moz-transform: perspective(400px) translateZ(150px) rotateY(170deg);
    -moz-animation-timing-function: ease-out;
  }
  50% {
    -moz-transform: perspective(400px) translateZ(150px) rotateY(190deg)
      scale(1);
    -moz-animation-timing-function: ease-in;
  }
  80% {
    -moz-transform: perspective(400px) rotateY(360deg) scale(1);
    -moz-animation-timing-function: ease-in;
  }
  100% {
    -moz-transform: perspective(400px) scale(1);
    -moz-animation-timing-function: ease-in;
  }
}
@-moz-keyframes flip {
  0% {
    -moz-transform: perspective(400px) rotateY(0);
    -moz-animation-timing-function: ease-out;
  }
  40% {
    -moz-transform: perspective(400px) translateZ(150px) rotateY(170deg);
    -moz-animation-timing-function: ease-out;
  }
  50% {
    -moz-transform: perspective(400px) translateZ(150px) rotateY(190deg)
      scale(1);
    -moz-animation-timing-function: ease-in;
  }
  80% {
    -moz-transform: perspective(400px) rotateY(360deg) scale(1);
    -moz-animation-timing-function: ease-in;
  }
  100% {
    -moz-transform: perspective(400px) scale(1);
    -moz-animation-timing-function: ease-in;
  }
} */

.userAvatar {
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  margin-left: 0.5rem;
}
</style>


