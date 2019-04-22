import competitionTop from '@/components/home_sports_event/competitionTop'
import {store, base, process} from "@/js/public/port";
import {Scroller} from "vux";

export default {
  components: {
    competitionTop, Scroller
  },
  data() {
    return {
      ballCategory: 'TYZQ',
      nav_label: this.$route.query.nav_label,
      ballName: this.$route.query.ballName
    }
  },
  methods: {
    //球类点击事件
    chooseBall(ballObj) {
      base.methods.changeBall(ballObj.category, this.baseParam.isMix);
      base.methods.getMatches(true);
      store.state.matchesId = '';
      // store.state.morePlayDetail = '';

      this.ballCategory = ballObj.category;
      let curLanguage = base.methods.getLanguage();
      if (curLanguage == 'en')
        this.ballName = ballObj.enName;
      else if (curLanguage == 'zhCHT')
        this.ballName = ballObj.twName;
      else
        this.ballName = ballObj.cnName;
    }
  },
  mounted() {
    base.methods.teamNameRolling();
    store.commit('homeHeaderControl', {shwoback: true, type: 'string', val: '', footShow: false});
    //如果没有球类项目，则重新刷新
    if (this.ballKinds == null || this.ballKinds == '' || this.ballKinds.length < 1) {
      base.methods.getGameType();
    }
    //如果传过来的值为undefined,让其显示足球(足球)
    if (this.ballName != undefined) {
      this.ballCategory = this.ballName
    }
  },
  computed: {
    ballKinds() {
      return this.$store.state.ballKinds;
    },
    playTabList() {
      return this.$store.state.playTabList;
    },
    baseParam() {
      return this.$store.state.baseParam;
    }
  },
  watch:{
    ballKinds(){
      return this.$store.state.ballKinds;
    }
  }
}
