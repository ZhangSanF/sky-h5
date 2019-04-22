/**
* 早盘内容组件
*/
<template>
<div>
  <div class="reach-footer" v-show="isMix == '1' && mixCount>0">
    <div class="footer-content" @click="showMixBet()">
      <span class="content-font">综合过关-投注单</span>
      <div class="yuan"><span class="yuan-num">{{mixCount}}</span></div>
    </div>
  </div>

  <div ref="outerWrapper" class="m-football" :style="{bottom: isMix == '1' && mixCount > 0 ? '0.59rem' : '0.1rem'}">
    <!--<div class="title" @click="showList" >
      <div class="title-content">
        <div class="title-font"></div>
        <div ref="iconBox" class="icon-box">
          <span class="iconfont icon-fanhui title-icon"></span>
        </div>
      </div>
    </div>-->
    <!--<transition name="fade" >-->
    <div v-if="items!=undefined && items!='' && !items.playMaintenance" >
      <ul v-if="listshow" @click="getMatchesById(item)" v-for="(item,index) in items" :key="index">
        <li class="content-item">
          <div class="content">
            <div class="content-left">{{item.name}}</div>
            <div class="content-right">
              <span>{{item.matchesNum}}</span>
              <span class="iconfont icon-youjiantou content-icon"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 玩法维护 -->
    <div v-else-if="items != undefined && items.playMaintenance">
      <question-page></question-page>
    </div>
    <div v-else>
      <question-page></question-page>
    </div>
    <!--</transition>-->
  </div>
</div>
</template>

<script src="../../js/home_sports_event/sessionContent.js"></script>
<style scoped lang="scss">
  @import "../../scss/home_sports_event/sessionContent";
</style>
