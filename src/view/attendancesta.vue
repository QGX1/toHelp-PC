<template>
  <div id="staffManage">
    <div
      style="width: 94%;margin-top: -2rem;"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table :data="attendanceData" style="width: 100%" max-height="480">
        <el-table-column fixed prop="staffs.staff_id.user_name" label="姓名" width="150px"></el-table-column>
        <el-table-column prop="staffs.staff_id.user_email" label="邮箱" width="180px"></el-table-column>
        <el-table-column
          prop="work_time"
          label="考勤日期"
          width="180px"
          :filters="seleteDate"
          :filter-method="filterTag"
          filter-placement="bottom-start"
        ></el-table-column>
        <el-table-column prop="work_hours" label="工时" width="180px"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="$router.push({name:'UpdataAttendance',params:{attendance:scope.row}})"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, attendanceData)"
              type="text"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapState } from "Vuex";
export default {
  props: {
    searchValue2: String
  },
  data() {
    return {
      loading:true,
      seleteDate: [
        { text: "1月", value: "01" },
        { text: "2月", value: "02" },
        { text: "3月", value: "03" },
        { text: "4月", value: "04" },
        { text: "5月", value: "05" },
        { text: "6月", value: "06" },
        { text: "7月", value: "07" },
        { text: "8月", value: "08" },
        { text: "9月", value: "09" },
        { text: "10月", value: "10" },
        { text: "11月", value: "11" },
        { text: "12月", value: "12" }
      ],
      attendanceData: [
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   province: "上海",
        //   city: "普陀区",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   zip: 200333
        // },
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   province: "上海",
        //   city: "普陀区",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   zip: 200333
        // },
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   province: "上海",
        //   city: "普陀区",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   zip: 200333
        // },
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   province: "上海",
        //   city: "普陀区",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   zip: 200333
        // },
        // {
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   province: "上海",
        //   city: "普陀区",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   zip: 200333
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   province: "上海",
        //   city: "普陀区",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   zip: 200333
        // },
        // {
        //   date: "2016-05-08",
        //   name: "王小虎",
        //   province: "上海",
        //   city: "普陀区",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   zip: 200333
        // },
        // {
        //   date: "2016-05-06",
        //   name: "王小虎",
        //   province: "上海",
        //   city: "普陀区",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   zip: 200333
        // },
        // {
        //   date: "2016-05-07",
        //   name: "王小虎",
        //   province: "上海",
        //   city: "普陀区",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   zip: 200333
        // }
      ],
      newAttendanceData: []
    };
  },
  mounted() {
    //  向服务器发送获取考勤的请求
    if (this.userInfo) {
      this.getRequest(`/api/attendance/getAttendance/${this.userInfo.id}`).then(
        res => {
          console.log(res);
          if (res.data.code == 0) {
            this.loading=false;
            this.attendanceData = res.data.msg;
            this.newAttendanceData = res.data.msg;
          }
        }
      );
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    filterTag(value, row) {
      // console.log(value,row);
      // console.log(row.work_time.split("-")[1])
      return row.work_time.split("-")[1] === value;
    },
    deleteRow(index, rows) {
      let newAttendance = {
        users: this.userInfo.id,
        _id: rows[index]._id
      };
      rows.splice(index, 1);
      this.deleteRequest(
        "/api/attendance/deleteAttendance",
        newAttendance
      ).then(res => {
        //console.log(res);
        this.$message(res.data.msg);
      });
    }
  },
  watch: {
    searchValue2(newVlu, oldVlu) {
      // console.log("updata3", newVlu);
      // 修改的值
      this.attendanceData = this.newAttendanceData.filter(item => {
        // console.log(item)
        return item.staffs.staff_name.indexOf(newVlu) != -1;
      });
      //console.log(this.attendanceData)
    }
  }
};
</script>
<style scoped>
#staffManage {
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

