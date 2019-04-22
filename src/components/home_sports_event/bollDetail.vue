/**
* 棒球/斯诺克/篮球详情组件
*/
<template>
  <div class="boll-detail">
    <div class="title" @click="showDetail">
      <div class="title-font">让球</div>
      <div class="icon-box" ref="iconBox"><span class="iconfont icon-fanhui icon-style"></span></div>
    </div>
    <transition name="fade">
      <ul v-if="stateShow">
        <li class="content-list">
          <div>斗山熊</div>
          <div>SK飞龙</div>
        </li>
        <li class="content-list">
          <div class="detail-number">
            <span>-1.5</span>
            <span>2.40</span>
          </div>
          <div class="detail-number">
            <span>-1.5</span>
            <span>2.40</span>
          </div>
        </li>
      </ul>
    </transition>



  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        stateShow:true
      }
    },
    components: {},
    methods: {
      showDetail(){
        this.stateShow = !this.stateShow;
        if(this.stateShow === true){
          this.$refs.iconBox.style.transform = 'rotate(-90deg)';
        }else{
          this.$refs.iconBox.style.transform = 'rotate(0deg)';
        }
      }
    },
  }


</script>

<style scoped lang="scss">
  .boll-detail{width: 100%;height: 100%;font-size: 0.13rem;
    .title{box-sizing: border-box;height: 0.36rem;text-align: center;line-height: 0.36rem;background: #ffffff;position: relative;
      .title-font{font-size: 0.14rem;color: #333333;}
      .icon-box{position: absolute;right: 0.1rem;top: 0;transform: rotate(-90deg);transition: all .3s linear;
        .icon-style{font-size: 0.18rem;color: #999999}
      }
    }
    .content-list{height: 0.36rem;border-top:0.01rem solid $border-color;display: flex;background: #ffffff;
      line-height: 0.36rem;
      div:nth-child(1){box-sizing: border-box;width: 1.88rem;border-right: 0.01rem solid $border-color;text-align: center;font-size: 0.13rem;color: #666666;}
      div:nth-child(2){box-sizing: border-box;width: 1.87rem;text-align: center;font-size: 0.13rem;color: #666666;}
      .detail-number{display: flex;justify-content: space-around;
        span:nth-child(1){width: 0.5rem;text-align: right;font-size: 0.11rem;color: #999999}
        span:nth-child(2){width: 0.5rem;text-align: left;font-size: 0.13rem;color: #333333}
      }
    }
    .fade-enter-active, .fade-leave-active{
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
