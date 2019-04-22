import questionPage from '../../views/question_page/questionPage'
import refresh from '@/components/refresh'
import BScroll from 'better-scroll';
import tools from '@/js/public/tools'
import base from "@/js/public/base";
import Util from "../util/util";
export default {

  data(){
    return {
      account_history:this.$t("msg.account_history"),
      dropDown: false,
      dropSuccess: false,
      pullUp: false,
      pullSuccess: false,
      noMore:false,//暂无更多数据是否展示
      params: {//请求参数
        pageNum: '1',
        pageSize: '',
        startDate: tools.computedTime('1'),
        tradeType: '1',//注单类型
        endDate: tools.formatDate(new Date()),
        order: 'N'
      },
    }
  },
  computed:{
    bagmoney(){
      return this.$store.state.accountHis;
    },
    pullUpStart(){
      return this.$store.state.pullUpStart;
    },
    pullDownStart(){
      return this.$store.state.pullDownStart;
    },
  },
  methods:{
    //格式化金额
    winFormatMoney(data){
      return Util.winFormatMoney(data);
    },
    //获取查询页面传过来的
    getParams(){
      // 取到路由带过来的参数
     this.params.tradeType = this.$route.query.tradeType
     this.params.startDate = this.$route.query.startDate
     this.params.endDate = this.$route.query.endDate
    },

    //加载数据
    scrollFn() {
      const options = {
        hasVerticalScroll: true,
        click: true,
        scrollY: true,
        probeType: 3,
        momentum: true,
        bounce: true,
      };
      if(!this.scroll) {
        this.scroll = new BScroll(this.$refs.outerWrapper,options)
        //touchEnd(手指离开以后触发) 通过这个方法来监听下拉刷新
        this.scroll.on('touchEnd',(pos) => {
          //下拉动作
          if(pos.y > 50){
            this.$store.state.pullDownStart = true;
            this.params.pageNum = '1';
            base.methods.getAccountHis(this.params,false)
          }
          //上拉加载 总高度>下拉的高度+10 触发加载更多
          if(this.scroll.maxScrollY > pos.y + 10){
            let pageMaxNum =  this.$store.state.wallet_record_num%20==0 ? this.$store.state.wallet_record_num/20:parseInt(this.$store.state.wallet_record_num/20)+1;
            if(this.params.pageNum<pageMaxNum){
              this.$store.state.pullUpStart = true;
              this.params.pageNum = parseInt(this.params.pageNum)+1+''
              base.methods.getAccountHis(this.params,false)
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
    }
  },
  mounted(){
    this.getParams();
    base.methods.getAccountHis(this.params,true);
    this.$store.commit('homeHeaderControl',{shwoback:true,type:'string',val: this.account_history,footShow:false});
    this.$nextTick(function(){
      this.scrollFn();
    })
  },
  components:{refresh, questionPage},

  watch:{//监视路由参数的变化
    '$route': 'getParams',
    bagmoney(val,oldVal){
      this.$nextTick(function(){
        this.scrollFn();
        if(this.$refs.setHeight){
          this.$refs.setHeight.style.minHeight = window.screen.availHeight/100 - 0.9 + 'rem'
        }
      })
    }
  }
}
