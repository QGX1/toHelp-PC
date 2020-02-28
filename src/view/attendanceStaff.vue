<template>
  <div class="rightContent">
    
    <div class="changeSelf">
      <div class="block" style="width: 50%;margin: 0rem auto">
        <h2 class="h1style">录入考勤</h2>
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
            <mu-form-item label="员工手机号码" prop="staff_phone" :rules="staffInforRules.staffPhoneRules">
              <mu-text-field v-model="staffInfor.staff_phone" prop="staff_phone" disabled></mu-text-field>
            </mu-form-item>
            <mu-form-item label="员工岗位" prop="staff_position" :rules="staffInforRules.staffPositionRules">
              <mu-text-field v-model="staffInfor.staff_position" prop="staff_position"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="是否离岗" prop="staff_quit" >
              <mu-switch v-model="staffInfor.staff_quit"></mu-switch>
            </mu-form-item>
            <mu-form-item
              label="入职时间"
              prop="staff_time"
              :rules="staffInforRules.staffTimeRules"
              
            > 
              <mu-date-input v-model="staffInfor.staff_time"  prop="staff_time" label-float full-width landscape
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
export default {
  components:{
  },
  data() {
    return {
      staffInfor: {
        // staff_name: "丘桂娴",
        // staff_email: "6888@qq.com",
        // staff_phone: "15918849435",
        // staff_position: "阿里巴巴CEO",
        // staff_in:false,
        // staff_time:''
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
          { validate: val => !!val, message: "必须填写入职时间" },
        ]
      },

      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  mounted(){
    console.log('编辑员工',this.$route.params);
    this.staffInfor=this.$route.params.staff;
    // this.staffInfor.staff_quit=(this.$route.params.staff.staff_quit=='未离职'?false:true);
  },
  methods: {
    submit() {
      console.log("提交");
      this.$refs.staffForm.validate().then(result => {
        if (result == true) {
          // 向服务端提价修改员工的数据
          // this.staffInfor.staff_quit=(this.staffInfor.staff_quit?'已离职':'未离职');
           console.log(this.staffInfor);
           this.putRequest('/api/staff/putStaff',this.staffInfor).then(res=>{
             this.$message(res.data.msg);
             if(res.data.code==0){
               this.$router.go(-1);
             }
           })
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
        staff_time:''
      };
      console.log(this.staffInfor);
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
.block .mu-form{
  height: 90% !important;
}
</style>