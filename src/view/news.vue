<template>
  <div class="rightContent1">
    <div
      class="news"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- 所有用户 -->
      <div class="userList">
        <!-- 查找框 -->
        <div style="padding-bottom: 0.3rem;border-bottom: 0.01rem solid;">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-search"
            size="mini"
            v-model="search_name"
          ></el-input>
        </div>
        <div
          class="wholebody wholebody-1 scroll"
          :style="{height:screenHeight}"
          :class="friendsList.length>0?'':'backBar'"
        >
          <div class="scrollbar2">
            <AllUsers
              v-for="(item,index) in friendsList "
              :key="item._id"
              :user="item.user_id==user_id?item.target_users:item.users"
              :infor_count="item.user_id==user_id?item.infor_count:item.infor_count2"
              :indexValue="index"
              @handelAddStaff="handelAddStaff"
            ></AllUsers>
          </div>
        </div>
      </div>
      <div style="width: 70%;border: 0.01rem solid #eee;height:31.7rem">
        <!-- 显示头 -->
        <h3 class="h1style">{{targetUser.user_name?targetUser.user_name:'用户名'}}</h3>
        <!-- 显示聊天记录 -->
        <div
          style="font-size: 0.4rem;"
          class="showNew wholebody wholebody-1 scroll"
          :style="{height:screenHeight-110+'px'}"
        >
          <div style="padding-top:0.3rem" class="scrollbar">
            <div style="width:98%">
              <div class="content_wrap" v-for="item in msgRecordList" :key="item._id">
                <!-- 其他人的聊天内容 -->
                <div class="left_msg" v-if="item.infor_source==2">
                  <img
                    :src="targetUser.user_avatar?'http://192.168.43.177:8081/'+targetUser.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
                    alt="头像"
                  >
                  <span class="otherMsg">{{item.infor_msg}}</span>
                </div>
                <!-- 我的聊天内容 -->
                <div class="right_msg" v-if="item.infor_source==1">
                  <span class="mineMsg">{{item.infor_msg}}</span>
                  <img
                    :src="userInfo.user_avatar?'http://192.168.43.177:8081/'+userInfo.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
                    alt="头像"
                  >
                </div>
              </div>
              <div class="position-box"></div>
            </div>
          </div>
        </div>
        <!-- 输入框 -->
        <footer class="newsInput">
          <textarea name="" id="" class="inputNew" rows="3" v-model="newsText"></textarea>
          <input
            type="button"
            class="commentBtn"
            :disabled="newsText==''"
            @click="sendNews"
            value="发送"
          >
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import AllUsers from "../components/Personnelmanagement/allUsers";
import { mapState } from "Vuex";
import WSocket from "../../socket";
import Vue from "vue";
export default {
  inject: ["reload"], //注入依赖
  components: {
    AllUsers
  },
  data() {
    return {
      search_name: "",
      screenHeight: 0, //屏幕大小
      friendsList: [], //用户信息数据
      allFriends: [], //存储查询到的用户信息数据
      targetUser: {},
      commentBtn2: false,
      newsText: "",
      msgRecordList: [],
      user_id: "",
      firse_user_id: "",
      infor_count: 0,
      infor_count2: 0,
      infor_id: "",
      indexValue: -1,
      loading: true
    };
  },
  created() {
    this.screenHeight = document.body.clientHeight - 200 + "px";
  },
  methods: {
    // 点击事件
    handelAddStaff(userData) {
      // 处理用户的数据
      this.targetUser = userData.user;
      Vue.set(this, "indexValue", userData.indexValue);
      // 获取用户信息
      this.getMsg();
      document.getElementsByClassName("position-box")[0].scrollIntoView(false);
      // 将唯未读消息修改为0

      this.putInfor(userData.indexValue);
    },
    putInfor(index) {
      // console.log(this.user_id, this.firse_user_id);
      if (this.user_id == this.friendsList[index].user_id) {
        Vue.set(this.friendsList[index], "infor_count", 0);
      } else {
        //this.infor_count2 = 0;
        Vue.set(this.friendsList[index], "infor_count2", 0);
        // console.log(this.infor_count2)
      }
      let updataValue = {
        user_id: this.user_id,
        infor_id: this.friendsList[index]._id,
        infor_count: this.friendsList[index].infor_count,
        infor_count2: this.friendsList[index].infor_count2
      };
      // 修改记录条数
      this.putRequest("/api/infor/updateMsg", updataValue).then(res => {
      });
    },
    submit() {},
    // 获取与商家发送过消息的用户
    getUser() {
      if (this.userInfo.id) {
        this.getRequest(`/api/infor/msg/${this.userInfo.id}`).then(res => {
          if (res.data.code == 0) this.loading = false;
          this.friendsList = res.data.msg;
          this.allFriends = res.data.msg;
        });
      }
    },
    // 发送消息给客户端
    sendNews() {
      // 需要发送的消息对象
      const msgObj = {
        msg: this.newsText,
        target: this.targetUser._id,
        current: this.user_id
      };
      WSocket.send(msgObj);
      // 本地客户端显示
      this.msgRecordList.push({
        infor_msg: this.newsText,
        infor_source: 1
      });
      // 保存消息到服务端
      this.savaInfo();
      // 清除输入框内容
      this.newsText = "";
    },
    savaInfo() {
      let infor_source;
      //console.log('8989',this)
      if (this.friendsList[this.indexValue].user_id == this.user_id) {
        this.friendsList[this.indexValue].infor_count = 0;
        this.friendsList[this.indexValue].infor_count2++;
      } else {
        this.friendsList[this.indexValue].infor_count++;
        this.friendsList[this.indexValue].infor_count2 = 0;
      }
      if (this.friendsList[this.indexValue].user_id) {
        if (this.user_id == this.friendsList[this.indexValue].user_id) {
          infor_source = 1; //第一人
        } else {
          infor_source = 2; //第二人
        }
      } else {
        // 数据库中不存在有关于这两个人之间的通讯消息
        infor_source = 1;
      }
      let msgObj = {
        target_users: this.targetUser._id,
        user_id: this.user_id,
        infor_message: {
          infor_msg: this.newsText,
          infor_source: infor_source
        },
        infor_count: this.friendsList[this.indexValue].infor_count, //未读信息数
        infor_count2: this.friendsList[this.indexValue].infor_count2
      };
      this.postRequest("/api/infor/addInfor", msgObj).then(res => {
      //  console.log("数据保存", res);
      });
    },
    // 获取消息列表
    getMsg() {
      let user_id = this.user_id;

     // console.log(this.userInfo.id);
      if (user_id) {
        this.getRequest(`/api/infor/msg/${user_id}`).then(res => {
          // let result=res.data.msg;
          // console.log("获取聊天数据", res);
          // 过滤与当前目标对象的聊天数据
          // console.log(888, this.targetUser, user_id);
          let result = res.data.msg.filter(data => {
            return (
              (data.user_id == user_id &&
                data.target_users._id == this.targetUser._id) ||
              (this.targetUser._id == data.user_id &&
                data.target_users._id == user_id)
            );
          });
          //console.log("result", result);
          if (result.length > 0) {
            // 当前用户的infor_count消息未读数
            //console.log(result);
            // this.infor_count = result[0].infor_count;
            // this.infor_count2 = result[0].infor_count2;
            // this.infor_id = result[0]._id;
            // this.firse_user_id = result[0] ? result[0].user_id : "";
          }

          //console.log(777, result);
          // 加入当前用户为user_id，则为1，插入数据时当前用户为user_id，infor_source为，
          // infor_source用于区分自己和他人的消息\以及谁是第一个发起交流的人
          if (result.length > 0 && result[0].user_id != user_id) {
            // 不等于则为目标用户，要修改数据的infor_source值将2改成2
            let newResult = result[0].infor_message.map(item => {
              // console.log('ccc')
              if (item.infor_source == 1) {
                item.infor_source = 2;
              } else {
                item.infor_source = 1;
              }
              return item;
            });
            this.msgRecordList = newResult;
          } else if (result.length > 0 && result[0].user_id == user_id) {
            this.msgRecordList = result[0].infor_message;
          } else {
            this.msgRecordList = [];
          }
        });
      }
    },
    setMsgCount(message) {
      // 判断消息列表中是否存在该用户
     // console.log("服务端发送消息到客户端");
      this.friendsList.forEach((item, index) => {
        if (
          (item.target_users._id == message.from &&
            item.user_id == this.user_id) ||
          (item.target_users._id == this.user_id &&
            item.user_id == message.from)
        ) {
         // console.log("发送接收");
          if (this.targetUser._id != message.from) {
          //  console.log("不在当前聊天窗口");
            if (this.user_id == item.user_id) {
              item.infor_count++;
            } else {
              item.infor_count2++;
            }
          }
        } else {
          // 该用户为新用户，不存在列表中
        }
      });
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    // 获取所有用户信息
    this.user_id = this.userInfo.id;
    this.getUser();
    // 服务端推送消息给客户端
    // console.log("服务端消息推送");
    WSocket.init(
      { user: this.user_id },
      message => {
        // 收到消息后，判断用户列表中是否存在该用户
        // console.log("来自", this.user_id, this.targetUser, message.from);
        this.setMsgCount(message);
        if (
          this.user_id != message.from &&
          this.targetUser._id == message.from
        ) {
          // console.log("输出数据")
          this.msgRecordList.push({
            infor_msg: message.msg,
            infor_source: 2
          });
        }
      },
      error => {
        console.error();
      }
    );
  },
  watch: {
    search_name(newVlu, oldVlu) {
      //console.log(newVlu)
      this.friendsList = this.allFriends.filter(item => {
        return (
          item.target_users.user_name.indexOf(newVlu) != -1 ||
          item.users.user_name.indexOf(newVlu) != -1
        );
      });
    }
  }
};
</script>

<style scoped>
.rightContent1 {
  flex: 15;
  overflow: auto;
  overflow-x: hidden;
  margin: 0px;
  float: center;
}
.news {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 15px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 2rem;
  border-radius: 5px;
  background: #fff;
}
.h1style {
  color: dimgray;
  text-align: left;
  letter-spacing: 0.2rem;
  line-height: 3rem;
  margin: 0px;
  padding-left: 0.3rem;
  background: rgb(245, 245, 245);
  vertical-align: middle;
}
/* .mu-form {
  width: 50% !important;
  margin: 0 auto !important;
} */
.userList {
  width: 25%;
  /* height: 100%; */
  /* margin: 1rem auto; */
  border: 0.01rem solid #eee;
  padding: 0.5rem;
  background: rgb(231, 231, 230);
}

.scrollbar {
  width: 100%;
  margin: 0 auto;
}
.backBar {
  background-image: url(/static/img/p2.7c8be43.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.wholebody-1::-webkit-scrollbar {
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.wholebody-1::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px #ccc;
  background: #ccc5c5;
}
.wholebody-1::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #ccc;
  border-radius: 10px;
  background: #ededed;
}
.scrollbar2 {
  width: 100%;
  margin: 0 auto;
}
.scroll {
  overflow-y: auto;
}
.commentBtn {
  height: 1.8rem;
  border-radius: 0.1rem;
  float: right;
  width: 7%;
  background-color: #1fb385fc;
  border: 1px solid rgb(228, 228, 228);
  color: #fff;
  font-size: 0.8rem;
  border-radius: 10%;
  margin: 0.2rem 0.5rem;
  /* margin-bottom: -0.5rem; */
}
.newsInput {
  position: fixed;
  bottom: 0px;
  width: 54.3%;
  margin-left: 0.05rem;
  border-top: 0.05rem solid #eee;
  background: #fff;
  bottom: 3rem;
}
.inputNew {
  width: 99.8%;
  border: 0px;
  resize: none;
  font-size: 0.9rem;
  outline: none;
}
.showNew {
  height: 68.4%;
  /* margin-top: -0.5rem; */
  background: rgb(245, 245, 245);
  border-top: 1px solid #eee;
  /* overflow-y:scroll;
  overflow-x:hidden; */
}
</style>
<style lang="stylus" scoped>
.rightContent1 {
  .content_wrap {
    width: 100%;

    img {
      width: 2.5rem;
      height: 2.5rem;
      border: 1px solid #eee;
      border-radius: 10%;
    }

    .left_msg, .right_msg {
      display: flex;
      width: 100%;
      margin: 0.5rem 0.1rem;
    }

    .left_msg {
      justify-content: flex-start;
      padding-left: 0.4rem;

      span {
        background-color: #fff;
        margin-left: 0.8rem;
      }

      .otherMsg:before {
        content: '';
        border: 0.2rem solid transparent;
        display: block;
        width: 0px;
        height: 0px;
        position: relative;
        border-right: 0.5rem solid #fff;
        margin-left: -1.2rem;
        margin-top: 0.6rem;
        float: left;
      }
    }

    .right_msg {
      justify-content: flex-end;

      // margin-left -1rem;
      span:before {
        content: '';
        border: 0.2rem solid transparent;
        display: block;
        width: 0px;
        height: 0px;
        position: relative;
        border-left: 0.5rem solid #0fce0d;
        right: -1rem;
        // margin-left 3rem;
        margin-top: 10px;
        float: right;
      }

      span {
        background-color: #0fce0d;
        margin-right: 0.8rem;
      }
    }

    span {
      display: inline-block;
      max-width: 65%;
      // border: 1px solid #d9d9d9;
      border-radius: 0.1rem;
      margin: 0 0.1rem;
      padding: 0.5rem;
      box-sizing: border-box;
      word-break: break-all;
      text-align: left;
      letter-spacing: 0.02rem;
    }
  }
}
</style>

