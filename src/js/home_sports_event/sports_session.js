import competitionTop from '@/components/home_sports_event/competitionTop'
import sessionContent from '@/components/home_sports_event/sessionContent'
import {store,base,process} from "@/js/public/port";
import {Scroller} from 'vux';

export default {
  components: {
    competitionTop, sessionContent, Scroller
  },
  data() {
    return {
      ballCategory: 'TYZQ',
      nav_label: this.$route.query.nav_label,
      ballName: this.$route.query.ballName,
    }
  },
  methods: {
    //让球大小&综合过关&冠军---滚动条事件
    activeState(playTab) {
      base.methods.changePlayActiveTab(playTab.isMix, this);
      base.methods.updBaseParam(this.ballCategory, playTab.isMix);
      /*base.methods.getMatches(true);*/
      //获取联赛信息
      process.getLeaguage(true);
    },
    //球类点击事件
    chooseBall(ballObj) {
      base.methods.changePlayActiveTab(this.baseParam.isMix, this); //采用缓存中已保存的
      base.methods.changeBall(ballObj.category, this.baseParam.isMix);

      store.state.isMore = false;
      store.state.isHome = false;
      store.state.matchesId = '';
      // store.state.morePlayDetail = '';

      //base.methods.getMatches(true);
     //定义为定时器定时查询联赛信息
      store.state.isLeague = true;
      store.state.isHome = false;
      //获取联赛信息
      process.setPlayTable(store.state.baseParam);
      process.getLeaguage(true);

      this.ballCategory = ballObj.category;
      let curLanguage = base.methods.getLanguage();
      if (curLanguage == 'en')
        this.ballName = ballObj.enName;
      else if (curLanguage == 'zhCHT')
        this.ballName = ballObj.twName;
      else
        this.ballName = ballObj.cnName;
      // this.nav_label = '今日';
    }
  },

  mounted() {
    base.methods.teamNameRolling();
    this.$store.commit('homeHeaderControl', {shwoback: true, type: 'string', val: '', footShow: false});
    this.$nextTick(function () {
      let smallBallH = document.getElementsByClassName('xs-container')[0].clientHeight;
      let tab_boxH = document.getElementsByClassName('tab-box')[0].clientHeight;
      let height = smallBallH + tab_boxH;
      //console.log(tab_boxH)
      this.$store.commit('mathSpcFootHeight', height);
    });
    //如果没有球类项目，则重新刷新
    if (this.ballKinds == null || this.ballKinds == '' || this.ballKinds.length < 1) {
      base.methods.getGameType();
    }
    //如果传过来的值为undefined,让其显示足球(足球)
    // if(this.ballName != undefined){
    //   this.ballCategory = this.ballName
    // }
    //初始化球类
    for (let index in this.ballKinds) {
      let ballKind = this.ballKinds[index];
      if (ballKind.cnName == this.ballName || ballKind.twName == this.ballName || ballKind.enName == this.ballName) {
        this.ballCategory = ballKind.category;
      }
    }
    store.state.isMore = false;
    base.methods.changePlayActiveTab(this.baseParam.isMix, this);
  },
  computed: {
    bodyHeight() {
      return -this.$store.state.footSpcheight + '';
    },
    ballKinds() {
      return this.$store.state.ballKinds;
    },
    playTabList() {
      return this.$store.state.playTabList;
    },
    baseParam() {
      return this.$store.state.baseParam;
    },
    widths:function () {
      return process.underlineWidths();
    }
  },
watch:{
  playTabList(){
    base.methods.changePlayActiveTab(this.baseParam.isMix, this);
  },
  ballKinds(){
    return this.$store.state.ballKinds;
  }
}
}
