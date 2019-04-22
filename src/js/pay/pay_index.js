import paidItem from '@/components/pay/paidItem.vue'
import { store, base, storages,tools,util} from "@/js/public/port";
import passTest from '@/components/pay/passTest.vue'
import BScroll from 'better-scroll';
import refresh from '@/components/refresh.vue'
import questionPage from '../../views/question_page/questionPage.vue'

export default {
    name: 'My_paid_index',
    components: { paidItem, passTest, refresh ,questionPage},
    data(){
        return {
            dropDown: false,  //显示下拉刷新图标
            dropSuccess: false, //文字提示下拉刷新完成
            pullUp: false,  //显示上拉加载图标
            pullSuccess: false,     //文字提示上拉加载完成
            activeTab: this.$t('msg.minhours'),
            activeClass: 'active',
            normalStyle: 'tab_text',
            topTitle: this.$t('msg.cleared_order'),
            tabList: [
                {label: this.$t('msg.minhours'), name:'24hours'},
                {label: this.$t('msg.maxhours'), name:'48hours'},
                {label: this.$t('msg.thisWeek'), name:'thisWeek'},
                {label: this.$t('msg.thisMonth'), name:'thisMonth'}
            ],
          params:{ //请求投注历史的参数
            pageNum: '1',
            pageSize:'',
            order:'',
            gameType: '',
            isBalance: '1',
            startDate: tools.computedTime('1'),
            endDate:tools.computedTime('0')
          },
          //没有更多数据了
          noMore:false
        }
    },
    methods:{
      format:function (num) {
        return util.formatOdds(num);
      },
      //格式化betcontent
      parse:function (str) {
        return JSON.parse(str)
      },
        switchMethod(flag){
            let computedTime = "";
            store.state.countBetAmount = 0;
            store.state.countBetAward = 0;
            this.params.endDate = tools.computedTime('0');
            switch (this.activeTab){
                case this.$t('msg.minhours'):
                    this.$refs.underline.style.transform = 'translate(0,-0.02rem)';
                    computedTime = "1";
                    break;
                case this.$t('msg.maxhours'):
                    this.$refs.underline.style.transform = 'translate(0.94rem,-0.02rem)';
                    this.params.order = 'Y';
                    computedTime = "2";
                    break;
                case this.$t('msg.thisWeek'):
                    this.$refs.underline.style.transform = 'translate(1.89rem,-0.02rem)';
                    computedTime = "3";
                  this.params.order = 'Y';
                    break;
                case this.$t('msg.thisMonth'):
                    this.$refs.underline.style.transform = 'translate(2.83rem,-0.02rem)';
                    computedTime = "4";
                  this.params.order = 'Y';
                    break;
            }
            this.params.startDate = tools.computedTime(computedTime);
            base.methods.getBetRecord(this.params,flag)
        },
        //切换tab
        activeState(tabName) {
            this.activeTab = tabName;
          this.params.pageNum = '1';
          this.switchMethod(true);
          this.scroll.scrollTo(0, 0)
        },
        //加载数据
        scrollFn() {
            this.$nextTick(function () {
                const options = {
                    hasVerticalScroll: true,
                    click: true,
                    tap: true,
                    scrollY: true,
                    probeType: 3,
                    //momentum: true,
                    // scrollbar: {
                    //     fade: true
                    // }
                };
                if(!this.scroll) {
                    this.scroll = new BScroll(this.$refs.outerWrapper,options);
                  this.params.startDate = tools.computedTime('1');
                    base.methods.getBetRecord(this.params,true);
                    this.scroll.on('touchEnd',(pos) => {
                        //下拉
                        if(pos.y > 50){
                          store.state.pullDownStart = true;
                          this.params.pageNum='1';
                          base.methods.getBetRecord(this.params,false)
                        }
                        //上拉  当总高度>下拉的高度+50,触发加载更多
                        if(this.scroll.maxScrollY > pos.y + 50){
                          let pageMaxNum =  store.state.unres_data_len%20==0 ? store.state.unres_data_len/20:parseInt(store.state.unres_data_len/20)+1;
                          if(this.params.pageNum<pageMaxNum){
                            store.state.pullUpStart = true;
                            this.params.pageNum=parseInt(this.params.pageNum)+1+'';
                            base.methods.getBetRecord(this.params,false)
                          }else{
                            this.noMore = true;
                            // setTimeout(() => {
                            //   this.noMore = false;
                            // },1000);
                          }
                        }
                    });
                  this.scroll.refresh();
                } else {
                    this.scroll.refresh();
                }
            })
        },

    },
    mounted(){
        store.commit('homeHeaderControl',{shwoback: false, type:'string', val: this.topTitle, footShow:true});
        this.scrollFn();
    },
    computed: {
      countBetAmount(){
        return store.state.countBetAmount;
      },
      countBetAward(){
        let countBetAward = store.state.countBetAward;
        return util.winFormatMoney(countBetAward);
      },
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
        userBalance() {   //获取用户余额
          let user = storages.getUserObjSession('user');
          if(user!=undefined || user != null){
            return store.state.user.money;
          }else{
            return "0";
          }
        },
        resolvedData(){     //已结算数据
            return store.state.resolved_data;
        },
    },
  watch:{
    resolvedData:function (value) {
      this.$nextTick(function(){
        this.scrollFn();
        if(this.$refs.setHeight){
            this.$refs.setHeight.style.minHeight = window.screen.availHeight/100 - 0.92 + 'rem'
        }
        // if(this.params.pageNum === '1'){
        //   this.scroll.scrollTo(0,0, 0, '');
        // }
      })
    }
  }
}
