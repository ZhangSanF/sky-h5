import gameNotice from '@/components/home/gameNotice'
import websiteNews from '@/components/home/websiteNews'
import refresh from '@/components/refresh'
import {CONST, tools, storages, base, store} from "@/js/public/port";
import BScroll from 'better-scroll';
import questionPage from '@/views/question_page/questionPage'


export default {
    name: 'my_msg',
    components: { gameNotice, websiteNews, refresh, questionPage },
    data() {
        return {
            dropDown: false,
            pullUp: false,
            pullSuccess: false,
            count: '1', //页码
            pageSize: 20, //每页数据条数
            currentBtn: this.$t('msg.game_notice'),
            activeTab: this.$t('msg.minhours'),
            activeClass: 'active',
            normalStyle: 'tab_text',
            pageNum:1,
            ann_type:'1',
            computedTime:'1',
            tabList: [
                {label: this.$t('msg.minhours'), name:'24hours'},
                {label: this.$t('msg.maxhours'), name:'48hours'},
                {label: this.$t('msg.thisWeek'), name:'thisWeek'},
                {label: this.$t('msg.thisMonth'), name:'thisMonth'}
            ],
        }
    },
    methods: {
      switchBtn(tab) {
        this.currentBtn = tab;
        this.activeTab = this.computedTime;
        if (store.state.homeToNotice==='1'||store.state.homeToNotice==='2') {
          this.switchMethod(true);
        }else {
          this.getActiveTab()
        }
      },
      switchMethod(flag) {
        this.pullSuccess = false;
        this.pageNum = 1;
        store.state.announcement_data = [];
        switch (this.activeTab) {
          case this.$t('msg.minhours'):
            this.$refs.underline.style.transform = 'translateX(0)';
            this.computedTime = "1";
            break;
          case this.$t('msg.maxhours'):
            this.$refs.underline.style.transform = 'translateX(.94rem)';
            this.computedTime = "2";
            break;
          case this.$t('msg.thisWeek'):
            this.$refs.underline.style.transform = 'translateX(1.9rem)';
            this.computedTime = "3";
            break;
          case this.$t('msg.thisMonth'):
            this.$refs.underline.style.transform = 'translateX(2.8rem)';
            this.computedTime = "4";
            break;
        }

        this.getAnnouncement(flag);
      },

      getAnnouncement(flag){
        let params = {
          pageNum: this.pageNum + "",
          pageSize: this.pageSize+'',
          ann_type: this.ann_type,
          announcementType: '2',
          startDate: tools.computedTime(this.computedTime),
          endDate:tools.dateFormat(new Date().getTime()-60*60*1000*12,'Y-m-d H:i:s')
        };
          base.methods.getAllAnnouncement(params, flag)
      },


      activeState(tab, event) {
        //先判断点击的是消息类型还是事件类型
        if (tab === this.$t('msg.game_notice')) {
          this.currentBtn = tab;
          this.activeTab = this.$t('msg.minhours');
          this.ann_type = '1';
          this.switchMethod(true);
        } else if (tab === this.$t('msg.website_news')) {
          this.currentBtn = tab;
          this.activeTab = this.$t('msg.minhours');
          this.ann_type = '2';
          this.switchMethod(true);
        } else {
          this.activeTab = tab;
          this.switchMethod(true);
        }
        console.log(this.activeTab,'this.activeTab')
        store.state.myMessageParams.activeTab= this.activeTab;
        store.state.myMessageParams.ann_type = this.ann_type;
      },

      getActiveTab(){
        let newActiveTab = '';
        let activeTab = store.state.myMessageParams.activeTab;
        let computedTime =  this.getComputedTime();
        switch (computedTime) {
          case this.$t('msg.minhours'):
            newActiveTab = this.$t('msg.minhours');
            this.$refs.underline.style.transform = 'translateX(0)';
            break;
          case this.$t('msg.maxhours'):
            newActiveTab = this.$t('msg.maxhours');
            this.$refs.underline.style.transform = 'translateX(.94rem)';
            break;
          case this.$t('msg.thisWeek'):
            newActiveTab = this.$t('msg.thisWeek');
            this.$refs.underline.style.transform = 'translateX(1.9rem)';
            break;
          case this.$t('msg.thisMonth'):
            newActiveTab = this.$t('msg.thisMonth');
            this.$refs.underline.style.transform = 'translateX(2.8rem)';
            break;
        }
        this.getAnnouncement(true);
        return newActiveTab;
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
            bounce:true,
            momentum:true,
          };
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.outerWrapper, options);
            this.scroll.on('touchEnd', (pos) => {
              //下拉
              if (pos.y > 50) {
                this.dropDown = true;
                this.pageNum = 1;
                this.getAnnouncement(false);
              }

              //上拉  当总高度>下拉的高度+50 触发加载更多
              if (this.scroll.maxScrollY > pos.y + 50) {
                console.log(this.dataLen,this.pageSize,"dataLen pageSize")
                if (this.dataLen>=this.pageSize) {
                  this.pullUp = true;
                  this.pageNum = parseInt(this.pageNum) + 1 + '';
                  this.getAnnouncement(false);
                  //使用refresh方法来更新scroll 解决无法滚动的问题
                } else {
                  this.pullSuccess = true;
                }
              }
            });
            this.scroll.refresh();
          } else {
            this.scroll.refresh();
          }
        })
      },
      getComputedTime(){
       let activeTab=store.state.myMessageParams.activeTab= this.activeTab;
        switch (this.activeTab) {
          case this.$t('msg.minhours'):
            this.computedTime = '1';
            this.$refs.underline.style.transform = 'translateX(0)';
            break;
          case this.$t('msg.maxhours'):
            this.computedTime = '2';
            this.$refs.underline.style.transform = 'translateX(.94rem)';
            break;
          case this.$t('msg.thisWeek'):
            this.computedTime = '3';
            this.$refs.underline.style.transform = 'translateX(1.9rem)';
            break;
          case this.$t('msg.thisMonth'):
            this.computedTime = '4';
            this.$refs.underline.style.transform = 'translateX(2.8rem)';
            break;
        }
        return this.computedTime;
      },
      getCurrentBtn(){
        const currentBtn =store.state.myMessageParams.ann_type = this.ann_type;
        switch (currentBtn) {
          case '1':
            this.currentBtn = this.$t('msg.game_notice');
            break;
          case '2':
            this.currentBtn =this.$t('msg.website_news');
            break;
        }
        return this.currentBtn;
      }
    },

  mounted() {
    this.$store.commit('homeHeaderControl', {shwoback: true, type: 'string', val: '', footShow: false});
    if (store.state.homeToNotice==='1') {
      this.ann_type = '1';
      this.computedTime = '4';
      this.$refs.underline.style.transform = 'translateX(2.8rem)';
      this.activeTab = this.$t('msg.thisMonth');
      store.state.myMessageParams.activeTab= this.activeTab;
      store.state.myMessageParams.ann_type=this.ann_type;
    } else if (store.state.homeToNotice==='2'){
      this.ann_type = '1';
      this.computedTime = '1';
      this.$refs.underline.style.transform = 'translateX(0)';
      this.activeTab = this.$t('msg.minhours');
      store.state.myMessageParams.activeTab= this.activeTab;
      store.state.myMessageParams.ann_type=this.ann_type;
    }else if (store.state.homeToNotice==='3') {
      this.ann_type = store.state.myMessageParams.ann_type;
      this.activeTab = store.state.myMessageParams.activeTab;
      this.currentBtn=this.getCurrentBtn();
      this.computedTime = this.getComputedTime();
    }
    this.getAnnouncement(true);

    if (!this.noticeInfo){//解决初始化BScroll数据没有更新导致报错的问题
     return
   }
    this.$nextTick(function(){
      this.scrollFn();
    })
  },
  computed: {
    noticeInfo() {
      return store.state.announcement_data.noticeInfo;
    },
    dataLen() {
      return store.state.announcement_data.dataLen;
    },

  },
watch:{
  noticeInfo(val,oldVal){
    this.dropDown = false;
    this.pullUp = false;
    this.$nextTick(function(){
      this.scrollFn();
    })
  }
},

}
