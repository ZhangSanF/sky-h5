/* eslint-disable */
/**
 * 本地储存操作
 * Luffy 2018-7-27
 */
const removeSession = (key) => {
    localStorage.removeItem(key)
}
const getSession = (key) => {
    return localStorage.getItem(key)
}
const setSession = (key, val) => {
  localStorage.setItem(key, val)
}

const setUserObjSession = (key,val)=>{
  localStorage.setItem(key,JSON.stringify(val));
}

const getUserObjSession = (key)=>{
  return JSON.parse(localStorage.getItem(key));
}

const updataMoney = (val)=>{
  let valObj = JSON.parse(localStorage.getItem('user'));
  valObj.money = val;
  localStorage.setItem('user',JSON.stringify(valObj));
}

const isLogin = ()=>{
  if(localStorage.getItem('user'))
    return true;
  else
    return false
}




export default {
    removeSession,
    getSession,
    setSession,
    setUserObjSession,
    getUserObjSession,
    updataMoney,
    isLogin
}
