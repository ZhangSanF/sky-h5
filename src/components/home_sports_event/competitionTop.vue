/**
* 赛事头部组件
*/
<template>
  <div class="box">
    <div class="top">
      <div @click="switchdowm" class="top-title">
        <span class="top-font">
          {{nav_label}}({{ballName}})
          <div  class="top-icon-box" ref="icontop"><span  class="iconfont icon-fanhui top-icon"></span></div>
        </span>

      </div>
      <transition name="fade">
        <div class="top-down" v-if="!downshow">
          <div class="down-box"><div class="top-down-triangle"></div></div>
          <div class="top-down-content">
            <div class="alliance-sort" :style="{color:alliancesort ? '#11A7DE' : '#999'}" @click="sortajax('1')">
              <span class="iconfont icon-alliance_sequence icon-style"></span>
              <span>联盟排序</span>
            </div>
            <div class="time-sort" :style="{color:timesort ? '#11A7DE' : '#999'}" @click="sortajax('2')">
              <span class="iconfont icon-time_sequence icon-style"></span>
              <span>时间排序</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script src="../../js/home_sports_event/competitionTop.js"></script>
<style scoped lang='scss'>
  @import "../../scss/home_sports_event/competitionTop";
</style>
