/* eslint-disable */
/**
 * 错误提示字符验证等工具
 * Luffy 2018-7-27
 */
import Vue from 'vue'
import { LoadingPlugin, AlertModule } from 'vux'
Vue.use(LoadingPlugin)

const showMessege = (mess) => {
    AlertModule.show({
        title: '提示',
        content: `${mess}`,
        buttonText:'我知道了',
        onShow() {
            console.log('Module: I\'m showing')
        },
        onHide() {
            console.log('Module: I\'m hiding now')
        }
    })
}


const testAdmin = (admin) => {
    //用户名正则，4到16位（字母，数字，下划线，减号）
    let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    return uPattern.test(admin);
}
const testPassword = (password) => {
    //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    return pPattern.test(password);
}

/**
**时间戳转换成指定格式日期
* eg.
* dateFormat(11111111111111, 'Y年m月d日 H时i分')
* → "2322年02月06日 03时45分"
*/
const dateFormat = (timestamp, formats) =>{
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分
    // 5. m-d H:i
    formats = formats || 'Y-m-d';

    let zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    let myDate = timestamp? new Date(timestamp): new Date();

    let year = myDate.getFullYear();
    let month = zero(myDate.getMonth() + 1);
    let day = zero(myDate.getDate());

    let hour = zero(myDate.getHours());
    let minute = zero(myDate.getMinutes());
    let second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minute,
            s: second
        })[matches];
    });
};

/**
 **格式化日期
 * formatDate(new Date().getTime());                          //2017-05-12 10:05:44
 * formatDate(new Date().getTime(),'YY年MM月DD日');            //2017年05月12日
 * formatDate(new Date().getTime(),'今天是YY/MM/DD hh:mm:ss'); //今天是2017/05/12 10:07:45
 */
const formatDate = (time,format='YY-MM-DD hh:mm:ss')=>{
  let date = new Date(time);

  let year = date.getFullYear(),
    month = date.getMonth()+1,//月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  let preArr = Array.apply(null,Array(10)).map(function(elem, index) {
    return '0'+index;
  });////开个长度为10的数组 格式为 00 01 02 03

  let newTime = format.replace(/YY/g,year)
    .replace(/MM/g,preArr[month]||month)
    .replace(/DD/g,preArr[day]||day)
    .replace(/hh/g,preArr[hour]||hour)
    .replace(/mm/g,preArr[min]||min)
    .replace(/ss/g,preArr[sec]||sec);

  return newTime;
}

/**
 *24小時/48小時/本週/本月
 * 公共方法
 */
const computedTime = (inquireTime) =>{
  const hours = 60*60*1000*12;//12小時
  const minHours = 60*60*1000*24;//24小時
  const maxHours = 60*60*1000*24*2;//48小時
  const thisWeek = 60*60*1000*24*7;//本週
  const thisMonth = 60*60*1000*24*30;//本月
  if(inquireTime === '0'){
    return dateFormat(new Date().getTime()-hours,'Y-m-d H:i:s');
  }else if(inquireTime === '1'){
    return dateFormat(new Date().getTime()-minHours-hours,'Y-m-d H:i:s');
  }else if(inquireTime === '2'){
    return dateFormat(new Date().getTime()-maxHours-hours,'Y-m-d H:i:s');
  }else if(inquireTime === '3'){
    return dateFormat(new Date().getTime()-thisWeek-hours,'Y-m-d H:i:s');
  }else if(inquireTime === '4'){
    return dateFormat(new Date().getTime()-thisMonth-hours,'Y-m-d H:i:s');
  }
}

/**
 * 图片 url 转 base64 编码
 * @param url
 * @param callback
 */
const getBase64Image = (url, callback) => {
  let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image;
  img.crossOrigin = 'Anonymous';
  img.onload = function(){
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img,0,0);
    var dataURL = canvas.toDataURL('image/png');
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}

/**
 * 判断obj对象中是否含有值value
 * @param value
 * @param obj
 * @returns {boolean}
 */
const isExistsVal = function (value, obj) {
  let isExist = false;
  if(!(obj instanceof Object)) return isExist;
  for (let key in obj) {
    if (obj[key] instanceof Object) {
      isExist = this.isExistsVal(value, obj[key]);
      if (isExist)
        break;
    }
    if (obj[key] == value) {
      isExist = true;
      break;
    }
  }
  return isExist;
};
/**
 * 获取对象中指定值的key
 * @param value
 * @param obj
 * @returns {string}
 */
const getKeyByObj = function (value, obj) {
  let targetKey = '';
  if(!(obj instanceof Object)) return '';
  for(let key in obj){
    if (obj[key] instanceof Object)
      targetKey = this.getKeyByObj(value, obj[key]);
    if(targetKey != '')
      break;
    if(obj[key] == value)
      targetKey = key;
  }
  return targetKey;
};
/**
 * 自定义替换字符串（全部替换）
 * @param source  被替换的字符
 * @param target  替换的字符
 * @returns {*}
 */
const replace = function (text, source, target) {
  var reg = new RegExp(source, "g"); //创建正则RegExp对象
  return text.replace(reg, target);
};

export default {
  showMessege,
  testAdmin,
  testPassword,
  dateFormat,
  isExistsVal,
  getKeyByObj,
  formatDate,
  computedTime,
  replace,
  getBase64Image
}
