/**
 * 首页底部组件
 * Luffy 2018-7-27
 */
<template>
  <div id="home-fotter" ref="foot">
    <i class="iconfont" :class="[touching=='home_center'?'touches':'',touching=='home_center'?'icon-shouyexuanzhong':'icon-shouye']" @click="changeCard('home_center') "><span>{{ $t("msg.home") }}</span></i>
    <i class="iconfont" :class="[touching=='home_pay'?'touches':'',touching=='home_pay'?'icon-yijiesuanxuanzhong':'icon-yijiesuan']" @click="changeCard('home_pay')"><span>{{ $t("msg.settled") }}</span></i>
    <i class="iconfont" :class="[touching=='home_unpay'?'touches':'',touching=='home_unpay'?'icon-weijiesuanxuanzhong':'icon-weijiesuan']" @click="changeCard('home_unpay')"><span>{{ $t("msg.unsettled") }}</span></i>
    <i class="iconfont" :class="[touching=='home_mine'?'touches':'',touching=='home_mine'?'icon-wodexuanzhong':'icon-wode']" @click="changeCard('home_mine')"><span>{{ $t("msg.mine") }}</span></i>
  </div>
</template>

<script src="../../js/home/homeFotter.js"></script>

<style scoped lang='scss'>
    @import "../../scss/home/homeFotter";
</style>

