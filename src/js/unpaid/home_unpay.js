import unpaidItem from '../../components/unpay/unpaidItem.vue'
import unresPassTest from '../../components/unpay/unresPassTest.vue'
import { store, base, storages, tools } from "@/js/public/port";
import BScroll from 'better-scroll';
import refresh from '../../components/refresh.vue'
import questionPage from '../../views/question_page/questionPage.vue'

export default {
    name: 'my_unpaid_index',
    components: { unpaidItem, unresPassTest,refresh,questionPage},
    data(){
        return {
            dropDown: false,
            dropSuccess: false,
            pullUp: false,
            // pullSuccess: false,
            mine: this.$t('msg.noclearing_order'),
            param:{//获取未结算注单时的参数
              pageNum: '1',
              pageSize:'',
              order:'',
              gameType: '',
              isBalance: '0',
              startDate: '',
              endDate: ''
            },
          //没有更多数据是否展示
          noMore:false,
        }
    },
    methods:{
        //加载数据
        scrollFn() {
            this.$nextTick(function () {
                const options = {
                    hasVerticalScroll: true,
                    click: true,
                    tap: true,
                    scrollY: true,
                    probeType: 3,
                    // momentum: true,
                    // scrollbar: {
                    //     fade: true
                    // },
                };
                if(!this.scroll) {
                    this.scroll = new BScroll(this.$refs.outerWrapper,options);
                    //touchEnd(手指离开以后触发) 通过这个方法来监听下拉刷新
                    this.scroll.on('touchEnd',(pos) => {
                        //下拉动作
                        if(pos.y > 50){
                            store.state.pullDownStart = true;
                            this.param.pageNum = '1';
                            base.methods.getBetRecord(this.param,false);
                        }
                        //上拉加载 总高度>下拉的高度+50 触发加载更多
                        if(this.scroll.maxScrollY > pos.y + 50){
                          let pageMaxNum = store.state.unres_data_len;
                          let max = pageMaxNum % 20 == 0 ? pageMaxNum/20 : parseInt(pageMaxNum/20)+1
                            if(this.param.pageNum<max){
                              store.state.pullUpStart = true;
                              this.param.pageNum=parseInt(this.param.pageNum)+1+'';
                              base.methods.getBetRecord(this.param,false);
                            }else{
                              this.noMore = true;
                              // setTimeout(() => {
                              //   this.noMore = false;
                              // },1000);
                            }
                        }
                    });
                } else {
                    this.scroll.refresh();
                }
            })
        }
    },
    mounted(){
        this.$store.commit('homeHeaderControl',{shwoback: this.showBack,type:'string',val:this.mine,footShow: true});
        base.methods.getBetRecord(this.param,true);
        this.scrollFn();
    },
    computed: {
      showBack(){//用于控制未结算页面头部返回箭头是否显示
       return store.state.shwoback;
      },

        // pullUpSuccess(){
        //   return store.state.pullUpSuccess;
        // },
        pullUpStart(){
          return store.state.pullUpStart;
        },
        // pullDownSuccess(){
        //   return store.state.pullDownSuccess;
        // },
        pullDownStart(){
          return store.state.pullDownStart;
        },
        // screenHeight() {    //获取当前屏幕高度
        //     return  document.body.clientHeight ;
        // },
        userBalance() {  //获取用户余额
           let user = storages.getUserObjSession('user');
           if(user!=undefined || user != null){
             return store.state.user.money;
           }else{
             return "0";
           }
        },
        unresolvedData() {     //未结算数据
            return store.state.resolved_data;
        },
        otherTypes(){   //是否有(除综合过关)其他类型数据
            return store.state.unres_includeOtherType;
        },
        unpaidData(){ //非综合过关数据
            return store.state.unres_otherTypesData;
        },
        showPassTest(){  //是否有综合过关数据
            return store.state.unres_includePassTest;
        },
        passTestInfo() {  //综合过关数据
            return store.state.unres_passTestData;
        },
        // pageMaxNum(){
        //     let num = store.state.unres_data_len;
        //     return num % 20 == 0 ? num/20 : num/20+1;
        // },
    },
  watch:{
    unresolvedData(val,oldVal){
      this.$nextTick(function(){
        this.scrollFn();
        if(this.$refs.setHeight){
            this.$refs.setHeight.style.minHeight = window.screen.availHeight/100 - 0.55 + 'rem'
        }
      })
    }
  }
}
