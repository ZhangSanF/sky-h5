
import BScroll from 'better-scroll';
import showBet from '../showBet/showBet.js'
import Util from '../../js/util/util.js'
import tradeDialog from '../../components/public/tradeDialog.vue'
import {store,base,process} from "@/js/public/port";
import betClassify from '../../components/playTypeJson/playType'
import oddsChange from "../showBet/oddsChange";
import nodataPage from '@/views/question_page/nodataPage';
export default {
  components: {
    tradeDialog,nodataPage
  },
  data() {
    return {
      hteam:'',
      gteam:'',
      activeTab:'all',
      betType:betClassify,
      oldMsg: {},
      newMsg: {},
      leagueName:'',
      startTime:'',
      hscore:'',
      gscore:'',
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
      showDialogStyle_trade: {  //交易弹窗控制按钮并传参
        isDisplay: false,
        params: ''
      },
      images_otherball_zw:'./static/imgs/perch/otherball.png',//其它占位图
    };
  },
  methods:{
    formatTimes(time)
    {
      return Util.formatTime(Util.formatDate.UnixToDate(time, -12, 'MDhm'));
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
    showMixBet(){
      store.state.is_showModal = true;
    },
    matTimeMore(time, type) {
      if (time) {
        return Util.formatDate.UnixToDate(time,-12,type,'')
      } else {
        return '';
      }
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
    store.state.is_showModal =false;
    this.items;
    store.commit('homeHeaderControl',{shwoback:true,type:'string',val:'',footShow:false});
    //名字超出长度滚动
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
    items(){
      let code = store.state.morePlayData.code;
      store.state.maintanceCode = '';
      if(code==='D000'){
        store.commit("newOddsParams",[]);
        store.state.maintanceCode = code;
        base.methods.getMatches(true);
      //  return [];
      }
      if(store.state.morePlayData.result && store.state.morePlayData.result.data){
        let morePlayData = store.state.morePlayData.result.data[0];
        store.state.morePlayDetail = morePlayData;
        this.hteam =  morePlayData.hteam;
        this.gteam = morePlayData.gteam;
        this.leagueName = morePlayData.leagueName;
        this.startTime = morePlayData.startTime;
        this.hscore = morePlayData.hscore;
        this.gscore = morePlayData.gscore;
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
        return store.state.chargeMixOrChampion.TYQT["2"];
      },
      set: function (newValue) {
      }
    },
    imprisonPlay:{ //玩法禁止
      get: function () {
        return store.state.chargeMixOrChampion.TYQT["3"];
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
      },
      set: function (newValue) {
      }
    },
    /** 综合过关样式 */
    checkedMatches: {
      get: function () {
        return store.state.checkedMatches;
      },
      set: function (newValue) {
      }
    },
    /** 玩法类型 0单式 1综合过关 2冠军 */
    isMix: {
      get: function () {
        return store.state.baseParam.isMix;
      }
    },

    baseParam: {
      get: function () {
        return store.state.baseParam;
      }
    },
    //判断当前是否包含何惧数据，因为其他有的有和有的没有
    isShowMN(){
      return this.items[0].dIorMN != undefined && this.items[0].dIorMN != '';
    },

    images_otherball(){
      if (store.state.imagesBackgroundList) {
        let backgroundImg_sky = store.state.imagesBackgroundList.sky;
        if (backgroundImg_sky!=undefined && backgroundImg_sky.TYQT!=undefined) {
          return process.getLocalStorage_bk(backgroundImg_sky.TYQT.path)
        } else {
          return this.images_otherball_zw
        }
      }
      else {
        return this.images_otherball_zw
      }

    }
  },

  watch: {
    items(now, old) {
      oddsChange.methods.watchBallData(now, old, this)
    }
  },
};
