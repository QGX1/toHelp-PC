<template>
  <div class="rightContent">
    <div class="boxstyle">
      <h2 class="h1style">编辑招聘信息</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position='right'
        style="width: 70%;margin: 0 auto;"
      >
        <el-form-item label="岗位名称" prop="job_post">
          <el-input v-model="ruleForm.job_post" clearable placeholder="输入岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="地点" prop="job_site" style="width:24.5rem">
          <el-popover placement="bottom-start" v-model="visible">
            <!-- 地图 -->
            <div v-show="showmap" class="newdemo-ruleForm" style="width:380px;">
              <div style="display:flex; margin-top:5px;">
                <div class="mapfont" align="center">公司地址：</div>
                <input
                  v-model="address"
                  type="text"
                  class="el-input__inner"
                  style="width:40%;height:30px;margin-left:-15px;font-size:13px;"
                />
                <input v-model="coordinate" type="text" v-show="false" />

                <el-button
                  size="mini"
                  v-on:click="searchByStationName"
                  style="height:30px;margin:0 0 0 5px;width:55px;"
                  type="primary"
                >查询</el-button>
                <el-button
                  size="mini"
                  v-on:click="setAdress"
                  style="height:30px;margin:0 0 0 5px;width:55px;"
                  type="primary"
                >确认</el-button>
              </div>

              <div id="container" class="mapstyle"></div>
            </div>
            <!-- <el-button slot="reference" style="border:none;margin:0 0 0 0;padding: 0 0 0 0" > -->
              <el-input v-model="ruleForm.job_site" slot="reference" onfocus="this.blur()" placeholder="请查询地图，再确认位置"
              style="width:12.5rem"
              ></el-input>
              <!-- 点击 -->
            <!-- </el-button> -->
          </el-popover>
        </el-form-item>        
        <el-form-item label="工作经验" prop="job_ask_for" >
          <!-- <el-input v-model="ruleForm.job_ask_for" ></el-input> -->
          <el-select v-model="ruleForm.job_ask_for" placeholder="请选择工作经验">
            <el-option label="3以上" value="3以上"></el-option>
            <el-option label="1~3年" value="1~3年"></el-option>
            <el-option label="1年以下" value="1年以下"></el-option>
            <el-option label="无" value="无"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="薪资" prop="job_salary">
          <!-- <el-input v-model="ruleForm.job_salary"></el-input> -->
          <el-input placeholder="请输入内容" v-model="ruleForm.job_salary" style="width:12.5rem"></el-input>
        </el-form-item>
        <el-form-item label="岗位描述" prop="job_descript" >
            <!-- <el-input v-model="ruleForm.job_descript" clearable  style="width:12.5rem"></el-input> -->
          <el-input type="textarea"
            wrap='hard'
            :autosize="{ minRows: 2, maxRows: 3}"
            placeholder="岗位描述应该具备哪些技能"
            v-model="ruleForm.job_descript" style="width:12.5rem">
          </el-input>
        </el-form-item>
        <el-form-item label="学历" prop="job_educat" >
          <!-- <el-input v-model="ruleForm.job_educat"></el-input> -->
          <el-select v-model="ruleForm.job_educat" placeholder="请选择学历">
            <el-option label="本科以上" value="本科以上"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="大专" value="大专"></el-option>
            <el-option label="中专" value="中专"></el-option>
            <el-option label="无" value="无"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="职位描述" prop="job_skill" >
          <el-input type="textarea"
            wrap='hard'
            :autosize="{ minRows: 2, maxRows: 3}"
            placeholder="这个职位是做什么的"
            v-model="ruleForm.job_skill" style="width:12.5rem">
          </el-input>
        </el-form-item>
        <el-form-item label="校园勤工岗" style="margin-left:2rem">
          <el-switch v-model="ruleForm.job_nature"></el-switch>
        </el-form-item>
        <el-form-item style="width:80%;text-align:center">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button
            @click="resetForm('ruleForm')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
