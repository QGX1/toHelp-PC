<template>
  <div class="rightContent">
    <div class="changeSelf">
      <div class="block" style="width: 50%;margin: 1rem auto">
        <h2 class="h1style">考勤录入</h2>
        <mu-container>
          <mu-form
            ref="workForm"
            :model="workInfor"
            class="mu-demo-form"
            label-position="left"
            label-width="100"
          >
            <mu-form-item label="员工名" prop="work_name" :rules="workInforRules.workNameRules">
              <mu-text-field v-model="workInfor.work_name" disabled prop="work_name"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="员工邮箱" prop="work_email" :rules="workInforRules.workEmailRules">
              <mu-text-field v-model="workInfor.work_email" disabled prop="work_email"></mu-text-field>
            </mu-form-item>
            <mu-form-item
              label="考勤日期"
              prop="work_time"
              :rules="workInforRules.workTimeRules"
            > 
              <mu-date-input v-model="workInfor.work_time"  prop="work_time" 
              label-float full-width landscape value-format="YYYY-MM-DD"></mu-date-input>
              <!-- <mu-date-input v-model="staffInfor.staff_time" prop="staff_time" type="dateTime" label-float full-width landscape></mu-date-input> -->
            </mu-form-item>
            <mu-form-item label="工时(/h)" prop="work_hours" :rules="workInforRules.workHoursRules">
              <mu-text-field v-model="workInfor.work_hours" prop="work_hours"></mu-text-field>
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
      workInfor: {
        work_name: "",
        work_email: "",
        work_time:'',
        work_hours:0,
        users:'',//商家Id
        staffs:''//员工id
      },
      reg: new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      ), //邮箱正则表达式
      workInforRules: {
        workNameRules: [
          { validate: val => !!val, message: "必须填写员工名" },
          { validate: val => val.length >= 2, message: "员工名长度大于2" }
        ],
        workEmailRules: [
          { validate: val => !!val, message: "必须填写邮箱" },
          { validate: val => !!this.reg.test(val), message: "邮箱输入错误" }
        ],
        workTimeRules: [
          { validate: val => !!val, message: "必须填写考勤日期" },
        ],
        workHoursRules: [
          { validate: val => !!val, message: "必须填写考勤时长" },
          { validate: val => val>0&&val<12, message: "考勤时长必须大于0小于12小时，且为数字" },
        ]
      },

      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  mounted(){
    console.log(222,this.$route.params);
    this.workInfor.work_name=this.$route.params.staff.staff_name;
    this.workInfor.work_email= this.$route.params.staff.staff_email;
    this.workInfor.staffs=this.$route.params.staff._id;
    this.workInfor.users=this.$route.params.staff.users;
  },
  methods: {
    submit() {
      console.log("提交");
      this.$refs.workForm.validate().then(result => {
        if (result == true) {
          console.log(this.workInfor);
          // 向服务端发送新增考勤的请求
          this.postRequest('/api/attendance/addAttendance',this.workInfor).then(res=>{
            if(res.data.code!=0){
              this.$message({
                message: res.data.msg,
                type: 'warning'
              })
            }else{
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.$router.go(-1);
            }
          })
        }
      });
    },
    clear() {
      console.log("重置");
      //this.$refs.workForm.clear();
      this.workInfor.work_time= '';
      this.workInfor.work_hours=0;
      console.log(this.workInfor);
    }
  }
};
</script>

<style scoped>
.changeSelf {
  width: 95%;
  /* height: 100%; */
  background: #fff;
  display: flex;
  justify-content: center;
  margin: 2rem auto;
  border-radius: 1%;
}
.h1style {
  color: dimgray;
  text-align: center;
  border-bottom: 0.01rem solid #eee;
  letter-spacing: 0.5rem;
  line-height: 2.5rem;
}

</style>
<style>
  
</style>
