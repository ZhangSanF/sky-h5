import {storages,store,router,Timer,Timer2} from '@/js/public/port'
export default {
    name: 'homeFotter',
    components: {
      Timer,Timer2
    },
    data(){
        return {
        }
    },
    computed:{

    },
    methods:{
        backRouter(){

          if(this.$route.path ==='/home/home_unpay'){
            store.state.touchVal = 'home_center';
          }
          if(this.$route.path === '/home/home_pay'){
            store.state.touchVal = 'home_center';
          }
          //滚球
          if(
            this.$route.path == '/home/sports_event_balls'
            || this.$route.path == '/home/sports_event_balls/base_ball'
            || this.$route.path == '/home/sports_event_balls/basket_ball'
            || this.$route.path == '/home/sports_event_balls/other_ball'
            || this.$route.path == '/home/sports_event_balls/tennis_ball'
            || this.$route.path == '/home/sports_event_balls/volley_ball'
          //今日
          ||this.$route.path == '/home/sports_event_today'
            ||this.$route.path == '/home/sports_event_today/base_ball'
            ||this.$route.path == '/home/sports_event_today/basket_ball'
            ||this.$route.path == '/home/sports_event_today/other_ball'
            ||this.$route.path == '/home/sports_event_today/tennis_ball'
            ||this.$route.path == '/home/sports_event_today/volley_ball'
          //早盘
          ||this.$route.path == '/home/sports_event_sessionDetail'
            ||this.$route.path == '/home/sports_event_sessionDetail/base_ball'
            ||this.$route.path == '/home/sports_event_sessionDetail/basket_ball'
            ||this.$route.path == '/home/sports_event_sessionDetail/other_ball'
            ||this.$route.path == '/home/sports_event_sessionDetail/tennis_ball'
            ||this.$route.path == '/home/sports_event_sessionDetail/volley_ball'
            //已结算，未结算

            ||this.$route.path == '/home/home_pay'
            ||this.$route.path == '/home/home_mine'

          ){
           router.push({path: '/home'});
          }else if( this.$route.path == '/home/home_unpay') {//判断当前的路由对象
            store.state.footClick ? router.push({path: '/home'}):router.go(-1)
          }else if (
            //赛果返回
              this.$route.path == '/home/result/baseball_result'
            ||this.$route.path == '/home/result/basketball_result'
            ||this.$route.path == '/home/result/baseball_result'
            ||this.$route.path == '/home/result/tennisball_result'
            ||this.$route.path == '/home/result/volleyball_result'
            ||this.$route.path == '/home/result/otherball_result'

        ) {
            router.push({path: '/home/home_mine'});
          }
          else{
            store.state.isMore = false;
            router.go(-1)
          }
        }

    },
    props:{
        leftOptions:Boolean
    },
    mounted(){

    }
}
