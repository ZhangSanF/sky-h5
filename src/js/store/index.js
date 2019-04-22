import Vue from 'vue'
import Vuex from 'vuex'
import betClassify from '../../components/playTypeJson/playType'

/* eslint-disable */``
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
      cacheData:{
           //结构 一级'TYZQ'为球类 二级的0,1,2标识今日、滚球、早盘；三级0、1、2标志单式、综合过关、冠军，最里层：version标识时间版本，data标识缓存数据
            TYZQ:{
              0:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              1:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              2:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}}
            },
            TYLM:{
              0:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              1:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              2:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}}
            },
            TYBQ:{
              0:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              1:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              2:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}}
            },
            TYWQ:{
              0:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              1:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              2:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}}
            },
            TYPQ:{
              0:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              1:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              2:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}}
            },
            TYQT:{
              0:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              1:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}},
              2:{0:{version:'',data:[]},1:{version:'',data:[]},2:{version:'',data:[]}}
            },
      },

        //热门赛事玩法切换
        hotDateType:{
          zqDateType:"1",
          lmDateType:"1",
          bqDateType:"1",
          wqDateType:"1",
          pqDateType:"1",
          qtDateType:"1"
        },
        hotPlayType:{
          zqdy:'3020011',
          zqrq:'3020012',
          zqdx:'3020013',

          lqdy:'3120040',
          lqrf:'3120010',
          lqdx:'3120020',

          bqdy:'3420030',
          bqrq:'3420010',
          bqdx:'3420020',

          wqdy:'3220030',
          wqrp:'3220010',
          wqdx:'3220020',

          pqdy:'3320030',
          pqrf:'3320010',
          pqdx:'3320020',

          qtdy:'3520010',
          qtrq:'3520020',
          qtdx:'3520030',
        },
        sysFreqParams:{
          liveFreq:10,
          todayFreq:90,
          morningFreq:90,
          hotFreq:10,
          noticeFreq:10,
          betFreq:10,
          playMFreq:10,
          systemMFreq:10,
          mixFreq:90,
          httpTimeout:20000,//毫秒
          noticePollNum:3,
          chartPollNum:3
        },
        init:{    //初始化请求(用于token登录控制)
            typeSum:false,//初始化时首页赛事数量请求是否成功typeSum
            todayOdds:false,//初始化今日赛事数据请求是否成功
            morningOdds:false,//初始化早盘赛事数据请求是否成功
            homeNotice:false,//初始化首页公告是否请求成功homeNotice
            // odds:false,//初始化热门赛事是否请求成功hotMatches
            default:true,//默认属性，init清空掉后不再赋值
        },
        sort:'1',
        user:{},
        isLeague:false,
        isMore:'',//定时器里用来区别是更多玩法
        morePlayDetail:'',
        matchesId:'', //联赛id
        infoMsg:'',//投注信息
        betCode:'',//投注单号
        orderState: 'toConfirm', //投注框状态
        Live:'0',
        host:true,
        Type:'',
        playType:'single',
        is_showModal: false, //下注弹窗
        shwoback: false,
        footClick:false,//标记是从那个页面进入主页的三个路由的
        homeHeaderConfig:{ footShow: true},
        footHeight:'',
        headHeight:'',
        qcrq: '', //全场让球
        bcrq: '', //半场让球  首五局让球
        qcdx: '', //全场大小
        bcdx: '', //半场大小 首五局大小
        ds: '', //单双
        dy: '', //独赢
        bcdy: '', //半场独赢
        rf: '', //让分
        zfdx: '', //总分大小 //球员局数 大/小
        dfdx: '', //得分大小
        rp: '', //让盘
        zjsdx: '', //总局数大小
        zkh: '', //主客和
        footSpcheight:'',
        showLoading:false,
        obj:[],   //全局对象
        active:{topType:[],gameType:[]},//页面选中状态对象
        datas: [],    //存放赔率数据
        params: [],    //存放赔率条件
        moreParams: [], //存放更多玩法赔率条件
        matchesMsg:[],  //赛事维护信息
        betRecordHis: {},   //投注历史
        resolved_data: [],  //已结算数据
        res_includeOtherType: false , //已结算是否有(除综合过关)其他数据---
        resolved_otherTypesData: {},  //已结算(除综合过关)其他数据
        res_includePassTest: false,   //已结算是否有综合过关数据
        resolved_passTestData: {},    //已结算综合过关数据
        unresolved_data: [],            //未结算数据
        unres_includeOtherType: false,  //未结算是否有(除综合过关)其他数据
        unres_otherTypesData: {},       //未结算(除综合过关)其他数据
        unres_includePassTest: false,   //未结算是否有综合过关数据
        unres_passTestData: {},         //未结算综合过关数据
        unres_data_len:0,     //所有未结算注单的数量，在上划加载时使用
        matchsResult:[],   //赛果
        wallet_record:{},   //钱包记录
        wallet_record_num:0,   //钱包记录的条数
        announcement_data:{} ,//公告
        gameTypeNum:[], //球赛,球赛数量,
        playData:[],    //玩法
        accountHis:[],  //账户历史
        league:[],     //联赛信息
        plateDate:[],  //盘口
        ballKinds:[],   //球类型
        nowOddsAndLimit:[], //获取最新赔率
        nowOddsAndLimit_result:[],
        gamePlayObj:[],
        morePlayData:[],   //更多玩法赔率数据
        tokenData:[],     //token数据

        newOddsParam: [],  //获取新赔率请求参数(单笔)
        newOddsParams: [],  //获取新赔率请求参数
        zqOddsParams: [],  //足球
        lmOddsParams: [],  //篮球
        wqOddsParams: [],  //网球
        pqOddsParams: [],  //排球
        bqOddsParams: [],  //棒球
        qtOddsParams: [],  //其他
        mixBetLimit: {mixMin: 0, mixMax: 0},  //综合过关限定数
        newOddsResp: {}, //新赔率请求相应结果
        playTabName: 'size',  //已选玩法 让球&大小 size 0、综合过关 reach 1、冠军 champion 2
        checkedMatches: {},  //综合过关已选赛事玩法['matId+leagueId+'玩法id' + '主/客': true]
        baseParam: {dateType: '1', gameType: 'TYZQ', isMix: '0'}, //用于保存界面切换时数据变化dateType：1滚球0今日2早盘，ballType：各球类，playType：单式、综合过关。isMix:0单式 1综合过关 2冠军
        dateTypeTab: [
            {label: '滚球', name: 'live', dateType: '1'},
            {label: '今日', name: 'today', dateType: '0'},
            {label: '早盘', name: 'future', dateType: '2'},
        ],
        playTabList: [],
        BallPlayIsShow:[],
        WPBallData: [], //网球排球让球数据
        playMaintenance:{
          title:'暂无数据',
          question_reason:'3',
          content:'',
          content_time_before:'',
          content_time:'',
          content_time_after:'',
        } , //存玩法维护的对象，初始化为暂无数据
        pullUpStart:false,//投注历史，未结算注单上划是否开始加载
        pullUpSuccess:false,//投注历史，未结算注单上拉加载成功后展示加载成功样式
        pullDownStart:false,//投注历史，未结算注单下拉是否开始加载
        pullDownSuccess:false,//投注历史，未结算注单下拉加载成功后展示加载成功样式
        loopTimer: null, //文本超长滚动定时器
        chargeMixOrChampion:[],
        timerFresh:true, //用于全局判断定时器是否要刷新，如在已结算和未结算是不刷新,
        type_sum:'Y',

       //专用户首页热点数据的存放
       zqHotData:[],
       lmHotData:[],
       bqHotData:[],
       wqHotData:[],
       pqHotData:[],
       qtHotData:[],

       liveZqNum:'' ,//滚球足球数量
       liveLmNum:'', //滚球篮球数量
       isHome:true,//是否是首页
       homeNotice:[], //首页公告的3条轮播数据
      hotMatches: [],    //存放热门数据
      noticeNum:1,
      homeToNotice:'1',
      ruleNameList:[],
      ruleJson:[],
      ruleHtml:'',
      morningZqData:[], //用于缓存定时刷的早盘足球的数据
      todayZqData:[], //用于缓存定时刷的今日足球的数据
      copyMsg:{},
      leagueNames: new Map(),
      touchVal: "home_center",
      toasting:false,
      oddsChangeTag:{oldTag: '0', newTag: '0'},
      openItemStorage:[],
      maintanceCode:'',//判断当前的维护状态
      systemMaintanceCode:'',
      imagesList:[],//存放轮播图
      imagesLogoList:[],//存放logo
      imagesBackgroundList:[],//存放背景图片
      isImageLbNotNul:true,//轮播图默认有值
      isImageLogoNotNul:true,//logo默认有值
      oddClassObj: {
        oddsCss1: ['#333333','rate_color_green', 'rate_color_red'],
        oddsCss2: ['#333333','iconfont icon-arrows arrow_up_green', 'iconfont icon-arrows arrow_down_red']
      },
      loginStatus:false,
      countBetAmount:0,
      countBetAward:0,
      myMoneyParams:{tradeType: '1', computedTime: '1'},
      myMessageParams:{ann_type: '1',activeTab:'24小时'},
      // 首页公告/提示弹窗
      newsDialog:{
          isShow:false,
          showInfo: true, // true为消息公告,false为提示公告
          content:'' //提示框内容
      },
      countDown:10,
      noticeCountDown:10,
    },
    mutations: {
        // 首页公告/提示弹窗
        updateDialog(state, data) {
            state.newsDialog = data
        },
        showBack(state, isshow) {
            state.shwoback = isshow;
        },
        homeHeaderControl(state,data) {
            state.homeHeaderConfig = data;
        },
        mathFootHeight(state,param){
            let headHeight = param/1.375;
            state.headHeight = headHeight;
            state.footHeight = -param-headHeight;
        },
        mathSpcFootHeight(state,param){
            state.footSpcheight = state.headHeight+param;
        },
        showLoading(state,status){
            state.showLoading = status;
        },
        // 添加对象数据
        add_datas(state, data) {
            this.state.datas = data;
        },
      add_hotMatches(state, data) {
        this.state.hotMatches = data;
      },
        // 删除datas
        delete_datas(state) {
            this.state.datas = [];
        },
        // // 添加下注对象
        // bet_data(state, data) {
        //     this.state.betData = data;
        // },
        // 添加获取最新赔率参数
        // bet_param(state, data) {
        //     this.state.betParam = data;
        // },
        //历史投注
        add_betRecord_data(state,data){
          if(Object.keys(data).length>0){
            this.state.betRecordHis = data;
            //投注记录算页面参数
            this.state.resolved_data = data.resolved_data;
            this.state.unres_data_len = 0;
            this.state.unres_data_len = data.unres_data_len;
          }else {
            //清空数据
            this.state.betRecordHis = {};
            this.state.resolved_data = [];
            this.state.unres_data_len = 0;
          }
        },
        //添加赛果
        add_result_data(state,data){
            this.state.matchsResult = data;
        },
        //钱包记录
        add_wallet_record_data(state,data){
            this.state.wallet_record=data;
        },
        //公告
        add_announcement_data(state,data){
            this.state.announcement_data = data;
        },
        //球赛数量
        gameType_Num(state,data){
            this.state.gameTypeNum = data;
        },
        //球赛数量
        ballKinds(state,data){
            this.state.ballKinds = data;
        },
        //玩法
        add_play_data(state,data){
            this.state.playData = data;
        },
        //账户历史
        add_accountHis_data(state,data){
            this.state.accountHis = data;
        },
        //联赛信息
        add_league_data(state,data){
            this.state.league = data;
        },
        //盘口
        add_plate_data(state,data){
            this.state.plateDate = data;
        },
        //玩法赛事赔率条件
        add_params(state,data){
            this.state.params = data;
        },
        //更多玩法赔率条件
        add_moreParams(state,data){
            this.state.moreParams = data;
        },
        //已结算注单
        get_settled_bet(state,data) {
            this.state.settledBet = data;
        },
        //未结算注单
        get_unsettled_bet(state,data){
            this.state.unSettledBet = data;
        },
        //最新赔率的参数
        get_nowOddsAndLimit_params(state,data){
            this.state.nowOddsAndLimit = data;
        },
        ////最新赔率返回数据
        get_nowOddsAndLimit(state,data){
            this.state.nowOddsAndLimit_result = data;
        },
        get_gamePlayObj(state,data){
            this.state.gamePlayObj = data;
        },
        add_more_datas(state,data){
          for(let matches in data){
            if(matches.isMaster == 'Y'){
              state.morePlayDetail = matches;
            }
          }
            this.state.morePlayData = data;
        },
        //获取全局的玩法类型
        setPlayType(state, obj){
            // this.state.gameType = obj.gameType;
            // this.state.dateType = obj.dateType;
            // if(!(obj.isMix == undefined || obj.isMix == null)) {
            //     this.state.isMix = obj.isMix;
            // }
            if (obj.dateType === "1") {
                this.state.Live = '1';
                switch (obj.gameType) {
                    case "TYZQ"://足球
                        this.state.Type = '3020000';
                        this.state.qcrq = betClassify.football.Gqcrq;
                        this.state.bcrq = betClassify.football.Gbcrq;
                        this.state.qcdx = betClassify.football.Gqcdx;
                        this.state.bcdx = betClassify.football.Gbcdx;
                        this.state.ds = betClassify.football.Gds;
                        this.state.dy = betClassify.football.Gdy;
                        this.state.bcdy = betClassify.football.Gbcdy;
                        break;
                    case "TYLM"://篮球
                        this.state.Type = '3120000';
                        this.state.ds = betClassify.basketball.ds;
                        this.state.dy = betClassify.basketball.Gdy;
                        this.state.rf = betClassify.basketball.Grf;
                        this.state.zfdx = betClassify.basketball.Gzfdx;
                        this.state.dfdx = betClassify.basketball.Gdfdx;
                        break;

                    case "TYBQ":
                        this.state.Type = '3420000';
                        this.state.dy = betClassify.baseball.Gdy;
                        this.state.qcrq = betClassify.baseball.Grq;
                        this.state.qcdx = betClassify.baseball.Gqcdx;
                        this.state.ds = betClassify.baseball.Gds;
                        this.state.zkh = betClassify.baseball.GFzkh;
                        this.state.bcrq = betClassify.baseball.GFrq;
                        this.state.bcdx = betClassify.baseball.GFqcdx;
                        break;

                    case "TYWQ":
                        this.state.Type = '3220000';
                        this.state.dy = betClassify.tennis.Gdy;
                        this.state.zjsdx = betClassify.tennis.Gzjsdx;
                        this.state.zfdx = betClassify.tennis.Gqyjsdx;
                        this.state.rp = betClassify.tennis.Grp;
                        break;

                    case "TYPQ":
                        this.state.Type = '3320000';
                        this.state.rf = betClassify.volleyball.Grf;
                        this.state.ds = betClassify.volleyball.ds;
                        this.state.dy = betClassify.volleyball.Gdy;
                        this.state.zfdx = betClassify.volleyball.Gzfdx;
                        this.state.dfdx = betClassify.volleyball.Gdfdx;
                        this.state.mix = betClassify.volleyball.mix;
                        break;

                    case "TYQT":
                        this.state.Type = '3520000';
                        this.state.dy = betClassify.other.Gdy;
                        this.state.qcrq = betClassify.other.Gqcrq;
                        this.state.qcdx = betClassify.other.Gqcdx;
                        this.state.ds = betClassify.other.Gds;
                        this.state.bcrq = betClassify.other.Gbcrq;
                        this.state.bcdx = betClassify.other.Gbcdx;
                        break;

                }

            } else {
                this.state.Live = '0';
                if(this.state.baseParam.isMix == '2'){
                  this.state.playType = 'champion';
                }else if(this.state.baseParam.isMix == '1'){
                    this.state.playType = 'mix';
                }else{
                    this.state.playType = 'single';
                }
                switch (obj.gameType) {
                    case "TYZQ"://足球
                        if(this.state.baseParam.isMix == '1'){
                            this.state.Type = '3070000';
                        }else{
                            this.state.Type = '3010000';
                        }
                        // this.state.Type = '3010000';
                        this.state.qcrq = betClassify.football.qcrq;
                        this.state.bcrq = betClassify.football.bcrq;
                        this.state.qcdx = betClassify.football.qcdx;
                        this.state.bcdx = betClassify.football.bcdx;
                        this.state.ds = betClassify.football.ds;
                        this.state.dy = betClassify.football.dy;
                        this.state.bcdy = betClassify.football.bcdy;
                        break;
                    case "TYLM"://篮球
                        if(this.state.baseParam.isMix == '1'){
                            this.state.Type = '3170000';
                        }else{
                            this.state.Type = '3110000';
                        }
                        // this.state.Type = '3110000';
                        this.state.ds = betClassify.basketball.ds;
                        this.state.dy = betClassify.basketball.dy;
                        this.state.rf = betClassify.basketball.rf;
                        this.state.zfdx = betClassify.basketball.zfdx;
                        this.state.dfdx = betClassify.basketball.dfdx;
                        break;

                    case "TYBQ":
                        if(this.state.baseParam.isMix == '1'){
                            this.state.Type = '3430000';
                        }else{
                            this.state.Type = '3410000';
                        }
                        // this.state.Type = '3410000';
                        this.state.dy = betClassify.baseball.dy;
                        this.state.qcrq = betClassify.baseball.rq;
                        this.state.qcdx = betClassify.baseball.qcdx;
                        this.state.ds = betClassify.baseball.ds;
                        this.state.zkh = betClassify.baseball.Fzkh;
                        this.state.bcrq = betClassify.baseball.Frq;
                        this.state.bcdx = betClassify.baseball.Fdx;
                        break;

                    case "TYWQ":
                        if(this.state.baseParam.isMix == '1'){
                            this.state.Type = '3240000';
                        }else{
                            this.state.Type = '3210000';
                        }
                        // this.state.Type = '3210000';
                        this.state.dy = betClassify.tennis.dy;//独赢
                        this.state.rp = betClassify.tennis.rp;//让盘
                        this.state.zjsdx = betClassify.tennis.zjsdx;//总局数大小
                        this.state.zfdx = betClassify.tennis.qyjsdx;//球员局数大小
                        this.state.ds = betClassify.tennis.ds;//单双
                        break;

                    case "TYPQ":
                        if(this.state.baseParam.isMix == '1'){
                            this.state.Type = '3340000';
                        }else{
                            this.state.Type = '3310000';
                        }
                        // this.state.Type = '3310000';
                        this.state.rf = betClassify.volleyball.rf;
                        this.state.ds = betClassify.volleyball.ds;
                        this.state.dy = betClassify.volleyball.dy;
                        this.state.zfdx = betClassify.volleyball.zfdx;
                        this.state.dfdx = betClassify.volleyball.dfdx;
                        this.state.mix = betClassify.volleyball.mix;

                        break;

                    case "TYQT":
                        if(this.state.baseParam.isMix == '1'){
                            this.state.Type = '3530000';
                        }else{
                            this.state.Type = '3510000';
                        }
                        // this.state.Type = '3510000';
                        this.state.dy = betClassify.other.dy;
                        this.state.qcrq = betClassify.other.qcrq;
                        this.state.qcdx = betClassify.other.qcdx;
                        this.state.ds = betClassify.other.ds;
                        break;
                }
                if(this.state.baseParam.isMix == '2'){
                  this.state.Type = '';
                }
            }

        },
        add_playMaintenance(state,data){
            this.state.playMaintenance = [];
            this.state.playMaintenance = data;
        },
        add_PalyTypeIsShwo(state,data){
            this.state.BallPlayIsShow = data;
        },
        add_WPBallData(state,data){
            this.state.WPBallData=data;
        },
        /** 请求最新赔率的参数（单笔） */
        newOddsParam(state, data) {
            this.state.newOddsParam = data;
        },
        /** 请求最新赔率的参数 */
        newOddsParams(state, data) {
            let reqParams = data;
            let mat = {};
          let beforeOdds = this.state.newOddsParams;
            for(let index in reqParams){
                let reqParam = reqParams[index];
                let key = reqParam.onlykey + reqParam.matid + reqParam.type + reqParam.isWho;
                if(beforeOdds.length == 0){
                  mat[key] = true;
                }
                for(let item in beforeOdds){
                if(item != key){
                  mat[key] = true;
                }
              }
            }
            this.state.checkedMatches = mat;
           // this.state.newOddsParams = data;
           //新增的逻辑
          let gameType = state.baseParam.gameType
          switch (gameType){
            case "TYZQ":
              this.state.zqOddsParams = data;
              break;
            case "TYLM":
              this.state.lmOddsParams = data;
              break;
            case "TYWQ":
              this.state.wqOddsParams = data;
              break;
            case "TYPQ":
              this.state.pqOddsParams = data;
              break;
            case "TYBQ":
              this.state.bqOddsParams = data;
              break;
            case "TYQT":
              this.state.qtOddsParams = data;
              break;
          }

        },
        mixBetLimit(state, data){
            this.state.mixBetLimit = data;
        },
        /** 最新赔率的相应结果 */
        newOddsResp(state, data) {
            this.state.newOddsResp = data;
        },
        /** 选择的玩法 */
        playTabName(state, data) {
            this.state.playTabName = data;
        },
        /** 综合过关已选赛事玩法 */
        checkedMatches(state, data) {
            this.state.checkedMatches = data;
        },
        /** 记录赛事基础参数 */
        baseParam(state, data) {
            // if(data.gameType != this.state.baseParam.gameType){
            //   data.isMix = '0';
            // }
            this.state.baseParam = data;
        },
        add_tokenData(state,data){
            state.tokenData = data;
        },
        //首页获取赛事数量成功
        changeInit(state,data){
            this.state.init = {};
            this.state.init = data;
        },
      /** 文本超长滚动定时器 */
      loopTimer(state, data) {
        this.state.loopTimer = data;
      },
      setChargeMixOrChampion(state,data){
        this.state.chargeMixOrChampion = data;
      },

      //设置热点数据
      setZqHotData(state,data){
        state.zqHotData = data;
      },
      setLmHotData(state,data){
        state.lmHotData = data;
      },
      setBqHotData(state,data){
        state.bqHotData = data;
      },
      setWqHotData(state,data){
        state.wqHotData = data;
      },
      setPqHotData(state,data){
        state.pqHotData = data;
      },
      setQtHotData(state,data){
        state.qtHotData = data;
      },
      setHomeNotice(state,data){
        state.homeNotice = data;
      },
      setRuleNameList(state,data){
        state.ruleNameList = data;
      },

      setRuleJson(state,data){
        state.ruleJson = data;
      },

      setRuleHtml(state,data){
        state.ruleHtml = data;
      },
      setMorningZqData(state,data){
        state.morningZqData = data;
      },
      setTodayZqData(state,data){
        state.todayZqData = data;
      },
      setCopyMsg(state,data){
        state.copyMsg = data;
      },
      setOddsChangeTag(state,data){
        state.oddsChangeTag = data;
      },
      setOpenItemStorage(state,data){
        state.openItemStorage = data;
      },

      setImagesList(state,data){
        state.imagesList = data;
      },

      setImagesLogoList(state,data){
        state.imagesLogoList = data;
      },
      setImagesBackgroundList(state,data){
        state.imagesBackgroundList = data;
      },

      setHotPlayType(state){
        //滚球时取默认值，今日早盘更新玩法
        if(state.hotDateType.zqDateType!='1'&& state.hotDateType.zqDateType!=undefined){
          state.hotPlayType.zqdy = betClassify.football.dy;
          state.hotPlayType.zqrq = betClassify.football.qcrq;
          state.hotPlayType.zqdx =  betClassify.football.qcdx;
        }

        if(state.hotDateType.lmDateType!='1'&& state.hotDateType.lmDateType!=undefined){
          state.hotPlayType.lqdy =  betClassify.basketball.dy;
          state.hotPlayType.lqrf =  betClassify.basketball.rf;
          state.hotPlayType.lqdx =  betClassify.basketball.zfdx;
        }

        if(state.hotDateType.bqDateType!='1'&& state.hotDateType.bqDateType!=undefined){
          state.hotPlayType.bqdy =  betClassify.baseball.dy;
          state.hotPlayType.bqrq =  betClassify.baseball.rq;
          state.hotPlayType.bqdx =  betClassify.baseball.qcdx;
        }

        if(state.hotDateType.wqDateType!='1'&& state.hotDateType.wqDateType!=undefined){
          state.hotPlayType.wqdy =  betClassify.tennis.dy;
          state.hotPlayType.wqrp =  betClassify.tennis.rp;
          state.hotPlayType.wqdx =  betClassify.tennis.zjsdx;
        }

        if(state.hotDateType.pqDateType!='1'&& state.hotDateType.pqDateType!=undefined){
          state.hotPlayType.pqdy =  betClassify.volleyball.dy;
          state.hotPlayType.pqrf =  betClassify.volleyball.rf;
          state.hotPlayType.pqdx =  betClassify.volleyball.zfdx;

        }
        if(state.hotDateType.qtDateType!='1'&& state.hotDateType.qtDateType!=undefined){
          state.hotPlayType.qtdy =  betClassify.other.dy;
          state.hotPlayType.qtrq =  betClassify.other.qcrq;
          state.hotPlayType.qtdx =  betClassify.other.qcdx;
        }

      },
    }
})
