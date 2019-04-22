
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
      oldMsg: {},
      newMsg: {},
      betData:showBet.data,
      hteam:'',
      gteam:'',
      hscore:'',
      gscore:'',
      startTime:'',
      activeTab:'all',
      leagueName:'',
      tabList: [],
      showBox:[
        {'content': true},//0
        {'content': true},//1
        {'content': true},//2
        {'content': true},//3
        {'content': true},//4
        {'content': true},//5
        {'content': true},//6
        {'content': true},//7
        {'content': true},//8
        {'content': true},//9
        {'content': true}//10
      ],
      images_baseball_zw:'./static/imgs/perch/baseball.png',//棒球占位图
      isDisplay: false,
      showDialogStyle_trade: {  //交易弹窗控制按钮并传参
        isDisplay: false,
        params: ''
      },
      userBetData: [],
      gameData: {},
    };
  },
  methods:{
    formatTimes(time)
    {
      return Util.formatTime(Util.formatDate.UnixToDate(time, -12, 'MDhm'));
    },
    //获取投注设置里赔率变动显示的是箭头还剩颜色
    oddsSelect(){
      return oddsChange.methods.oddsSelect();
    },
    //展示综合过关页面
    showMixBet(){
      store.state.is_showModal = true;
    },
    //点击显示隐藏
    switchBox(index){
        this.showBox[index].content = !this.showBox[index].content
        if(this.showBox[index].content == true){
            document.getElementsByClassName('icon-box')[index].style.transform = 'translate(0,-50%) rotate(-90deg)'
        }else {
            document.getElementsByClassName('icon-box')[index].style.transform = 'translate(0,-50%) rotate(-180deg)'
        }
    },
    formatOdds (data) {
      return Util.formatOdds(data)
    },
    betDialogHandler (data, host, type, clickWho,curOdds) {
      showBet.betDialogHandler(data, host, type,clickWho,curOdds);
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
    base.methods.teamNameRolling();
    this.items;
    store.commit('homeHeaderControl',{shwoback:true,type:'string',val:'',footShow:false});
    this.$nextTick(function () {
        //滚动
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.outerWrapper,{
            hasVerticalScroll: true,
            tap:true,
            click:true
          })
        } else {
          this.scroll.refresh();
        }
    })

  },
  computed:{
    morePlayDetail(){
      return store.state.morePlayDetail;
    },
    playType: {
      get: function () {
        return store.state;
      },
      set: function (newValue) {
      }
    },
    maintenancePlay:{ //玩法维护
      get: function () {
        return store.state.chargeMixOrChampion.TYBQ["2"];
      },
      set: function (newValue) {
      }
    },
    imprisonPlay:{ //玩法禁止
      get: function () {
        return store.state.chargeMixOrChampion.TYBQ["3"];
      },
      set: function (newValue) {
      }
    },
    /** 综合过关数目统计 */
    mixCount:{
      get: function () {
        let newOddsParams = process.getNewOddsParams();
        return newOddsParams.length;
      }
    },
    //是否综合过关
    isMix:{
      get:function () {
        return store.state.baseParam.isMix;
      }
    },
    is_showModal(){
      return store.state.is_showModal;
    },
    items(){
      store.state.maintanceCode = '';
      let code = store.state.morePlayData.code;
      if(code==='D000'){
        store.commit("newOddsParams",[]);
        store.state.maintanceCode = code;
        base.methods.getMatches(true);
       // return [];
      }

      this.BallPlayIsShow = store.state.BallPlayIsShow;
      if(store.state.morePlayData.result
         && store.state.morePlayData.result.data
         && store.state.morePlayData.result.data.length>0){
        let morePlayData = store.state.morePlayData.result.data[0];
        store.state.morePlayDetail = morePlayData;
        this.hteam =  morePlayData.hteam;
        this.gteam = morePlayData.gteam;
        this.hscore = morePlayData.hscore;
        this.gscore = morePlayData.gscore;
        this.leagueName = morePlayData.leagueName;
        if(morePlayData.liveStatus !== 1){
          this.startTime = Util.formatDate.UnixToDate(morePlayData.startTime,'','yMDhms','');
        }
        return store.state.morePlayData.result.data;
      }
      return [];
    },
    checkedMatches: {
      get: function () {
        return store.state.checkedMatches;
      }
    },
    dateType:{
      get:function () {
        return store.state.baseParam.dateType;
      }
    },
    images_baseball() {
      if (store.state.imagesBackgroundList) {
        let backgroundImg_sky = store.state.imagesBackgroundList.sky;
        if (backgroundImg_sky!=undefined && backgroundImg_sky.TYBQ!=undefined) {
          return process.getLocalStorage_bk(backgroundImg_sky.TYBQ.path)
        } else {
          return this.images_basketball_zw
        }
      }
      else {
        return this.images_basketball_zw
      }
    }
  },
  watch: {
    items(now, old) {
      oddsChange.methods.watchBallData(now, old, this)
    }
  },

};
