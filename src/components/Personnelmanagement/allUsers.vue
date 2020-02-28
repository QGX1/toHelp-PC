<template>
    <div id="allUser">
        <div class="content" @click="handelStaff({user,indexValue})">
            <!-- 头像 -->
            <el-avatar
                shape="square"
                size="large"
                :src="user.user_avatar?'http://192.168.43.177:8081/'+user.user_avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
                style="margin-left: 0.2rem;"
            ></el-avatar>
            <span class="count" v-show="infor_count">{{infor_count}}</span>
            <!-- 用户名 -->
            <div style="margin-left:0.3rem">
                <span style="display: block;">{{user.user_name}}</span>
                <span style="font-size:0.4rem;color:rgba(0,0,0,.54);">{{user.user_email}}</span>
            </div>
            <!-- 用户邮箱 -->
            <!-- <span style="display:inline-block;">{{user.user_email}}</span> -->
        </div>
    </div>
</template>
<script>
export default {
  props: {
    user: Object,
    infor_count:Number,
    indexValue:Number,
  },
  data() {
    return {

    };
  },
  methods: {
    handelStaff(userData) {
      console.log("value", this.indexValue);
      this.$emit("handelAddStaff", userData);
    }
  },
  watch:{
    infor_count(newVlu,oldVlu){
      console.log('数据监听count',newVlu);
    }
  }
};
</script>
<style scoped>
#allUser {
  border-bottom: 0.01rem solid;
  padding-top: 0.2rem;
  height: 4rem;
}
#allUser:hover {
  background: #eeeeee;
}
.content {
  display: flex;
  /* justify-content: center;水平居中 */
  align-items: center;
  margin: 0.5rem auto;
  /* 垂直居中 */
}
.count {
  background-color: #ff0a0a;
  border-radius: 50%;
  height: 1rem;
  width: 1rem;
  text-align: center;
  color: #fff;
  position: relative;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin-top: -2.3rem;
  margin-left: -0.5rem;
  align-items: center;
  justify-content: center;
}
</style>


