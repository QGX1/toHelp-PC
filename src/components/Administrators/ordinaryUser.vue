<template>
  <div class="wholebody wholebody-1" :style="{height:screenHeight}">
    <div class="scrollbar">
      <div style="width: 95%;margin: 0 auto; overflow: auto;">
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%;"
          class="test1"
          height="450"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column label="注册时间" prop="date" column-key="date" width="100px"></el-table-column>
          <el-table-column label="姓名" prop="user_name"></el-table-column>
          <el-table-column label="邮箱" prop="user_email"></el-table-column>
          <el-table-column label="手机号码" prop="user_phone"></el-table-column>
          <el-table-column
            label="在职状态"
            prop="user_incumbency"
            column-key="user_incumbency"
            :filters="[{text: '随时到岗', value: 1}, {text: '在职', value: 2}]"
            :filter-method="filterHandler"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.user_incumbency==1? 'primary' : 'success'"
                disable-transitions
              >{{scope.row.user_incumbency==1?'随时到岗':'在职'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                title="确定删除该用户吗？"
                @onConfirm="handelDelete(scope.row._id,scope.$index)"
              >
                <el-button size="mini" type="danger" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <!-- 分页处理 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[ 3, 5, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import Vue from "vue";
import { Loading } from "element-ui";
// import {showLoading,hideLoading} from '../api/await'
export default {
  props: {
    searchValueUser: String
  },
  data() {
    return {
      tableData: [],
      filterTableData: [],
      search: "",
      totalNum: 1000, //分页的码数
      timechoose: [], //页面上筛选时间的选择器
      pageSize: 8, //设置每页显示条目个数为10
      currentPage: 1, //设置当前页默认为1
      loading: true
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    // showTable计算属性通过slice方法计算表格当前应显示的数据
    showTable() {
      return this.tableData.slice(
        (this.currentChange - 1) * this.pagesize, //开始位置
        this.currentPage * this.pagesize //结束位置
      );
    }
  },
  created() {
    this.screenHeight = window.screen.availHeight - 149 + "px";
    // 向服务端请求数据
  },
  mounted() {
    // if (this.userInfo.id) {
    //console.log("发送请求", this.$store.state);
    this.getRequest(`/api/user/ordinaryAllUser/1`).then(res => {
      if (res.data.code == 0) this.loading = false;
      if (res.data.msg) {
        this.tableData = res.data.msg;
        this.filterTableData = res.data.msg;
        this.$set(this, "totalNum", this.tableData.length);
      }
    });
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handelDelete(id, index) {
      //向服务端发送删除文档的操作
      this.tableData.splice(index, 1);
      this.filterTableData.splice(index, 1);
      // 向服务端发送删除用户的请求
      this.deleteRequest("/api/user/deleteUser", {
        _id: id,
        user_limit: this.userInfo.user_limit,
        users:this.userInfo.id
      }).then(res => {
        this.$message(res.data.msg);
      });
      this.totalNum--;
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val; //动态改变
    },
    handleCurrentChange(val) {
      this.currentPage = val; //动态改变
    }
  },
  watch: {
    searchValueUser(newVlu, oldVlu) {
      this.tableData = this.filterTableData.filter(item => {
        return item.user_name.indexOf(newVlu) != -1;
      });
    }
  }
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  /* color: #409EFF; */
}
.el-icon-arrow-down {
  font-size: 12px;
}

.paging {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: auto;
  position: relative;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

.nonerouter {
  text-decoration: none;
  color: inherit;
}
.deleteJob {
  margin: 0 !important ;
}
</style>
<style>
.boxstyle .el-table .cell {
  text-align: center !important;
}

.boxstyle .el-table th > .cell {
  text-align: center !important;
}
.el-form--inline .el-form-item__content {
  color: #4a4a4a;
}
.test1 .el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
}

.test1 .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #fff;

  -webkit-border-radius: 2em;

  -moz-border-radius: 2em;

  border-radius: 2em;
}

.test1 .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ccc;

  -webkit-border-radius: 2em;

  -moz-border-radius: 2em;

  border-radius: 2em;
}
</style>

<style scoped>
.wholebody {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  overflow: auto;
  border: none;
}

.scrollbar {
  width: 100%;
  margin: 0 auto;
  background: white;
}

.wholebody-1::-webkit-scrollbar {
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.wholebody-1::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.wholebody-1::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.text-wrapper {
  white-space: pre-wrap;
}
</style>