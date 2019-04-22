import {store,base,process} from "@/js/public/port";
import BScroll from 'better-scroll';
import showBet from "../showBet/showBet";
import tradeDialog from '../../components/public/tradeDialog.vue'
import playmantiance from '../../views/question_page/playmantiance'
import Util from "../util/util";
import questionPage from '../../views/question_page/questionPage'
import oddsChange from "../showBet/oddsChange";

export default {
  props: ['activeTab'],
  components: {
    tradeDialog,
    questionPage,
    playmantiance
  },
  data() {
    return {
      nav_label: this.$route.query.nav_label,
      ballName: this.$route.query.ballName,
      oldMsg: {},
      newMsg: {},
      showBox: {},
    }
  },
  methods: {
    forMatDate (time) {
      return Util.formatDate.UnixToDate(time, -12, 'MDhm')
    },
    oddsSelect() {
      return oddsChange.methods.oddsSelect();
    },
    //返回颜色
    oddsChangeClass(teamName, key, propertyKey) {
      let oddsC = oddsChange.methods.oddsChangeClass(teamName, key, propertyKey, this);
      let oddClassObj = store.state.oddClassObj;
      return oddClassObj['oddsCss1'][oddsC];

    },
    //返回箭头
    oddsChangeTag(teamName, key, propertyKey) {
      let oddsC = oddsChange.methods.oddsChangeClass(teamName, key, propertyKey, this);
      let oddClassObj = store.state.oddClassObj;
      return oddClassObj['oddsCss2'][oddsC];
    },
    //格式化赔率
    formatOdds(data) {
      return Util.formatOdds(data)
    },
    betDialogHandler(data, host, type, clickWho, curOdds) {
      showBet.betDialogHandler(data, host, type, clickWho, curOdds);
    },
    goToHomePage() { //关闭弹窗,返回页面
      store.state.is_showModal = false;
    },
    //点击隐藏/显示球详情
    stateContent(index, key,e) {
      // process.childShowTitle(!this.clirdShow, e,this);
      this.showBox[key].content = !this.showBox[key].content
      if(this.showBox[key].content == true){
        if(this.dateType != '1'){
          document.getElementsByClassName('icon-box-today')[index].style.transform = 'rotate(90deg)'
        }else{
          document.getElementsByClassName('icon-box')[index].style.transform = 'rotate(90deg)'
        }
      }else{
        if(this.dateType != '1'){
          document.getElementsByClassName('icon-box-today')[index].style.transform = 'rotate(0)'
        }else{
          document.getElementsByClassName('icon-box')[index].style.transform = 'rotate(0)'
        }
      }
    },
    //更多玩法跳转
    morePlay(data) {
      showBet.MorePlay(data);
    },
    //better-scroll
    BScrollMeth() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.outerWrapper, {
          hasVerticalScroll: true,
          tap: true,
          click: true
        })
      } else {
        this.scroll.refresh();
      }
    },
    /** 展示综合过关注单页 */
    showMixBet() {
      store.state.is_showModal = true;
    },
    //控制显示隐藏给data添加content为true
    getShowBox() {
      let data = this.$store.state.datas;
      if (data) {
        let array = {};
        for (let key in data) {
          if (Object.keys(this.showBox).indexOf(key) < 0) {
            if(this.dateType ==='1'){
              array[key] = {'content': true};
            }else{
              array[key] = {'content': false};
            }
          } else {
            array[key] = this.showBox[key]
          }
        }
        this.showBox = array;
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
    }
  },
  computed: {
    //检测数据
    items: {
      get: function () {
        return this.$store.state.datas;
      },
      set: function (newValue) {
      }
    },
    is_showModal: {
      get: function () {
        return store.state.is_showModal;
      },
      set: function (newValue) {
        store.state.is_showModal = newValue;
      }
    },
    playType: {
      get: function () {
        return store.state;
      },
      set: function (newValue) {
      }
    },
    play:{
      get: function () {
        return store.state.chargeMixOrChampion.TYPQ["3"];
      },
      set: function (newValue) {
      }
    },
    checkedMatches: {
      get: function () {
        return store.state.checkedMatches;
      }
    },
    /** 综合过关数目统计 */
    mixCount: {
      get: function () {
        let newOddsParams = process.getNewOddsParams();
        return newOddsParams.length;
      }
    },
    /** 玩法类型 0单式 1综合过关 2冠军 */
    isMix: {
      get: function () {
        return store.state.baseParam.isMix;
      }
    },
    dateType: {
      get: function () {
        return store.state.baseParam.dateType;
      }
    },
    maintanceCode(){
      return store.state.maintanceCode;
    }
  },
  watch: {
    items(now, old) {
      oddsChange.methods.watchMsg(now, old, this);
      this.getShowBox();
    },
    activeTab(val) {
      this.scroll.scrollTo(0, 0)
    }
  },
  mounted() {
    store.state.is_showModal = false;
    /*   base.methods.getMatches();*/
    this.$nextTick(function () {
      //滚动
      this.BScrollMeth();
    })
  },
  created() {
    this.getShowBox();
  }
}
