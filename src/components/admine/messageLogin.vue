
<template>
  <div style="margin-top:2rem;">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h2 style="text-align:center">管理员登录</h2>
      <el-form-item label="用户邮箱" prop="user_email" style="margin-bottom: 1.4rem;text-align:center;">
        <el-input v-model="ruleForm.user_email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="user_password">
        <el-input type="password" v-model="ruleForm.user_password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="ruleForm.captcha" autocomplete="off"></el-input>
        <img
          ref="captcha"
          class="get_verification"
          src=" http://192.168.43.177:5001/api/user/verify"
          @click="getCaptchaCode"
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "Vuex";
import {instance} from "../../api/index";
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        let email = new RegExp(
          "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
        );
        if (!email.test(value)) {
          callback(new Error("邮箱输入格式错误"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        //   callback();
        // }
        callback();
      }
    };
    var validate = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请输入验证码"));
      }
      callback();
    };

    return {
      ruleForm: {
        user_password: "",
        // user_name: "",
        captcha: "",
        user_limit: 3
      },
      rules: {
        user_password: [{ validator: validatePass, trigger: "blur" }],
        user_email: [{ validator: checkEmail, trigger: "blur" }],
        captcha: [{ validator: validate, trigger: "blur" }]
      }
    };
  },
  computed: {},
  methods: {
    ...mapActions(["setUserInfo", "setToken"]),
    // 点击获取验证码
    getCaptchaCode() {
      this.$refs.captcha.src =
        " http://192.168.43.177:5001/api/user/verify?time=" + new Date();
    },
    //登录方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 向服务端发送登录请求
          this.postRequest("/api/user/login", this.ruleForm).then(res => {
            this.getCaptchaCode();
            this.$message(res.data.msg);
            console.log(res.data);
            if (res.data.code == 0) {
              this.setUserInfo(res.data.rule);
              this.setToken(res.data.token);
              instance.defaults.headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: res.data.token
              };
              this.$router.push({ name: "administratorsUser" });
            }
          });
        } else {
          alert("请填写完整信息!");
          return false;
        }
      });
      // if(this.ruleForm.user_name!="" && this.ruleForm.user_password != "" && this.ruleForm.user_limit != "")
      // console.log(this.ruleForm.user_name+ ":" + this.ruleForm.user_password + ":" + this.ruleForm.user_limit)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-left: -55px;
}

.get_verification {
  position: fixed;
  height: 2rem;
  margin-left: -6rem;
  margin-top: 0.2rem;
}
</style>