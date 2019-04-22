import {router,store,CONST,tools,storages,process, axios,util} from '../../js/public/port'
import api from '../../js/public/api'
import Bet from '../home_sports_event/tradeDialog'
import Util from "../util/util";
//用于公共的入口，这个如口是具体功能是：页面发起请求，由这个入口进行统一处理，再与后端台进行交互。
export default {
    methods: {
        //判断是否登陆
        isLogin:function(){
            if(storages.isLogin()){
                return true;
            }
            return false;
        },
        //获取设置语言
        getLanguage: function () {
            let language = "zhCHS"; //默认中文
            let newlanguage = window.localStorage.getItem("language");
            if (newlanguage === undefined || newlanguage === null)
                newlanguage = language;
            return newlanguage;
        },
        //设置语言
        settingLanguage: function (language) {
            if (language != null && language != "") {
                window.localStorage.setItem("language", language);
            }
        },
        //获取盘口
        getPlate: function () {
            let plate = window.sessionStorage.getItem("plate");
            if (plate === null || plate === undefined || plate === '')
                plate = 'H';
            return plate;
        },

        //设置盘口
        setPlate: function (plate) {
            if (plate != null && plate != "") {
                window.sessionStorage.setItem("plate", plate);
            }
        },

        /* 改变球类的玩法导航条 */
        changePlayActiveTab: function(isMix, that){
          let isShowOddsHighlight  = false//默认不高亮
          let playTabList = store.state.playTabList;
          if(playTabList.length===1){
            that.$refs.underline.style.transform = 'translate(0,-0.02rem)';
          }else if(playTabList.length===2){
            if( isMix == '0' ) {
              that.$refs.underline.style.transform = 'translate(0,-0.02rem)';
            }else if ( isMix == '1') {
              isShowOddsHighlight = true//高亮
              that.$refs.underline.style.transform= 'translate(1.875rem,-0.02rem)';
            }else if ( isMix == '2') {
              that.$refs.underline.style.transform= 'translate(1.875rem,-0.02rem)';
            };
          }else if(playTabList.length===3){
            if( isMix == '0' ) {
              that.$refs.underline.style.transform = 'translate(0,-0.02rem)';
            }else if ( isMix == '1') {
              isShowOddsHighlight = true//高亮
              that.$refs.underline.style.transform= 'translate(1.25rem,-0.02rem)';
            }else if ( isMix == '2') {
              that.$refs.underline.style.transform= 'translate(2.5rem,-0.02rem)';
            };
          }
            if(!util.isEmptyObject(store.state.checkedMatches)){//不为空
                for(let item in store.state.checkedMatches){
                  store.state.checkedMatches[item] = isShowOddsHighlight//高亮设置
                }
            }

            let baseParam = store.state.baseParam;
            baseParam.isMix = isMix;
            store.commit('baseParam', baseParam);
        },

        /* 球类切换设置 dateType：0今日 1滚球 2早盘 */
        changeBall(gameType, isMix){
            let baseParam = this.updBaseParam(gameType, isMix);
            //清除综合过关数据
         //   store.commit("newOddsParams", []);
            //每次切换球类都进行球类赛事数量请求
            // this.getGameType(baseParam.dateType, baseParam.gameType);
            return baseParam;
        },
        /* 更新基础参数值 */
        updBaseParam(gameType, isMix){
            if(gameType == undefined || gameType == null || gameType == '')
                gameType = 'TYZQ';//默认设置为足球
            if(isMix == undefined || isMix == null || isMix == '')
                isMix = '0';//默认设置单式玩法
            let baseParam = store.state.baseParam;
            baseParam.gameType = gameType;
            baseParam.isMix = isMix;
            store.commit('baseParam', baseParam);
            store.commit("setPlayType", baseParam);
            return baseParam;
        },

        //得到赔率颜色样式
        getOddsColor(){
            let oddsColor = window.sessionStorage.getItem("oddsCss");
            if (oddsColor === null || oddsColor === undefined || oddsColor === '')
                oddsColor = 'oddsCss1';
            return oddsColor;
        },
        //设置赔率颜色
        setOddsColor(color){
            if (color != null && color != "") {
                window.sessionStorage.setItem("oddsCss", color);
            }
        },

        //================= 公用请求方法 ===================

        //获取球赛,球赛数量
        getGameType:function (flag) {
            let curParams={
                action:'type_sum',
                params: {
                  dateType: store.state.baseParam.dateType,
                }
            }
            api.Axios('post',CONST.PROCESSURL,curParams,function (data) {
                if(data.code ==='R000'){ //后台处理异常
                  return;
                }
                //赛事数量获取成功以后修改in的值
                store.state.init.typeSum = true;
                store.commit('changeInit',store.state.init);
                process.ballKinds_process(data.result.typeData);
                process.chargeMixOrChampion(data);
             /*   process.setOpenItemStorage(data);
                store.commit('add_hotMatches',data.result.hotMatches);
                if(data.result.hotMatches.playMaintenance){
                 // process.setHotMatchMain(data.result.hotMatches);
                }else{
                   process.setHotMatachesDate(data);
                }*/
            },flag)
        },

      getHotMatches: function (isGoto) {
        let baseParam = store.state.baseParam;
        let curParams = {
          action:'hotMatches',
          params:{
            plate:this.getPlate(),
          }
        };
        if (baseParam.dateType != '1') {
          delete curParams.params.Live;
        }
        api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
          process.chargePlate(data);
          process.setOpenItemStorage(data);
          store.commit('add_hotMatches',data.result.hotMatches);
          if(data.result.hotMatches.playMaintenance){

          }else{
            process.setHotMatachesDate(data);
          }
        },isGoto);
      },
      //定时器定时刷新早盘今日的数据今日缓存
      getMorTodayMatches:function(blag){
        store.state.isMore = false;
        store.state.isHome = false;
        let baseParam = store.state.baseParam;
        let curParams = {
          action: 'odds',
          params: Object.assign({}, baseParam, {
            type: store.state.Type,
            sort:store.state.sort,
            startTime: '',
            playType: store.state.playType,
            pageNum:'1',
            Live:store.state.Live,
            plate:this.getPlate(),
            thread:blag
          })
        };
          api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
            if(data.code ==='R000'){ //后台处理异常
              return;
            }
             process.chargePlate(data);
             let version = new Date().getTime();
             console.log(version,"version");
             store.state.cacheData[baseParam.gameType][baseParam.dateType][baseParam.isMix].version  = version;
            store.state.cacheData[baseParam.gameType][baseParam.dateType][baseParam.isMix].data  = data;
        },false)

      },

      //当获取早盘的数据事，从缓存直接拿数据
      getMorningZqData:function(){
        store.state.isMore = false;
        store.state.isHome = false;
        let baseParam = store.state.baseParam;
        let curParams = {
          action: 'odds',
          params: Object.assign({}, baseParam, {
            type: store.state.Type,
            sort:store.state.sort,
            startTime: '',
            playType: store.state.playType,
            pageNum:'1',
            Live:store.state.Live,
            plate:this.getPlate(),
          })
        };
        //判断要不要去拿缓存数据，如果取缓存，缓存为空的话，发起一次请求，如果缓存不为空，但是数据在有效期内，直接把缓存渲染到页面，如果不在有效期内，同样发起一次请求
        let data = [];
        let startCacheThred = process.startCacheThred();
        console.log(startCacheThred,"startCacheThred")
        if(startCacheThred){
          let cacheData = store.state.cacheData;

          data = cacheData[baseParam.gameType][baseParam.dateType][baseParam.isMix];
        }
        console.log(data,"data");
        if(!data.data || !data.data.result || !data.data.result.data){ //如果没有缓存
          this.getMatches(true);
          return;
        }
        //先拿换成渲染数据，然后在判断缓存是否过期
        store.commit('add_params', curParams.params);
        process.dealCacheData(data,baseParam);
      },

        /**
         * 获取赛事赔率（统一）
         * @param params
         */
        getMatches: function (isGoto) {
          //查询赛事之前，如果是综合过关查询，判断该球类是否有综合过关玩法，及冠军赛玩法，
          //如果没有，则重置为单式玩法查询
          store.state.isMore = false;
          store.state.isHome = false;
          store.state.countDown = process.getCountDown();
          let baseParam = store.state.baseParam;
           if(process.resetOddsConditons(baseParam)===undefined){
              baseParam.isMix = "0";
              store.state.playType = "single";
              store.state.baseParam = baseParam;
             store.commit("setPlayType", baseParam);
            }
             process.setOddsChangeTag(baseParam.isMix);
            let curParams = {
                action:'odds',
                params: Object.assign({}, baseParam, {
                    type: store.state.Type,
                    sort:store.state.sort,
                    startTime: '',
                    playType: store.state.playType,
                    pageNum:'1',
                    Live:store.state.Live,
                    plate:this.getPlate(),
                    lsids:store.state.matchesId+'',
                    type_sum:store.state.type_sum
                })
            };
            if (baseParam.dateType != '1') {
                delete curParams.params.Live;
            }
            api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
                if(data.code ==='R000'){ //后台处理异常
                  return;
                }
                store.state.init.odds = true;
                store.state.maintanceCode = '';
                store.commit('add_params', curParams.params);
              if(data && data.result){
                 process.chargePlate(data);
                if(data.code==='D000'){
                  store.state.maintanceCode = data.code;
                  store.commit('add_datas',[]);
                  store.commit("newOddsParams",[]);
                  process.setPlayMaintenance(data);
                }else if(data.result.data){
                  //如果是今日早盘足球的请求是，要覆盖定时器刷新的缓存
                  process.repeatZqCache(data,baseParam);
                  process.chargeMixOrChampion(data);
                  process.getGamePlayObj2(data,baseParam);
                  process.ballKinds_process(data.result.type_sum[baseParam.dateType]);
                  store.commit('mixBetLimit', {mixMax: data.result.mixMax, mixMin: data.result.mixMin});
                  // process.filterData(data.result.data,data.result.leagueId);
                  store.commit('add_datas',data.result.data);
                }else{
                  process.ballKinds_process(data.result.type_sum[baseParam.dateType]);
                  process.chargeMixOrChampion(data);
                  process.setPlayTable(baseParam);
                  store.commit('add_datas',[]);
                  process.setNoData();
                }
              }
                //路由跳转
                if(isGoto){
                    store.state.timerFresh = true;
                    process.goTo(baseParam.dateType, baseParam.gameType);
                }
            },isGoto);
        },

        //盘口
        getPlateInfo:function(){
            let curParams = {
                action:'plate',
                params:{
                },
            };
            api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
                store.commit('add_plate_data', data);
            });
        },

        //公告  createTimeType 24小时(0)，48小时(1)，本周(2)，本月(3)
        getAllAnnouncement:function (params,flag) {
            let curParams = {
                action:'notice',
                params: params
            };
            api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
                if(data.code ==='R000'){ //后台处理异常
                  return;
                }
                let msgData = store.state.announcement_data;
                console.log(msgData,"msgData")
                let noticeInfo = [];
                let noticeLen = 0;
               if(msgData.noticeInfo){
                 store.state.announcement_data.noticeInfo=[];
             /*     noticeLen = msgData.noticeInfo.length;
                  noticeInfo = msgData.noticeInfo*/
                }

                let len = data.result.data.length;

                if(data.code === '200' && len > 0){
                    for(let i=0;i < len; i++){
                        //时间戳格式化
                        data.result.data[i].createTime = util.formatDate.UnixToDate(data.result.data[i].createTime,-12, 'yMD');
                                                noticeLen ++;
                            noticeInfo.push(data.result.data[i]);

                    }
                }else {
                    if(noticeInfo.length<1){
                      process.setNoData();
                    }
                }
                store.commit('add_announcement_data', {noticeInfo: noticeInfo,noticeDataLen: noticeLen,dataLen:len});
            },flag);
        },

        //账户历史
        getAccountHis:function(params,flag){
            let curParams = {
                action:'wallet',
                params:params
            };
            api.Axios('post', CONST.SECURITYURL, curParams, function(data) {
              if(data.code ==='R000'){ //后台处理异常
                return;
              }
                if(data.code ==='D006'){
                    //为登陆
                    // tools.showMessege("2账户历史请求返回未登录"+data.message);
                    store.commit('updateDialog', {isShow: true, showInfo: false,content:"账户历史请求返回未登录"+data.message})
                }else {
                  let resultData = data.result.data;
                  if(resultData.length>0){
                    if(store.state.pullUpStart){
                      store.state.pullUpStart = false;
                      store.state.pullUpSuccess = true;
                      setTimeout(() => {
                        store.state.pullUpSuccess = false;
                      },1000);
                    }
                    if(store.state.pullDownStart){
                      store.state.pullDownStart = false;
                      store.state.pullDownSuccess = true;
                      setTimeout(() => {
                        store.state.pullDownSuccess = false;
                      },1000);
                    }
                    store.state.wallet_record_num = data.result.count;
                    //处理日期格式
                    for (let i = 0; i < resultData.length; i++) {
                      // resultData[i].transactionDate = tools.dateFormat(resultData[i].transactionDate, 'm-d H:i');
                      resultData[i].transactionDate = util.formatDate.UnixToDate(resultData[i].transactionDate,-12,'MDhhm','');
                    }
                    if(params.pageNum !== '1'){
                      resultData = store.state.accountHis.concat(resultData);
                    }
                    store.commit('add_accountHis_data', resultData);

                  }else{
                    store.state.wallet_record_num = 0;
                    store.commit('add_accountHis_data', []);
                    process.setNoData();
                  }
                }
            },flag);
        },

        //投注历史/已结算/未结算账单
        getBetRecord: function(params,flag) {
            let curParams = {
                action:'bet_his',
                params: params
            };
            api.Axios('post', CONST.SECURITYURL, curParams, function(data) {
              if(data.code ==='R000'){ //后台处理异常
                return;
              }
              //未结算注单数据加载成功后隐藏加载样式，显示加载成功并在一秒后隐藏加载成功
                if(data.result.data.result.length===0){
                  store.commit('add_betRecord_data', []);
                  process.setNoData();
                  if(store.state.pullUpStart){
                    store.state.pullUpStart = false;
                    store.state.pullUpSuccess = true;
                    setTimeout(() => {
                      store.state.pullUpSuccess = false;
                    },1000);
                  }
                  if(store.state.pullDownStart){
                    store.state.pullDownStart = false;
                    store.state.pullDownSuccess = true;
                    setTimeout(() => {
                      store.state.pullDownSuccess = false;
                    },1000);
                  }
                }else {
                  if(store.state.pullUpStart){
                    store.state.pullUpStart = false;
                    store.state.pullUpSuccess = true;
                    setTimeout(() => {
                      store.state.pullUpSuccess = false;
                    },1000);
                  }
                  if(store.state.pullDownStart){
                    store.state.pullDownStart = false;
                    store.state.pullDownSuccess = true;
                    setTimeout(() => {
                      store.state.pullDownSuccess = false;
                    },1000);
                  }
                    process.betRecordProcess(data);
                }
            },flag);
        },

        //下注流程
        //投注
        bet: function(params,that) {
          let _this = this;
            let curParams = {
                action:'bet',
                params: params
            };
            api.Axios('post', CONST.SECURITYURL, curParams, function(data) {
                if(data.code ==='R000'){ //后台处理异常
                  return;
                }
                store.state.infoMsg = '';
                if(data && data.code ==="D000"){ //判断玩法维护
                  store.state.maintanceCode = data.code;
                  store.state.infoMsg = data.message;
                  store.state.toasting = true;
                  setTimeout(() => {
                    store.state.toasting = false;
                  },1000);
                  store.state.is_showModal = false;
                  store.commit("newOddsParams",[])
                  process.getData();
                }else{
                  Bet.methods.afterBet(data,that);
                  _this.getMoney();
                }
            });
        },

        //联赛信息
        getLeague: function(params,isGoto) {
          let baseParam = store.state.baseParam;
          if(process.resetOddsConditons(baseParam)===undefined){
            baseParam.isMix = "0";
            store.state.playType = "single";
            store.state.baseParam = baseParam;
          }
            let curParams = {
                action:'league',
                params: Object.assign({}, baseParam, {
                type: store.state.Type,
                sort:store.state.sort,
                startTime: '',
                playType: store.state.playType,
                pageNum:'1',
                Live:store.state.Live,
                plate:this.getPlate(),
                type_sum:store.state.type_sum
              })
            };
            api.Axios('post', CONST.PROCESSURL, curParams, function(data) {

              if(data && data.result){
                if(data.code==='D000'){
                  store.commit('add_league_data', data.result);
                  //process.setPlayTable(data,baseParam);
                  process.setPlayMaintenance(data);
                }else if(data.result.leagueId){
                  process.chargeMixOrChampion(data);
                  process.setPlayTable(baseParam);
                  process.getGamePlayObj2(data,baseParam);
                  process.ballKinds_process(data.result.type_sum[baseParam.dateType]);
                  store.commit('add_league_data', data.result);
                }else{
                  process.chargeMixOrChampion(data);
                  process.setPlayTable(baseParam);
                  store.commit('add_league_data', []);
                  process.setNoData();
                }
              }
              //路由跳转
              if(isGoto){
                process.goTo(store.state.baseParam.dateType, store.state.baseParam.gameType, '');

              }
            });
        },

        //获取赛果
        getResult: function(that) {
          store.commit('add_result_data', []);
            let curParams = {
                action:'result',
                params: {
                    date: that.date,
                    currPage: that.currPage,
                    lottery: that.lottery
                }
            };
            api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
                let resultInfo = JSON.parse(data.result.data);
                if(resultInfo){
                 for(let key in resultInfo){
                      for(let k in resultInfo[key]){
                        let str = resultInfo[key][k].startTimeStr;
                        resultInfo[key][k].startTimeStr = str.substr(8,2)+'/'+str.substr(5,2)+str.substr(10,6);
                      }

                    }
                    store.commit('add_result_data', resultInfo);
                }else{
                    store.commit('add_result_data', []);
                    process.setNoData();
                }
            });

        },

        //点击赔率是获取最新赔率 getNowoddsAndLimit
        queryNewOdds: function (params) {
            let curParams = {
                action:'new_odds',
                params: params
            };
            api.Axios('post', CONST.SECURITYURL, curParams, function(data) {
                store.state.maintanceCode = '';
                if(data){
                    if(data.code ==='D000'){
                      store.state.maintanceCode = data.code;
                      store.state.is_showModal = false;
                      store.commit("newOddsParams",[]);
                     process.getData();
                    }else{
                      process.newOddsChargePlate(data);
                      store.commit('newOddsResp', data);
                    }
                }else{
                    process.newOddsChargePlate(data);
                    store.commit('newOddsResp', []);
                }
            },false);
        },

        //更多玩法
        getMorePlay:function(params,isGoto){
            let curParams = {
                action:'more_odds',
                params: params
            };
            api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
                if(data.result){
                  process.chargePlate(data);
                  store.commit('add_more_datas', data);
                  process.playTypeIsShow(data);
                  process.chargeMixOrChampion(data);
                  process.getGamePlayObj2(data,store.state.baseParam);
                    //如果获取到的数据为空则不跳转更多玩法页面

                }else{
                   // process.setMorePlayNoData();
                    //
                    store.commit('add_more_datas', []);
                }
              if(isGoto===true){
                process.morePlayGoTo(params.dateType,params.gameType);
              }
            },isGoto);

        },

      teamNoticeRolling: function () {
        let _this = this;
        let loopTimer = store.state.loopTimer;
        if (loopTimer != null) {
          window.clearInterval(loopTimer);
        }
        loopTimer = setInterval(function () {
          _this.fun1();
        }, 50);
        store.commit("loopTimer", loopTimer);
      },

        //队名超长滚动设置
      teamNameRolling: function () {
        let _this = this;
        let loopTimer = store.state.loopTimer;
        if (loopTimer != null) {
          window.clearInterval(loopTimer);
        }
        loopTimer = setInterval(function () {
          _this.fun1();
        }, 200);
        store.commit("loopTimer", loopTimer);
      },
      fun1: function () {
        let pTeam = document.getElementsByName('team');
        for (var itemIndex = 0; itemIndex < pTeam.length; itemIndex++) {
          if (pTeam[itemIndex].scrollLeft != undefined) {
            let p = pTeam[itemIndex];
            if (p.scrollWidth - p.offsetWidth > 2 && p.scrollWidth - p.offsetWidth > p.scrollLeft) {
              p.scrollLeft++;
              if (p.scrollWidth - p.offsetWidth === parseInt(p.scrollLeft)) {
                setTimeout(function () { //这个定时器清除不用管
                  p.scrollLeft = 0;
                }, 1500);
              }
            }
          }
        }
      },

        getToken:function () {
            axios({
                baseURL: CONST.AGENCY,
                url: "data/Token.html",
                method: 'post',
                params: {}
            }).then(function (data) {
                let tokenData ={
                    tokenDate:data.result.tokenDate,
                    token:data.result.token,
                    rightNow:new Date().getTime()
                }
                store.commit("add_tokenData",tokenData);
            }).catch(function (err) {
                tools.Message.error(err)
            });

        },

        //api登陆
        apiLogin:function () {
          store.commit('showLoading',true);
            store.state.init = {};
            let token = Util.getQueryByName("token");
            let apiToken =storages.getSession('apiToken');
            if(!Util.isTarEmpty(token) || token===apiToken){
              store.state.loginStatus = true;
              return;
            }
            //如果已经登入或者token一致就不用再请求token验证.
            let user = storages.getUserObjSession('user');
            if(user!=null&&user.token!=null&&user.token==token){
              store.state.loginStatus = true;
              return;
            }
            storages.setSession('apiToken',token);
            axios({
                url:"/token.html?"+encodeURIComponent(token)
            }).then(function(data){
                if(Util.isTarEmpty(data)&&data.success){
                    storages.setUserObjSession('user',{username:data.username,money:data.money,token:token});
                    store.state.user = {username:data.username,money:data.money,token:token};
                }else{
                  storages.removeSession("user");
                  console.log(data.message,"api登录错误")
                }
            }).catch(function(err){
                storages.removeSession("user");
                console.log(err,"api登录错误")

            }).finally(function () {
               storages.removeSession("apiToken");
               store.commit('showLoading',false);
               store.state.loginStatus = true;
            });

        },
      //更新金额
      getMoney(){
        let _this = this;
        axios({
          baseURL: CONST.AGENCY,
          url: "getMoney.html",
          method: 'post',
          params: {}
        }).then(function (data) {
         storages.updataMoney(data.data);
         store.state.user.money = data.data;
        }).catch(function (err) {
          if(err.status == 600){
            // tools.showMessege("会话过期, 请重新登录");
            store.commit('updateDialog', {isShow: true, showInfo: false,content: '会话过期, 请重新登录'})
          }else if(err.status == 606){
            // tools.showMessege("异地登录, 您已被踢出");
            store.commit('updateDialog', {isShow: true, showInfo: false,content: '异地登录, 您已被踢出'})
          }else if(err.status == 607){
            store.state.systemMaintanceCode = 'D000'
            store.state.is_showModal = false;
            document.title = '網站維護中';
            let playMaintenance = {
              title: '系统维护中',
              question_reason: '1',
              content: '',
              content_time_before: '预计将会在',
              content_time: err.data.result.beijingEndTime+ '\xa0'+'(GMT+8)',
              content_time_after: '完成，感谢您的耐心等待',
            }
            store.commit("add_playMaintenance", playMaintenance);
            //跳转到玩法维护
            process.goToSystemMaintenance();
          }
          storages.removeSession('user');
          storages.removeSession('apiToken');
          store.state.user = '';
        });
      },
      //登出
      logOut:function () {
        axios({
          baseURL: CONST.AGENCY,
          url: CONST.LOGOUT,
          method: 'post',
        }).then(function (data) {
          storages.removeSession('user');
          store.state.user = {};
        }).catch(function (err) {
          tools.Message.error(err)
        });

      },
      //系统维护检测
      getSystemMaintanceTime:function(flag){
        let curParams = {
          action:'homeNotice',
          params: []
        };
        api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
          // let systemMaintanceCode =  store.state.systemMaintanceCode;
          // if(systemMaintanceCode!='D000'||data.code){
            router.push('/home')
          // }
        },flag);

      },
      //首页公告
      getHomeNotice:function(flag){
        let curParams = {
          action:'homeNotice',
          params: []
        };
        api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
          //首页公告请求完成后初始化状态为true
          store.state.init.homeNotice = true;
          if(data.result){
            store.commit('setHomeNotice', data);
          }else{
            //store.commit('add_more_datas', []);
          }

        },flag);

      },

       getRuleJson:function () {
           axios({
             baseURL: CONST.AGENCY,
             url: CONST.RULEURL,
             method:'get',
             responseType:"json"
           }).then(function(res){
             let ruleList=[];
             let ruleNameList= new Array();
             let ruleNameLists= new Array();
             ruleList=res.theme.day.items;
             for(let i=0;i<ruleList.length;i++)
             {
               if("规则与条款"!=ruleList[i].name && "隐私声明"!=ruleList[i].name && "博彩责任"!=ruleList[i].name && "赔率计算"!=ruleList[i].name)
               {
                 ruleNameList.push(ruleList[i].name)
               }
             }
             ruleNameLists.push(ruleNameList)
             store.commit('setRuleNameList',ruleNameLists);
             store.commit('setRuleJson',res.theme.day.items);

           }).catch(function(err){
             console.log(err,"请求规则JSON错误")
           });
           },

      getRuleHtml:function (url) {
        axios({
          baseURL: CONST.AGENCY,
          url: '/rcenter/play/rule/h5/day/' +  url,
          method:'get',
          responseType:"html"
        }).then(function(res){
          setTimeout(function () {
            store.state.ruleHtml = res;
          }, 100);
        }).catch(function(err){
          console.log(err,"请求规则页面错误")
        });
      },
      getSourceConfig(){
        let curParams = {
          action:'source',
          params:[],
        };
        api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
          if(data.result){
            //设置系统参数
            process.setSysFreqParams(data);
          }
        },false);

      },

      getMainPageMap(){
        let curParams = {
          action:'mainpage_map',
          params:[],
        };
        api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
          if(data.result){
            let urlList = data.result.rotationCharts.sky
            let urlLogoList=data.result.logo
            let urlBackgroundImgList=data.result.backgroundImg
            let images = []
            let images_logo=null
            if(urlList.length > 0) {
              for(let i = 0; i < urlList.length; i++) {
                   let path=urlList[i].path
                   let image_url=path.split("/")
                   let imageName=image_url[image_url.length-1].split(".")[0]
                   /*判断是否支持缓存，支持并且存在缓存的情况下，就从缓存中获得图片内容*/
                   if(window.localStorage&&process.getLocalStorage('aimg'+imageName)!=null){
                     var srcStr = process.getLocalStorage('aimg'+imageName);  //这里是从缓存中获得我们保存的内容，键值对的形式
                     images.push({id: i, src: srcStr})
                     /*不支持缓存或者缓存不存在情况下，按照正常流程由服务器获得图片*/
                   }else {
                     //判断是否支持缓存，支持，就将图片缓存，不支持不作任何操作
                     if (window.localStorage) {
                       //把你需要的东东存到缓存里，
                       try {
                         tools.getBase64Image(urlList[i].path, function(data) {
                           images.push({id: i, src: data})
                           process.setLocalStorage('aimg' + imageName, data);
                         })
                       } catch (e) {
                        console.log('Storage failed: ' + e);
                       }
                     }
                   }
              }
            if(images==[])
            {
              store.state.isImageLbNotNul=false
            }
            console.log("images",images)
            store.commit('setImagesList',images);
            }else{
              store.state.isImageLbNotNul=false
            }

            if(urlLogoList)
            {
              let logo=urlLogoList.sky.home
              if(logo!=undefined)
              {
                images_logo=process.getLocalStorage_bk(logo.path)
                store.commit('setImagesLogoList',images_logo);
              }else{
                store.state.isImageLogoNotNul=false
              }
            }
            if(images_logo==null)
            {
              store.state.isImageLogoNotNul=false
            }

            if(urlBackgroundImgList)
            {
              store.commit('setImagesBackgroundList',urlBackgroundImgList);
            }

          }
        },false);
      }
    },


}

