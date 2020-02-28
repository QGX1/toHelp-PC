<template>
  <div id="app" :style="{height:screenHeight}" :class="$route.meta.showMenu?'':'isshowMenu'">
    <navigation v-show="$route.meta.showMenu"></navigation>
    <div :class="[this.$store.state.isCollapse == true?'rightsizeclose':'rightsize']" 
    style="width:100%;" >
     <headerlabel v-show="$route.meta.showMenu" 
      @handelSearchValue='handelSearchValue'
     ></headerlabel>
     <router-view :searchValue='searchValue' v-if="isRouterAlive"/>
    </div>
  </div>
</template>

<script>
import navigation from '../src/components/NavigationMenu'
import headerlabel from '../src/components/HeaderLabel'
export default {
  name: 'App',
  data() {
    return {
      screenHeight: "",
      searchValue:'',
      isRouterAlive:true
    };
  },
  provide(){
    // 强制页面刷新
    return {
      reload:this.reload
    }
  },
  components:{
      navigation,
      headerlabel
  },
  created() {
    // let doc=document.documentElement.clientHeight
    // console.log('doc',doc)
    // this.screenHeight =document.documentElement.clientHeight+ "px";
    // console.log(this.screenHeight,window.screen)
    // console.log(555,this.$route.meta)
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  methods: {
    handelSearchValue(value){
      this.searchValue=value;
      console.log('app',this.searchValue)
    },
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive=true;
      })
    }
  },
  mounted(){
    // console.log('app', this.$route.path);
    // this.routePath=this.$route.path;
  },
  watch: {
    
  },
};
</script>

<style>
#app {
  width: 100%;
  display: flex;
  background: RGB(245,246,250);
}

.rightsize{
  width: 81%;
}

.rightsizeclose{
  width: 96%;
}
.isshowMenu{
  height: 100%;
}
body{
  overflow: hidden;
}
</style>
