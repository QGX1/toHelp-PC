<template>
  <div class="headboay">
    <div style="width:100%;">
      <div class="label" @click="shownavigation">
        <i class="iconfont icon-houtui" style="color:#bdbdbd;font-size:1.5rem" v-show="isGo"></i>
        <i class="iconfont icon-qianjin" style="color:#bdbdbd;font-size:1.5rem" v-show="!isGo"></i>
        <!-- <img src="../assets/more.png" style="width:41px;height:41px;margin:10px 10px 10px 15px;" /> -->
      </div>
      <div class="headsource">
        <img src="../assets/source.png" style="width:21px;height:21px;margin:20px 20px 20px 30px;">
      </div>
      <div class="headsourceinput">
        <mu-col>
          <mu-auto-complete v-model="seachValue" placeholder='输入当前要查找的内容'></mu-auto-complete>
        </mu-col>
      </div>
    </div>
    <div
      class="headsource"
      style="border-right: 0.01rem solid rgba(175, 179, 187, 0.63);border-left: 0.01rem solid rgba(175, 179, 187, 0.63);"
    >
      <el-badge :value="12" class="item" type="primary">
        <img
          src="../assets/notice.png"
          style="width:23px;height:23px;margin:10px 20px 20px 25px;margin-left:25px;"
        >
      </el-badge>
    </div>
    <div class="myself">
      <div class="block" style="margin:5px 12px 0 15px;">
        <el-avatar shape="square" :size="39" 
        :src="userInfo.user_avatar?'http://192.168.43.177:8081/'+userInfo.user_avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        ></el-avatar>
      </div>
    </div>
    <div class="myself">
      <strong>
        <p>{{userInfo.user_name}}</p>
      </strong>
    </div>
    <div class="myself">
      <!-- <el-popover
        placement="bottom"
        title="标题"
        width="200"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      > -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-button
              size='mini'
              slot="reference"
              style="border: none;background-color: transparent;outline: none;padding:0px;"
            >
              <img src="../assets/down.png" style="width:12px;height:12px;margin:25px 20px 20px 10px;">
            </el-button>
          </span>
          <el-dropdown-menu slot="dropdown"  >
            <el-dropdown-item @click.native="logOut2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      <!-- </el-popover> -->
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations,mapState} from 'Vuex'
import Vue from "vue";
export default {
  name: "headerlabel",
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      isCollapse: true,
      seachValue: "",
      isGo: true
    };
  },
  computed:{
    ...mapState(['userInfo'])
  },
  mounted(){
    console.log(222,this.userInfo)
    // 获取当前路径
    console.log(333,this.$route.path)
  },
  methods: {
    ...mapActions(['logOut']),
    shownavigation() {
      this.isGo = !this.isGo;
      this.$store.state.isCollapse = !this.$store.state.isCollapse;
    },
    logOut2(){
      console.log('退出登录');
      this.$router.replace({name:'Login'});
      this.logOut();
    }
  },
  watch: {
    seachValue(newVlu,oldVlu){
      //console.log('searchValue',newVlu);
      //将值传递给父组建
      this.$emit('handelSearchValue',newVlu);
    },
    '$route.path':function(newVlu,oldVlu){
      //console.log('lable',newVlu);
      
      //this.$data.seachValue=='';
      Vue.set(this,'seachValue','');
      // console.log(this)
      // console.log(this.seachValue)
    },
  },
};
</script>

<style scoped>
.headboay {
  width: 100%;
  height: 4rem;
  background: white;
  display: flex;
  justify-content: space-between;
}

.label {
  width: 2rem;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-right: 0.01rem solid #f5f6fa;
  text-align: center;
}

.headsource {
  width: 73px;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.headsourceinput {
  width: 50%;
  height: 100%;
  margin-top: 17px;
}

.col {
  position: static;
}

.item {
  margin-top: 0.8rem;
  margin-right: 1.5rem;
}

.myself {
  /* width: 10rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

p {
  /* width:100px; */
  word-break: keep-all;
  white-space: nowrap;
}
</style>