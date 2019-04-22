
import {store,base,router} from "@/js/public/port";
import questionPage from '../../views/question_page/questionPage'
import BScroll from 'better-scroll';
export default {
    components: {
      questionPage
    },
    data() {
        return {
            listshow:true
        }
    },
    computed:{
        //检测数据
        items(){
          if(store.state.league && store.state.league.leagueId && store.state.league.leagueId.length>0 ){
            return store.state.league.leagueId;
          }
          return [];
        },
      /** 玩法类型 0单式 1综合过关 2冠军 */
      isMix: {
        get: function () {
          return store.state.baseParam.isMix;
        }
      },
      //综合过关数量
      mixCount:{
        get: function () {
          return store.state.newOddsParams.length;
        }
      },
    },
    props:['ballName','nav_label'],
    methods:{
      /** 展示综合过关注单页 */
      showMixBet(){
        store.state.is_showModal = true;
      },
        showList(){
            this.listshow = !this.listshow;
            if(this.listshow === true){
                this.$refs.iconBox.style.transform = 'rotate(-90deg)';
            }else {
                this.$refs.iconBox.style.transform = 'rotate(90deg)';
            }
        },
        getMatchesById(data){
            let matchesId = data.id;
            store.state.matchesId = matchesId;
            // store.state.morePlayDetail = '3'; //表示早盘的时候，跳到详细页面
          //定义为定时器定时查询联赛信息
            base.methods.getMatches(true);
        },
        //better-scroll
        BScrollMeth(){
          if(!this.scroll) {
            this.scroll = new BScroll(this.$refs.outerWrapper,{
              hasVerticalScroll: true,
              tap:true,
              click:true
            })
          } else {
            this.scroll.refresh();
          }
        },
    },
    mounted(){
      store.state.isMore = false;
      store.state.isHome = false;
      //滚动
      this.BScrollMeth();
    }
}
