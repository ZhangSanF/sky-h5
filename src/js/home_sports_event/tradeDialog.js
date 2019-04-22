import BScroll from 'better-scroll';
import {store, base, showBet, storages, tools, process} from '@/js/public/port';
import betClassify2 from '../../components/playTypeJson/playType2';
import Util from '../util/util'
import toast from '../../components/toast'
import isDelete from '@/components/isDelete'

export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      userBetData: [],
      timerCount: store.state.sysFreqParams.betFreq,
      timerTask: null,

      oddsData: [{odds: '', exOdds: '', detail: '', status: '', hScore: '', gScore: '', isWho: '', xDetail: ''}],//赔率
      newOddsDatas: [],
      showTextObj: [{hTeam: '', gTeam: '', playName: '', betPoint: '', dateType: '', leagueName: '', isMix: ''}],//下注时展示的主客队，玩法，投注点和滚球今日早盘
      userBalance: 0,
      minBet: '',//限额
      maxBet: '',
      maxAllowWinMoney: '',//最多可赢金额
      inputMoney: '',//下注金额
      chooseRadio: true,  //是否自动获取最佳赔率
      focusState: true,
      isClose: false,
      itemIndex: null,
      oldMsg: [],
      newMsg: [],
      ua: window.navigator.userAgent
    }
  },
  components: {toast, isDelete},
  mounted() {
    if(this.ua.indexOf('Android') > -1 || this.ua.indexOf('Adr') > -1) {
        // console.log('Android')
        let originalHeight = this.$refs.bet.clientHeight
        // console.log(originalHeight) 380
        if(store.state.baseParam.isMix != 0) {
            window.onresize = function() {
                let resizeHeight = this.$refs.bet.clientHeight
                // console.log(resizeHeight)
                if(resizeHeight - 0 < originalHeight - 0){
                    //当软键盘弹起，在此处操作
                    this.$refs.bet.style.transform = 'translate(-50%, -80%)'
                }else{
                    //当软键盘收起，在此处操作
                    this.$refs.bet.style.transform = ''
                }
            }
        }
    } else {
        // console.log('iphone')
        let _this = this
        let inputMoneyId = document.getElementById('inputMoneyId')
        if(store.state.baseParam.isMix != 0) {
            inputMoneyId.addEventListener('focus', function() {
                _this.$refs.bet.style.transform = 'translate(-50%, -80%)'
            })
            inputMoneyId.addEventListener('blur', function() {
                _this.$refs.bet.style.transform = ''
            })
        }
    }
    store.state.infoMsg = '';
    store.state.orderState = 'toConfirm';
    // 请求最新赔率
    this.reqNewOdds();
    base.methods.getToken(); //发起token请求
    //获取当前余额
    let user = storages.getUserObjSession("user");
    this.userBalance = user.money;
    //DOM还没更新
    let _this = this;
    _this.$nextTick(() => {
      //现在DOM更新了
      //'this'绑定到当前实例
      if(_this.$refs.dataWrapper) {
        if (!_this.scroll) {
          _this.scroll = new BScroll(_this.$refs.dataWrapper, {
            hasVerticalScroll: true,
            click: true,
          })
        } else {
          _this.scroll.refresh();
        }
      }
    });
    this.initTimer();
  },
  methods: {
    // inputFocus(){
    //   if(store.state.baseParam.isMix != 0) {
    //     this.$refs.bet.style.transform = 'translate(-50%, -80%)'
    //   }
    // },
    // inputBlur() {
    //   this.$refs.bet.style.top = '';
    //   this.$refs.bet.style.transform = ''
    // },
    oddsChange(index, propertyKey) {
      let val = '0';
      if (this.newOddsDatas && this.newOddsDatas[index] && this.newOddsDatas[index][propertyKey]) {
        val = this.newOddsDatas[index][propertyKey];
      }
      return store.state.oddClassObj['oddsCss1'][val];

    },
    updateDelete(data) {
      this.isClose = false
      if (data == 0) {
        return
      } else {
        // let reqParams = store.state.newOddsParams;
        let reqParams = process.getNewOddsParams();
        reqParams.splice(this.itemIndex, 1);
        store.commit("newOddsParams", reqParams);
        if (reqParams.length == 0) {
          store.state.is_showModal = false;
          return;
        }
        this.reqNewOdds();
      }
    },
    refreshTimer() {
      this.timerCount = store.state.sysFreqParams.betFreq;
      window.clearInterval(this.timerTask);
      this.tradeWindowClose();
    },
    winFormatMoney(data) {
      return Util.winFormatMoney(data);
    },
    showToast: function () {
      store.state.toasting = true;
      setTimeout(() => {
        store.state.toasting = false;
      }, 2000)
    },
    /** 获取最新赔率 */
    reqNewOdds: function () {
      let newOddsParams = [];
      if (store.state.baseParam.isMix == '1')
        newOddsParams = process.getNewOddsParams();
      else
        newOddsParams = store.state.newOddsParam;
      for (let index in newOddsParams) {
        this.showTextObj[index] = this.exhibition(newOddsParams[index]);
      }
      if (newOddsParams.length != this.showTextObj.length) {
        this.showTextObj.splice(this.showTextObj.length - 1, 1);
      }
      let baseParam = store.state.baseParam;
      let params = {
        oddParam: JSON.stringify(newOddsParams),
        gameType: baseParam.gameType,
        dateType: baseParam.dateType,
        playType: store.state.playType,
        plate: base.methods.getPlate(),
      }

      this.oldMsg = this.newMsg;
      base.methods.queryNewOdds(params);
    },
    /** 下注时页面内容展示 */
    exhibition: function (data) {
      let host = data.host;
      let showObj = {};
      let playName = '';
      let betType = data.type + '';

      let ballKinds = store.state.ballKinds;
      for (let i in ballKinds) {
        if (ballKinds[i].category == store.state.baseParam.gameType) {
          playName = ballKinds[i].name;
        }
      }
      playName += '-';
      playName += data.dateType == '1' ? '滚球-' : '';
      /*     playName += '-';*/
      if (tools.isExistsVal(Number(betType), Object.assign({}, {'football': betClassify2.football.size}, {'basketball': betClassify2.basketball.size},
        {'baseball': betClassify2.baseball.size}, {'other': betClassify2.other.size}, {'volleyball': betClassify2.volleyball.size}, {'tennis': betClassify2.tennis.size}))) {
        if (data.isWho == '0' || data.isWho == '2') showObj.betPoint = this.$t('play.name.big');
        else showObj.betPoint = this.$t('play.name.small');
      } else if (tools.isExistsVal(Number(betType), Object.assign({}, {'football': betClassify2.football.singlePair}, {'baseball': betClassify2.baseball.singlePair},
        {'other': betClassify2.other.singlePair}))) {
        if (data.isWho == '1') showObj.betPoint = this.$t('play.name.single');
        else showObj.betPoint = this.$t('play.name.pair');
      } else {
        if (data.isWho == '0' || data.isWho == '2') showObj.betPoint = data.hteam;
        else showObj.betPoint = data.gteam;
        if (data.isWho == '2' && tools.isExistsVal(Number(betType), Object.assign({}, {'football': betClassify2.football.capot}, {'basketball': betClassify2.basketball.capot},
          {'baseball': betClassify2.baseball.capot}, {'other': betClassify2.other.capot}, {'volleyball': betClassify2.volleyball.capot})))
          showObj.betPoint = this.$t('play.name.deuce');
      }
      let sizeFullObj = Object.assign({'football': betClassify2.football.size.full}, {'basketball': betClassify2.basketball.size.full},
        {'baseball': betClassify2.baseball.size.full}, {'other': betClassify2.other.size.full});
      let concedeObj = Object.assign({'football': betClassify2.football.concede.full}, {'basketball': betClassify2.basketball.concede.full},
        {'baseball': betClassify2.baseball.concede.full}, {'other': betClassify2.other.concede.full});
      let singlePairObj = Object.assign({'football': betClassify2.football.singlePair.full}, {'baseball': betClassify2.baseball.singlePair.full},
        {'other': betClassify2.other.singlePair.full});
      let capotObj = Object.assign({'football': betClassify2.football.capot.full}, {'basketball': betClassify2.basketball.capot.full},
        {'baseball': betClassify2.baseball.capot.full}, {'other': betClassify2.other.capot.full});
      if (tools.isExistsVal(Number(betType), concedeObj))
        playName += this.$t('play.name.concedeGoal');
      else if (tools.isExistsVal(Number(betType), sizeFullObj))
        playName += this.$t('play.name.big') + this.$t('play.name.small');
      else if (tools.isExistsVal(Number(betType), singlePairObj))
        playName += this.$t('play.name.single') + this.$t('play.name.pair');
      else if (tools.isExistsVal(Number(betType), capotObj))
        playName += this.$t('play.name.capot');
      else if (tools.isExistsVal(Number(betType), betClassify2.football.capot.half))
        playName += this.$t('play.name.capot') + '-' + this.$t('play.name.prevHalf');
      else if (tools.isExistsVal(Number(betType), betClassify2.football.size.half))
        playName += this.$t('play.name.big') + this.$t('play.name.small') + '-' + this.$t('play.name.prevHalf');
      else if (tools.isExistsVal(Number(betType), betClassify2.football.concede.half))
        playName += this.$t('play.name.concedeGoal') + '-' + this.$t('play.name.prevHalf');
      else if (tools.isExistsVal(Number(betType), Object.assign({}, {"wave.full": betClassify2.football.wave.full}, {"wave.half": betClassify2.football.wave.half}))) {
        playName += this.$t('play.name.wave');
        if (tools.isExistsVal(Number(betType), betClassify2.football.wave.half))
          playName += '-' + this.$t('play.name.prevHalf');
        let keyByObj = tools.getKeyByObj(Number(betType), Object.assign({}, {"wave.full": betClassify2.football.wave.full}, {"wave.half": betClassify2.football.wave.half}));
        let key = keyByObj.replace('single', '').replace('live', '');
        if (key == 'Other') {
          showObj.betPoint = '其他比分';
        } else {
          if (data.isWho == '0') {
            showObj.betPoint = key.charAt(0) + ':' + key.charAt(1);
          } else {
            showObj.betPoint = key.charAt(1) + ':' + key.charAt(0);
          }
        }
      } else if (tools.isExistsVal(Number(betType), betClassify2.football.goalCount.full)) {
        playName += this.$t('play.name.goalCount');
        let keyByObj = tools.getKeyByObj(Number(betType), betClassify2.football.goalCount.full);
        let key = keyByObj.replace('single', '').replace('live', '');
        if (key.length == 1) {
          showObj.betPoint = key + '或以上';
        } else {
          showObj.betPoint = key.charAt(0) + '-' + key.charAt(1);
        }
      } else if (tools.isExistsVal(Number(betType), betClassify2.football.halfFull.full)) {
        playName += this.$t('play.name.halfFull');
        let keyByObj = tools.getKeyByObj(Number(betType), betClassify2.football.halfFull.full).toLowerCase();
        let key = keyByObj.replace('all', keyByObj.substring(0, keyByObj.lastIndexOf('all')));
        key = tools.replace(key, 'host', data.hteam + '/');
        key = tools.replace(key, 'guest', data.gteam + '/');
        key = tools.replace(key, 'deuce', '和/');
        showObj.betPoint = key.substring(0, key.length - 1);
      } else if (tools.isExistsVal(Number(betType), betClassify2.basketball.concede.full))
        playName += this.$t('play.name.concedeScore');
      else if (tools.isExistsVal(Number(betType), betClassify2.basketball.size.team)) {
        playName += this.$t('play.name.teamScore') + ':';
        if (data.isWho === "0" || data.isWho === "1") {
          /*playName += data.hteam;*/
          playName +='主队';
        } else {
          /*playName += data.gteam;*/
          playName +='客队';
        }
        playName += '-' + this.$t('play.name.big') + '/' + this.$t('play.name.small');
        // 源： "篮球&美式足球-球队得分:" + data.hteam + '-大/小'
      } else if (tools.isExistsVal(Number(betType), betClassify2.baseball.capot.half))
        playName += this.$t('play.name.first5Bureaus') + '/' + this.$t('play.name.host') + this.$t('play.name.guest') + this.$t('play.name.deuce');
      else if (tools.isExistsVal(Number(betType), betClassify2.baseball.concede.half))
        playName += this.$t('play.name.first5Bureaus') + '/' + this.$t('play.name.concedeGoal');
      else if (tools.isExistsVal(Number(betType), betClassify2.baseball.size.half))
        playName += this.$t('play.name.first5Bureaus') + '/' + this.$t('play.name.big') + this.$t('play.name.small');
      else if (tools.isExistsVal(Number(betType), betClassify2.tennis.capot.full))
        playName += this.$t('play.name.capot') + Util.titleReg(data.hteam);
      else if (tools.isExistsVal(Number(betType), betClassify2.tennis.concede.full)) {
        if (data.hteam.indexOf('-') != -1) {
          playName += this.$t('play.name.concedeBureaus')
        } else {
          playName += this.$t('play.name.concedeRound')
        }
        playName += Util.titleReg(data.hteam);
      }
      else if (tools.isExistsVal(Number(betType), betClassify2.tennis.size.full))
        playName += this.$t('play.name.bureausCount') + ':' + this.$t('play.name.big') + this.$t('play.name.small') + Util.titleReg(data.hteam);
      else if (tools.isExistsVal(Number(betType), betClassify2.tennis.size.player)) {
        playName += this.$t('play.name.playerBureaus') + ':';
        if (data.isWho === "0" || data.isWho === "1") {
          /*playName += data.hteam;*/
          playName +='主队';
        } else {
         /* playName += data.gteam;*/
          playName +='客队';
        }
        playName += '-' + this.$t('play.name.big') + '/' + this.$t('play.name.small');
        // "网球-球员局数:" + data.hteam + '-大/小'
      } else if (tools.isExistsVal(Number(betType), betClassify2.volleyball.capot.full))
        playName += this.$t('play.name.capot') + Util.titleReg(data.hteam);
      else if (tools.isExistsVal(Number(betType), betClassify2.volleyball.concede.full))
        playName += this.$t('play.name.concedeBureaus') + Util.titleReg(data.hteam);
      else if (tools.isExistsVal(Number(betType), betClassify2.volleyball.size.full))
        playName += this.$t('play.name.scoreCount') + Util.titleReg(data.hteam);
      else if (tools.isExistsVal(Number(betType), betClassify2.volleyball.size.team)) {
        playName += this.$t('play.name.teamScore') + ':';
        if (data.isWho === "0" || data.isWho === "1") {
         /* playName += data.hteam;*/
          playName +='主队';
        } else {
          /*playName += data.gteam;*/
          playName +='客队';
        }
        playName += '-' + this.$t('play.name.big') + '/' + this.$t('play.name.small');
        // "网球-球员局数:" + data.hteam + '-大/小'
      }
      console.log(data, "datadata")
      showObj['playName'] = playName;
      showObj['hTeam'] = data.hteam;
      showObj['gTeam'] = data.gteam;
      showObj['leagueName'] = data.leagueName;
      showObj['isMix'] = data.isMix;
      showObj['dateType'] = data.dateType;
      return showObj;

    },
    /** 校验注单下注金额是否合规 */
    isAllowBetByMoney() {
      let flag = true;
      let regp = /^[1-9][0-9]*$/;
      // let betCount = store.state.newOddsParams.length;
      let betCount = process.getNewOddsParams().length;
      let mixBetLimit = store.state.mixBetLimit;
      if (!regp.test(this.inputMoney)) {
        store.state.infoMsg = "请输入正确投注金额";
        flag = false;
      } else {
        this.inputMoney = Number(this.inputMoney);
        if (this.inputMoney > Number(this.userBalance)) {
          store.state.infoMsg = "余额不足"
          flag = false;
        } else if (betCount < mixBetLimit.mixMin && store.state.baseParam.isMix == '1') {
          store.state.infoMsg = "不能小于串关数" + mixBetLimit.mixMin;
          flag = false;
        } else if (betCount > mixBetLimit.mixMax && store.state.baseParam.isMix == '1') {
          store.state.infoMsg = "不能大于串关数" + mixBetLimit.mixMin;
          flag = false;
        } else if (this.inputMoney > Number(this.maxBet)) {
          store.state.infoMsg = "不能大于单注最高金额";
          flag = false;
        } else if (this.inputMoney < this.minBet) {
          store.state.infoMsg = "不能小于单注最低金额";
          flag = false;
        } else if (this.mayWinMoney > this.maxAllowWinMoney) {
          store.state.infoMsg = "超过最大可赢金额";
          flag = false;
        }
      }
      return flag;
    },
    /** 校验注单玩法是否允许下注 */
    isAllowBetByPlay() {
      let betType = this.newOddsResp[0].type;
      let baseParam = store.state.baseParam;
      if (baseParam.isMix == '1') {
        switch (baseParam.gameType) {
          case 'TYZQ':
            betType = betClassify2.football.mix.default;
            break;
          case 'TYLM':
            betType = betClassify2.basketball.mix.default;
            break;
          case 'TYWQ':
            betType = betClassify2.tennis.mix.default;
            break;
          case 'TYPQ':
            betType = betClassify2.volleyball.mix.default;
            break;
          case 'TYBQ':
            betType = betClassify2.baseball.mix.default;
            break;
          case 'TYQT':
            betType = betClassify2.other.mix.default;
            break;
        }
      }
      let gamePlayObj = store.state.gamePlayObj;
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
        //   isBet = gamePlayObj[3070000];
      } else {
        if (gamePlayObj[betType] === undefined) {
          isBet = false
        } else {
          isBet = gamePlayObj[betType];
        }
      }
      let oddsIsEmpty = true;
      for (let i in this.oddsData) {
        let odds = this.oddsData[i].odds;
        if (odds == '' || odds == undefined) {
          oddsIsEmpty = false;
          break;
        }
      }
      if (!isBet) {
        store.state.infoMsg = "该玩法暂时无法下注";
      } else if (!oddsIsEmpty) {
        store.state.infoMsg = "暂时无法下注,请刷新赔率";
      }
      return isBet && oddsIsEmpty;
    },
    /** 拼装注单下注data数据 */
    stakeData() {
      let dataStr = '';
      let results = this.newOddsResp;

      /** 判断betDetail取值 */
      function extracted(curOddsData, result) {
        let betDetail = curOddsData.detail;
        if (betDetail === undefined || betDetail === "null" || betDetail === null) {
          let betType = result.type;
          let waveKey = tools.getKeyByObj(betType, betClassify2.football.wave);
          let goalCountKey = tools.getKeyByObj(betType, betClassify2.football.goalCount);
          let halfFullKey = tools.getKeyByObj(betType, betClassify2.football.halfFull);
          let arr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];
          if (waveKey != '') {
            let key = waveKey.replace('single', '').replace('live', '');
            // if (result.isWho == '1') {
            //   betDetail = arr[key.charAt(1)] + 'o' + arr[key.charAt(0)];
            // } else {
            if (key.indexOf("Other") == -1) {
              betDetail = arr[key.charAt(0)] + 'o' + arr[key.charAt(1)];
            } else {
              betDetail = 'other';
            }
            // }
          } else if (goalCountKey != '') {
            let key = goalCountKey.replace('single', '').replace('live', '');
            if (key.length > 1) {
              betDetail = arr[key.charAt(0)] + 'to' + arr[key.charAt(1)];
            } else {
              betDetail = 'sevenup';
            }
          } else if (halfFullKey != '') {
            let match = halfFullKey.match(/[A-Z]/)[0];
            betDetail = halfFullKey.substring(0, 1) + match.toLowerCase();
          } else {
            betDetail = null;
          }
        } else {
          while (betDetail.indexOf(" ") != -1) {
            betDetail = betDetail.replace(" ", "");
          }
        }
        return betDetail;
      }

      /** 标识是否含有空赔率 */
      let flag = false;
      for (let index in results) {
        let result = results[index];
        let curOddsData = this.oddsData[index];
        if (index > 0)
          dataStr += '-';
        let data = {};
        data['matches'] = result.matid;
        data['betType'] = result.type;
        data['betOdds'] = curOddsData.odds;
        if (curOddsData.exOdds === undefined || curOddsData.exOdds == null) {
          data['showOdds'] = curOddsData.odds
        } else if (curOddsData.exOdds != undefined && curOddsData.exOdds != null) {
          data['showOdds'] = curOddsData.exOdds
          // } else {
          //   data['showOdds'] = curOddsData.odds
        }
        let betDetail = extracted(curOddsData, result);
        data['betDetail'] = betDetail;
        data['betWho'] = result.isWho;
        data['money'] = this.inputMoney;
        data['league'] = result.leagueId;
        switch (result.dateType) {
          case "1": //滚球
            data['isToday'] = 2;
            break
          case "0": //今日
            data['isToday'] = 0;
            break;
          case "2": //早盘
            data['isToday'] = 1;
            break;
        }
        data['plate'] = base.methods.getPlate();
        data['page'] = result.page;
        data['liveGoals'] = curOddsData.hScore + ':' + curOddsData.gScore;
        for (let key in data) {
          if (dataStr.length > 0)
            dataStr += ',';
          if (key == 'liveGoals' && result.dateType !== "1") {
            dataStr += key + '@';
            continue;
          }
          dataStr += key + '@' + data[key];//适配QQ浏览器将空格字符串改为特殊字符
        }
        let regp = /^-?\d+(\.\d+)?$/;
        if (!regp.test(data['showOdds'])) {
          flag = true;
        }
      }
      if (flag) {
        return '';
      }
      return dataStr;
    },
    /** 确定下注 */
    changeConfirmState: function () {
      store.state.infoMsg = '';
      if (!(this.isAllowBetByMoney() && this.isAllowBetByPlay())) {
        // this.showToast();
        return;
      }

      let data = this.stakeData();
      if (data == '') {
        store.state.infoMsg = '暂时无法下注，请刷新赔率';
        //  this.showToast();
        return;
      }
      //下注提交
      let params = {
        matchType: this.newOddsResp[0].dateType == '1' ? this.matchType = '2' : '0',  // 2 滚球, 0 今日/早盘
        gameType: this.newOddsResp[0].gameType,
        dateType: store.state.baseParam.dateType,
        playType: store.state.playType,
        data: data,
        isMix: this.newOddsResp[0].isMix,
        autoAccept: this.chooseRadio ? '1' : '0',
        'gb.token': store.state.tokenData.token
      }

      base.methods.bet(params, this);
      //下注提交中
      store.state.orderState = 'confirming';

    },
    /** 注单提交后处理 */
    afterBet(betData, that) {
      let _this = this;
      if (betData.code === '200') {//下注成功
        store.state.infoMsg = betData.message;
        if (betData.result[0].isWin == "1") {
          store.state.betCode = betData.result[0].betCode;
          //更新余额
          _this.money = betData.result[0].balance;
          storages.updataMoney(_this.money);
        }
        for (let i = 0; i < betData.result.length; i++) {
          that.oddsData[i].exOdds = betData.result[i].showOdds;
        }
        store.state.orderState = 'bet_result';
        store.commit("newOddsParams", []);
        store.commit("newOddsParam", []);
      } else {
        //下注失败
        store.state.infoMsg = betData.message;
        store.state.orderState = 'toConfirm';
        base.methods.getToken(); //发起token请求
        //如果是比分变动下注失败，从新请求赔率
        if (betData.code == 'S029') {
          that.reqNewOdds();

        }
      }
      //  that.showToast();
    },
    /** 是否自动接受最佳赔率 */
    radioState() {
      this.chooseRadio = !this.chooseRadio;
    },
    /** 关闭下注窗口 */
    goBackPage() {
      store.state.orderState = 'toConfirm';
      this.$emit('goToHomePage');
    },
    /** 调转投注历史页 */
    goHistory() {
      this.$router.push({path: '/home/home_unpay'})
      store.state.footClick = false;
      store.state.shwoback = true;
      store.state.touchVal = "home_unpay";
      store.state.is_showModal = false;
    },
    /** 删除综合过关内的数据 */
    deleteItem(index) {
      this.isClose = true
      this.itemIndex = index
    },
    /** 可赢金额盘口赔率计算 */
    setWinMoney: function (viewOdds, oddsType, plate) {
      let odds;
      if (plate == "E") {
        odds = parseFloat(viewOdds) - 1;
      } else {
        if (this.isTheType(oddsType)) {
          odds = parseFloat(viewOdds);
        } else {
          odds = parseFloat(viewOdds) - 1;
        }
      }
      return odds;
    },
    /** 可赢金额盘口赔率计算 */
    isTheType: function (oddsType) {
      if (oddsType == 3010012 || oddsType == 3020012 || oddsType == 3010022 || oddsType == 3020022 || oddsType == 3020013 || oddsType == 3010013 ||
        oddsType == 3020023 || oddsType == 3010023 || oddsType == 3110010 || oddsType == 3110020 || oddsType == 3120010 || oddsType == 3120020 ||
        oddsType == 3210020 || oddsType == 3210030 || oddsType == 3220010 || oddsType == 3220020 || oddsType == 3310020 || oddsType == 3310030 ||
        oddsType == 3320010 || oddsType == 3320020 || oddsType == 3410020 || oddsType == 3410030 || oddsType == 3410050 || oddsType == 3410060 ||
        oddsType == 3420010 || oddsType == 3420020 || oddsType == 3510020 || oddsType == 3510030 || oddsType == 3520020 || oddsType == 3520030 ||
        oddsType == 3520050 || oddsType == 3520060 || oddsType == 3110050 || oddsType == 3120050 || oddsType == 3320040 || oddsType == 3310050 ||
        oddsType == 3220040 || oddsType == 3210050 || oddsType == 3610020 || oddsType == 3620020 || oddsType == 3610030 || oddsType == 3620030 ||
        oddsType == 3610040 || oddsType == 3620040 || oddsType == 3710020 || oddsType == 3720020 || oddsType == 3710030 || oddsType == 3720030 ||
        oddsType == 3810020 || oddsType == 3820020 || oddsType == 3810030 || oddsType == 3820030 || oddsType == 3810040 || oddsType == 3820040 ||
        oddsType == 3420060 || oddsType == 3420070) {
        return true
      } else {
        return false
      }
    },
    /** 限时关闭下注弹窗 */
    tradeWindowClose() {
      let curTimestamp = new Date().getTime();
      let baseParam = store.state.baseParam;
      let tokenData = store.state.tokenData;
      let tokenOut = Number(tokenData.tokenDate) * 60 * 1000;
      if (!((curTimestamp - tokenData.rightNow) < tokenOut)) {
        store.state.is_showModal = false;
        //如果是综合过关，
        if (baseParam.isMix == '1') {
          store.commit('newOddsParams', []);
        }
        return;
      }
      if (store.state.orderState == 'bet_result') {
        return;
      }
      if (store.state.orderState == 'confirming') {
        this.initTimer();
        return;
      }
      this.reqNewOdds();
      this.initTimer();
    },
    /** 下注窗口定时器 */
    initTimer() {
      let _this = this;
      this.timerTask = setInterval(function () {
        if (_this.timerCount == 1) {
          _this.timerCount = store.state.sysFreqParams.betFreq;
          window.clearInterval(_this.timerTask);
          _this.tradeWindowClose();
        } else {
          _this.timerCount = _this.timerCount - 1;
        }
      }, 1000);
    },
    checkMoney() {
      let _this = this;
      let val = _this.inputMoney;
      store.state.infoMsg = '';
      let reg = /^[1-9][0-9]$/;
      if (val == 0) {
        val = '';
      } else if (!reg.test(val)) {
        val = val.replace(/\D/g, '');
      }
      _this.inputMoney = val;
      if (_this.inputMoney > Number(_this.maxBet)) {
        store.state.infoMsg = "不能大于单注最高金额";
        _this.inputMoney = _this.inputMoney.substr(0, _this.inputMoney.length - 1);
        return;
      }

    },
    compareOddsData(oddsData) {
      let copyMsg = {}
      let _this = this;
      if (_this.oldMsg === undefined) {
        this.newOddsDatas = oddsData;
        return;
      }
      let lg = _this.oldMsg.length;
      if (lg < 1) {
        this.newOddsDatas = oddsData;
        return;
      }
      for (let key in oddsData) {
        copyMsg[key] = oddsData[key]
        let newOdss = oddsData[key].odds;
        let odds = JSON.parse(_this.oldMsg[key].nowodds);
        let oldOdds = odds.odds;
        if (newOdss !== oldOdds) {
          if (newOdss - oldOdds > 0) {
            copyMsg[key]["exodds_change"] = "1"
          } else {
            copyMsg[key]["exodds_change"] = "2"
          }
        } else {
          copyMsg[key]["exodds_change"] = "0"
        }
      }
      this.newOddsDatas = copyMsg;
    }
  },
  computed: {
    //控制交易单关闭图标的现实与隐藏
    display(){
        const message=store.state.infoMsg
        return message=== '下注成功'? 'none':'block';
    },
    toasting() {
      return this.$store.state.toasting;
    },
    infoMsg: function () {
      return store.state.infoMsg;
    },
    /** 注单号 */
    betCode: function () {
      return store.state.betCode;
    },
    /** 注单状态 */
    orderState: function () {
      return store.state.orderState;
    },
    /** 页面基础数据 */
    baseParam: function () {
      return store.state.baseParam;
    },
    /** */
    betAfterWinMoney: function () {

    },
    /** 获取最新赔率响应结果 */
    newOddsResp: {
      get: function () {
        let result = store.state.newOddsResp.result;
        this.newMsg = result;
        if (result === undefined || result == null || result.length == 0) {
          store.state.infoMsg = "该盘口暂时关闭,请稍后重试";
          return;
        }
        for (let index in result) {
          let item = result[index];
          let oddsDataItem = {};
          let odds = {};
          if (item.nowodds && item.nowodds != undefined && item.nowodds != '') {
            odds = JSON.parse(item.nowodds);
          } else {
            continue;
          }
          oddsDataItem.detail = odds.detail;
          oddsDataItem.status = odds.status;
          oddsDataItem.hScore = odds.Hscore;
          oddsDataItem.gScore = odds.Gscore;
          if (tools.isExistsVal(item.type, Object.assign({"football": betClassify2.football.concede}, {"tennis": betClassify2.tennis.concede},
            {"volleyball": betClassify2.volleyball.concede}, {"baseball": betClassify2.baseball.concede}, {"other": betClassify2.other.concede}, {"basketball": betClassify2.basketball.concede}))) {
            oddsDataItem.isWho = item.isWho;
          }
          if (tools.isExistsVal(item.type, Object.assign({"footballsize": betClassify2.football.size}, {"tennissize": betClassify2.tennis.size},
            {"volleyballsize": betClassify2.volleyball.size}, {"baseballsize": betClassify2.baseball.size}, {"othersize": betClassify2.other.size}, {"basketball": betClassify2.basketball.size}))) {
            oddsDataItem.xDetail = odds.detail;
          }
          if (index == 0) {
            this.minBet = item.minMoney;
            this.maxBet = item.singleMaxMoney;
            this.maxAllowWinMoney = item.singleMaxBonus;
          }
          if (odds.exodds == undefined || odds.exodds == null) {
            oddsDataItem.odds = Number(odds.odds).toFixed(2);
            oddsDataItem.exOdds = Number(odds.odds).toFixed(2);
          } else {
            oddsDataItem.odds = Number(odds.odds);
            oddsDataItem.exOdds = Number(odds.exodds).toFixed(2);
          }
          this.oddsData.push(oddsDataItem);
        }
        if (this.oddsData.length != result.length) {
          this.oddsData.splice(0, this.oddsData.length - result.length);
        }

        // this.compareOddsData(this.oddsData);
        //对比新旧两个数据的赔率大小
        return result;
      }
    },
    /** 计算可赢金额 */
    mayWinMoney: function () {
      if (this.newOddsResp == null || this.newOddsResp == undefined)
        return;
      let oddsSum = 0.00;
      let mixOddsSum = 1.00;
      let finallyOddsSum = 0.00;
      for (let index in this.oddsData) {
        let curOddsData = this.oddsData[Number(index)];
        let oddsDatum = curOddsData.odds;
        if (curOddsData.exOdds === undefined || curOddsData.exOdds == null) {
          oddsDatum = curOddsData.odds
        } else if (curOddsData.exOdds != undefined && curOddsData.exOdds != null) {
          oddsDatum = curOddsData.exOdds
        }

        if (store.state.baseParam.isMix === '1') {
          mixOddsSum *= oddsDatum;
        } else {
          oddsSum += this.setWinMoney(oddsDatum, this.newOddsResp[index].type, this.newOddsResp[index].plate);
        }
      }
      if (store.state.baseParam.isMix === '1') {
        finallyOddsSum = mixOddsSum - 1;
      } else {
        finallyOddsSum = oddsSum;
      }
      let money = this.inputMoney;
      return Util.betAward(finallyOddsSum, money);

    }
  },
  watch: {
    gamePlayObj() {
      return store.state.gamePlayObj;
    },

    oddsData(now, old) {
      this.compareOddsData(now);
    },
    notShowClosePic() {
      return this.notShowCloseIcon
    },
    /*inputMoney(val) {
      store.state.infoMsg = '';
      let _this = this;
      let reg = /^[1-9][0-9]$/;
      if (val == 0) {
        _this.inputMoney = '';
      } else if (!reg.test(val)) {
        val = val.replace(/\D/g, '');
        _this.inputMoney = val.replace(/\D/g, '');
      }
      if(_this.inputMoney > Number(_this.maxBet)){
        store.state.infoMsg = "不能大于单注最高金额";
     /!*   store.state.toasting = true;*!/
        setTimeout(() => {
         /!* store.state.toasting = false;*!/
          _this.inputMoney = _this.inputMoney.substr(0,_this.inputMoney.length-1);
        },1000)
      }

    },*/
  },
  destroyed() {
    window.clearInterval(this.timerTask);
    store.state.newOddsResp = [];
  }
}
