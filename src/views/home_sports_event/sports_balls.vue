/**
* 滚球赛事页面
*/
<template>
  <div class="sports_event">
    <!--top-->
    <competition-top :ballName="ballName" :nav_label="nav_label"></competition-top>

    <scroller lock-y :scrollbar-x="false">
      <div class="globule" :style="{width:ballKinds.length * 0.69 +'rem'}">
        <div class="globule-item" v-for="(item,index) in ballKinds" @click="chooseBall(item)">
          <span :class="item.ballClass" class="ball-style" :style="{color: ballName === item.name ? '#11A7DE' : '#999'}"></span>
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

    <router-view/>
  </div>
</template>


<script src="../../js/home_sports_event/sports_balls.js"></script>
<style scoped lang="scss">
  @import "../../scss/home_sports_event/sports_public";
</style>
