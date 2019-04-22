/* eslint-disable */
/**
 * axios 访问后台封装，拦截处理等
 * Luffy 2018-7-27
 */
import CONST from '@/js/public/const';
import storages from '@/js/public/storages';
import router from '../../router';
import axios from 'axios';
import store from '@/js/store';
import {process} from "./port";
// 路由拦截器
router.beforeEach((to, from, next) => {
    next();
})

axios.defaults.timeout = store.state.sysFreqParams.httpTimeout;
axios.defaults.responseType = "json";
axios.defaults.withCredentials = true;// 是否允许带cookie这些
axios.defaults.headers = {
    "Tech": "VUE", //说明从Vue过去的请求,
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json;charset=UTF-8"
}

let removeUser = function () {
  storages.removeSession('user');
  store.state.user = '';
}

// 添加请求拦截器\
axios.interceptors.request.use(function (config) {
  document.title='冠捷体育 亚洲最佳线上体育，超高赔率的老牌体育';
    return config;
}, function (error) {
    return Promise.reject(error);
});

//返回状态判断(响应拦截器)
axios.interceptors.response.use(
    res => {

        //对响应数据处理
      if(res.config.responseType = "html")
        return res.data;
        if (res.status == 200 || res.data && !res.data.success) {
            return res.data;
        }
    },
    error => {
      if (!error.response) {
        store.commit('showLoading',false);
        store.commit('updateDialog', {isShow: true, showInfo: false, content: "请检查网络"})
      }else{
        return Promise.reject(error.response)
      }

    }

)

const Axios = (method, url, data, success, showload = true) => {
    data.merchant=store.state.user ? store.state.user.username ? store.state.user.username.substring(0,3):'':'';
    data.agent=store.state.user ? store.state.user.username ? store.state.user.username.substring(3,7):'':'';
    data = filterParams(data);
    let params = null;
    if (method === 'get') {
        params = data;
        data = null;
    } else {
          data = JSON.stringify(data);
    }
    axios({
        method,
        url,
        baseURL: CONST.AGENCY,
        data,
        params,
        withCredentials: true,
        // onUploadProgress: function (progressEvent) {
        //     // 对原生进度事件的处理
        //   },
        transformRequest: [function (data) {
            if (showload) {
                store.commit('showLoading',true);
            }
            return data;

        }],
        transformResponse: [function (data) {
          if (showload) {
            store.commit('showLoading',false);
          }
          return data;

        }],
    }).then(function (response) {
        store.state.systemMaintanceCode = '';
        success(response);
    }).catch(function (error) {
      if(error==undefined){
        return;
      }
      if(error.status===502){ //服务器不可用
        store.commit('showLoading',false);
      }else if(error.status===603){ //域名不存在或者网络中断
        removeUser();
      }else if(error.status===605){ //禁止访问
        removeUser();
        process.setStopVis();
      }else if(error.status===607){
        removeUser();
        process.setSystemMaintance(error);
      } else if(error.status===702){
        //模版已改变
        location.href=error.data.result.url;
        return;
      }else {

        if(error.status === 600 || error.status === 606){
          store.state.is_showModal = false;
        }
        store.commit('updateDialog', {isShow: true, showInfo: false, content: getErrMess(error.status)})
        }
    });
}

const filterParams = (params) => { //过滤处理参数
    for (let index in params) {
        if (params[index] === null)
            delete params[index];
        else {
            switch (typeof (params[index])) {
                case 'string':
                    params[index] = params[index].trim();
                    break;
                case 'object':
                    params[index] = filterParams(params[index]);
                    break;
                case 'array':
                    params[index] = filterParams(params[index]);
                    break;
            }
        }
    }
    return params;

}


const getErrMess = (status) => {
    switch (status) {
        case 600:
            removeUser();
            return '会话过期, 请重新登录';
        case 603:
            return '域名不存在';
        case 605:
            return '所在地区禁止访问';
        case 606:
            removeUser();
            return '异地登录, 您已被踢出';
        case 607:
            removeUser();
            return '网站维护中';
        case 400:
            return '错误的请求';
        case 407:
            return '资源未授权';
        case 403:
            return '所在地区禁止访问';
        case 404:
            return '资源不存在';
        case 500:
            return '服务出错了';
        case 502:
            return '服务器暂时不可用';
        case 503:
            return '服务忙';
        case 504:
            return '请求超时';
        case 701: // 无效的授权
            return '登录已过期';
        case 702:
            return '玩家中心模板已变更，请退出后，重新访问';
        case 703:
            return '账号被冻结'
        case 704:
            return '账号已停用'
        case 705:
            return '账号审核失败'
        case 706:
            return '账号被踢出'
        case 707:
            return '非法的授权'
        case 708:
            return '账号密码错误'
        case 709:
            return '登录超时请重新登录'

         return '请检查网络'

    }
}

export default {
    Axios
}
