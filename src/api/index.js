import Axios from 'axios';
import Qs from 'qs'
import {Message} from 'element-ui'

// 封装路由拦截器
export let instance = Axios.create({
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    'Authorization': window.sessionStorage.getItem('token')//指令
  },
  baseURL: "",//白名单
  timeout:6000
});
// 请求拦截器
instance.interceptors.request.use(function(config) {
  return config;
}, err => {
  console.log(config,"请求超时")
  Message.error({ message: '请求超时!' });
})
//响应拦截器
instance.interceptors.response.use(function(data) {
  if (data.status && data.status == 200 && data.data.status == 500) {
    Message.error({ message: data.data.msg });
    return;
  }
  return data;
}, err => {
  if (err.response.status == 504 || err.response.status == 404) {
    Message.error({ message: '无法找到请求资源，刷新试试' });
  } else if (err.response.status == 403) {
    Message.error({ message: '权限不足,请联系管理员!' });
  } else if (err.response.status == 401) {
    Message.error({ message: err.response.data.msg });
  } else {
    if (err.response.data.msg) {
      Message.error({ message: err.response.data.msg });
    } else {
      Message.error({ message: '未知错误!' });
    }
  }
})

// 封装ajax接口

export const getRequest = (url) => {
  //console.log("手机验证码");
  //console.log()
  return instance({
    method: 'get',
    url: url
  });
}
export const postRequest = (url, data) => {
  return instance({
    method: 'POST',
    url: url,
    data: Qs.stringify(data)
  });
}
// 更新数据
export const putRequest = (url, data) => {
  return instance({
    method: 'PUT',
    url: url,
    data: Qs.stringify(data)
  });
}
//删除数据
export const deleteRequest = (url, data) => {
  return instance({
    method: 'DELETE',
    url: url,
    data: Qs.stringify(data)
  });
}