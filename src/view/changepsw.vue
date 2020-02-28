<template>
  <div class="rightContent">
    <div class="changePsw">
      <el-steps :active="active" style="width: 60%;margin-top: 3rem">
        <el-step title="步骤 1" description="输入旧密码"></el-step>
        <el-step title="步骤 2" description="输入新密码"></el-step>
        <el-step title="步骤 3" description="完成"></el-step>
      </el-steps>
      <div class="content" v-show="view1">
        <el-input placeholder="请输入旧密码" v-model="user_password" show-password style="width:30%"></el-input>
      </div>
      <div class="content" v-show="view2">
        <el-form
          :model="ValidateForm"
          ref="ValidateForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
          style="width:30%;"
        >
          <el-form-item prop="new_password" label="新密码">
            <el-input placeholder="请输入新密码" v-model="ValidateForm.new_password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="check_password" label="确认密码">
            <el-input placeholder="请再次输入新密码" v-model="ValidateForm.check_password" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="content" v-show="view3">
        <!-- <el-input placeholder="完成" v-model="input" show-password style="width:30%"></el-input> -->
        <i class="el-icon-success" style="font-size:133px;color:green;"></i>
      </div>
      <el-button
        style="margin: 2rem;"
        type="primary"
        @click="next"
        v-if="active == 1 || active == 2"
      >下一步</el-button>
      <!-- <el-button style="margin-top: 4rem;" @click="finish" v-if="active == 3">完成</el-button> -->
    </div>
  </div>
</template>
<script>
import { mapState } from "Vuex";
import Vue from "vue";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入6位数密码"));
      } else {
        if (value.length != 6) {
          return callback(new Error("请输入6位数密码"));
        }
        return callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.ValidateForm.new_password) {
        return callback(new Error("两次密码不一致!"));
      } else {
        return callback();
      }
    };
    return {
      active: 1,
      view1: true,
      view2: false,
      view3: false,
      user_password: "",
      ValidateForm: {
        new_password: "",
        check_password: ""
      },
      rules: {
        new_password: [{ validator: validatePass, trigger: "blur" }],
        check_password: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    next() {
      console.log(this.active);
      if (this.active == 1) {
        // alert("完成");
        this.postRequest("/api/user/checkPsw", {
          user_password: this.user_password,
          users: this.userInfo.id
        }).then(res => {
          if (res.data.code == 0) {
            this.active == 2;
            this.view1 = false;
            this.view2 = true;
            this.view3 = false;
            Vue.set(this, "active", 2);
            // console.log(111);
          } else {
            // console.log("错");
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        });
      } else if (this.active == 2) {
        this.$refs.ValidateForm.validate(valid => {
          if (valid) {
            // 向服务端发送修改密码的请求
            this.putRequest("/api/user/newPsw", {
              users: this.userInfo.id,
              new_password: this.ValidateForm.new_password
            }).then(res => {
              if (res.data.code == 0) {
                this.active == 3;
                this.view1 = false;
                this.view3 = true;
                this.view2 = false;
                Vue.set(this, "active", 3);
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
            });
          }
        });
      } 
    },
    finish() {
      view1 = true;
      view2 = false;
      view3 = false;
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

.content {
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
  margin-top: 5rem;
}
.changePsw {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: #fff;
  margin: 2rem;
  border-radius: 1%;
}
</style>