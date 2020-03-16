<template>
    <div id="administJob">
        <ManagementJob :searchValueJob="searchValueJob"></ManagementJob>
    </div>
</template>
<script>
import ManagementJob from "../components/Administrators/managementjob.vue";

export default {
  name: "adminstJob",
  props: {
    searchValue: String
  },
  components: {
    ManagementJob
  },
  data() {
    return {
      searchValueJob: ""
    };
  },
  watch: {
    searchValue(newVlu, oldVlu) {
      this.searchValueJob = newVlu;
    }
  }
};
</script>

<style scoped>
#adminstJob {
  background: #ffffff;
  width: 95%;
  margin: 2rem auto;
  border-radius: 1%;
}
</style>

