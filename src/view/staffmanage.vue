<template>
  <div id="staffManage">
    <div 
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="overflow: auto"
    >
      <h2 class="h1style">员工管理</h2>
      <el-table :data="staffData" style="width: 100%;margin-top:-1rem;" max-height="450">
        <el-table-column fixed prop="staff_id.user_name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="staff_id.user_email" label="邮箱" width="150"></el-table-column>
        <el-table-column prop="staff_id.user_phone" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="staff_position" label="岗位" width="150"></el-table-column>
        <el-table-column
          prop="staff_quit"
          label="是否离职"
          :filters="[{ text: '已离职', value: true }, { text: '未离职', value: false }]"
          filter-placement="bottom-end"
          :filter-method="filterTag"
          width="120"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.staff_quit? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.staff_quit?'已离职':'未离职'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="staff_time" label="入职时间" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="$router.push({name:'UpdataStaffInfor',params:{staff:scope.row}})"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index)"
              type="text"
              size="small"
            >移除</el-button>
            <el-button
              @click.native.prevent="$router.push({name:'Attendancealone',params:{staff:scope.row}})"
              type="text"
              size="small"
              v-if="!scope.row.staff_quit"
            >考勤</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapState } from "Vuex";
export default {
  props:{
    searchValue:String
  },
  data() {
    return {
      loading:true,
      staffList: [],
      staffData: [
        //   {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // },
        // {
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // },
        // {
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-08',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-06',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-07',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }
      ]
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    // 向服务端发起请求
    console.log(this.userInfo);
    if (this.userInfo) {
      this.getRequest(`/api/staff/getStaff/${this.userInfo.id}`).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.staffList = res.data.msg;
          this.staffData = res.data.msg;
        }
        this.loading=false;
      });
    }
  },
  methods: {
    deleteRow(index) {
      console.log(index);
      let newData={
        _id:this.staffData[index]._id,
        users:this.userInfo.id
      }
      this.staffData.splice(index, 1);
      // 向服务端发送删除员工请求
      this.deleteRequest('/api/staff/deleteStaff',newData).then(res=>{
        console.log(res)
      })
    },
    // 判断是否离职
    stateFormat(row, column) {
      // if (row.staff_quit) return "已离职";
      // return "未离职";
      
    },
     filterTag(value, row) {
        return row.staff_quit === value;
      },
  },
  watch: {
    searchValue:function(newVlu){
      this.staffData=this.staffList.filter(item=>{
        return item.staff_name.indexOf(newVlu) !=-1;
      })
    }
  },
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

