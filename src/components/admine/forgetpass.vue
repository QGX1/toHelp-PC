
<template>
  <div style="text-align:center;">
    <h2 style="width:100%;text-align:center;">找回密码</h2>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="50px"
      class="demo-ruleForm"
    >
      <div class="registerstyle" style="width:100%;margin-top:5rem;">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
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
  data() {
  var checkEmail = (rule, value, callback) => {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!value) {
      return callback(new Error('邮箱不能为空'))
    }
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }, 100)
  };

    return {
      ruleForm: {
        email: "",
        user_limit:2
      },
      rules: {
        email:[{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postRequest('/api/user/forgetPwd',this.ruleForm).then(res=>{
            this.$message(res.data.msg)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.registerstyle {
  margin: 2px 2px 2px -0.8rem;
  width: 50%;
}
</style>