import base from "@/js/public/base";
import refresh from '@/components/refresh'
import tools from '@/js/public/tools'
import BScroll from 'better-scroll';
import questionPage from '../../views/question_page/questionPage'

export default {
    name: 'My_money',
    components:{ refresh , questionPage},
    data(){
        return {
            count:1,
            account_history:this.$t("msg.account_history"),

            dropDown: false,
            dropSuccess: false,
            pullUp: false,
            pullSuccess: false,

            currentBtn: 'game_notice',
            activeTab: this.$t('msg.minhours'),
            activeClass: 'active',
            normalStyle: 'tab_text',
            tabList: [
                {label: this.$t('msg.minhours'), name:'24hours'},
                {label: this.$t('msg.maxhours'), name:'48hours'},
                {label: this.$t('msg.thisWeek'), name:'thisWeek'},
                {label: this.$t('msg.thisMonth'), name:'thisMonth'}
            ],
          params:{//请求参数
            pageNum:'1',
            pageSize:'',
            startDate:tools.computedTime('1'),
            endDate:tools.formatDate(new Date()),
            order:'N'
          },
          noMore:false,//暂无更多数据是否展示
        }
    },

    methods:{
        switchMethod(flag,pageSize){
           this.noMore = false;
            let computedTime = "1";
            switch (this.activeTab){
                case this.$t('msg.minhours'):
                    this.$refs.underline.style.transform = 'translateX(0)';
                    //获取页面数据
                    computedTime = "1";
                    break;
                case this.$t('msg.maxhours'):
                    this.$refs.underline.style.transform = 'translateX(.94rem)';
                    computedTime = "2";
                    this.params.order = 'Y';
                  break;
                case this.$t('msg.thisWeek'):
                    this.$refs.underline.style.transform = 'translateX(1.9rem)';
                    computedTime = "3";
                    this.params.order = 'Y';
                    break;
                case this.$t('msg.thisMonth'):
                    this.$refs.underline.style.transform = 'translateX(2.8rem)';
                    computedTime = "4";
                    this.params.order = 'Y';
                    break;
            }
            this.params.startDate = tools.computedTime(computedTime);
            base.methods.getAccountHis(this.params,flag)
        },
        //点击tab事件
        activeState(tab,event) {
            this.activeTab = tab;
            this.params.pageNum = '1';
            this.switchMethod(true,'');
            this.scroll.scrollTo(0, 0)
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
        this.$store.commit('homeHeaderControl',{shwoback:true,type:'string',val: this.account_history,footShow:false});
        base.methods.getAccountHis(this.params,true);
        this.$nextTick(function(){
            this.scrollFn();
        })

    },
    computed:{
      // pullUpSuccess(){
      //   return this.$store.state.pullUpSuccess;
      // },
      pullUpStart(){
        return this.$store.state.pullUpStart;
      },
      // pullDownSuccess(){
      //   return this.$store.state.pullDownSuccess;
      // },
      pullDownStart(){
        return this.$store.state.pullDownStart;
      },
      bagmoney(){
          return this.$store.state.accountHis;
      }
    },
    watch:{
        bagmoney(val,oldVal){
            // this.dropDown = false;
            // this.pullUp = false;
            this.$nextTick(function(){
                this.scrollFn();
                //alert(window.screen.availHeight)
                //document.body.offsetHeight
                //document.body.scrollHeight
                //window.screen.height
                //console.log(this.$refs.setHeight)
                if(this.$refs.setHeight){
                  this.$refs.setHeight.style.minHeight = window.screen.availHeight/100 - 0.9 + 'rem'
                }
            })
        }
    }
}
