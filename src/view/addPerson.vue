<template>
  <div class="rightContent">
    <div
      class="changeSelf"
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
        <div class="wholebody wholebody-1 scroll" :style="{height:screenHeight}">
          <div class="scrollbar">
            <AllUser
              v-for="(item,index) in userList "
              :key="item._id"
              :user="item"
              @handelAddStaff="handelAddStaff"
            ></AllUser>
          </div>
        </div>
      </div>
      <div class="block" style="width: 70%;border: 0.01rem solid #eee;">
        <h2 class="h1style">新增员工</h2>
        <mu-container>
          <mu-form
            ref="staffForm"
            :model="staffInfor"
            class="mu-demo-form"
            label-position="left"
            label-width="100"
          >
            <mu-form-item label="员工名" prop="staff_name" :rules="staffInforRules.staffNameRules">
              <mu-text-field v-model="staffInfor.staff_name" prop="staff_name" disabled></mu-text-field>
            </mu-form-item>
            <mu-form-item label="员工邮箱" prop="staff_email" :rules="staffInforRules.staffEmailRules">
              <mu-text-field v-model="staffInfor.staff_email" prop="staff_email" disabled></mu-text-field>
            </mu-form-item>
            <mu-form-item
              label="员工手机号码"
              prop="staff_phone"
              :rules="staffInforRules.staffPhoneRules"
            >
              <mu-text-field v-model="staffInfor.staff_phone" prop="staff_phone" disabled></mu-text-field>
            </mu-form-item>
            <mu-form-item
              label="员工岗位"
              prop="staff_position"
              :rules="staffInforRules.staffPositionRules"
            >
              <mu-text-field v-model="staffInfor.staff_position" prop="staff_position"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="入职时间" prop="staff_time" :rules="staffInforRules.staffTimeRules">
              <mu-date-input
                v-model="staffInfor.staff_time"
                prop="staff_time"
                label-float
                full-width
                landscape
                value-format="YYYY-MM-DD"
              ></mu-date-input>
              <!-- <mu-date-input v-model="staffInfor.staff_time" prop="staff_time" type="dateTime" label-float full-width landscape></mu-date-input> -->
            </mu-form-item>
            <mu-form-item>
              <mu-button color="primary" @click="submit">提交</mu-button>
              <mu-button @click="clear">重置</mu-button>
            </mu-form-item>
          </mu-form>
        </mu-container>
      </div>
    </div>
  </div>
</template>

<script>
import AllUser from "../components/Personnelmanagement/allUser";
import { mapState } from "Vuex";
export default {
  components: {
    AllUser
  },
  data() {
    return {
      loading: true,
      search_name: "",
      screenHeight: 0, //屏幕大小
      userList: [], //用户信息数据
      newUserList: [], //存储查询到的用户信息数据
      staffInfor: {
        staff_name: "",
        staff_email: "",
        staff_phone: "",
        staff_position: "",
        staff_time: "",
        staff_id: "", //
        users: "" //当前商家的id(外键)
      },
      reg: new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      ), //邮箱正则表达式
      staffInforRules: {
        staffNameRules: [
          { validate: val => !!val, message: "必须填写员工名" },
          { validate: val => val.length >= 2, message: "员工名长度大于2" }
        ],
        staffEmailRules: [
          { validate: val => !!val, message: "必须填写邮箱" },
          { validate: val => !!this.reg.test(val), message: "邮箱输入错误" }
        ],
        staffPhoneRules: [
          { validate: val => !!val, message: "必须填写手机号码" },
          {
            validate: val => {
              let phone = /^1(3|4|5|6|7|8|9)\d{9}$/;
              return !!phone.test(val);
            },
            message: "手机号码填写错误"
          }
        ],
        staffPositionRules: [
          { validate: val => !!val, message: "必须填写员工岗位" },
          { validate: val => val.length >= 2, message: "员工岗位名称长度大于2" }
        ],
        staffTimeRules: [
          { validate: val => !!val, message: "必须填写入职时间" }
        ]
      },

      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  created() {
    this.screenHeight = document.body.clientHeight - 200 + "px";
  },
  methods: {
    handelAddStaff(value) {
      // console.log('父组件',value)
      this.staffInfor.staff_name = value.user_name;
      this.staffInfor.staff_email = value.user_email;
      this.staffInfor.staff_phone = value.user_phone;
      this.staffInfor.staff_id = value._id;
      this.staffInfor.users = this.userInfo.id;
    },
    submit() {
      console.log("提交");
      this.$refs.staffForm.validate().then(result => {
        if (result == true) {
          console.log(this.staffInfor);
          // 向服务端发送添加员工的请求
          this.postRequest("/api/staff/addStaff", this.staffInfor).then(res => {
            this.$message(res.data.msg);
            if (res.data.code == 0) {
              this.clear();
            }
          });
        }
      });
    },
    clear() {
      console.log("重置");
      this.$refs.staffForm.clear();
      this.staffInfor = {
        staff_name: "",
        staff_email: "",
        staff_phone: "",
        staff_position: "",
        staff_time: "",
        staff_id: ""
      };
      console.log(this.staffInfor);
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    // 获取所有用户信息
    // console.log(this.userInfo)
    this.staffInfor.users = this.userInfo.id;
    this.getRequest("/api/user/allUser").then(res => {
      if(res.data.code==0) this.loading=false;
      this.userList = res.data.msg;
      this.newUserList = res.data.msg;
    });
  },
  watch: {
    search_name(newVlu, oldVlu) {
      this.userList = this.newUserList.filter(item => {
        // console.log(333,item)
        return item.user_name.indexOf(newVlu) != -1;
      });
    }
  }
};
</script>

<style scoped>
.rightContent {
  flex: 15;
  overflow: auto;
  overflow-x: hidden;
  margin: 0px;
  float: center;
}
.changeSelf {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 15px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 2rem;
  border-radius: 1%;
  background: #fff;
}
.h1style {
  color: dimgray;
  text-align: center;
  border-bottom: 0.01rem solid #eee;
  letter-spacing: 0.5rem;
  line-height: 2.5rem;
}
.mu-form {
  width: 50% !important;
  margin: 0 auto !important;
}
.userList {
  width: 25%;
  height: 100%;
  /* margin: 1rem auto; */
  border: 0.01rem solid #eee;
  padding: 0.5rem;
  background: #cccccc3d;
}

.scrollbar {
  width: 100%;
  margin: 0 auto;
  /* margin: 40px 60px; */
  /* background: white; */
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
.scroll {
  overflow-y: auto;
}
</style>