import { MP } from "../../map";
import {mapState} from 'Vuex'
export default {
  data() {
    return {
      ruleForm: {},
      visible: false,
      ak: "PIvUCvE1HdkGb6baKec54Ikp3EUNtgb9",
      address: "",
      coordinate: "",
      longitude: "",
      latitude: "",
      showmap: true,
      rules: {
        job_post: [
          { required: true, message: "请输入岗位名称", trigger: "change" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "change" }
        ],
        job_salary: [
          { required: true, message: "请输入薪资", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        job_site: [
          { required: true, message: "请输入工作地点", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 2 到 50 个字符", trigger: "change" }
        ],
        job_ask_for: [
          { required: true, message: "请输入要求工作经历", trigger: "blur" },
          // { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "change" }
        ],
        job_educat: [
          { required: true, message: "请输入要求学历", trigger: "blur" },
          // { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "change" }
        ],
        job_descript: [
          { required: true, message: "请输入岗位描述", trigger: "blur" },
          // { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "change" }
        ],
        job_skill: [
          { required: true, message: "请输入职位描述", trigger: "blur" },
          // { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "change" }
        ],
        job_nature:[
          {required:false,}
        ]
      }
    };
  },
  created(){
    // this.ruleForm.users=this.userInfo
    console.log(333,this.$route.query.row);
    this.ruleForm=this.$route.query.row;
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods: { 
    /**
     * 重置
     */
    resetForm(formName) {
      this.ruleForm.job_nature=false;
      this.$refs[formName].resetFields();
      // console.log(this.ruleForm)
    },
    // 创建地图
    createMap() {
      this.$nextTick(function() {
        var _this = this;
        MP(_this.ak).then(BMap => {
          //在此调用api
          var map = new BMap.Map("container");
          map.centerAndZoom("广州大学华软软件学院", 12);
          map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
        });
      });
    },
    searchByStationName() {
      var map = new BMap.Map("container");
      var localSearch = new BMap.LocalSearch(map);
      map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图

      var keyword = this.address;
      this.longitude = "";
      this.latitude = "";
      this.ruleForm.job_site = "";
      localSearch.setSearchCompleteCallback(searchResult => { 
        var poi = searchResult.getPoi(0);
        this.coordinate = poi.point.lng + "," + poi.point.lat;
        map.centerAndZoom(poi.point, 15);
        var sult = poi.point.lng;
        var marker = new BMap.Marker(
          new BMap.Point(poi.point.lng, poi.point.lat) // 创建标注，为要查询的地方对应的经纬度
        );
        map.addOverlay(marker);
        this.longitude = poi.point.lng;
        this.latitude = poi.point.lat;
        // this.ruleForm.Job_site = this.address
      });
      localSearch.search(keyword);
    },

    setAdress() {
      if (this.longitude == "" && this.latitude == "") {
        alert("没有查询到当前地址，请重新输入");
        return false;
      }
      this.ruleForm.job_site = this.address;

      this.visible = !this.visible;
      console.log(this.ruleForm.job_site);
    },
    //提交表单内容，
    submitForm(formName) {
     
      this.$refs[formName].validate(valid => {
        if (valid) {
        //表单上的各个输入框的内容：newdynamicValidateForm是职业描述的数组，dynamicValidateForm是岗位描述的数组
            // console.log("获取岗位名称：" + this.ruleForm.job_post);
            // this.ruleForm.longitude=this.longitude;
            // this.ruleForm.latitude=this.latitude;
            // this.ruleForm.users=this.userInfo.id;
            // console.log(this.userInfo);
          //  向服务器发送招聘信息请求
            console.log(this.ruleForm)
            this.putRequest('/api/job/putJob',this.ruleForm).then(res=>{
              this.$message(res.data.msg);
              // if(res.data.code==0){
              //   // 重置
              //   // this.resetForm('ruleForm');
              // }
            })
        } else {
          alert("检查内容格式是否正确，发布失败!")  
          return false;
        }
      });
      
    },

    // removeDomain(item) {
    //   var index = this.dynamicValidateForm.domains.indexOf(item);
    //   if (this.dynamicValidateForm.domains.length > 1) {
    //     this.dynamicValidateForm.domains.splice(index, 1);
    //   } else {
    //     alert("描述至少要有一个哟");
    //   }
    // }
  },

  mounted() {
    this.createMap();
  },
  watch: {
    longitude(newVlu,oldVle){
      //console.log("新数据",newVlu)
      this.ruleForm.longitude=newVlu;
    },
    latitude(newVlum,oldVle){
      this.ruleForm.latitude=newVlum;
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
}

.demo-ruleForm {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.newdemo-ruleForm {
  border: 1px solid #e6e6e6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.boxstyle {
  border: 1px solid #e6e6e6;
  margin: 2rem auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 90%;
  height: auto;
  background: #fff;
  border-radius: 1%;
}

.h1style {
  color: dimgray;
  text-align: center;
  border-bottom: 0.01rem solid #eee;
  letter-spacing: 0.5rem;
  line-height: 2.5rem;
}

.mapstyle {
  height: 350px;
  width: 380px;
}

.mapfont {
  height: 30px;
  font-size: 14px;
  color: #5c5d6d;
  margin: 0 15px 0 5px;
  margin-top: 0.3rem;
}
/* 换行 */
.text-wrapper {
  white-space: pre-wrap;
}
</style>