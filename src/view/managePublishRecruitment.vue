<template>
    <div id="managePublishRecruitment">
        <ManagementJob :searchValueJob='searchValueJob'></ManagementJob>
    </div>
</template>
<script>
import ManagementJob from '../components/RecruitmentManage/managementjob.vue'

export default {
    name:"managePublishRecruitment",
    props:{
        searchValue:String
    },
    components:{
        ManagementJob,
    },
    data(){
        return{
            searchValueJob:''
        }
    },
    watch: {
        searchValue(newVlu,oldVlu){
            this.searchValueJob=newVlu;
        }
    },
}
</script>

<style scoped>

</style>

