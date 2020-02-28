import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import PublishRec from "@/view/publishRecruitment.vue"
import ManagePublishRecruitment from "@/view/managePublishRecruitment.vue"
import Changeself from "@/view/changeself.vue"
import Changepsw from "@/view/changepsw.vue"
import Login from "@/view/login.vue"
import store from "../store/index";
Vue.use(Router)

const router=new Router({
  mode: "history",
  base: process.env.BASE_URL,//不写的话meta属性不生效
  routes: [
    {
      path:'/',
      name:'Login',
      component:Login,
      meta:{
        showMenu:false
      }
    },
    {
      path:'/login',
      name:'Login',
      component:()=>import('@/view/login'),
      meta:{
        showMenu:false
      }
    },
    {
      path:'/home',
      name:'Home',
      component:home,
      meta:{
        showMenu:true
      }
    },
    {
      path:'/publishRec',
      name:'publishRec',
      component:PublishRec,
      meta:{
        showMenu:true
      }
    },
    {
      path:'/editRecruitment',
      name:'EditRecruitment',
      component:()=>import('@/view/editRecruitment'),
      meta:{
        showMenu:true
      }
    },
    {
      path:'/managePublishRecruitment',
      name:'managePublishRecruitment',
      component:ManagePublishRecruitment,
      meta:{
        showMenu:true
      }
    },
    {
      path:'/changeself',
      name:'changeself',
      component:Changeself,
      meta:{
        showMenu:true
      }
    },
    {
      path:'/changepsw',
      name:'changepsw',
      component:Changepsw,
      meta:{
        showMenu:true
      }
    },
    {
      path:'/addperson',
      name:'AddPerson',
      component:()=>import('@/view/addPerson'),
      meta:{
        showMenu:true
      }
    },
    {
      path:'/staffmanage',
      name:'Staffmanage',
      component:()=>import('@/view/staffmanage'),
      meta:{
        showMenu:true
      }
    },
    {
      path:'/updataStaffInfor',
      name:'UpdataStaffInfor',
      component:()=>import('@/view/updataStaffInfor'),
      meta:{
        showMenu:true
      }
    },
    {
      path:'/checkWork',
      name:'CheckWork',
      redirect:'/checkWork/attendancesta',
      component:()=>import('@/view/checkWork'),
      meta:{
        showMenu:true
      },
      children:[
        //   {
        //   path:'/checkWork/attendancealone',
        //   name:'Attendancealone',
        //   component:()=>import('@/view/attendancealone'),
        //   meta:{
        //     showMenu:true
        //   }
        // },
        {
          path:'/checkWork/attendancesta',
          name:'Attendancesta',
          component:()=>import('@/view/attendancesta'),
          meta:{
            showMenu:true
          }
        },
    ],
  },
  {
    path:'/attendancealone',
    name:'Attendancealone',
    component:()=>import('@/view/attendancealone'),
    meta:{
      showMenu:true
    }
  },
  {
    path:'/updataAttendance',
    name:'UpdataAttendance',
    component:()=>import('@/view/updataAttendance'),
    meta:{
      showMenu:true
    }
  },
  {
    path:'/news',
    name:'News',
    component:()=>import('@/view/news'),
    meta:{
      showMenu:true
    }
  },
    
  ]
})
// 判断是否存在本地存储中token，没有的话就重新登录，有的话直接获取token
// 解决页面刷新本地缓存数据丢失的问题
router.beforeEach((to, from, next) => {
  //路由中设置的needLogin字段就在to当中
  //在sessoinStorage中获取token
  // console.log('token',token)
  //判断要去的路由有没有requiresAuth
  if (to.meta.showMenu) {
    console.log("在内容界面");
    let token = window.sessionStorage.getItem("token");
    // console.log();
    if (token) {
      // store.dispatch('getUser')
      next();
    } else {
     // next({path:'/login'})
      // 没有登录,重定向到登录页面
      // store.dispatch("logOut");
      next({
        path: "/login",
        query: {
          redirect: to.fullPath//登录后跳回到当前页面
        }
      });
    }
  } else {
    console.log('在登录注册界面');
    next();
   }
})
export default router;