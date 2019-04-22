<template>
<!--<div>{{countDown}}</div>-->
</template>
<script>
  /* eslint-disable no-return-assign,indent,quotes */
  import {store,base,process} from "@/js/public/port";

  export default {
    data() {
      return {
        timerTask: null,
        stop: false,
        initNum:0,
        initNoticNum:0,
        noticeTask:null,
      }
    },
    props: [
      'timeCalculation'
    ],
    methods: {
      refresh() {
        if (!this.timerTask) {
          this.generateTask();
        } else {
          this.calculation();
        }
        process.getData(this.initNum,false);

      },
      //公告定时器
      noticeCountDownTask(){
        if (store.state.noticeCountDown === 1) {
          this.initNoticNum++
          this.noticeCalculation();
          let isHome = store.state.isHome;
          if(isHome && this.initNoticNum>1){
            base.methods.getHomeNotice(false);
          }
        } else {
          let vis = document.visibilityState;
          if(vis==='visible'){
            store.state.noticeCountDown = store.state.noticeCountDown - 1
          }
        }
      },
      task() {
        if (this.countDown === 0) {
          this.initNum ++;
          this.calculation();
          process.getData(this.initNum,false);
        } else {
          let vis = document.visibilityState;
          if(vis==='visible'){
            store.state.countDown = store.state.countDown - 1
          }
        }
      },
      generateTask() {
        process.getData(this.initNum,false);
        this.calculation();
        this.timer();
      },
      genNoticeTask(){
        this.noticeTimer();
      },
      noticeCalculation(){
        store.state.noticeCountDown = store.state.sysFreqParams.noticeFreq;
      },
      calculation() {
        store.state.countDown = process.getCountDown();
      },

      timer() {
        let _this = this;
        _this.timerTask = setTimeout(function () {
          _this.task();
          _this.timer();
        }, 1000);
      },
      noticeTimer() {
        let _this = this;
        _this.noticeTask = setTimeout(function () {
          _this.noticeCountDownTask();
          _this.noticeTimer();
        }, 1000);
      }
    },
    computed:{
      countDown:{
        get(){
          return store.state.countDown;
        },
        set(){

        }
      },
      noticeCountDown:{
        get(){
          store.state.noticeCountDown;
        },
        set(){

        }
      }
    },
    watch: {
      timeCalculation() {
        this.calculation();
      }
    },
    mounted() {
      this.generateTask();
      this.genNoticeTask();
    },
    destroyed() {
      window.clearInterval(this.timerTask)
    }

  }
</script>
