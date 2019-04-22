export default {
  //截取token
  getQueryByName:function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  },

  formatOdds: function (data) {
    if (data == null) {
      return
    }
    let odds = parseFloat(data);
    let format = Math.round(odds * 100) / 100;
    let s = format.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  },
  arrObjToMap (arrobj, attr) {
    let obj = {}
    for (let i in arrobj) {
      obj[arrobj[i][attr]] = arrobj[i]
    }
    return obj
  },
  /**
   * 判断对象是否为空
   * @param e
   * @returns {boolean}
   */
  isEmptyObject: function (e) {
    let t
    for (t in e)
      return !1
    return !0
  },
  /**
   * 判断变量是否为不为空
   */
  isNotEmpty: function () {
    let b
    for (let i in arguments) {
      b = typeof (arguments[i]) != "undefined" && arguments[i] != null
    }
    return b
  },
  /**
   * 判断变量是否为不为空(包含空字符串)
   */
  isTarEmpty: function () {
    let b
    for (let i in arguments) {
      b = typeof (arguments[i]) != "undefined" && arguments[i] != null && arguments[i] != ""
    }
    return b
  },
  titleReg(string){
    let title
    if (string.indexOf("-") === -1) {
      title = ''
    } else {
      let reg = /\((.+)\)/g
      let name;
      name = string.split("-")[1].match(reg)
      if(name!==null){
        if(name.indexOf('(让局)')!==-1){
          title=''
        }else{
          title='-'+name
        }
      } else{
        title=''
      }
    }
    return title
  },
  titleRP(type,team){
    let title
    if(type===3210020||type==3220010){
      if(team.indexOf("-")===-1){
        title= '让盘'
      } else {
        title= '让局'
      }
    }else{
      if(team.indexOf("-")===-1){
        title= '让局'
      } else {
        title= '让分'
      }
    }
    return title
  },

  formatDate: {
    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y': return padding(date.getFullYear(), $0.length)
          case 'M': return padding(date.getMonth() + 1, $0.length)
          case 'd': return padding(date.getDate(), $0.length)
          case 'w': return date.getDay() + 1
          case 'h': return padding(date.getHours(), $0.length)
          case 'm': return padding(date.getMinutes(), $0.length)
          case 's': return padding(date.getSeconds(), $0.length)
        }
      })
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP)
      var matchs2 = dateString.match(/(\d)+/g)
      if (matchs1.length == matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y': _date.setFullYear(_int); break
            case 'M': _date.setMonth(_int - 1); break
            case 'd': _date.setDate(_int); break
            case 'h': _date.setHours(_int); break
            case 'm': _date.setMinutes(_int); break
            case 's': _date.setSeconds(_int); break
          }
        }
        return _date
      }
      return null
    },
    /**
     * 时间戳转换
     * @param unixTime 时间毫秒数
     * @param timeZone 时区-12至12
     * @param ymd 日期格式y-M-D h:m:s.ss
     * @param isCN 是否加上汉字
     * @returns {string}
     * @constructor
     */
    UnixToDate: function (unixTime, timeZone, ymd, isCN) {
      if (unixTime == 0 || unixTime == "" || unixTime == null) {
        return 0
      } else {
        if (typeof (timeZone) == 'number') {
          unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60 * 1000
        }
        let time = new Date(unixTime)
        let y = '', M = '', D = '', h = '', m = '', s = '', t = ''
        if (ymd) {
          if (ymd.indexOf("y") != -1) y = time.getFullYear() + "-"
          if (ymd.indexOf("M") != -1) M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) + "-" : time.getMonth() + 1 + "-")
          if (ymd.indexOf("D") != -1) D = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate())
          if (ymd.indexOf("h") != -1) h = (time.getHours() < 10 ? '0' + (time.getHours()) : time.getHours())
          if (ymd.indexOf("m") != -1) m = ":" + (time.getMinutes() < 10 ? '0' + (time.getMinutes()) : time.getMinutes())
          if (ymd.indexOf("s") != -1) s = ":" + (time.getSeconds() < 10 ? '0' + (time.getSeconds()) : time.getSeconds())
          if (ymd.indexOf("t") != -1 && unixTime.toString().length >= 13) t = "." + unixTime % 1000
        }
        return y + M + D + " " + h + m + s + t
      }
    },
    /**
     * 时间戳转换
     * @param unixTime 时间毫秒数
     * @param timeZone 时区-12至12
     * @param ymd 日期格式y-M-D h:m:s.ss
     * @param isCN 是否加上汉字
     * @returns {string}
     * @constructor
     */
    UnixToDateTwo: function (unixTime, timeZone, ymd, isCN) {
      if (unixTime == 0 || unixTime == "" || unixTime == null) {
        return 0
      } else {
        if (typeof (timeZone) == 'number') {
          unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60 * 1000
        }
        let time = new Date(unixTime)
        let y = '', M = '', D = '', h = '', m = '', s = '', t = ''
        if (ymd) {
          if (ymd.indexOf("y") != -1) y = time.getFullYear() + "."
          if (ymd.indexOf("M") != -1) M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) + "." : time.getMonth() + 1 + ".")
          if (ymd.indexOf("D") != -1) D = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate())
          if (ymd.indexOf("h") != -1) h = (time.getHours() < 10 ? '0' + (time.getHours()) : time.getHours())
          if (ymd.indexOf("m") != -1) m = ":" + (time.getMinutes() < 10 ? '0' + (time.getMinutes()) : time.getMinutes())
          if (ymd.indexOf("s") != -1) s = ":" + (time.getSeconds() < 10 ? '0' + (time.getSeconds()) : time.getSeconds())
          if (ymd.indexOf("t") != -1 && unixTime.toString().length >= 13) t = "." + unixTime % 1000
        }
        return y + M + D + " " + h + m + s + t
      }
    }
  },


  //计算未结算注单的可赢金额
  betAward: function (currentOdds, amount) {
    if(currentOdds<0){
      return amount;
    }else {
      var money= Math.round(amount * currentOdds*10000)/10000;
//          var money= amount * currentOdds;
//          console.log(money)
      if (money < money.toFixed(2)) {
        return (Math.floor(parseFloat(money) * 100) / 100).toFixed(2)
      } else if (money > (money).toFixed(2)) {
        return money.toFixed(2);
      }else {
        return money;
      }

    }
  },
  playName: function (playname, betContent) {
    var playNames = ['3020022', '3020012', '3010022', '3420010', '3410050', '3420060', '3510020', '3410020', '3520020', '3610020', '3620020', '3010012', '3520050','3110010','3120010','3210020','3220010','3310020','3320010','3710020','3720020','3810020','3820020'];
    if (playNames.indexOf(playname) >= 0) {
      if (JSON.parse(betContent).isHteam === 'Y') {
        return 0
      } else {
        return 1
      }
    } else {
      return 2
    }
  },

  /**
   * 可赢金额截取2位有效数字
   */
  formatMoneyTwo:function (currentOdds,data) {
    if(data==null || currentOdds==null ||currentOdds<0)
    {
      return data;
    }
      let odds = parseFloat(data*currentOdds);
      let format = Math.round(odds * 1000) / 1000;
      let s = format.toString();
      let rs = s.indexOf('.');
      if (rs < 0) {
        rs = s.length;
        s += '.';
      }
      while (s.length <= rs + 2) {
        s += '0';
      }
      //将S截取两位
      return s.substr(0, s.indexOf(".") + 3);
  },

  /**
   * 可赢金额截取2位有效数字
   */
  winFormatMoney:function (data) {
    if(data==null)
    {
      return data;
    }
    let s = data.toString();

    let rs = s.indexOf('.');

    if (rs <= 0) {
      s += '.0';
    }
    let array = s.split(".");
    let array2 = array[1];

    if (array2.length < 2) {
      array2 += '0';
    }else{
      array2 = array2.substr(0,2);
    }
    //将S截取两位
    return array[0]+"."+array2;
  },

  formatTimeTwo: function (data) {
    if (data == null) {
      return
    }
    let s="";
    let year = '';
    let timeArray=[];
    let month="";
    let day="";
    let hours="";
    let h = '';
    let m = '';
    if(data.split(" ").length!=2)
    {
      return "";
    }
    hours=data.split(" ")[1];
    timeArray=data.split(" ")[0];
    if(timeArray.split("-").length!=3)
    {
      return "";
    }
    year = timeArray.split("-")[0];
    month=timeArray.split("-")[1];
    day=timeArray.split("-")[2];
    h = hours.split(":")[0];
    m = hours.split(":")[1];
    s=year+"."+month+"."+day+"   "+" "+h+":"+m;
    return s;
  },

  formatTime: function (data) {
    if (data == null) {
      return
    }
    let s="";
    let timeArray=[];
    let month="";
    let day="";
    let hours="";
     if(data.split(" ").length!=2)
     {
      return "";
     }
    hours=data.split(" ")[1];
    timeArray=data.split(" ")[0];
    if(timeArray.split("-").length!=2)
    {
      return "";
    }
    month=timeArray.split("-")[0];
    day=timeArray.split("-")[1];
    s=month+"月"+day+"日"+" "+hours;
    return s;
  },

  formatMonthAndDay(data){
    console.log(data,"data")
    if (data == null) {
      return
    }
    let s="";
    let timeArray=[];
    let month="";
    let day="";
    let hours="";
    if(data.split(" ").length!=2)
    {
      return "";
    }
    timeArray=data.split(" ")[0];
    if(timeArray.split("-").length!=2)
    {
      return "";
    }
    month=timeArray.split("-")[0];
    day=timeArray.split("-")[1];
    s=month+"月"+day+"日"
    return s;
  },

  formatHours(data){
    if (data == null) {
      return
    }
    let s="";
    let timeArray=[];
    let hours="";
    if(data.split(" ").length!=2)
    {
      return "";
    }
    hours=data.split(" ")[1];
    timeArray=data.split(" ")[0];
    if(timeArray.split("-").length!=2)
    {
      return "";
    }
    s= hours;
    return s;
  }

}
