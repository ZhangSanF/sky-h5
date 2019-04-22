//用来做数据处理
export default {
  data: {
    showContent001: true,
    showContent002: true,
    showContent003: true,
    showContent004: true,
    showContent005: true,
    showContent006: true,
    showContent007: true,
    showContent008: true,
    showContent009: true,
    showContent010: true,
    showContent011: true,
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
    isWho: '',
    gameType: '',
    playType: '',
    plate: '',
    pageNo: '',
    matId: '', //足球波胆下注使用,
    isMix: '0',
    gamePlayObj: {},
    mixNum: 0,
    showChooseMore: false,
    oldMsg: [],
    newMsg: []
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

  TYZQPlayIsShow(obj, that) { //足球判断玩法是否展示
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
      this.addggSelectClass(that, item)
    }
    that.BallData = [...obj]
    this.arrayAllisTrue(ob, that)
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
      this.addggSelectClass(that, item)
    }
    that.BallData = [...obj]
    this.arrayAllisTrue(ob, that)
  },
  TYBQPlayIsShow(obj, that) { //棒球判断玩法是否展示
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
      this.addggSelectClass(that, item)
    }
    that.BallData = [...obj]
    this.arrayAllisTrue(ob, that)
  },
  TYWQPlayIsShow(obj, that) { //网球判断玩法是否展示
    let ismix = Number.parseInt(that.isMix) !== 0
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
        this.addggSelectClass(that, item)
      }
      that.BallData = [...obj]
    } catch (e) {
      console.log(e, 'BallData', that.BallData)
    }
    try {
      let arr = [], arr1 = [], data = obj.concat()
      for (let k = 0; k < data.length - 1; k++) {
        if (data[k].hteam === data[k + 1].hteam) {
          if (ismix) {
            data[k]['ggSelect' + data[k].id + 'zr'] = data[k]['ggSelect' + data[k + 1].id + 'zr'] =
              data[k]['ggSelect' + data[k].id + 'kr'] = data[k]['ggSelect' + data[k + 1].id + 'kr'] = false
            this.addSelectClass(that, data[k])
          }
          arr1.push(data[k], data[k + 1])
          arr1['hteam'] = data[k].hteam
          arr1['showContent'] = 'showContent2' + k
          arr1['maxHeight'] = {
            slide: true,
            animate: true
          }
          arr.push(arr1)
          arr1 = []
        }
      }
      that.WPBallData = [...arr]
    } catch (e) {
      console.log(e, 'WPBallData', that.WPBallData)
    }
    this.arrayAllisTrue(ob, that)
  },
  TYPQPlayIsShow(obj, that) { //排球判断玩法是否展示
    let ob = this.BallPlayIsShow()
    for (let i in obj) {
      let item = obj[i]
      ob.isqcrq[i] = Util.isNotEmpty(item.dIorRH, item.dIorRC)
      ob.isqcdx[i] = Util.isNotEmpty(item.dIorOUH, item.dIorOUC)
      ob.isdy[i] = Util.isNotEmpty(item.dIorMH, item.dIorMC)
      ob.isqddfz[i] = Util.isNotEmpty(item.ior_OUHO, item.ior_OUHU)
      ob.isqddfk[i] = Util.isNotEmpty(item.ior_OUCO, item.ior_OUCU)
      this.WPaddShow(obj[i], i)
      this.addggSelectClass(that, item)
    }
    that.BallData = [...obj]
    this.arrayAllisTrue(ob, that)
  },
  TYQTPlayIsShow(obj, that) { //其他判断玩法是否展示
    let ob = this.BallPlayIsShow()
    for (let i in obj) {
      let item = obj[i]
      ob.isqcrq[i] = Util.isNotEmpty(item.dIorRH, item.dIorRC)
      ob.isqcdx[i] = Util.isNotEmpty(item.dIorOUH, item.dIorOUC)
      ob.isds[i] = Util.isNotEmpty(item.dIorEOO, item.dIorEOE)
      ob.isdy[i] = Util.isNotEmpty(item.dIorMH, item.dIorMC)
      this.addggSelectClass(that, item)
    }
    that.BallData = [...obj]
    this.arrayAllisTrue(ob, that)
  },
  arrayAllisTrue: function (obj, that) {
    for (let vle in obj) {
      let v = obj[vle]
      for (let i = 0; i < v.length - 1; i++) {
        v[i + 1] = v[i] || v[i + 1]
      }
      obj[vle] = v[v.length - 1]
    }
    that.BallPlayIsShow = obj
  },
}
