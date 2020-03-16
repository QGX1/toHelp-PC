<template>
  <div class="loginstyle">
    <div class="login">
      <div class="loginbox">
        <ul style="margin:0 0 0 0;">
          <template v-for="(item) in items">
            <li
              @mouseover="selectStyle (item) "
              :class="{'active':item.active}"
              @mouseout="outStyle(item)"
              :key="item.id"
              style="list-style-type:none;height:6rem;display: flex;justify-content: center;align-items: center;text-align: center;"
              @click="chooseitem(item.id)"
            >
              <div >
                <div >
                  <i :class="item.icon" style="font-size:3rem;color:#ffffff"></i>
                </div>
                <div >{{item.select}}</div>
              </div>
            </li>
          </template>
        </ul>
      </div>

      <div class="logincontent">
        <Login v-show="login" ></Login>
        <messageLogin v-show="messageLogin"></messageLogin>
        <Forgetpass v-show="forgetPass"></Forgetpass>
        <Register v-show="register" @registered="registered"></Register>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '../components/admine/login';
import messageLogin from '../components/admine/messageLogin';
import Forgetpass from '../components/admine/forgetpass';
import Register from '../components/admine/register';
export default {
  components:{
    Login,
    Forgetpass,
    Register,
    messageLogin
  },
  data() {
    return {
      login:true,
      forgetPass:false,
      register:false,
      messageLogin:false,
      activeName: "login",
      active: false,
      items: [
        { select: "登录",id:0, icon: "el-icon-user-solid" },
        { select: "管理员登录", id:1,icon: "el-icon-user" },
        { select: "注册", id:2,icon: "el-icon-s-order" },
        { select: "忘记密码", id:3,icon: "el-icon-s-release" }
      ]
    };
  },
  methods: {
    // 注册完毕
    registered(value){
      console.log('登录')
      this.chooseitem(value);
      
    },
    selectStyle(item) {
      var _this = this;
      this.$nextTick(function() {
        this.items.forEach(function(item) {
          _this.$set(item, "active", false);
        });
        this.$set(item, "active", true);
      });
    },
    outStyle(item) {
      // this.$set(item, "active", false);
    },
    chooseitem(item) {
      if (item == 0) {
          this.login=true;
          this.forgetPass=false;
          this.register=false;
          this.messageLogin=false;
      } else if (item ==1) {
          this.login=false;
          this.forgetPass=false;
          this.register=false;
          this.messageLogin=true;
      } else if(item ==2) {
          this.login=false;
          this.forgetPass=false;
          this.register=true;
          this.messageLogin=false
      }else{
        this.login=false;
        this.forgetPass=true;
        this.register=false;
        this.messageLogin=false;
      }
    }
  }
};
</script>

<style scoped>
.login {
  width: 60%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin-top:5rem;
}

.loginstyle {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  background: #fafafa
}

.loginbox {
  display: flex;
  flex-direction: column;
  flex-wrap: center;
  background-color: rgb(127, 204, 255);
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}

.logincontent {
  width: 80%;
  height: 384px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}

.active{
  background: rgb(100, 136, 255);
}

ul {
  overflow: hidden;
  padding: 0 0 0 0;
  width: 9rem;
}
</style>

