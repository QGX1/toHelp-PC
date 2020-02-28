<template>
  <div class="wholebody">
    <!-- <chart></chart> -->
    <!-- <i class="iconfont icon-qianjin"></i> -->
    <!-- <circularchart></circularchart> -->
    
  </div>
</template>

<script>
import chart from '../components/linechart'
import circularchart from '../components/CircularChart'
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  components:{
    chart,
    circularchart
  }
  
};
</script>


<style scoped>


.wholebody {
  display: flex;
  width: 100%;
  
}


</style>