
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
      BallPlayIsShow:[],//控制更多玩法里玩法的展示
      scoreGameH:0,//滚球主队盘
      scoreGameC:0,//滚球客队盘
      scoreSetH:0,//滚球主队局
      scoreSetC:0,//滚球客队局
      hscore:0,//滚球主队分
      gscore:0,//滚球客队分
      activeTab:'all',
      leagueName:'',
      tabList: [],
      showBox:{},
      isDisplay: false,
      showDialogStyle_trade: {  //交易弹窗控制按钮并传参
        isDisplay: false,
        params: ''
      },
      userBetData: [],
      gameData: {},
      title:'',
      images_tennisball_zw:'./static/imgs/perch/tennisball.png',//网球占位图
      // morePlayDetail: store.state.morePlayDetail,
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
    //展示综合过关页面
    showMixBet(){
      store.state.is_showModal = true;
    },
    //点击显示隐藏
    switchBox(index){
        this.showBox[index].content = !this.showBox[index].content
        if(this.showBox[index].content == true){
            document.getElementById(index).style.transform = 'translate(0,-50%) rotate(-90deg)'
        }else {
            document.getElementById(index).style.transform = 'translate(0,-50%) rotate(-180deg)'
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
    //网球根据主队名称获取玩法标题名称
    titleData (hteam, isrq = false) {
      let title
      if (hteam.indexOf("-") === -1) {
        title = ''
      } else {
        let reg = /\((.+)\)/g
        title = hteam.split("-")[1].match(reg) !== null ? '-' + RegExp.$1 : ''
      }
      if (isrq) {
        return title.indexOf('第') !== -1 ? '让局'.concat(title) : title.indexOf('让局') !== -1 ? '让局' : '让盘'
      }
      return title
    },
    //根据传过来的数据及玩法判断该盘口该玩法是否存在数据
    playIsShow(data,playType){
      let show = false;
      for(let i=0;i<data.length;i++){
        switch(playType){
          case 'dy':
            if(data[i].dIorMH && data[i].dIorMC){
              show = true;
            }
            break;
          case 'rp':
            if(data[i].dRatio && data[i].dIorRH && data[i].dIorRC){
              show = true;
            }
            break;
          case 'dx':
            if(data[i].dRatioO && data[i].dRatioU && data[i].dIorOUH && data[i].dIorOUC){
              show = true;
            }
            break;
          case 'qyjsdx':
            break;
        }
      }
      return show;
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
    //名字超出长度滚动
    base.methods.teamNameRolling();
    store.commit('homeHeaderControl',{shwoback:true,type:'string',val:'',footShow:false});
    //名字超出长度滚动
    base.methods.teamNameRolling();
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
    playType: {
      get: function () {
        return store.state;
      },
      set: function (newValue) {
      }
    },
    maintenancePlay:{
      get: function () {
        return store.state.chargeMixOrChampion.TYWQ;
      },
      set: function (newValue) {
      }
    },
    imprisonPlay:{ //玩法禁止
      get: function () {
        return store.state.chargeMixOrChampion.TYWQ["3"];
      },
      set: function (newValue) {
      }
    },
    //是否综合过关
    isMix:{
      get:function () {
        return store.state.baseParam.isMix;
      }
    },
    //综合过关数量
    mixCount:{
      get: function () {
        let newOddsParams = process.getNewOddsParams();
        return newOddsParams.length;
      }
    },
    is_showModal(){
      return store.state.is_showModal;
    },
    dateType:{
      get:function () {
        return store.state.baseParam.dateType;
      }
    },
    items(){

      let code = store.state.morePlayData.code;
      store.state.maintanceCode = '';
      if(code==='D000'){
        store.commit("newOddsParams",[]);
        store.state.maintanceCode =code;
        base.methods.getMatches(true);
       // return [];
      }
      //控制更多玩法里的玩法展示
      this.BallPlayIsShow = store.state.BallPlayIsShow;
      let datas = {};
      let teams = new Array();
      if(store.state.morePlayData.result
        &&store.state.morePlayData.result.data
        &&store.state.morePlayData.result.data.length>0){
        let morePlayData = store.state.morePlayData.result.data;
        store.state.morePlayDetail = morePlayData[0];
        //如果是滚球盘,就添加滚球时的主客队的盘局分
        if(store.state.moreParams.dateType === '1'){
          this.scoreGameC = morePlayData[0].scoreGameC;
          this.scoreGameH = morePlayData[0].scoreGameH;
          this.scoreSetH = morePlayData[0].scoreSetH;
          this.scoreSetC = morePlayData[0].scoreSetC;
          this.hscore = morePlayData[0].hscore === -1 ? 'A':morePlayData[0].hscore;
          this.gscore = morePlayData[0].gscore === -1 ? 'A':morePlayData[0].gscore;
          this.title = morePlayData[0].liveStep;
        }else {
          this.title = this.formatTimes(morePlayData[0].startTime);
        }
        this.hteam =  morePlayData[0].hteam;
        this.gteam = morePlayData[0].gteam;
        this.leagueName=morePlayData[0].leagueName;
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
      }
      return datas;
      // return store.state.morePlayData.result;
    },
    data(){
      if(store.state.morePlayData.result){
        return store.state.morePlayData.result.data;
      }
      return [];
    },
    checkedMatches: {
      get: function () {
        return store.state.checkedMatches;
      }
    },
    images_tennisball(){
      if (store.state.imagesBackgroundList) {
        let backgroundImg_sky = store.state.imagesBackgroundList.sky;
        if (backgroundImg_sky!=undefined && backgroundImg_sky.TYWQ!=undefined) {
          return process.getLocalStorage_bk(backgroundImg_sky.TYWQ.path)
        } else {
          return this.images_tennisball_zw
        }
      }
      else {
        return this.images_tennisball_zw
      }

    },
    morePlayDetail:{
      get:function () {
        if(store.state.moreParams.dateType === '1'){
          store.state.morePlayDetail.title = store.state.morePlayDetail.liveStep;
        }else{
          store.state.morePlayDetail.title = this.formatTimes(store.state.morePlayDetail.startTime);
        }
        return store.state.morePlayDetail;
      }
    }
  },
  destroyed(){
    window.clearInterval(this.timer1);
  },
  watch: {
    data(now, old) {
      oddsChange.methods.watchBallData(now, old, this);
    }
  },
  created(){
    let moreData = store.state.morePlayData.result;
    if(moreData){
      let array = {};
      for(let i=0;i<moreData.data.length;i++){
        array[moreData.data[i].id+'dy'] = {'content': true};
        array[moreData.data[i].id+'rp'] = {'content': true};
        array[moreData.data[i].id+'dx'] = {'content': true};
        array[moreData.data[i].id+'zfdxz'] = {'content': true};
        array[moreData.data[i].id+'zfdxk'] = {'content': true};
      }
      this.showBox = array;
    }
  }
};
