import {store,base,tools,process} from "@/js/public/port";
import betClassify from '../../components/playTypeJson/playType';
import betClassify2 from '../../components/playTypeJson/playType2';
import dailog from '../home/home_center'

export default {
    data: {
        BallTitleData: [],
        BallData: [],
        WPBallData: [], //网球排球让球数据
        WPtitleShow: true,
        BallPlayIsShow: {
            isqcrq: [], //全场让球
            isbcrq: [], //半场让球
            isqcdx: [], //全场大小
            isbcdx: [], //半场大小
            isds: [], //单双
            isdy: [], //独赢
            isbcdy: [], //半场独赢
            isbcbd: [], //半场波胆
            isbd: [], //波胆
            iszjq: [], //总进球
            isbqc: [], //半全场
            isjs: [], //局数
            isqddf: [], //球队得分
            isqddfk: [] //球队得分客队
        },
        reqparam: {},
        TYZQ: 'football',
        TYLM: 'basketball',
        TYBQ: 'baseball',
        TYWQ: 'tennis',
        TYPQ: 'volleyball',
        TYQT: 'other',
        betHelpDialogShow: false,
        promptInfo: false,
        nowOddsAndLimit: [],
        host: true, //主队true,客队:false
        betType: betClassify,
        showDetail: true,
        dateType: '',
        isWho: '',
        gameType: '',
        playType: '',
        pageNo: '',
        matId: '', //足球波胆下注使用,
        isMix: '0',
        gamePlayObj: {},
        mixNum: 0,
        showChooseMore: false,
        oldMsg: [],
        newMsg: [],
    },

  MorePlay(data){
    store.state.morePlayDetail = data;
    let curParmas = store.state.params;
    let moreParams={
      dateType: curParmas.dateType,
      gameType:curParmas.gameType,
      isMix:curParmas.isMix,
      type:curParmas.type,
      league:data.leagueId+'',
      onlykey:data.onlykey,
      playType: curParmas.playType,
      pageNo: '1',
      plate:base.methods.getPlate(),
      Live:'1',
      sort:store.state.sort,
    };
    store.commit("add_moreParams",moreParams);
    store.state.isMore = true;
    base.methods.getMorePlay(moreParams,true);
  },

  /** 判断isWho,组装下注窗口请求参数 */
  isWhoByBet: function (data, host, betType, clickWho) {
    let obj = {};
    let onlykey = data.onlykey;
    let hteam = data.hteam;
    let gteam = data.gteam;
    let leagueName = data.leagueName;
    let leagueId = data.leagueId+'';
    let matid = data.matchesDetailId + '';
    let isWho = '';
    let page = data.epage;

    if (tools.isExistsVal(betType, Object.assign({"football": betClassify2.football.size}, {"basketball": betClassify2.basketball.size},
      {"tennis": betClassify2.tennis.size}, {"volleyball": betClassify2.volleyball.size},{"baseball":betClassify2.baseball.size},{"other":betClassify2.other.size}))) {
      switch (clickWho) {
        case 'dxz': //总分大小 主
        case 'zfdxzd': //总分大小 主大
        case 'qyjsdxzd'://球员局数大小主大
          isWho = '0';
          break;
        case 'dxk': //总分大小 客
        case 'zfdxzx': //总分大小 主小
        case 'qyjsdxzx'://球员局数大小主小
          isWho = '1';
          break;
        case "zfdxkd":  //总分大小 客大
        case 'qyjsdxkd'://球员局数大小客大
          isWho = '2';
          break;
        case "zfdxkx":  //总分大小 客小
        case 'qyjsdxkx'://球员局数大小客小
          isWho = '3';
          break;
      }
    }
    if (tools.isExistsVal(betType, Object.assign({"football": betClassify2.football.concede}, {"basketball": betClassify2.basketball.concede}))) {
      if (data.concede || data.half_concede) { //主队让球
        if (host) isWho = '0';
        else isWho = '1';
      } else {
        if (host) isWho = '2';
        else isWho = '3';
      }
    }

    if (tools.isExistsVal(betType, Object.assign({"tennis": betClassify2.tennis.concede}, {"volleyball": betClassify2.volleyball.concede},
      {"baseball": betClassify2.baseball.concede}, {"other": betClassify2.other.concede}))) {
      if (data.dStrong === "H") {
        if (host) isWho = "0";
        else isWho = "1";
      } else {
        if (host) isWho = "2";
        else isWho = "3";
      }
    }

    if(tools.isExistsVal(betType, Object.assign({"baseball": betClassify2.baseball.concede.half}))){
      if (data.hstrong === "H") {
        if (host) isWho = "0";
        else isWho = "1";
      } else {
        if (host) isWho = "2";
        else isWho = "3";
      }
    }

    if (tools.isExistsVal(betType, Object.assign({"football": betClassify2.football.capot}, {"basketball": betClassify2.basketball.capot},
      {"baseball": betClassify2.baseball.capot}, {"tennis": betClassify2.tennis.capot}, {"volleyball": betClassify2.volleyball.capot},
      {"other": betClassify2.other.capot}))) {
      if (host) isWho = '0';
      if (!host) isWho = '1';
      if (host === 1) isWho = '2';
    }
    if (tools.isExistsVal(betType, Object.assign({"football": betClassify2.football.singlePair}, /*{"basketball": betClassify2.basketball.singlePair}, */
      {"baseball": betClassify2.baseball.singlePair}, {"tennis": betClassify2.tennis.singlePair}, /* {"volleyball": betClassify2.volleyball.singlePair},*/
      {"other": betClassify2.other.singlePair}))) {
      // if (host) isWho = '1';
      // if (!host) isWho = '0';
      // if (host === 1) isWho = '2';
      if (host) isWho = '0';
      else isWho = '1';
    }
    if (tools.isExistsVal(betType, Object.assign({"football": betClassify2.football.wave.half}))) {
      if (host) isWho = '0';
      if (!host) isWho = '1';
      if (host === 1) isWho = '2';
      matid = data.footballHalfCorrect.matchesDetailId;
      page = data.footballHalfCorrect.page;
    }
    if (tools.isExistsVal(betType, Object.assign({"football": betClassify2.football.wave.full}))) {
      if (host) isWho = '0';
      if (!host) isWho = '1';
      if (host === 1) isWho = '2';
      // matId = data.footballHalfCorrect.matchesDetailId;
      page = data.footballHalfCorrect.page;
    }
    if (tools.isExistsVal(betType, Object.assign({"football": betClassify2.football.halfFull}))) {
      page = data.footballHta.page;
      isWho = '';
    }
    if (tools.isExistsVal(betType, Object.assign({"football": betClassify2.football.goalCount}))) {
      page = data.footballGoals.page;
      isWho = '';
    }
    obj['isWho'] = isWho;
    obj['matid'] = matid;
    obj['page'] = page;
    obj['leagueId'] = leagueId;
    obj['leagueName'] = leagueName;
    obj['hteam'] = hteam;
    obj['gteam'] = gteam;
    obj['onlykey'] = onlykey;
    return obj;
  },
  /** 注单请求参数 */
  betReqParam: function(data, host, betType, clickWho){
    let reqParam = this.isWhoByBet(data, host, betType, clickWho);
    reqParam['isMix'] = store.state.baseParam.isMix;  //返回结果中的isMix不符合要求
    reqParam['type'] = betType + '';
    reqParam['plate'] = base.methods.getPlate();
    reqParam['dateType'] = store.state.baseParam.dateType;
    reqParam['gameType'] = store.state.baseParam.gameType;
    return reqParam;
  },

  getBet:function(betType){
    let gamePlayObj = store.state.gamePlayObj;
    console.log(betType,gamePlayObj,"betType")
    let isBet = false;
    if ((betType.toString()).startsWith("303")) {
      isBet = gamePlayObj[3030000];
    } else if ((betType.toString()).startsWith("304")) {
      isBet = gamePlayObj[3040000];
    } else if ((betType.toString()).startsWith("305")) {
      isBet = gamePlayObj[3050000];
    } else if ((betType.toString()).startsWith("306")) {
      isBet = gamePlayObj[3060000];
      // } else if ((betType.toString()).startsWith("307")) {
      //       //   isBet = gamePlayObj[3070000];
    } else {
      if (gamePlayObj[betType] === undefined) {
        isBet = false
      } else {
        isBet = gamePlayObj[betType];
      }
    }
    return isBet;
  },

  betDialogHandler: function (data, host, betType, clickWho,curOdds) {
    if(curOdds == undefined || curOdds == null || curOdds=== 0)
      return ;

    if (!base.methods.isLogin()) {
      store.commit('updateDialog', {isShow: true, showInfo: false,content:'此功能仅对登录用户开放'})
      store.state.is_showModal = false;
      return
    }
    let reqParams = new Array();

    //判断玩法是否禁用下注
    if(!this.getBet(betType)){
      store.state.infoMsg = "该玩法暂时无法下注";
      store.state.toasting = true;
      setTimeout(() => {
        store.state.toasting = false;
      },1000)
      return;
    }


    let betReqParam = this.betReqParam(data, host, betType, clickWho);
    if(store.state.baseParam.isMix == '1'){
      //获取到旧的缓存数据
      let newOddsParams = process.getNewOddsParams();
      let mixBetLimit = store.state.mixBetLimit;
      if(newOddsParams.length > 0)
      reqParams = newOddsParams;
      let isExist = false;//判断是取消还是点击
      for(let index in reqParams){
        if(reqParams[index].onlykey == data.onlykey){
          if(reqParams[index].isWho == betReqParam.isWho && reqParams[index].matid == betReqParam.matid
            && reqParams[index].plate == betReqParam.plate && reqParams[index].type == betReqParam.type){
            isExist = true;
          }
          reqParams.splice(index, 1);
          break;
        }
      }

      if(!isExist) {
        if(newOddsParams.length>=mixBetLimit.mixMax){
          store.state.infoMsg = "不能大于串关数" + mixBetLimit.mixMax;
          store.state.toasting = true;
          setTimeout(() => {
            store.state.toasting = false;
          },1000)
          return;
        }
        reqParams.push(betReqParam);
      }

      // if(newOddsParams.length>=mixBetLimit.mixMax){
      //   store.state.infoMsg = "不能大于串关数" + mixBetLimit.mixMax;
      //   store.state.toasting = true;
      //   setTimeout(() => {
      //     store.state.toasting = false;
      //   },1000)
      //   return;
      // }
      // if(newOddsParams.length > 0)
      //   reqParams = newOddsParams;
      // let isExist = true;
      // for(let index in reqParams){
      //   if(reqParams[index].onlykey == data.onlykey){
      //     if(reqParams[index].isWho == betReqParam.isWho && reqParams[index].matid == betReqParam.matid
      //       && reqParams[index].plate == betReqParam.plate && reqParams[index].type == betReqParam.type){
      //       isExist = false;
      //     }
      //     reqParams.splice(index, 1);
      //     break;
      //   }
      // }

      // if(isExist){
      //   reqParams.push(betReqParam);
      // }
      store.commit("newOddsParams", reqParams);
    }else{
      //store.commit("newOddsParams", []);
      reqParams.push(betReqParam);
      store.commit('newOddsParam', reqParams);
      store.state.is_showModal = true;
    }
  }
}
