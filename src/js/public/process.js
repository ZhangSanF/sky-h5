import {store, base, tools, process} from "./port";
import Util from "../util/util";
import Router from "../../router";

export default{
    data: {
        WPBallData: [], //网球排球让球数据
        mixClass: {
          '0': {
            'TYZQ': [],
            'TYLM': [],
            'TYBQ': [],
            'TYWQ': [],
            'TYPQ': [],
            'TYQT': []
          },
          '2': {
            'TYZQ': [],
            'TYLM': [],
            'TYBQ': [],
            'TYWQ': [],
            'TYPQ': [],
            'TYQT': []
          }
        },
        leagueNames: new Map()
    },
    BallPlayIsShow() {
        return {
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
            isqddfz: [], //球队得分主队
            isqddfk: [] //球队得分客队
        }
    },
    ballKinds_process: function (data) {
        // let ballData = data.result;
        let ballKinds = data;
        let curLanguage = base.methods.getLanguage();
        for (let i in ballKinds) {
            ballKinds[i].msgNum = ballKinds[i].size;
            // ballKinds[i].name = ballKinds[i].cnName;
            if (curLanguage == 'en')
              ballKinds[i].name = ballKinds[i].enName;
            else if (curLanguage == 'zhCHT')
              ballKinds[i].name = ballKinds[i].twName;
            else
              ballKinds[i].name = ballKinds[i].cnName;
            switch (ballKinds[i].category) {
                case 'TYZQ':
                    ballKinds[i].ballClass = 'iconfont icon-zuqiu ';
                    break;
                case 'TYLM':
                    ballKinds[i].ballClass = 'iconfont icon-lanqiu ';
                    break;
                case 'TYWQ':
                    ballKinds[i].ballClass = 'iconfont icon-wangqiu ';
                    break;
                case 'TYBQ':
                    ballKinds[i].ballClass = 'iconfont icon-bangqiu ';
                    break;
                case 'TYPQ':
                    ballKinds[i].ballClass = 'iconfont icon-paiqiu ';
                    break;
                case 'TYQT':
                    ballKinds[i].ballClass = 'iconfont icon-qita ';
                    break;
                case 'TYYM':
                    ballKinds[i].ballClass = 'iconfont icon-yumao ';
                    break;
                case 'TYPP':
                    ballKinds[i].ballClass = 'iconfont icon-pingpangqiu ';
                    break;
                case 'TYSK':
                    ballKinds[i].ballClass = 'iconfont icon-siluoke ';
                    break;
            }
        }
        store.commit("ballKinds", ballKinds);
    },

    getGamePlayObj: function (data) {
        if (!Util.isEmptyObject(data.result) &&  Util.isNotEmpty(data.result)) {
            let gamePlayObj = Util.arrObjToMap(data.result, 'gamePlayId')
            store.commit("get_gamePlayObj", gamePlayObj);
        }
    },
    getGamePlayObj2:function(data,baseParam){
        if (!Util.isEmptyObject(data.result.openItem) &&  Util.isNotEmpty(data.result.openItem)) {
        if(baseParam.gameType==null || baseParam.gameType ==undefined || baseParam.gameType=='')
          baseParam.gameType = "TYZQ";
        store.commit("get_gamePlayObj", data.result.openItem[baseParam.gameType]["1"]);
        this.setPlayTable(baseParam);
        }
    },
  getGamePlayObj3:function(baseParam){
      let openItemStorage = store.state.openItemStorage[store.state.baseParam.dateType];
    if (!Util.isEmptyObject(openItemStorage)) {
      store.commit("get_gamePlayObj", openItemStorage[baseParam.gameType]["1"]);
    }
  },
   //处理综合过关及冠军赛的展示判断
    setPlayTable:function(baseParam){
      let chargeMixOrChampion = store.state.chargeMixOrChampion;
      let isMix = false;
      let isChampion = false;
      if(chargeMixOrChampion) {
        switch (baseParam.gameType) {
          case "TYZQ":
            let jsonMixOrChampion = chargeMixOrChampion["TYZQ"]["3"];
            if (baseParam.dateType != '1') {
              if (jsonMixOrChampion['3070000']!==null && jsonMixOrChampion['3070000']!==undefined) {
                isMix = true;
              }
              if (jsonMixOrChampion['3090000']) {
                isChampion = true;
              }
            }
            break;
          case "TYLM":
            let jsonMixOrChampion2 = chargeMixOrChampion["TYLM"]["3"];
            if (baseParam.dateType != '1') {
              if (jsonMixOrChampion2['3170000']!==null && jsonMixOrChampion2['3170000']!==undefined) {
                isMix = true;
              }
              if (jsonMixOrChampion2['3190000']) {
                isChampion = true;
              }
            }
            break;
          case "TYWQ":
            let jsonMixOrChampion3 = chargeMixOrChampion["TYWQ"]["3"];
            if (baseParam.dateType != '1') {
              if (jsonMixOrChampion3['3240000']!==null && jsonMixOrChampion3['3240000']!==undefined) {
                isMix = true;
              }
              if (jsonMixOrChampion3['3290000']) {
                isChampion = true;
              }
            }
            break;
          case "TYPQ":
            let jsonMixOrChampion4 = chargeMixOrChampion["TYPQ"]["3"];
            if (baseParam.dateType != '1') {
              if (jsonMixOrChampion4['3340000']!==null && jsonMixOrChampion4['3340000']!==undefined) {
                isMix = true;
              }
              if (jsonMixOrChampion4['3350000']) {
                isChampion = true;
              }
            }
            break;
          case "TYBQ":
            let jsonMixOrChampion5 = chargeMixOrChampion["TYBQ"]["3"];
            if (baseParam.dateType != '1') {
              if (jsonMixOrChampion5['3430000']!==null && jsonMixOrChampion5['3430000']!==undefined) {
                isMix = true;
              }
              if (jsonMixOrChampion5['3490000']) {
                isChampion = true;
              }
            }
            break;
          case "TYQT":
            let jsonMixOrChampion6 = chargeMixOrChampion["TYQT"]["1"];
            if (baseParam.dateType != '1') {
              if (jsonMixOrChampion6['3530000']!==null && jsonMixOrChampion6['3530000']!==undefined) {
                isMix = true;
              }
              if (jsonMixOrChampion6['3590000']) {
                isChampion = true;
              }
            }
            break;
          case "TYYM":
            let jsonMixOrChampion7 = chargeMixOrChampion["TYYM"]["3"];
            if (baseParam.dateType != '1') {
              if (jsonMixOrChampion7['3630000']!==null && jsonMixOrChampion7['3630000']!==undefined) {
                isMix = true;
              }
              /* if(data.result.bets['3190000']){

               }*/
            }
            break;
          case "TYSK":
            let jsonMixOrChampion8 = chargeMixOrChampion["TYSK"]["3"];
            if (baseParam.dateType != '1') {
              /*  if(data.result.bets['3170000']){

                }*/
              if (jsonMixOrChampion8['3730000']!==null) {
                isChampion = true;
              }
            }
            break;
          case "TYPP":
            let jsonMixOrChampion9 = chargeMixOrChampion["TYPP"]["3"];
            if (baseParam.dateType != '1') {
              if (jsonMixOrChampion9['3830000']!==null && jsonMixOrChampion9['3830000']!==undefined) {
                isMix = true;
              }
              /* if(data.result.bets['3190000']){

               }*/
            }
            break;
        }
      }
      let  playTabList =[];
      let single ={label:'让球&大小', name:'size', isMix:'0'};
      //排球叫让局，网球叫让盘
      if(baseParam.gameType === 'TYPQ'){
        single ={label:'让局&大小', name:'size', isMix:'0'};
      }else if(baseParam.gameType === 'TYWQ'){
        single ={label:'让盘&大小', name:'size', isMix:'0'};
      }
      playTabList.push(single);
      if(isMix){
        let mix = {label:'综合过关', name:'reach', isMix:'1'};
        playTabList.push(mix);
      }
      if(isChampion){
        let champion = {label:'冠军', name:'champion', isMix:'2'};
        playTabList.push(champion);
      }
      store.state.playTabList = playTabList;
    },

  //处理综合过关及冠军赛的查询
  resetOddsConditons:function(baseParam){
    switch (baseParam.gameType){
      case "TYZQ":
        if(baseParam.dateType!='1'){
          if(baseParam.isMix ==='1' ){
            return this.getMixAndChapion(baseParam.gameType,'3070000');
          }else if(baseParam.isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3090000');
          }else{
            return false;
          }
        }
        break;
      case "TYLM":
        if(baseParam.dateType!='1'){
          if(baseParam.isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3170000');
          }else if(baseParam.isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3190000');
          }else{
            return false;
          }
        }
        break;
      case "TYWQ":
        if(baseParam.dateType!='1'){
          if(baseParam.isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3240000');
          }else if(baseParam.isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3290000');
          }else{
            return false;
          }
        }
        break;
      case "TYPQ":
        if(baseParam.dateType!='1' ){
          if(baseParam.isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3340000');
          }else if(baseParam.isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3350000');
          }else{
            return false;
          }
        }
        break;
      case "TYBQ":
        if(baseParam.dateType!='1'){
          if(baseParam.isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3430000');
          }else if(baseParam.isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3490000');
          }else{
            return false;
          }
        }
        break;
      case "TYQT":
        if(baseParam.dateType!='1'){
          if(baseParam.isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3530000');
          }else if(baseParam.isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3590000');
          }else{
            return false;
          }
        }
        break;
      case "TYYM":
        if(baseParam.dateType!='1'){
          if(baseParam.isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3630000');
          }else{
            return false;
          }
        }
        break;
      case "TYSK":
        if(baseParam.dateType!='1' ){
          if(baseParam.isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3730000');
          }else{
            return false;
          }
        }
        break;
      case "TYPP":
        if(baseParam.dateType!='1' ){
          if(baseParam.isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3830000');
          }else{
            return false;
          }
        }
        break;
    }
  },
  getMixAndChapion(gameType,playId){
    let chargeMixOrChampion = store.state.chargeMixOrChampion;
    let jsonMixOrChampion = chargeMixOrChampion[gameType]["3"];
    let MixOrChampion = jsonMixOrChampion[playId];
    return MixOrChampion;
  },
  goToSystemMaintenance(){
        Router.push({path: '/home/system_maintanence'});
    },
    goTo(dataType,gameType) {
        let name = '滚球';
        if (dataType === '1') {
            name = '滚球';
            switch (gameType) {
                case 'TYZQ':
                    Router.push({path: '/home/sports_event_balls', query: {'ballName': '足球', 'nav_label': name}});
                    break;
                case 'TYLM':
                    Router.push({name: 'ballsbasketball', query: {'ballName': '篮球&美式足球', 'nav_label': name}});
                    break;
                case 'TYBQ':
                    Router.push({name: 'ballsbaseball', query: {'ballName': '棒球', 'nav_label': name}});
                    break;
                case 'TYWQ':
                    Router.push({name: 'ballstennisball', query: {'ballName': '网球', 'nav_label': name}});
                    break;
                case 'TYPQ':
                    Router.push({name: 'ballsvolleyball', query: {'ballName': '排球', 'nav_label': name}});
                    break;
                case 'TYQT':
                    Router.push({name: 'ballsotherball', query: {'ballName': '其他', 'nav_label': name}});
                    break;
            }
        } else if (dataType === '0') {
            name = '今日';
            switch (gameType) {
                case 'TYZQ':
                    Router.push({path: '/home/sports_event_today', query: {'ballName': '足球', 'nav_label': name}});
                    break;
                case 'TYLM':
                    Router.push({name: 'todaybasketball', query: {'ballName': '篮球&美式足球', 'nav_label': name}});
                    break;
                case 'TYBQ':
                    Router.push({name: 'todaybaseball', query: {'ballName': '棒球', 'nav_label': name}});
                    break;
                case 'TYWQ':
                    Router.push({name: 'todaytennisball', query: {'ballName': '网球', 'nav_label': name}});
                    break;
                case 'TYPQ':
                    Router.push({name: 'todayvolleyball', query: {'ballName': '排球', 'nav_label': name}});
                    break;
                case 'TYQT':
                    Router.push({name: 'todayotherball', query: {'ballName': '其他', 'nav_label': name}});
                    break;
            }
        } else {
            name = '早盘';
           /* if(morePlayDetail==='3'){*/
                switch (gameType) {
                    case 'TYZQ':
                        Router.push({path: '/home/sports_event_sessionDetail', query: {'ballName': '足球', 'nav_label': name}});
                        break;
                    case 'TYLM':
                        Router.push({name: 'morningbasketball', query: {'ballName': '篮球&美式足球', 'nav_label': name}});
                        break;
                    case 'TYBQ':
                        Router.push({name: 'morningbaseball', query: {'ballName': '棒球', 'nav_label': name}});
                        break;
                    case 'TYWQ':
                        Router.push({name: 'morningtennisball', query: {'ballName': '网球', 'nav_label': name}});
                        break;
                    case 'TYPQ':
                        Router.push({name: 'morningvolleyball', query: {'ballName': '排球', 'nav_label': name}});
                        break;
                    case 'TYQT':
                        Router.push({name: 'morningotherball', query: {'ballName': '其他', 'nav_label': name}});
                        break;
                }
           /* }else{
                switch (gameType) {
                    case 'TYZQ':
                        Router.push({path: '/home/sports_event_session',query: {'ballName': '足球', 'nav_label': name}});
                        break;
                    case 'TYLM':
                        Router.push({name: 'sessionbasketball', query: {'ballName': '篮球&美式足球', 'nav_label': name}});
                        break;
                    case 'TYBQ':
                        Router.push({name: 'sessionbaseball', query: {'ballName': '棒球', 'nav_label': name}});
                        break;
                    case 'TYWQ':
                        Router.push({name: 'sessiontennisball', query: {'ballName': '网球', 'nav_label': name}});
                        break;
                    case 'TYPQ':
                        Router.push({name: 'sessionvolleyball', query: {'ballName': '排球', 'nav_label': name}});
                        break;
                    case 'TYQT':
                        Router.push({name: 'sessionotherball', query: {'ballName': '其他', 'nav_label': name}});
                        break;
                }
            }*/
        }
    },
    morePlayGoTo(dataType,gameType){
        if (dataType === '1') {
            switch (gameType) {
                case 'TYZQ':
                    Router.push({path: '/home/football_play'})
                    break;
                case 'TYLM':
                    Router.push({path: '/home/basketball_play'});
                    break;
                case 'TYBQ':
                    Router.push({path: '/home/baseball_play'});
                    break;
                case 'TYWQ':
                    Router.push({path: '/home/tennisball_play'});
                    break;

                case 'TYQT':
                    Router.push({path: '/home/otherball_play'});
                    break;
                case 'TYPQ':
                    Router.push({path: '/home/volleyball_play'});
            }
        } else if (dataType === '0') {
            switch (gameType) {
                case 'TYZQ':
                    Router.push({path: '/home/football_play'})
                    break;
                case 'TYLM':
                    Router.push({path: '/home/basketball_play'});
                    break;
                case 'TYBQ':
                    Router.push({path: '/home/baseball_play'});
                    break;
                case 'TYWQ':
                    Router.push({path: '/home/tennisball_play'});
                    break;
                case 'TYPQ':
                    Router.push({path: '/home/volleyball_play'});
                    break;
                case 'TYQT':
                    Router.push({path: '/home/otherball_play'});
                    break;
            }
        } else {
            switch (gameType) {
                case 'TYZQ':
                    Router.push({path: '/home/football_play'})
                    break;
                case 'TYLM':
                    Router.push({path: '/home/basketball_play'});
                    break;
                case 'TYBQ':
                    Router.push({path: '/home/baseball_play'});
                    break;
                case 'TYWQ':
                    Router.push({path: '/home/tennisball_play'});
                    break;
                case 'TYPQ':
                    Router.push({path: '/home/volleyball_play'});
                    break;
                case 'TYQT':
                    Router.push({path: '/home/otherball_play'});
                    break;
            }
        }

    },
    playTypeIsShow(data){
      if(data && data.result && data.result.data ){
        let dateType = store.state.baseParam.gameType;
        if(dateType==''){
          dateType = 'TYZQ';
        }
        this[dateType + 'PlayIsShow'](data.result.data)//字符串拼接掉球类方法
      }
    },
    TYZQPlayIsShow(obj) { //足球判断玩法是否展示
        let ob = this.BallPlayIsShow()
        for (let i in obj) {
            let item = obj[i]
            ob.isqcrq[i] = Util.isNotEmpty(item.a_concede_h, item.a_concede_g)
            ob.isbcrq[i] = Util.isNotEmpty(item.u_concede_h, item.u_concede_g)
            ob.isqcdx[i] = Util.isNotEmpty(item.a_d_num, item.a_x_num)
            ob.isbcdx[i] = Util.isNotEmpty(item.u_d_num, item.u_x_num)
            ob.isds[i] = Util.isNotEmpty(item.a_d_odds, item.a_s_odds)
            ob.isdy[i] = Util.isNotEmpty(item.a_capot_h, item.a_capot_g)
            ob.isbcdy[i] = Util.isNotEmpty(item.u_capot_h, item.u_capot_g)
            ob.isbcbd[i] = Util.isNotEmpty(item.footballHalfCorrect)
            ob.isbd[i] = Util.isNotEmpty(item.footballCorrect)
            ob.iszjq[i] = Util.isNotEmpty(item.footballGoals)
            ob.isbqc[i] = Util.isNotEmpty(item.footballHta)
            //  this.addggSelectClass(that, item)
        }
        this.arrayAllisTrue(ob)
    },
    TYLMPlayIsShow(obj, that) { //篮球判断玩法是否展示
        let ob = this.BallPlayIsShow()
        for (let i in obj) {
            let item = obj[i]
            ob.isdy[i] = Util.isNotEmpty(item.capot_h, item.capot_g)
            ob.isqcrq[i] = Util.isNotEmpty(item.concede_h, item.concede_g)
            ob.isqcdx[i] = Util.isNotEmpty(item.d_num, item.x_num)
            ob.isqddfz[i] = Util.isNotEmpty(item.ior_OUHO, item.ior_OUHU)
            ob.isqddfk[i] = Util.isNotEmpty(item.ior_OUCO, item.ior_OUCU)
            //this.addggSelectClass(this, item)
        }
        this.arrayAllisTrue(ob)
    },
    TYBQPlayIsShow(obj) { //棒球判断玩法是否展示
        let ob = this.BallPlayIsShow()
        for (let i in obj) {
            let item = obj[i]
            ob.isqcrq[i] = Util.isNotEmpty(item.dIorRH, item.dIorRC)
            ob.isqcdx[i] = Util.isNotEmpty(item.dIorOUH, item.dIorOUC)
            ob.isds[i] = Util.isNotEmpty(item.dIorEOO, item.dIorEOE)
            ob.isdy[i] = Util.isNotEmpty(item.dIorMH, item.dIorMC)
            ob.isbcdx[i] = Util.isNotEmpty(item.ior_HOUH, item.ior_HOUC)
            ob.isbcrq[i] = Util.isNotEmpty(item.ior_HRH, item.ior_HRC)
            ob.isbcdy[i] = Util.isNotEmpty(item.ior_HMH, item.ior_HMC)
            //this.addggSelectClass(this, item)
        }
        this.arrayAllisTrue(ob)
    },
    TYWQPlayIsShow(obj) { //网球判断玩法是否展示
        let ismix = Number.parseInt(this.isMix) !== 0
        let ob = this.BallPlayIsShow()
        try {
            for (let i in obj) {
                let item = obj[i]
                ob.isqcrq[i] = Util.isNotEmpty(item.dIorRH, item.dIorRC)
                ob.isdy[i] = Util.isNotEmpty(item.dIorMH, item.dIorMC)
                ob.isqcdx[i] = Util.isNotEmpty(item.dIorOUH, item.dIorOUC)
                ob.isqddfz[i] = Util.isNotEmpty(item.ior_OUHO, item.ior_OUHU)
                ob.isqddfk[i] = Util.isNotEmpty(item.ior_OUCO, item.ior_OUCU)
                this.WPaddShow(obj[i], i)
                //this.addggSelectClass(that, item)
            }

        } catch (e) {
            console.log(e, 'BallData', obj)
        }
        try {
            let arr = [], arr1 = [], data = obj.concat()
            for (let k = 0; k < data.length - 1; k++) {
                if (data[k].hteam === data[k + 1].hteam) {
                    if (ismix) {
                        data[k]['ggSelect' + data[k].id + 'zr'] = data[k]['ggSelect' + data[k + 1].id + 'zr'] =
                            data[k]['ggSelect' + data[k].id + 'kr'] = data[k]['ggSelect' + data[k + 1].id + 'kr'] = false
                        //   this.addSelectClass(this, data[k])
                    }
                    arr1.push(data[k], data[k + 1])
                    arr1['hteam'] = data[k].hteam
                    arr1['showContent'] = 'showContent2' + k
                    arr1['maxHeight'] = {
                        slide: true,
                        animate: true
                    }
                    arr.push(arr1);
                    arr1 = [];
                }
            }
            this.WPBallData=[...arr];
            store.commit("add_WPBallData",[...arr]);
        } catch (e) {
            console.log(e, 'WPBallData', this.WPBallData);
        }
        this.arrayAllisTrue(ob);
    },
    TYPQPlayIsShow(obj) { //排球判断玩法是否展示
        let ob = this.BallPlayIsShow()
        for (let i in obj) {
            let item = obj[i]
            ob.isqcrq[i] = Util.isNotEmpty(item.dIorRH, item.dIorRC)
            ob.isqcdx[i] = Util.isNotEmpty(item.dIorOUH, item.dIorOUC)
            ob.isdy[i] = Util.isNotEmpty(item.dIorMH, item.dIorMC)
            ob.isqddfz[i] = Util.isNotEmpty(item.ior_OUHO, item.ior_OUHU)
            ob.isqddfk[i] = Util.isNotEmpty(item.ior_OUCO, item.ior_OUCU)
            this.WPaddShow(obj[i], i);
            // this.addggSelectClass(this, item)
        }
        this.arrayAllisTrue(ob)
    },
    TYQTPlayIsShow(obj) { //其他判断玩法是否展示
        let ob = this.BallPlayIsShow()
        for (let i in obj) {
            let item = obj[i]
            ob.isqcrq[i] = Util.isNotEmpty(item.dIorRH, item.dIorRC)
            ob.isqcdx[i] = Util.isNotEmpty(item.dIorOUH, item.dIorOUC)
            ob.isds[i] = Util.isNotEmpty(item.dIorEOO, item.dIorEOE)
            ob.isdy[i] = Util.isNotEmpty(item.dIorMH, item.dIorMC)
            //  this.addggSelectClass(this, item)
        }
        this.arrayAllisTrue(ob)
    },
    arrayAllisTrue: function (obj) {
        for (let vle in obj) {
            let v = obj[vle]
            for (let i = 0; i < v.length - 1; i++) {
                v[i + 1] = v[i] || v[i + 1]
            }
            obj[vle] = v[v.length - 1]
        }
        store.commit("add_PalyTypeIsShwo",obj)
    },
    WPaddShow(obj, i) {
        obj.showContent = ['showrq' + i, 'showdx' + i, 'showdy' + i, 'showdfz' + i, 'showdfk' + i]
        obj.maxHeight = [{
            slide: true,
            animate: true
        }, {
            slide: true,
            animate: true
        }, {
            slide: true,
            animate: true
        }, {
            slide: true,
            animate: true
        }, {
            slide: true,
            animate: true
        }]
    },
    getLeaguage(isFlag){
        let baseParam = store.state.baseParam;
        let type = 'r';
        switch (baseParam.dateType){
            case '2':
                type = 'f';
                break;
            case '1':
                type = 'r';
                break;
            case '0':
                type = 't';
                break;
        }
        let lottery = '30';
        switch (baseParam.gameType){
            case "TYZQ":
                lottery = '30';
                break;
            case "TYLM":
                lottery = '31';
                break;
            case "TYWQ":
                lottery = '32';
                break;
            case "TYPQ":
                lottery = '33';
                break;
            case "TYBQ":
                lottery = '34';
                break;
            case "TYQT":
                lottery = '35';
                break;
            case "TYYM":
                lottery = '36';
                break;
            case "TYSK":
                lottery = '37';
                break;
            case "TYPP":
                lottery = '38';
                break;
        }
        let playType = baseParam.isMix;
        if(playType!='1'){
          if(baseParam.gameType==='TYZQ'){
            playType=["single","hta","correct","goals","halfCorrect"];
          }else{
            playType='single';
          }

        }else{
            playType='mix';
        }
        let params={
            'type':type,
            'lottery':lottery,
            'playType':playType,
            'dateType':baseParam.dateType,
            'gameType':baseParam.gameType

        }
        base.methods.getLeague(params,isFlag)

    },

  setHotMatchMain(data){
      console.log(Util.formatDate.UnixToDate(data.endTime,0,'yMDhms'),"Util.formatDate.UnixToDate(data.endTime,0,'yMDhms')")
    let playMaintenance={
      title:'玩法维护中',
      question_reason:'0',
      content:'',
      content_time_before:'预计将会在',
      content_time:Util.formatDate.UnixToDate(data.endTime,0,'yMDhms')+ '\xa0'+'(GMT+8)',
      content_time_after:'完成，感谢您的耐心等待',
    }
    store.commit("add_playMaintenance",playMaintenance);
  },

    setPlayMaintenance(data){
        let playMaintenance={
            title:'玩法维护中',
            question_reason:'0',
            content:'',
            content_time_before:'预计将会在',
            content_time:Util.formatDate.UnixToDate(data.result,0,'yMDhms')+ '\xa0'+'(GMT+8)',//\xa0输出一个空格
            content_time_after:'完成，感谢您的耐心等待',
        }
        store.commit("add_playMaintenance",playMaintenance);
    },

    //跳转到暂无数据
    setNoData(){
        let playMaintenance={
            title:'暂时无数据',
            question_reason:'3',
            content:'您所在的页面当前无数据',
            content_time_before:'',
            content_time:'',
            content_time_after:'',
        }
        store.commit("add_playMaintenance",playMaintenance);
    },
    //处理投注历史
    betRecordProcess(data){
        let resolved_order = [];         //初始化已结算数据
        let rs = data.result.data;
        let len = rs.result.length;
        let all_data_len = rs.paging.totalCount;
        let countBetAmount = rs.countBetAmount;
        let countBetAward = rs.countBetAward;
        if(data.code === '200' && len > 0){
          if(rs.paging.pageNumber===1){
            resolved_order = rs.result;
          }else{
            resolved_order = store.state.resolved_data;
            resolved_order = resolved_order.concat( rs.result);
          }
        }else {
            //跳转到暂无数
            this.setNoData();
        }
      store.state.countBetAmount = countBetAmount;
      store.state.countBetAward = countBetAward;
      store.commit('add_betRecord_data', {
          resolved_data: resolved_order,
          unres_data_len: all_data_len,
      });
    },
  //判断当前是否要开启缓存的定时刷新和读取缓存
   startCacheThred(){
     let baseParam = store.state.baseParam;
     //当前所处的焦点页面
     let dateType = baseParam.dateType;
     let gameType = baseParam.gameType;
     let playType = baseParam.isMix;

     //需要定时刷新缓存的今日早盘
     let needDateType = ['0','2'];
     //需要定时刷新缓存的球类
     let needGameType = ['TYZQ'];

     //需要定时刷新的玩法，单式，综合过关
     let needPlayType = ['0','1'];
     if (tools.isExistsVal(gameType,needGameType)
       && tools.isExistsVal(dateType,needDateType)
       && tools.isExistsVal(playType,needPlayType)){
        return true;
     }
     return false;
   },
    //用来取今日早盘缓存数据的定时器
    getMorTodayData(){
      console.log(store.state.timerFresh,"store.state.timerFresh")
      if(store.state.timerFresh){ //不在赔率页面不执行刷新
        base.methods.getMorTodayMatches("Y");  //今日
      }
    },
    getSystemMaintanceTime(){
      let systemMaintanceCode =  store.state.systemMaintanceCode;
      if(systemMaintanceCode==='D000'){
        base.methods.getSystemMaintanceTime(false);
      }
    },
    getData(initNum,flag) {
      if(!store.state.timerFresh){
        //不是赛事赔率页面不用定时刷新赔率
        return;
      }
      if(!store.state.loginStatus){
        return;
      }
      let isMore = store.state.isMore;
      let isHome = store.state.isHome;
      if (!isMore && !isHome) {
        base.methods.getMatches(flag);
      }else if(isMore) {
        let params = store.state.moreParams;
        base.methods.getMorePlay(params, flag);
      }else if(isHome && initNum>1){
        base.methods.getGameType(flag);
        base.methods.getHotMatches(flag);
      }

    },
  underlineWidths:function () {
    let playTabList = store.state.playTabList;
    if(playTabList.length===1){
      return "100%"
    }else if(playTabList.length===2){
      return "50%"
    }else if(playTabList.length===3){
      return "33.33%"
    }
  },
  chargeMixOrChampion:function (data) {
      if(data.result.openItem){
        let datar = data.result.openItem;
        store.commit("setChargeMixOrChampion",datar);
      }
  },
  //赛事排序
  sortData(data, league) {
    let copy = {}
    let keys = Object.keys(data)
    league.map(x => {
      keys.map(y => {
        if (x.name === y) copy[y] = data[y]
      })
    })
    return copy
  },

  //构造赛事
  filterData: function (data, league) { //过滤添加排序
    let mixClass
    let baseParam = store.state.baseParam;
    if (baseParam.dateType !== '1') {
      mixClass = this.data.mixClass[baseParam.dateType][baseParam.gameType]
    }

    data = this.sortData(data, league)

    let number = 0

    let animate = baseParam.dateType + '' === '1'
    let copyObj = {}
    for (let i in data) {
      for (let k in data[i]) {
        if (!Number.isNaN(Number.parseInt(k))) {
          let item = data[i][k]
          if (baseParam.isMix + '' === '1') {
            item[item.id + 'zr'] = false
            item[item.id + 'kr'] = false
            if (baseParam.gameType === 'TYWQ' || baseParam.gameType === 'TYPQ') {
              item[item.id + 'dyz'] = false
              item[item.id + 'dyk'] = false
            } else {
              item[item.id + 'dxqd'] = false
              item[item.id + 'dxqx'] = false
            }
            for (let j in mixClass) {
              let arr1 = mixClass[j]
              for (let h in arr1) {
                if (h === item.onlykey) {
                  for (let o in arr1[h]) {
                    item[o] = true
                  }
                }
              }
            }
          }
        }
      }
      let maxHeight = store.state.leagueNames.get(i)
      copyObj[i] = []
      if (maxHeight !== undefined && maxHeight !== null && maxHeight.animate === true) {
        copyObj[i] = [...data[i]]
      }
      copyObj[i].showContent = data[i].showContent = "showContent" + number++
      copyObj[i].maxHeight = data[i].maxHeight = maxHeight === undefined ? {slide: true, animate: animate} : maxHeight
      copyObj[i].sum = data[i].sum = data[i].length
    }

    this.data.copyMsg = data
    this.data.matchesMsg = baseParam.dateType + '' === '1' ? data : copyObj;
    store.commit('add_datas',this.data.matchesMsg);
    store.commit('setCopyMsg',this.data.copyMsg);
  },

  //构造联赛赛事
  filterLeagueData: function (data) { //过滤添加排序
    let copyObj = {}
    let number = 0
    for (let i in data) {
      copyObj[i].showContent  = "showContent" + number++
    }
    store.commit('add_league_data',copyObj);
  },

  childShowTitle: function (clirdShow, e, that) {
    let data = store.state.datas;
    let copyMsg = store.state.copyMsg;
    for (let i in data) {
      if (data[i]['showContent'] === e) {
        if (store.state.baseParam.dateType + '' === '1') {
          data[i]['maxHeight'].animate = !data[i]['maxHeight'].animate
        } else {
          copyMsg[i]['maxHeight'].animate = data[i]['maxHeight'].animate = !data[i]['maxHeight'].animate
          data[i] = copyMsg[i]
        }
        store.state.leagueNames.set(i, data[i]['maxHeight'])
        break
      }
    }
    store.commit("add_datas",data);
    that.clirdShow = clirdShow
  },

  setOddsChangeTag(isMix){
    let oddsTag = store.state.oddsChangeTag;
    oddsTag.oldTag = oddsTag.newTag;
    oddsTag.newTag = isMix;
    store.commit("setOddsChangeTag",oddsTag);
  },
  setOpenItemStorage(data){
    let datar = data.result.openItem;
    store.commit("setOpenItemStorage",datar);
  },
  //初始化判断
  setInitCharge(){
    let chargeMixOrChampion = store.state.chargeMixOrChampion;
    store.commit("setChargeMixOrChampion",chargeMixOrChampion);
  },
  chargePlate(data){
      if(data.result && data.result.plate) {
        let plateSwitch = data.result.plate.plateSwitch;
        if (plateSwitch) {
          //自动设置盘口
          let newPlate = data.result.plate.first;
          base.methods.setPlate(newPlate);
          //弹出提示
          store.state.infoMsg = data.result.plate.message;
          // tools.showMessege(store.state.infoMsg);
          store.commit('updateDialog', {isShow: true, showInfo: false,content: store.state.infoMsg})
        /*  store.state.toasting = true;
          setTimeout(() => {
            store.state.toasting = false;
          }, 3000)*/
        }
      }
  },
  newOddsChargePlate(data){
    if(data.result) {
      let plateSwitch = data.result[0].plateInfo.plateSwitch;
      if (plateSwitch) {
        //自动设置盘口
        let newPlate = data.result[0].plateInfo.first;
        base.methods.setPlate(newPlate);
        //弹出提示
        let message = data.result[0].plateInfo.message;
        // tools.showMessege(message);
        store.commit('updateDialog', {isShow: true, showInfo: false,content: message})
        /*store.state.toasting = true;
        setTimeout(() => {
          store.state.toasting = false;
        }, 3000)*/
      }
    }
  },
  repeatZqCache(data,baseParam){
    //今日早盘的足球时，才覆盖缓存数据
    let startCacheThred = this.startCacheThred();
    if(startCacheThred){
      let version = new Date().getTime();
      store.state.cacheData[baseParam.gameType][baseParam.dateType][baseParam.isMix].version  = version;
      store.state.cacheData[baseParam.gameType][baseParam.dateType][baseParam.isMix].data  = data;
    }
  },
  getNewOddsParams(){
    let newOddsParams = [];
    let gameType = store.state.baseParam.gameType;
    switch (gameType){
      case "TYZQ":
        newOddsParams = store.state.zqOddsParams;
        break;
      case "TYLM":
        newOddsParams = store.state.lmOddsParams;
        break;
      case "TYWQ":
        newOddsParams = store.state.wqOddsParams;
        break;
      case "TYPQ":
        newOddsParams = store.state.pqOddsParams;
        break;
      case "TYBQ":
        newOddsParams = store.state.bqOddsParams;
        break;
      case "TYQT":
        newOddsParams = store.state.qtOddsParams;
        break;
    }
    return newOddsParams;
  },
  setSysFreqParams(data){
      if(data.result.value) {
        let configParam = JSON.parse(data.result.value);
        if (configParam.liveFreq > 0 && configParam.liveFreq != null)
          store.state.sysFreqParams.liveFreq = configParam.liveFreq / 1000;
        if (configParam.todayFreq > 0 && configParam.todayFreq != null)
          store.state.sysFreqParams.todayFreq = configParam.todayFreq / 1000;
        if (configParam.morningFreq > 0 && configParam.morningFreq != null)
          store.state.sysFreqParams.morningFreq = configParam.morningFreq / 1000;
        if (configParam.hotFreq > 0 && configParam.hotFreq != null)
          store.state.sysFreqParams.hotFreq = configParam.hotFreq / 1000;
        if (configParam.noticeFreq > 0 && configParam.noticeFreq != null)
          store.state.sysFreqParams.noticeFreq = configParam.noticeFreq / 1000;
        if (configParam.betFreq > 0 && configParam.betFreq != null)
          store.state.sysFreqParams.betFreq = configParam.betFreq / 1000;
        if (configParam.playMFreq > 0 && configParam.playMFreq != null)
          store.state.sysFreqParams.playMFreq = configParam.playMFreq / 1000;
        if (configParam.systemMFreq > 0 && configParam.systemMFreq != null)
          store.state.sysFreqParams.systemMFreq = configParam.systemMFreq / 1000;
        if (configParam.mixFreq > 0 && configParam.mixFreq != null)
          store.state.sysFreqParams.mixFreq = configParam.mixFreq / 1000;
        if (configParam.httpTimeout > 0 && configParam.httpTimeout != null)
          store.state.sysFreqParams.httpTimeout = configParam.httpTimeout;
        if (configParam.noticePollNum > 0 && configParam.noticePollNum != null)
          store.state.sysFreqParams.noticePollNum = configParam.noticePollNum;
        if (configParam.chartPollNum > 0 && configParam.chartPollNum != null)
          store.state.sysFreqParams.chartPollNum = configParam.chartPollNum;
      }
     let dateType = store.state.baseParam.dateType;
     store.state.noticeCountDown = store.state.sysFreqParams.noticeFreq;
     let countDown =  store.state.sysFreqParams.liveFreq
     if(dateType=='0'){
          countDown = store.state.sysFreqParams.todayFreq;
      }else if(dateType =='1'){
          countDown = store.state.sysFreqParams.morningFreq;
      }
  },
  setSystemMaintance(error){
    store.state.timerFresh = true;
    store.state.systemMaintanceCode = 'D000'
    store.state.is_showModal = false;
    document.title = '網站維護中';
    let playMaintenance = {
      title: '系统维护中',
      question_reason: '1',
      content: '',
      content_time_before: '预计将会在',
      content_time: error.data.result.beijingEndTime+ '\xa0'+'(GMT+8)',
      content_time_after: '完成，感谢您的耐心等待',
    }
    store.commit("add_playMaintenance", playMaintenance);
    //跳转到玩法维护
    this.goToSystemMaintenance();
  },
  setStopVis(){
    store.state.timerFresh = true;
    store.state.systemMaintanceCode = ''
    store.state.is_showModal = false;
    document.title = '禁止访问';
    let playMaintenance = {
      title: '所在地区禁止访问',
      question_reason: '7',
      content: '很抱歉！您所在地区禁止访问',
    }
    store.commit("add_playMaintenance", playMaintenance);
    //跳转到玩法维护
    this.goToSystemMaintenance();
  },
  setNotNetWork(){
    store.state.timerFresh = true;
    store.state.systemMaintanceCode = 'D000';
    store.state.is_showModal = false;
    document.title = '网络不给力';
    let playMaintenance = {
      title: '网络中断',
      question_reason: '5',
      content: '世界上最遥远的距离，莫过于网络不给力',
    }
    store.commit("add_playMaintenance", playMaintenance);
    //跳转到玩法维护
    this.goToSystemMaintenance();
  },
  setHotMatachesDate(data){
    //解析热点数据
    if(data.result && data.result.hotMatches && data.result.hotMatches.zqData){
      store.commit('setZqHotData',data.result.hotMatches.zqData);
    }else{
      store.commit('setZqHotData',[]);
    }
    if(data.result && data.result.hotMatches && data.result.hotMatches.zqTimeZone){
      store.state.hotDateType.zqDateType = data.result.hotMatches.zqTimeZone;
    }
    if(data.result && data.result.hotMatches && data.result.hotMatches.lmData){
      store.commit('setLmHotData',data.result.hotMatches.lmData);
    }else{
      store.commit('setLmHotData',[]);
    }
    if(data.result && data.result.hotMatches && data.result.hotMatches.lmTimeZone){
      store.state.hotDateType.lmDateType = data.result.hotMatches.lmTimeZone;
    }

    if(data.result && data.result.hotMatches && data.result.hotMatches.bqData){
      store.commit('setBqHotData',data.result.hotMatches.bqData);
    }else{
      store.commit('setBqHotData',[]);
    }
    if(data.result && data.result.hotMatches && data.result.hotMatches.bqTimeZone){
      store.state.hotDateType.bqDateType = data.result.hotMatches.bqTimeZone;
    }

    if(data.result && data.result.hotMatches && data.result.hotMatches.wqData){
      store.commit('setWqHotData',data.result.hotMatches.wqData);
    }else{
      store.commit('setWqHotData',[]);
    }
    if(data.result && data.result.hotMatches && data.result.hotMatches.wqTimeZone){
      store.state.hotDateType.wqDateType = data.result.hotMatches.wqTimeZone;
    }

    if(data.result && data.result.hotMatches && data.result.hotMatches.pqData){
      store.commit('setPqHotData',data.result.hotMatches.pqData);
    }else{
      store.commit('setPqHotData',[]);
    }
    if(data.result && data.result.hotMatches && data.result.hotMatches.pqTimeZone){
      store.state.hotDateType.pqDateType = data.result.hotMatches.pqTimeZone;
    }

    if(data.result && data.result.hotMatches && data.result.hotMatches.qtData){
      store.commit('setQtHotData',data.result.hotMatches.qtData);
    }else{
      store.commit('setQtHotData',[]);
    }
    if(data.result && data.result.hotMatches && data.result.hotMatches.zqTimeZone){
      store.state.hotDateType.qtDateType = data.result.hotMatches.qtTimeZone;
    }
    store.commit("setHotPlayType",[])
  },
  chargeVersion(version){
    //判断数据的有效
    let now = new Date().getTime();
    let voildDate = now-version;
    let date = new Date(voildDate).getSeconds();
    let todayTime = store.state.sysFreqParams.todayFreq;
    let dateType = store.state.baseParam.dateType;
    if(dateType=='0'){
      todayTime = store.state.sysFreqParams.todayFreq;
    }else if(dateType =='2'){
      todayTime = store.state.sysFreqParams.morningFreq;
    }

    let sysParam = todayTime; //缓存过期时间
    console.log(date,sysParam,"date")
    if(date-sysParam>0){
      return false;
    }
   store.state.countDown =  sysParam-date;
   return true;
  },
  dealCacheData(obj,baseParam){
   let data =obj.data;
    store.state.init.odds = true;
    store.state.maintanceCode = '';
   // this.setOddsChangeTag(baseParam.isMix);
    if(data && data.result){
      if(data.code==='D000'){
        store.state.maintanceCode = data.code;
        store.commit('add_datas',[]);
        this.setPlayMaintenance(data);
      }else if(data.result.data){
        this.chargeMixOrChampion(data);
        this.getGamePlayObj2(data,baseParam);
        console.log(data.result,"data.result")
        console.log(baseParam.dateType,"baseParam.dateType")
        this.ballKinds_process(data.result.type_sum[baseParam.dateType]);
        //    store.commit('add_datas',data.result);
        store.commit('mixBetLimit', {mixMax: data.result.mixMax, mixMin: data.result.mixMin});
        store.commit('add_datas',data.result.data);
      }else{
        this.chargeMixOrChampion(data);
        this.setPlayTable(baseParam);
        store.commit('add_datas',[]);
        this.setNoData();
      }
    }
    this.goTo(baseParam.dateType, baseParam.gameType);
    store.state.timerFresh = true;
    setTimeout(() => {
      store.commit('showLoading',false);
    }, 200);

    //有缓存，要判断数据有效期

    let version = this.chargeVersion(obj.version);
    console.log(version,"version")
    if(!version){
      this.getMatches(true);
      return;
    }

  },

  getLocalStorage_bk(path) {
    let _this=this
    let newPath = ''
    let image_url = path.split("/")
    let imageName = image_url[image_url.length - 1].split(".")[0]
    /*判断是否支持缓存，支持并且存在缓存的情况下，就从缓存中获得图片内容*/
    if (window.localStorage && _this.getLocalStorage('ad_back_logo_img' + imageName)!=null) {
      var srcStr = _this.getLocalStorage('ad_back_logo_img' + imageName);  //这里是从缓存中获得我们保存的内容，键值对的形式
      newPath = srcStr
      /*不支持缓存或者缓存不存在情况下，按照正常流程由服务器获得图片*/
    } else {
      //判断是否支持缓存，支持，就将图片缓存，不支持不作任何操作
      if (window.localStorage) {
        //把你需要的东东存到缓存里，
        try {
            tools.getBase64Image(path, function(data) {
            _this.setLocalStorage('ad_back_logo_img' + imageName, data);
            newPath = data
          })
        } catch (e) {
          console.log('Storage failed: ' + e);
        }
      }else{
        newPath = path
      }
    }
    return newPath
  },


        setLocalStorage(key, value)
        {
          var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
          var valueDate = JSON.stringify({
            val: value,
            timer: curtime
          });
          try {
            localStorage.setItem(key, valueDate);
          } catch (e) {

            // 兼容性写法
            if (this.isQuotaExceeded(e)) {
              console.log("Error: 本地存储超过限制");
              localStorage.clear();
            } else {
              console.log("Error: 保存到本地存储失败");
            }
          }
        },

         isQuotaExceeded(e) {
          var quotaExceeded = false;
          if (e) {
            if (e.code) {
              switch (e.code) {
                case 22:
                  quotaExceeded = true;
                  break;
                case 1014: // Firefox
                  if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                    quotaExceeded = true;
                  }
                  break;
              }
            } else if (e.number === -2147024882) { // IE8
              quotaExceeded = true;
            }
          }
          return quotaExceeded;
        },

        getLocalStorage(key) {
          var exp = 60 * 60 * 1000*24; // 一天的秒数
          if (localStorage.getItem(key)) {
            var vals = localStorage.getItem(key); // 获取本地存储的值
            var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
            // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
            var isTimed = (new Date().getTime() - dataObj.timer) > exp;
            if (isTimed) {
              console.log("存储已过期");
              localStorage.removeItem(key);
              return null;
            } else {
              var newValue = dataObj.val;
            }
            return newValue;
          } else {
            return null;
          }
        },
        getCountDown(){
          let countDown = 10;
          let baseParam = store.state.baseParam;
          let dateType = baseParam.dateType;
          let isMix = baseParam.isMix;
          let maintanceCode = store.state.maintanceCode;
          console.log(dateType,"dateType")
          if(dateType==='1'){ //滚球
            countDown = store.state.sysFreqParams.liveFreq;
          }else if(dateType==='0'){// 今日
            countDown = store.state.sysFreqParams.todayFreq;
          }else if(dateType==='2'){ //早盘
            countDown = store.state.sysFreqParams.morningFreq;
          }
          if(isMix==='1'){ //综合过关
            countDown = store.state.sysFreqParams.mixFreq;
          }
          //当玩法维护或系统维护是，定时器调整为10m刷新一次
          if(maintanceCode==='D000'){
            countDown = store.state.sysFreqParams.playMFreq;
          }
          if(store.state.isHome){
            countDown = store.state.sysFreqParams.hotFreq;
          }
          console.log(countDown,"countDown")
          return countDown;
        }


}
