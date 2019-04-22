/**
* 赛果页面
*
*/
<template>
  <div class="result">
    <div class="top">
      <popup-picker cancelText="取消" confirmText="确定" v-model="nameActive" title="赛果 -" :data="list" @on-change="onChange" @on-show="selectShow" @on-hide="selectHide"></popup-picker>
      <div  class="top-icon-box" ref="icontop"><span  class="iconfont icon-fanhui top-icon"></span></div>

    </div>

    <!--时间选择-->
    <div class="time-style">
      <group>
        <datetime :end-date="maxTime" v-model="timeValue" @on-change="change"></datetime>
      </group>
      <div class="sanjiao"></div>
    </div>

    <router-view :nameActive="nameActive[0]" :newTime="newTime"/>
  </div>
</template>

<script src="../../js/home_regulation/result.js"></script>
<style scoped lang="scss">
  @import '../../scss/home_regulation/result';
</style>
<style lang="scss">
  @import '../../scss/home_regulation/vux_result';
</style>
