<template>
</template>
<script>
  import {store,base,process,tools} from "@/js/public/port";
  export default {
    data() {
      return {
        countDown: 10,
        timerTask: null,
        stop: false
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
     //   process.getMorToday();

      },
      task() {
       // let startCacheThred = process.startCacheThred();
        if (this.countDown === 0) {
         /* this.calculation();
          if(startCacheThred){
            process.getMorTodayData("Y");
          }*/
        } else {
        /*  if(startCacheThred){
            this.countDown = this.countDown - 1;
          }*/
        }
      },
      generateTask() {
        this.calculation();
        this.timer();
      },
      calculation() {
        this.countDown = store.state.sysFreqParams.todayFreq-10;
      },

      timer() {
        let _this = this;
        _this.timerTask = setTimeout(function () {
          _this.task();
          _this.timer();
        }, 1000);
      }
    },
    watch: {
      timeCalculation() {
        this.calculation();
      }
    },
    mounted() {
      this.generateTask();
    },
    destroyed() {
      window.clearInterval(this.timerTask)
    }

  }
</script>
