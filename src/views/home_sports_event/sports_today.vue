/**
* 今日赛事页面
*/
<template>
  <div class="sports_event">
    <!--top-->
    <competition-top :ballName="ballName" :nav_label="nav_label"></competition-top>

    <!--球类-->
    <scroller lock-y :scrollbar-x="false" >
      <div class="globule" :style="{width:ballKinds.length * 0.69 +'rem'}">
        <div class="globule-item" v-for="(item,index) in ballKinds" @click="chooseBall(item)">
          <span :class="item.ballClass" :style="{color: ballName === item.name ? '#11A7DE' : '#999'}"></span>
          <div name="team" class="ball-font" :style="{color: ballName === item.name  ? '#11A7DE' : '#999'}">{{item.name}}</div>
          <div class="line"></div>
          <div class="msg-num"
               :style="{width:item.msgNum.toString().length == '1' ? '0.12rem' : (item.msgNum.toString().length == '2' ? '0.16rem' : '0.2rem'),
               borderRadius:item.msgNum.toString().length == '1' ? '50%' : '5px',
               right:item.msgNum.toString().length == '3' ? '0.05rem' : '0.1rem'}">
            {{item.msgNum <= 99 ? item.msgNum : '99+'}}
          </div>
        </div>
      </div>
    </scroller>

    <!--让球大小&综合过关&冠军-->
    <div class="sports-roll">
      <!--滚动-->
      <div class="tab-box">
        <span v-for="item in playTabList" :class="[baseParam.isMix === item.isMix ? 'actives' : '', 'tab-text']" @click="activeState(item)">
          {{ item.label }}
        </span>
      </div>
      <!--线-->
      <div class="underline-style" :style="{width:widths}" ref="underline"></div>
      <!--容器-->
      <div class="tab-container-box">
        <!--<div>-->
          <!--<router-view />-->
        <!--</div>-->
        <div v-if="baseParam.isMix == '0'">

          <router-view :activeTab="baseParam.isMix"/>

        </div>
        <div v-if="baseParam.isMix == '1'" >

          <router-view :activeTab="baseParam.isMix"/>

        </div>
        <div v-if="baseParam.isMix == '2'">

          <router-view :activeTab="baseParam.isMix"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../js/home_sports_event/sports_today.js"></script>
<style scoped lang="scss">
  @import '../../scss/home_sports_event/sports_public';
</style>
