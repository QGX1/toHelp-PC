<template>
  <div class="wholebody wholebody-1" :style="{height:screenHeight}">
    <div class="scrollbar">
      <div style="width: 95%;margin: 0 auto; overflow: auto;" class="test1">
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%;height=90%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="岗位名称">
                  <span>{{ props.row.job_post }}</span>
                </el-form-item>
                <el-form-item label="薪资">
                  <span>{{ props.row.job_salary }}</span>
                </el-form-item>
                <el-form-item label="公司位置">
                  <span>{{ props.row.job_site }}</span>
                </el-form-item>
                <el-form-item label="工作经验要求">
                  <span>{{ props.row.job_ask_for }}</span>
                </el-form-item>
                <el-form-item label="学历">
                  <span>{{ props.row.job_educat }}</span>
                </el-form-item>
                <el-form-item label="岗位描述">
                  <!-- <div v-for="(item,index) in props.row.job_descript" :key="index"> -->
                  <span class="text-wrapper">{{ props.row.job_descript }}</span>
                  <!-- </div> -->
                </el-form-item>
                <el-form-item label="技能描述">
                  <!-- <div v-for="(item,index) in props.row.job_skill" :key="index"> -->
                  <span class="text-wrapper">{{ props.row.job_skill }}</span>
                  <!-- </div> -->
                </el-form-item>
                <el-form-item label="是否过期">
                  <span>{{ props.row.job_timeout }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="date" column-key="date" width="100px"></el-table-column>
          <el-table-column label="岗位" prop="job_post"></el-table-column>
          <el-table-column label="薪资" prop="job_salary"></el-table-column>
          <el-table-column
            label="过期"
            prop="job_timeout"
            column-key="job_timeout"
            :filters="[{text: '已过期', value: '已过期'}, {text: '未过期', value: '未过期'}]"
            :filter-method="filterHandler"
          ></el-table-column>
          <el-table-column label="工作经验要求" align="center" prop="job_ask_for"></el-table-column>
          <el-table-column label="是否审核" align="center" prop="job_examine"></el-table-column>
          <el-table-column align="right" min-width="120%" label="操作">s
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                v-bind:parentmsg="scope.row"
                v-if="scope.row.job_timeout == '未过期'"
              >编辑</el-button>
              <el-popconfirm title="确定将该岗位标记过期吗？" @onConfirm="handleJobTime(scope.$index)">
                <el-button
                  size="mini"
                  type="warning"
                  v-if="scope.row.job_timeout == '未过期'"
                  slot="reference"
                >过期</el-button>
              </el-popconfirm>
              <el-button size="mini" type="info" plain v-if="scope.row.job_timeout == '已过期'">过期</el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                class="deleteJob"
                @click="handelDelete(scope.row._id,scope.$index)"
              >删除</el-button>
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
    searchValueJob: String
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
    console.log("发送请求", this.$store.state);
    setTimeout(() => {
      this.getRequest(`/api/job/${this.userInfo.id}`).then(res => {
        if (res.data.code == 0) this.loading = false;
        console.log(res);
        Vue.set(this,'totalNum',parseInt(res.data.total));
        if (res.data.msg) {
          this.tableData = res.data.msg;
          this.filterTableData = res.data.msg;
        }
      });
    });

    // }

    //将页面数据中的date时间拿出来，赋值给timechoose，作为筛选条件。
    for (var i = 0; i < this.tableData.length; i++) {
      var newitem = {
        text: this.tableData[i].date,
        value: this.tableData[i].date
      };
      this.timechoose.push(newitem);
      newitem = {};
    }
    let newArr = [];
    let obj = {};
    let newTime = this.timechoose.slice(0);
    //利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
    newArr = newTime.reduce(function(item, next) {
      obj[next.value] ? "" : (obj[next.value] = true && item.push(next));
      return item;
    }, []);
    this.timechoose = newArr;
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push({ path: "/editRecruitment", query: { row } });
    },
    handleJobTime(index) {
      // console.log(index);
      // console.log("根据招聘信息的id，操作数据库修改对应的过期字段");
      Vue.set(this.tableData[index], "job_timeout", "已过期");
      // 向服务端发送修改数据的请求
      this.putRequest("/api/job/putJob", this.tableData[index]);
    },
    onSearch() {
      console.log("搜索");
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handelDelete(id, index) {
      console.log(index);
      //向服务端发送删除文档的操作
      this.tableData.splice(index, 1);
      this.deleteRequest("/api/job/deleteJob", { _id: id }).then(res => {
        this.$message(res.data.msg);
      });
      this.totalNum--;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val; //动态改变
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val; //动态改变
    }
  },
  watch: {
    searchValueJob(newVlu, oldVlu) {
      this.tableData = this.filterTableData.filter(item => {
        // console.log(333,item)
        return item.job_post.indexOf(newVlu) != -1;
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
.test1::-webkit-scrollbar {
  width: 8px;
}

.test1::-webkit-scrollbar-track {
  background-color: #fff;

  -webkit-border-radius: 2em;

  -moz-border-radius: 2em;

  border-radius: 2em;
}

.test1::-webkit-scrollbar-thumb {
  background-color: #ccc;

  -webkit-border-radius: 2em;

  -moz-border-radius: 2em;

  border-radius: 2em;
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
  margin: 2rem;
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