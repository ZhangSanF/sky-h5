import BScroll from 'better-scroll';
import showBet from '../showBet/showBet.js'
import Util from '../../js/util/util.js'
import tradeDialog from '../../components/public/tradeDialog.vue'
import {store,base,process} from "@/js/public/port";
import oddsChange from "../showBet/oddsChange";
import nodataPage from '@/views/question_page/nodataPage';

export default {
  components: {
    tradeDialog,nodataPage
  },
  data() {
    return {
      betData: showBet.data,
      playType: store.state,
      hteam: '',
      gteam: '',
      activeTab: 'all',
      oldMsg: {},
      newMsg: {},
      leagueName:'',
      liveStep:'',
      scoreSetH:'',
      hscore:'',
      scoreSetC:'',
      gscore:'',
      startTime:'',
      tabList: [],
      showBox:{},
      isDisplay: false,
      showDialogStyle_trade: {  //交易弹窗控制按钮并传参
        isDisplay: false,
        params: ''
      },
      userBetData: [],
      gameData: {},
      volleyball_zw:'./static/imgs/perch/volleyball.png'//排球占位图
    };
  },
  methods: {
    formatTimes(time)
    {
      return Util.formatTime(Util.formatDate.UnixToDate(time, -12, 'MDhm'));
    },
    forMatDate (time) {
      return Util.formatDate.UnixToDate(time, -12, 'MDhm')
    },
    oddsSelect() {
      return oddsChange.methods.oddsSelect();
    },
    //点击显示隐藏
    switchBox(index) {
      this.showBox[index].content = !this.showBox[index].content
      if (this.showBox[index].content == true) {
        document.getElementById(index).style.transform = 'translate(0,-50%) rotate(-90deg)'
      } else {
        document.getElementById(index).style.transform = 'translate(0,-50%) rotate(-180deg)'
      }
    },
    formatOdds(data) {
      return Util.formatOdds(data)
    },

    betDialogHandler(data, host, type, clickWho, curOdds) {
      showBet.betDialogHandler(data, host, type, clickWho, curOdds);
    },
    goToHomePage(childValue) { //关闭弹窗,返回页面
      //childValue 是弹窗传过来的值
      store.state.is_showModal = false;
    },
    //滚动条事件
    activeState(tabName) {
      this.activeTab = tabName;
      this.scroll.scrollTo(0, 0)
    },
    //返回颜色
    oddsChangeClass (index, className, propertyKey) {
      let oddsC = oddsChange.methods.detailOddsChangeClass(index, className, propertyKey, this);
      let oddClassObj = store.state.oddClassObj;
      return oddClassObj['oddsCss1'][oddsC];
    },
    //返回箭头
    oddsChangeTag(index, className, propertyKey)  {
      let oddsC =  oddsChange.methods.detailOddsChangeClass(index, className, propertyKey, this);
      let oddClassObj = store.state.oddClassObj;
      return oddClassObj['oddsCss2'][oddsC];
    },
    /** 展示综合过关注单页 */
    showMixBet() {
      store.state.is_showModal = true;
    },
    title(string,isR) {
      let title
      if (string.indexOf("-") === -1) {
        if(isR)
        title = '让局';
      } else {

          let reg = /\((.+)\)/g
        /* title=string.split("-")[1]*/
        if(isR){
          title = '让分' + (string.toString().split("-")[1].match(reg) !== null ? ('-' + RegExp.$1) : '');
        }else{
          /*title = '-'+(string.toString().split("-")[1].match(reg) !== null ? ('-' + RegExp.$1) : '');*/
          title = ''+(string.toString().split("-")[1].match(reg) !== null ? ('-' + RegExp.$1) : '');//页面只需要一根短线
        }

      }
      return title
    },
    chargeMainAndImpr(playId){
      if(this.maintenancePlay[playId] !=undefined && !this.maintenancePlay[playId]){
        return false; //玩法维护
      }
      if(this.imprisonPlay[playId] == undefined){
        return false; //禁用
      }
      return true; //可以展示
    },
    concedeTagH(val,data){
      if(data==null){
        return '';
      }
      if(val ==='H'){
        return "-";
      }else{
        return "+";
      }
    },
    concedeTagC(val,data){
      if(data==null){
        return '';
      }
      if(val ==='C'){
        return "-";
      }else{
        return "+";
      }
    }
  },
  mounted() {
    this.data;
    base.methods.teamNameRolling();
    store.commit('homeHeaderControl', {shwoback: true, type: 'string', val: '', footShow: false});
    this.$nextTick(function () {
      //滚动
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.outerWrapper, {
          hasVerticalScroll: true,
          tap: true,
          click: true
        })
      } else {
        this.scroll.refresh();
      }
    })

  },
  computed: {
    morePlayDetail(){
      return store.state.morePlayDetail;
    },
    is_showModal: {
      get: function () {
        return store.state.is_showModal;
      },
      set: function (newValue) {
        store.state.is_showModal = newValue;
      }
    },
    items() {
      let code = store.state.morePlayData.code;
      store.state.maintanceCode = '';
      if(code==='D000'){
        store.commit("newOddsParams",[]);
        store.state.maintanceCode = code;
        base.methods.getMatches(true);
        return [];
      }
      let datas = {};
      let teams = new Array();
      if(store.state.morePlayData.result
        &&store.state.morePlayData.result.data
        &&store.state.morePlayData.result.data.length>0){
        let morePlayData = store.state.morePlayData.result.data;
        store.state.morePlayDetail = morePlayData[0];
        this.hteam = morePlayData[0].hteam;
        this.gteam = morePlayData[0].gteam;
        this.leagueName = morePlayData[0].leagueName;
        this.liveStep=morePlayData[0].liveStep;
        this.scoreSetH=morePlayData[0].scoreSetH;
        this.hscore=morePlayData[0].hscore;
        this.scoreSetC=morePlayData[0].scoreSetC;
        this.gscore=morePlayData[0].gscore;
        this.startTime=this.formatTimes(morePlayData[0].startTime);

        for(let i=0;i<morePlayData.length;i++){
          let data = new Array();
          if(teams.indexOf(morePlayData[i].hteam)===-1){
            data.push(morePlayData[i]);
            teams.push(morePlayData[i].hteam);
          }else{
            data = datas[morePlayData[i].hteam];
            data.push(morePlayData[i]);
          }
          datas[morePlayData[i].hteam] = data;
        }
        return datas;
      }else{
        return[];
      }

    },
    data(){
      let code = store.state.morePlayData.code;
      if(code==='D000'){
        store.state.isMore = false;
        store.state.isHome = false;
        base.methods.getMatches(true);
        return [];
      }
      if(store.state.morePlayData.result){
        return store.state.morePlayData.result.data;
      }
      return [];
    },

    maintenancePlay:{
      get: function () {
        return store.state.chargeMixOrChampion.TYPQ["2"];
      },
      set: function (newValue) {
      }
    },
    imprisonPlay:{ //玩法禁止
      get: function () {
        return store.state.chargeMixOrChampion.TYPQ["3"];
      },
      set: function (newValue) {
      }
    },
    /** 综合过关数目统计 */
    mixCount: {
      get: function () {
        let newOddsParams = process.getNewOddsParams();
        return newOddsParams.length;
      }
    },
    /** 综合过关样式 */
    checkedMatches: {
      get: function () {
        return store.state.checkedMatches;
      }
    },
    /** 玩法类型 0单式 1综合过关 2冠军 */
    baseParam: {
      get: function () {
        return store.state.baseParam;
      }
    },
    dateType:{
      get:function () {
        return store.state.baseParam.dateType;
      }
    },
    images_volleyball(){
      if(store.state.imagesBackgroundList)
      {
        let backgroundImg_sky=store.state.imagesBackgroundList.sky;
        if(backgroundImg_sky!=undefined && backgroundImg_sky.TYPQ!=undefined)
        {
          return process.getLocalStorage_bk(backgroundImg_sky.TYPQ.path)
        }else{
          return  this.volleyball_zw
        }
      }
      else
      {
        return  this.volleyball_zw
      }

    }
  },
  watch: {
    data(now, old) {
      oddsChange.methods.watchBallData(now, old, this)
    }
  },
  created(){
    let moreData = store.state.morePlayData.result;
    if(moreData){
      let array = {};
      for(let i=0;i<moreData.data.length;i++){
        array[moreData.data[i].id+'dy'] = {'content': true};
        array[moreData.data[i].id+'rj'] = {'content': true};
        array[moreData.data[i].id+'dx'] = {'content': true};
        array[moreData.data[i].id+'qddfdxz'] = {'content': true};
        array[moreData.data[i].id+'qddfdxk'] = {'content': true};
      }
      console.log(array,"array")
    this.showBox = array;
}
  }

};
