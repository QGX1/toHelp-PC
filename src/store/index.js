import Vue from 'vue'
import Vuex from 'vuex'
import {getRequest} from '../api/index.js';
import decode from 'jwt-decode';//解析token
Vue.use(Vuex)

//创建Vuex实例
// const store = new Vuex.Store({
//     // 全局变量
//     state:{
//         isCollapse:false,
//         userInfor:{}
//     },
//     mutations:{

//     }
// });
const state={
    // 需要维护的状态
    userInfo:{},//存储用户信息
    Token:'',//服务端返回的token
    isCollapse:false
}
const types={
    USERINFO:'USERINFO',//用户信息
    TOKEN:'TOKEN'
}
// 类似于vue的computed
const getters={
    userInfo:state=>state.userInfo,
    Token:state=>state.Token
};
// 修改全局变量state的值
const mutations={
    [types.USERINFO](state,userInfo){
        state.userInfo=userInfo;
    },
    [types.TOKEN](state,Token){
        state.Token=Token;
    }
};
// 通过mutaction来修改state的值
const actions={
    setUserInfo:({commit},userInfo)=>{
        commit(types.USERINFO,userInfo);
    },
    setToken:({commit},Token)=>{
        commit(types.TOKEN,Token);
        window.sessionStorage.setItem('token',Token)
    },
    getUser({commit}){
        return new Promise((resolve,reject)=>{
            // 想服务端发送获取用户信息的请求
            console.log('获取用户信息')
            let user_id=decode(window.sessionStorage.getItem('token')).id;//解析token
            console.log(user_id)
            getRequest(`/api/user/${user_id}`).then(res=>{
                console.log(res)
                if(res.data.code==0){
                    commit(types.USERINFO,res.data.msg);
                    commit(types.TOKEN,window.sessionStorage.getItem('token'))
                }
            }).catch((error)=>{
                reject(error)
            })
        })
    },
    logOut({commit}){
        return new Promise((resolve,reject)=>{
            commit(types.TOKEN,'');
            commit(types.USERINFO,null);
            window.sessionStorage.removeItem('token');
            resolve({code:0});
        })
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})   //导出store