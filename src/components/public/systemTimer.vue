<template>
<!--<div>{{countDown}}</div>-->
</template>
<script>
  /* eslint-disable no-return-assign,indent,quotes */
  import {store,process,router} from '../../js/public/port'
  export default {
    data() {
      return {
        countDown: store.state.sysFreqParams.systemMFreq,
        timerTask: null,
        stop: false,
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
        process.getSystemMaintanceTime();

      },
      task() {
        if (this.countDown === 0) {
          let systemMaintanceCode =  store.state.systemMaintanceCode;
          if(systemMaintanceCode==='D000') {
            this.calculation();
            process.getSystemMaintanceTime();
           }
        } else {
          this.countDown = this.countDown - 1
        }
      },
      generateTask() {
        process.getSystemMaintanceTime();
        this.calculation();
        this.timer();
      },
      calculation() {
        //当玩法维护或系统维护是，定时器调整为10m刷新一次
          this.countDown = store.state.sysFreqParams.systemMFreq;
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
