
import BScroll from 'better-scroll';
import showBet from '../showBet/showBet.js'
import Util from '../../js/util/util.js'
import tradeDialog from '../../components/public/tradeDialog.vue'
import {store,base,router,process} from "@/js/public/port";
import betClassify from '../../components/playTypeJson/playType'
import oddsChange from "../showBet/oddsChange";
import nodataPage from '@/views/question_page/nodataPage'
export default {
  components: {
    tradeDialog,nodataPage
  },
  data() {
    return {
      hteam:'',
      gteam:'',
      hillegal:'0',
      gillegal:'0',
      hscore:'',
      gscore:'',
      startTime:'',
      liveTime:'',
      leagueName:'',
      activeTab:'all',
      betType:betClassify,
      oldMsg: {},
      newMsg: {},
      tabList: [
        /*  {label:'所有盘口', name:'all'}
        {label:'让球', name:'concede_size'},
         {label:'大小 ', name:'goal_size'},
         {label:'单双', name:'total_size'},
         {label:'独赢', name:'capot'}*/
      ],
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
      showDialogStyle_trade: {  //交易弹窗控制按钮并传参
        isDisplay: false,
        params: ''
      },
      images_football_zw:'./static/imgs/perch/football.png',//足球占位图
    };
  },
  methods:{
    formatMonthAndDay(time)
    {
      return Util.formatMonthAndDay(Util.formatDate.UnixToDate(time, -12, 'MDhm'));
    },
    formatHours(time)
    {
      return Util.formatHours(Util.formatDate.UnixToDate(time, -12, 'MDhm'));
    },
    forMatDate (time) {
      return Util.formatDate.UnixToDate(time, -12, 'MDhm')
    },
    oddsSelect(){
      return oddsChange.methods.oddsSelect();
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
    goToHomePage() { //关闭弹窗,返回页面
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
    showMixBet(){
      store.state.is_showModal = true;
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
    concedeTag(val,data){
      if(data==null){
        return '';
      }
      if(val){
        return "-";
      }else{
        return "+";
      }
    }

  },
  mounted() {
    base.methods.teamNameRolling();
    store.state.is_showModal =false;
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
/*    //获取更多玩法
    showBet.getMorePlay();*/

  },
  computed:{
    morePlayDetail(){
      return store.state.morePlayDetail;
    },
    items(){
      let code = store.state.morePlayData.code;
      store.state.maintanceCode = '';
        if(code==='D000'){
          store.commit("newOddsParams",[]);
          store.state.maintanceCode = code;
          base.methods.getMatches(true);
          //return [];
        }

      if(store.state.morePlayData
        && store.state.morePlayData.result
        && store.state.morePlayData.result.data!=undefined
        && store.state.morePlayData.result.data.length>0 ){
        let morePlayData = store.state.morePlayData.result.data[0];
        store.state.morePlayDetail = morePlayData;
        this.hteam =  morePlayData.hteam;
        this.gteam = morePlayData.gteam;
        this.startTime = morePlayData.startTime;
        this.liveTime = morePlayData.liveTime;
        this.leagueName = morePlayData.leagueName;
        this.hillegal= morePlayData.hillegal;
        this.gillegal= morePlayData.gillegal;
        this.hscore= morePlayData.hscore;
        this.gscore= morePlayData.gscore;
        return store.state.morePlayData.result.data;
      }
      return [];
    },
    playType:{
      get: function () {
        return store.state;
      },
      set: function (newValue) {
      }
    },
    maintenancePlay:{
      get: function () {
         console.log(store.state.chargeMixOrChampion,"store.state.chargeMixOrChampion")
        return store.state.chargeMixOrChampion.TYZQ["2"];
      },
      set: function (newValue) {
      }
    },
    imprisonPlay:{ //玩法禁止
      get: function () {
        return store.state.chargeMixOrChampion.TYZQ["3"];
      },
      set: function (newValue) {
      }
    },
    is_showModal:{
      get: function () {
        return store.state.is_showModal;
      },
      set: function (newValue) {
       store.state.is_showModal = newValue;
      }
    },
    /** 综合过关数目统计 */
    mixCount:{
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
    isMix: {
      get: function () {
        return store.state.baseParam.isMix;
      }
    },
    dateType:{
      get:function () {
        return store.state.baseParam.dateType;
      }
    },
    images_football() {
      if (store.state.imagesBackgroundList) {
        let backgroundImg_sky = store.state.imagesBackgroundList.sky;
        if (backgroundImg_sky!=undefined && backgroundImg_sky.TYZQ!=undefined) {
          return process.getLocalStorage_bk(backgroundImg_sky.TYZQ.path)
        } else {
          return this.images_football_zw
        }
      }
      else {
        return this.images_football_zw
      }

    }
  },
  watch: {
    items(now, old) {
      oddsChange.methods.watchBallData(now, old, this)
    }
  },

};
