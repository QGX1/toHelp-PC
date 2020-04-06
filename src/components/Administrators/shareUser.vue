<template>
  <div class="wholebody wholebody-1" :style="{height:screenHeight}">
    <div class="scrollbar">
      <div style="width: 95%;margin: 0 auto; overflow: auto;" class="infinite-list-wrapper">
        <el-timeline
          style="margin-top: 1rem;margin-left: -2rem;"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <el-timeline-item
            v-for="(item,index) in tableData"
            :key="index"
            :timestamp="item.date+'--分享者：'+item.users.user_name"
            placement="top"
          >
            <el-card>
              <p>{{item.dynamic_text}}</p>
              <!-- 显示图片内容 -->
              <div v-if="item.dynamic_imgs.length>0">
                <div class="demo-image__preview demo-image__lazy">
                  <el-image
                    v-for="(imgItem,index) in item.dynamic_imgs"
                    :key="index"
                    style="width: 100px; height: 100px;margin-left:0.5rem"
                    :src="'http://39.101.193.187:8080/pictures/'+imgItem"
                    :preview-src-list="['http://39.101.193.187:8080/pictures/'+imgItem]"
                    lazy
                  ></el-image>
                </div>
              </div>
              <!-- 显示删除按钮 -->
              <div style="height: 2rem;border-top: 0.02rem solid #4c84ff;padding-top: 0.5rem;">
                <el-button type="danger" size="mini" plain @click.stop="deleteDynamic(item._id,index)">内容敏感-删除</el-button>
              </div>
            </el-card>
          </el-timeline-item>
          <p v-if="loading" style="text-align: center;">加载中...</p>
          <p v-if="noMore" style="text-align: center;">没有更多了</p>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "Vuex";
import Vue from "vue";
import { Loading } from "element-ui";
export default {
  props: {
    searchValueJob: String
  },
  data() {
    return {
      tableData: [],
      filterTableData: [],
      search: "",
      totalNum: 0, //分页的码数
      timechoose: [], //页面上筛选时间的选择器
      // pageSize: 8, //设置每页显示条目个数为10
      // currentPage: 1, //设置当前页默认为1
      preNum: 0,
      nextNum: 1,
      loading: false
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
    },
    noMore() {
      return this.totalNum <= this.tableData.length;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  created() {
    this.screenHeight = window.screen.availHeight - 149 + "px";
    // 向服务端请求数据
  },
  mounted() {
    // if (this.userInfo.id) {
    //console.log("发送请求", this.$store.state);
    this.getData();
  },
  methods: {
    getData() {
      this.getRequest("/api/dynamic/getDynamic", {
        nextNum: this.nextNum,
        preNum: this.preNum,
        _id:
          this.tableData.length > 0
            ? this.tableData[this.tableData.length - 1]._id
            : ""
      }).then(res => {
        if (res.data.code == 0 && res.data.msg) {
          this.tableData = this.tableData.concat(res.data.msg);
          this.filterTableData = this.filterTableData.concat(res.data.msg);
          this.$set(this, "totalNum", res.data.count);
        }
      });
    },
    // 下拉加载更多
    load() {
      this.loading = true;
      if (this.totalNum > this.tableData.length) {
        this.preNum = this.nextNum;
        this.nextNum++;
        this.getData();
        this.loading = false;
      }
    },
    // 删除动态
    deleteDynamic(id, index) {
      //向服务端发送删除文档的操作
      console.log(222,id)
      this.tableData.splice(index, 1);
      this.filterTableData.splice(index, 1);
      // 向服务端发送删除用户的请求
      this.deleteRequest("/api/dynamic/adminstDeleteDynamic", { dynamic_id: id,user_id:this.userInfo.id }).then(res => {
        this.$message(res.data.msg);
      });
      this.totalNum--;
    }
  },
  watch: {
    searchValueJob(newVlu, oldVlu) {
      this.tableData = this.filterTableData.filter(item => {
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
  border-radius: 1%;
  margin-bottom: 4rem;
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