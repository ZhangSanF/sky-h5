import {Scroller} from 'vux'
import {store,base,process,Timer} from "@/js/public/port";

export default {
    components: {Scroller},
    data() {
        return {
        }
    },
    methods: {
        goMatchesPage(ballObj) {
            process.setInitCharge();
            base.methods.changeBall(ballObj.category, '');
            let baseParam = store.state.baseParam;
            process.setPlayTable(baseParam);
            /*if(store.state.baseParam.dateType!='2'){*/
                //定义为定时器定时查询联赛信息
               /* store.state.isLeague = false;*/
          let startCacheThred = process.startCacheThred();
          if(startCacheThred){
            store.commit('showLoading',true);
            base.methods.getMorningZqData();
          }else{
             base.methods.getMatches(true);
           }
           store.state.countDown = process.getCountDown();


        /*   }else{
                //定义为定时器定时查询联赛信息
                store.state.isLeague = true;
                process.getLeaguage(true);
            }*/
            store.state.isMore = false;
            store.state.matchesId = '';
            // store.state.morePlayDetail = '';
        }
    },
    computed: {
        ballKind() {
            return store.state.ballKinds;
        }
    },
    mounted() {
      base.methods.teamNameRolling();
    },
}
