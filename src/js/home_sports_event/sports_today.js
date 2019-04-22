import competitionTop from '@/components/home_sports_event/competitionTop'
import {store,base,process} from "@/js/public/port";
import {  Scroller } from 'vux';
export default {
  components: {
    competitionTop,Scroller
  },
  data() {
    return {
      ballCategory:'TYZQ',
      nav_label: this.$route.query.nav_label,
      ballName: this.$route.query.ballName
    }
  },
  methods: {
    //让球大小&综合过关&冠军---滚动条事件
    activeState(playTab) {
     //
      base.methods.changePlayActiveTab(playTab.isMix, this);
      base.methods.updBaseParam(this.ballCategory, playTab.isMix);
      let startCacheThred = process.startCacheThred();
      if(startCacheThred){
        store.commit('showLoading',true);
        base.methods.getMorningZqData();
      }else{
        base.methods.getMatches(true);
      }
    //  process.setOddsChangeTag(playTab.isMix);
    },
    //球类点击事件
    chooseBall(ballObj) {
      base.methods.changePlayActiveTab(this.baseParam.isMix, this); //采用缓存中已保存的
      process.setPlayTable(store.state.baseParam);
      base.methods.changeBall(ballObj.category, this.baseParam.isMix);
      let startCacheThred = process.startCacheThred();
      if(startCacheThred){
        store.commit('showLoading',true);
        base.methods.getMorningZqData();
      }else{
        base.methods.getMatches(true);
      }
      store.state.matchesId = '';
      // store.state.morePlayDetail = '';
      this.ballCategory = ballObj.category;
      let curLanguage = base.methods.getLanguage();
      if(curLanguage == 'en')
        this.ballName = ballObj.enName;
      else if(curLanguage == 'zhCHT')
        this.ballName = ballObj.twName;
      else
        this.ballName = ballObj.cnName;
      // this.nav_label = '今日';
    }
  },
  mounted() {
    base.methods.teamNameRolling();
    // this.activeTab = store.state.playTabName;
    this.$store.commit('homeHeaderControl',{shwoback:true,type:'string',val:'',footShow:false});
    //如果没有球类项目，则重新刷新
    if(this.ballKinds==null ||this.ballKinds==''||this.ballKinds.length<1 ){
      base.methods.getGameType();
    }
    //如果传过来的值为undefined,让其显示足球(足球)
    // if(this.ballName != undefined){
    //   this.ballCategory = this.ballName
    // }

    // this.setPlayAndGameType(this.ballName);
    //初始化球类
    for(let index in this.ballKinds){
      let ballKind = this.ballKinds[index];
      if(ballKind.cnName == this.ballName || ballKind.twName == this.ballName || ballKind.enName == this.ballName){
        this.ballCategory = ballKind.category;
      }
    }
    store.state.isMore = false;
    base.methods.changePlayActiveTab(this.baseParam.isMix, this);
  },
  computed: {
    ballKinds(){
      return this.$store.state.ballKinds;
    },
    playTabList(){
      return this.$store.state.playTabList;
    },
    baseParam(){
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
