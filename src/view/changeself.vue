<template>
  <div class="rightContent">
    
    <div class="changeSelf">
      <div class="block" style="width: 50%;margin: 1rem auto">
        <UpdataAvatar :user_avatar="userInfo.user_avatar"
        @updataAvatar='updataAvatar'></UpdataAvatar>
        <mu-container>
          <mu-form
            ref="form"
            :model="userInfo"
            class="mu-demo-form"
            label-position="left"
            label-width="100"
          >
            <mu-form-item label="用户名" prop="user_name" :rules="userInfoRules.userNameRules">
              <mu-text-field v-model="userInfo.user_name" prop="user_name"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="邮箱" prop="user_email" :rules="userInfoRules.userEmailRules">
              <mu-text-field v-model="userInfo.user_email" prop="user_email"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="手机号码" prop="user_phone" :rules="userInfoRules.userPhoneRules">
              <mu-text-field v-model="userInfo.user_phone" prop="user_phone"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="公司名称" prop="user_company" :rules="userInfoRules.userCompanyRules">
              <mu-text-field v-model="userInfo.user_company" prop="user_company"></mu-text-field>
            </mu-form-item>
            <mu-form-item
              label="本人职位"
              prop="user_company_position"
              :rules="userInfoRules.useruserCompanyPositionRules"
            >
              <mu-text-field v-model="userInfo.user_company_position" prop="user_company_position"></mu-text-field>
            </mu-form-item>
            <mu-form-item>
              <mu-button color="primary" @click="submit">提交</mu-button>
              <mu-button @click="clear">重置</mu-button>
            </mu-form-item>
          </mu-form>
        </mu-container>
      </div>
    </div>
  </div>
</template>

<script>
import UpdataAvatar from '../components/updataAvatar';
import {mapState,mapActions} from 'Vuex';
import Vue from "vue";
export default {
  components:{
    UpdataAvatar,
  },

  data() {
    return {
      newUserInfo:{},
      reg: new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      ), //邮箱正则表达式
      userInfoRules: {
        userNameRules: [
          { validate: val => !!val, message: "必须填写用户名" },
          { validate: val => val.length >= 2, message: "用户名长度大于2" }
        ],
        userEmailRules: [
          { validate: val => !!val, message: "必须填写邮箱" },
          { validate: val => !!this.reg.test(val), message: "邮箱输入错误" }
        ],
        userPhoneRules: [
          { validate: val => !!val, message: "必须填写手机号码" },
          {
            validate: val => {
              let phone = /^1(3|4|5|6|7|8|9)\d{9}$/;
              return !!phone.test(val);
            },
            message: "手机号码填写错误"
          }
        ],
        userCompanyRules: [
          { validate: val => !!val, message: "公司名称必须填写" },
          { validate: val => val.length >= 2, message: "公司名称长度大于2" }
        ],
        useruserCompanyPositionRules: [
          { validate: val => !!val, message: "必须填写本人职位" },
          { validate: val => val.length >= 2, message: "职位长度大于2" }
        ]
      },

      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  mounted(){},
  computed:{
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['getUser']),
  // 修改头像的值
    updataAvatar(value){
      this.userInfo.user_avatar=value.imgUrl2;
      this.$set(this.userInfo,'user_avatar',value.imgUrl2)
    },
    submit() {
      // console.log("提交");
      this.$refs.form.validate().then(result => {
        if (result == true) {
          // 向服务端发送修改用户信息请求
          this.putRequest('/api/user/updateUserInfor',this.userInfo).then(res=>{
            this.$message(res.data.msg)
          })
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.userInfo = {
        user_name: "",
        user_email: "",
        user_phone: "",
        user_company_position: "",
        user_company: "",
        user_avatar:
          "http://img4.imgtn.bdimg.com/it/u=1694681277,1453280371&fm=26&gp=0.jpg"
      };
      console.log(this.userInfo);
    }
  }
};
</script>

<style scoped>
.rightContent {
  flex: 15;
  overflow: auto;
  overflow-x: hidden;
  margin: 0px;
  float: center;
}
.changeSelf {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 15px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 2rem;
  border-radius: 1%;
  background: #fff;
}

</style>