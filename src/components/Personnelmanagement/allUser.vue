<template>
    <div id="allUser">
        <div class="content" @click="handelStaff(user)">
            <!-- 头像 -->
            <el-avatar shape="square" size="large" 
                :src="user.user_avatar?'http://39.101.193.187:8080/pictures/'+user.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
                style="margin-left: 0.2rem;"></el-avatar>
            <!-- 用户名 -->
            <span style="margin-left: 0.5rem;">{{user.user_name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        user:Object
    },
    methods:{
        handelStaff(value){
            console.log('value',value)
            this.$emit('handelAddStaff',value)
        },
    }
}
</script>
<style scoped>
    #allUser{
        border-bottom: 0.01rem solid;
        padding-top: 0.2rem;
        height: 3rem
    }
    #allUser:hover{
        background: #eeeeee
    }
    .content{
        display: flex;
        /* justify-content: center;水平居中 */
        align-items: center;
        /* 垂直居中 */
    }
</style>


