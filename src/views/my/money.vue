/**
* new钱包记录
*/
<template>
  <div class="money">
      <div class="deal-title">
          <p></p>选择交易类型
      </div>
      <div class="money-down">
          <popup-picker cancelText="取消" confirmText="确定" :data="moneyList" @on-change="onChange" v-model="value"></popup-picker>
          <span class="iconfont icon-fanhui icon-style"></span>
      </div>
      <div class="deal-title">
          <p></p>选择时间
      </div>
      <div class="time-content" v-model="activeTab">
          <span :class="item.label == activeTab ? 'active' : ''" v-for="item in tabList" @click="selectTime(item.label)">{{item.label}}</span>
      </div>
      <div class="btn" @click="toInfo">查询</div>
  </div>
</template>

<script src="../../js/my/money.js"></script>
<style scoped lang='scss'>
  @import "../../scss/my/money";
</style>
<style lang='scss'>
  @import "../../scss/my/money_vux";
</style>

