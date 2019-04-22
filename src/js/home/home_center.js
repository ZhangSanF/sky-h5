import {router, CONST, tools, storages, axios, store, base} from "@/js/public/port";
import centerContent from '@/components/home/centerContent'
import centerTop from '@/components/home/centerTop'
import NavLabel from "@/components/home/navLabel";
import BScroll from 'better-scroll'

import {Marquee, MarqueeItem} from 'vux'
export default {
  components: {centerContent, centerTop, NavLabel,Marquee, MarqueeItem},
  name: "Home",
  data() {
    return {

      showDialogStyle_trade: {  //交易弹窗控制按钮并传参
        isDisplay: false,
        params: ''
      },
      animate: false,
      num: 1,
      noticelen:0,
    };
  },
  methods: {

    showDialog(content) { //显示首页消息弹窗'
     store.commit('updateDialog', {isShow: true, showInfo: true,content:content})
    },
    clickMoreNotice() { //显示首页消息弹窗
      store.state.homeToNotice = '1';
      if(store.state.user){
        this.$router.push({path: '/home/home_mine_msg'});
      }else{
        store.commit('updateDialog', {isShow: true, showInfo: false,content:'此功能仅对登录用户开放'})
      }
    },
    //下注组件弹窗
    showTradeDialog(params) {  //打开交易弹窗并传值
      this.showDialogStyle_trade.isDisplay = true;
      this.showDialogStyle_trade.params = params;
    },
    goToHomePage() { //关闭弹窗,返回页面
      store.state.is_showModal = false;
    },

  },
  computed: {
    homeNotice() {
      if (store.state.homeNotice && store.state.homeNotice.result) {
        let data = store.state.homeNotice.result.noticelist;
        //return this.newNotice=data;
        return data;
      }
      return [];
    },
    is_showModal: {
      get: function () {
        return store.state.is_showModal;
      },
      set: function (newValue) {
        console.log(newValue, 'set')
        store.state.is_showModal = newValue;
      }
    },

  },
  mounted() {
    store.state.isHome = true;
    store.state.isMore = false;
    this.$store.commit('homeHeaderControl', {shwoback: false, type: 'icon', val: 'top-logo', footShow: true});
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.outerWrapper, {
          hasVerticalScroll: true,
          tap: true,
          click: true
        })
      } else {
        this.scroll.refresh();
      }
    })
  },
  created: function () {

  },
  watch: {}
};
