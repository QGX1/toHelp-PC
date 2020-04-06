<template>
  <div class="rightContent">
    <div class="changeSelf">
      <div class="block" style="width: 50%;margin: 1rem auto">
        <h2 class="h1style">修改考勤</h2>
        <mu-container>
          <mu-form
            ref="workForm"
            :model="workInfor"
            class="mu-demo-form"
            label-position="left"
            label-width="100"
          >
            <mu-form-item label="员工名" prop="work_name" :rules="workInforRules.workNameRules">
              <mu-text-field v-model="workInfor.work_name" prop="work_name" disabled></mu-text-field>
            </mu-form-item>
            <mu-form-item label="员工邮箱" prop="work_email" :rules="workInforRules.workEmailRules">
              <mu-text-field v-model="workInfor.work_email" prop="work_email" disabled></mu-text-field>
            </mu-form-item>
            <mu-form-item label="考勤日期" prop="work_time" :rules="workInforRules.workTimeRules">
              <mu-date-input
                v-model="workInfor.work_time"
                prop="work_time"
                label-float
                full-width
                landscape
                value-format="YYYY-MM-DD"
              ></mu-date-input>
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
import { mapState } from "Vuex";
export default {
  props:{
    searchValue:String
  },
  components: {},
  data() {
    return {
      workInfor: {
        work_name: "",
        work_email: "",
        work_time: "",
        work_hours: 0,
        _id: "",
        users: ""
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
          { validate: val => !!val, message: "必须填写考勤日期" }
        ],
        workHoursRules: [
          { validate: val => !!val, message: "必须填写考勤时长" },
          { validate: val => val > 0, message: "考勤时长必须大于0，且为数字" }
        ]
      }
    };
  },
  created() {
    // console.log('123',this.searchValue)
    // console.log(123, this.$route.params.attendance);
      this.workInfor.work_name = this.$route.params.attendance.staffs.staff_id.user_name;
      this.workInfor.work_email = this.$route.params.attendance.staffs.staff_id.user_email;
      this.workInfor._id = this.$route.params.attendance._id;
      this.workInfor.work_time=this.$route.params.attendance.work_time;
      this.workInfor.work_hours=this.$route.params.attendance.work_hours;
    if (this.userInfo) {
      this.workInfor.users = this.userInfo.id;
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    submit() {
      console.log("提交");
      this.$refs.workForm.validate().then(result => {
        if (result == true) {
          this.putRequest('/api/attendance/putAttendance',this.workInfor).then(res=>{
            console.log(res);
            if(res.data.code==0){
              this.$message({
                type: 'success',
                message:res.data.msg
              });
              this.$router.go(-1);
            }else{
              this.$message({
                type:'warning',
                message:res.data.msg
              })
            }
          })
        }
      });
    },
    clear() {
      console.log("重置");
      this.$refs.workForm.clear();
      this.workInfor.work_time = '';
      this.workInfor.work_hours=0;
      console.log(this.workInfor);
    }
  },
  watch: {
    searchValue(newVlu,oldVlu){
      console.log('updata1',newVlu);

    }
  },
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
.h1style {
  color: dimgray;
  text-align: center;
  border-bottom: 0.01rem solid #eee;
  letter-spacing: 0.5rem;
  line-height: 2.5rem;
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
</style>
<style>
</style>
