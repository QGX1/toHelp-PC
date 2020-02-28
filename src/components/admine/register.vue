
<template>
  <div style="text-align:center;" id="registerView">
    <h2 style="width:100%;text-align:center;">注册</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="registerstyle" style="float:left;">
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="ruleForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="user_email">
          <el-input v-model="ruleForm.user_email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="user_password">
          <el-input type="password" v-model="ruleForm.user_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="registerstyle" style="float:right;margin-right:1rem;">
        <el-form-item label="公司名称" prop="user_company">
          <el-input v-model="ruleForm.user_company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="本人职位" prop="user_company_position">
          <el-input v-model="ruleForm.user_company_position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系手机号" prop="user_phone">
          <el-input v-model="ruleForm.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="phone_code">
          <el-input v-model="ruleForm.phone_code" autocomplete="off"></el-input>
          <button
            class="get_verification"
            :disabled="dis"
            :class="{right_phone_number:rightPhoneNumber}"
            @click.prevent="getVerifyCode"
          >{{computedTime>0?`已发送(${computedTime})s`:'获取验证码'}}</button>
        </el-form-item>
      </div>
      <div style="width:100%;float:left;">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "registerView",
  data() {
    var checkVerification = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      callback();
    };
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var checkcompanyPosition = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("注册者的职位不能为空"));
      }
      callback();
    };
    var checkcompany = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("公司名不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入6位数密码"));
      } else {
        if (value.length!=6) {
          return callback(new Error("请输入6位数密码"));
        }
        return callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.user_password) {
        return callback(new Error("两次密码不一致!"));
      } else {
        return callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          return callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            //console.log(8989,this)
            this.dis=false;
            this.rightPhoneNumber=true;
            return callback();
          } else {
            return callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          return callback();
        } else {
          return callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };

    return {
      rightPhoneNumber:false,
      computedTime:0,
      dis: true,
      ruleForm: {
        user_password: "",
        checkPass: "",
        user_name: "",
        user_email: "",
        user_phone: "",
        user_limit: 2, //此处标识为商家
        user_company_position: "", //注册者的职位
        user_company: "", //公司名称
        phone_code: "", //验证码,
        user_limit:2
      },
      rules: {
        user_password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        user_name: [{ validator: checkName, trigger: "blur" }],
        user_phone: [{ validator: checkPhone, trigger: "change" }],
        user_email: [{ validator: checkEmail, trigger: "blur" }],
        user_company_position: [
          { validator: checkcompanyPosition, trigger: "blur" }
        ],
        user_company: [{ validator: checkcompany, trigger: "blur" }],
        phone_code: [{ validator: checkVerification, trigger: "blur" }]
      }
    };
  },
  methods: {
    getVerifyCode() {
     // console.log("wwww");
      // 如果当前没有计时
      if (!this.computedTime) {
        this.computedTime = 30;
        const intervalId = setInterval(() => {
          this.computedTime--;
          if (this.computedTime == 0) {
            clearInterval(intervalId);
          }
        }, 1000);
        // 向后端发送请求，获取验证码
        //const user_phone = this.ruleForm.user_phone;
        let url = `/api/user/phoneCode/${this.ruleForm.user_phone}`;
        this.getRequest(url).then(res => {
          console.log(222, res);
          if(res.data.code==0){
            this.$message(res.data.msg)
          }
        });
      }
    },
    submitForm(formName) {
      console.log(formName, this.$refs[formName].validate());
      console.log(this.ruleForm.user_name);
      this.$refs[formName].validate(valid => {
        console.log(9090, valid);
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //console.log(333, this.ruleForm);
        // 向后端发送注册请求
        this.postRequest('/api/user/register',this.ruleForm).then(res=>{
          this.$message(res.data.msg)
          if(res.data.code==0){
            this.resetForm(formName);
            this.rightPhoneNumber=false;
            this.computedTime=0;
            this.dis=true;
            this.$emit('registered',0);
          }
        })
        
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.registerstyle {
  margin: 2px 2px 2px -0.8rem;
  width: 50%;
}
.get_verification {
    border: 0px;
    float: right;
    color: #cccccc;
    font-size: 14px;
    background: transparent;
    margin-top: 0.1rem;
    margin-left: -5rem;
    position: absolute
    // position: relative;
    // right: 10px;
    // height: 20px;
    // z-index: 10;
    // margin-top: -30px;

    // transform translateY(-50%)//垂直居中
    &.right_phone_number {
        color: #000;
        z-index: 10;
    }
}
</style>