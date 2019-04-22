import { Group, XSwitch, XDialog } from 'vux';
import {store,base} from "@/js/public/port";
import tradeDialog from '../../components/public/tradeDialog.vue'
import BScroll from 'better-scroll';


export default {
  name: '',
  components: { Group, XSwitch, XDialog, tradeDialog },
  data() {
    return {
      isShow: true,
      sim_selected: true,
      com_selected: false,
      hk_selected: true,
      eu_selected: false,
      ma_selected: false,
      ind_selected: false,
      color_selected: true,
      arrow_selected: false,
      headerTop: 40,
      top_title: this.$t('msg.bet_setting'),
    }
  },
  methods: {
    toHideChoices() {
      this.isShow = false ;
      this.$refs.swiper_circle.style.transform = 'translateX(3.17rem)';
    },
    toShowChoices() {
      this.isShow = true ;
      this.$refs.swiper_circle.style.transform = 'translateX(2.98rem)';
    },
    chooseSim() {
      this.sim_selected = true;
      this.com_selected = false;
      this.sim_chinese.color = '#11A7DE';
      this.com_chinese.color = '#333'
      base.methods.settingLanguage("zhCHS");
    },
    chooseCom() {
      this.com_selected = true;
      this.sim_selected = false;
      this.com_chinese.color = '#11A7DE';
      this.sim_chinese.color = '#333';
      base.methods.settingLanguage("zhCHT");
    },
    chooseHk() {
      this.hk_selected = true;
      this.eu_selected = false;
      this.ma_selected = false;
      this.ind_selected = false;
      this.hk.color = '#11A7DE';
      this.eu.color = '#333';
      this.ma.color = '#333';
      this.ind.color = '#333';
      base.methods.setPlate("H");
    },
    chooseEu() {
      this.eu_selected = true;
      this.hk_selected = false;
      this.ma_selected = false;
      this.ind_selected = false;
      this.eu.color = '#11A7DE';
      this.hk.color = '#333';
      this.ma.color = '#333';
      this.ind.color = '#333';
      base.methods.setPlate("E");
    },
    chooseMa() {
      this.ma_selected = true;
      this.hk_selected = false;
      this.eu_selected = false;
      this.ind_selected = false;
      this.ma.color = '#11A7DE';
      this.hk.color = '#333';
      this.eu.color = '#333';
      this.ind.color = '#333';
      base.methods.setPlate("M");
    },
    chooseInd() {
      this.ind_selected = true;
      this.hk_selected = false;
      this.eu_selected = false;
      this.ma_selected = false;
      this.ind.color = '#11A7DE';
      this.hk.color = '#333';
      this.eu.color = '#333';
      this.ma.color = '#333';
      base.methods.setPlate("I");
    },
    chooseBet() {
      this.color_selected = true;
      this.arrow_selected = false;
      this.bet_rate_color.color = '#11A7DE';
      this.show_arrow.color = '#333'
      base.methods.setOddsColor("oddsCss1");
    },
    chooseArrow() {
      this.arrow_selected = true;
      this.color_selected = false;
      this.show_arrow.color = '#11A7DE';
      this.bet_rate_color.color = '#333';
      base.methods.setOddsColor("oddsCss2");
    },
    setChooseLanague(){
      let language = base.methods.getLanguage();
      if("zhCHS"===language){
        this.sim_selected = true;
        this.com_selected = false;
      }else{
        this.sim_selected = false;
        this.com_selected = true;
      }
    },
    setChoosePlate(){
      let plate =   base.methods.getPlate();
      switch (plate){
        case "H":
          this.ma_selected = false;
          this.hk_selected = true;
          this.eu_selected = false;
          this.ind_selected = false;
          break;
        case "E":
          this.ma_selected = false;
          this.hk_selected = false;
          this.eu_selected = true;
          this.ind_selected = false;
          break;
        case "M":
          this.ma_selected = true;
          this.hk_selected = false;
          this.eu_selected = false;
          this.ind_selected = false;
          break;
        case "I":
          this.ma_selected = false;
          this.hk_selected = false;
          this.eu_selected = false;
          this.ind_selected = true;
          break;
      }
    },
    setOddsColorChoose(){
      let oddsColor = base.methods.getOddsColor();
      if("oddsCss2" === oddsColor){
        this.color_selected = false;
        this.arrow_selected = true;
      }else{
        this.color_selected = true;
        this.arrow_selected = false;
      }

    }
  },
  computed: {
    screenWidth(){
      return document.body.clientWidth;
    },
    hk(){
      return {fontSize: '.16rem', color: this.hk_selected ? '#11A7DE' : '#333'};
    },
    eu(){
      return {fontSize: '.16rem', color: this.eu_selected ? '#11A7DE' : '#333'};
    },
    ma(){
      return {fontSize: '.16rem', color: this.ma_selected ? '#11A7DE' : '#333'};
    },
    ind(){
      return {fontSize: '.16rem', color: this.ind_selected ? '#11A7DE' : '#333'};
    },

    sim_chinese(){
      return {fontSize: '.16rem', color: this.sim_selected ? '#11A7DE' : '#333'};
    },
    com_chinese(){
      return{fontSize: '.16rem', color:  this.com_selected ? '#11A7DE' : '#333'};
    },
    bet_rate_color(){
      return{fontSize: '.16rem', color: this.color_selected ? '#11A7DE' : '#333'};
    },
    show_arrow(){
      return{fontSize: '.16rem', color: this.arrow_selected ? '#11A7DE' : '#333'};
    },
  },
  mounted(){
    this.$store.commit('homeHeaderControl',{shwoback:true,type:'string',val: this.top_title,footShow:false});

    //初始化选择设置
    this.setChooseLanague();

    //初始化选择盘口
    this.setChoosePlate();

    //设置赔率颜色
    this.setOddsColorChoose();

    this.$nextTick(function () {
      const options = {
        hasVerticalScroll: true,
        scrollX: false,
        scrollY: true,
        mouseWheel: true,
        click: true,
        tap: true, //必须有,否则better-scroll内的点击事件无效
      };
      if(!this.scroll) {
        this.scroll = new BScroll(this.$refs.outerWrapper,options)
      } else {
        this.scroll.refresh();
      }
    })
  }
}
