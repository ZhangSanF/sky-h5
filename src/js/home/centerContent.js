
import {store, base, process} from "../public/port";
import Util from "../util/util";
import showBet from "../showBet/showBet";
import oddsChange from "../showBet/hotOddsChange";
import tradeDialog from '../../components/public/tradeDialog.vue'
export default {
    components:{tradeDialog},
    data() {
        return {
            zqOldMsg: {}, //足球信息
            zqNewMsg: {},

            lmOldMsg:{},
            lmNewMsg:{},

            bqOldMsg:{},
            bqNewMsg:{},

            wqOldMsg:{},
            wqNewMsg:{},

            pqOldMsg:{},
            pqNewMsg:{},

            qtOldMsg:{},
            qtNewMsg:{},
        }
    },
    methods: {
      formatOdds (data) {
        return Util.formatOdds(data)
      },
      forMatDate (time) {
        return Util.formatDate.UnixToDate(time, -12, 'MDhm')
      },

      playforMatDate (time) {
        return Util.formatDate.UnixToDate(time, -0, 'yMDhms')
      },
      oddsSelect(){
        return oddsChange.methods.oddsSelect();
      },

      zqDetailOddsChangeClass (index, className, propertyKey) {
        let oddsC = oddsChange.methods.zqDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss1'][oddsC];
      },
      //返回箭头
      zqOddsChangeTag(index, className, propertyKey) {
        let oddsC =  oddsChange.methods.zqDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss2'][oddsC];
      },
      lmDetailOddsChangeClass (index, className, propertyKey) {
        let oddsC = oddsChange.methods.lmDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss1'][oddsC];
      },
      //返回箭头
      lmOddsChangeTag(index, className, propertyKey) {
        let oddsC =  oddsChange.methods.lmDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss2'][oddsC];
      },

      bqDetailOddsChangeClass (index, className, propertyKey) {
        let oddsC = oddsChange.methods.bqDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss1'][oddsC];
      },
      //返回箭头
      bqOddsChangeTag(index, className, propertyKey) {
        let oddsC =  oddsChange.methods.bqDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss2'][oddsC];
      },
      pqDetailOddsChangeClass (index, className, propertyKey) {
        let oddsC = oddsChange.methods.pqDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss1'][oddsC];
      },
      //返回箭头
      pqOddsChangeTag(index, className, propertyKey) {
        let oddsC =  oddsChange.methods.pqDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss2'][oddsC];
      },
      wqDetailOddsChangeClass (index, className, propertyKey) {
        let oddsC = oddsChange.methods.wqDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss1'][oddsC];
      },
      //返回箭头
      wqOddsChangeTag(index, className, propertyKey) {
        let oddsC =  oddsChange.methods.wqDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss2'][oddsC];
      },
      qtDetailOddsChangeClass (index, className, propertyKey) {
        let oddsC = oddsChange.methods.qtDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss1'][oddsC];
      },
      //返回箭头
      qtOddsChangeTag(index, className, propertyKey) {
        let oddsC =  oddsChange.methods.qtDetailOddsChangeClass(index, className, propertyKey, this);
        let oddClassObj = store.state.oddClassObj;
        return oddClassObj['oddsCss2'][oddsC];
      },
        //更多玩法跳转
        morePlay(data,gameType,dateType) {
          this.setAdd_params(gameType,dateType)
          showBet.MorePlay(data);
        },
        //所有赛事跳转
        sportsClick(dateType,gameType) {
          //设置全局变量
          store.state.baseParam.dateType=dateType;
          store.state.baseParam.gameType=gameType;
          base.methods.updBaseParam(gameType,"0");
          base.methods.getMatches(true);
        },
        //下注组件弹窗
        handleDialog() {
            this.$emit('showTradeDialog','综合过关')
        },
        betDialogHandler (data, host, type, clickWho,curOdds,gameType,dateType) {
          this.setAdd_params(gameType,dateType)
          process.getGamePlayObj3(store.state.baseParam);
          //首页下注是，设置dateType and gameType
          showBet.betDialogHandler(data, host,type, clickWho,curOdds);
        },
      setAdd_params(gameType,dateType){
        let baseParam = store.state.baseParam;
        baseParam.gameType = gameType;
        baseParam.isMix = "0";
        baseParam.dateType=dateType;
        store.commit('baseParam', baseParam);
        store.commit("setPlayType", baseParam);
        let params={
          dateType: baseParam.dateType,
          gameType:baseParam.gameType,
          isMix:baseParam.isMix,
          type: store.state.Type,
          playType:"single"
        }
        store.commit('add_params', params);
      },
      concedeTag(val,data){
        if(data==null){
          return '';
        }
        if(val){
          return "+";
        }else{
          return "-";
        }
      },
      concedeTagH(val,data){
        if(data==null){
          return '';
        }
        if(val ==='H'){
          return "+";
        }else{
          return "-";
        }
      },
      concedeTagC(val,data){
        if(data==null){
          return '';
        }
        if(val ==='C'){
          return "+";
        }else{
          return "-";
        }
      },
      getDateTypeName(dateType){
        let dateTypeName = "滚球";
        switch (dateType) {
          case "0":
            dateTypeName = "今日";
            break;
          case "1":
            dateTypeName = "滚球";
            break;
          case "2":
            dateTypeName = "早盘";
            break;
        }
        return dateTypeName;
      }
    },
    mounted(){
      //名字超出长度滚动
      base.methods.teamNameRolling();
    },
    computed:{
      openItem(){//获取热门赛事的全部数据
        return store.state.openItemStorage;
      },
      hotDateType(){
        return store.state.hotDateType;
      },
      hotPlayType(){
        return store.state.hotPlayType;
      },
      hotMatches(){
        return store.state.hotMatches;
      },
      zqHotData(){
          return store.state.zqHotData;
        },
       lmHotData(){
        return store.state.lmHotData;
      },
      bqHotData(){
        return store.state.bqHotData;
      },
      wqHotData(){
        return store.state.wqHotData;
      },
      pqHotData(){
        return store.state.pqHotData;
      },
      qtHotData(){
        return store.state.qtHotData;
      },
      playType:{
        get: function () {
          return store.state;
        },
        set: function (newValue) {
        }
      },
      liveZqNum:{
        get: function () {
          return store.state.liveZqNum;
        },
      },
      liveLmNum:{
        get: function () {
          return store.state.liveLmNum;
        },
      },
      dateType(){
        return store.state.baseParam.dateType;
      }
    },
  watch:{
    zqHotData(now,old){
      oddsChange.methods.zqWatchBallData(now, old, this);
    },
    lmHotData(now,old){
      oddsChange.methods.lmWatchBallData(now, old, this);
    },
    bqHotData(now,old){
      oddsChange.methods.bqWatchBallData(now, old, this);
    },
    wqHotData(now,old){
      oddsChange.methods.wqWatchBallData(now, old, this);
    },
    pqHotData(now,old){
      oddsChange.methods.pqWatchBallData(now, old, this);
    },
    qtHotData(now,old){
      oddsChange.methods.qtWatchBallData(now, old, this);
    },
  },
};

