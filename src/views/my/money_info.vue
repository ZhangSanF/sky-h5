/**
* 钱包记录详情
*/
<template>
  <div class="money-info">
    <!--下拉刷新图标-->
    <div v-if="pullDownStart"><refresh></refresh></div>
    <div ref="outerWrapper" class="outerWrapper" :style="{background: bagmoney!=undefined && bagmoney!=''  ? '' : '#ffffff'}">
      <div class="container" >
        <div v-if="bagmoney!=undefined && bagmoney!=''" >
          <!--24小时-->
          <div>
            <div>
              <ul ref="setHeight">
                <li class="list" v-for="(item,index) in bagmoney" :key="index">
                  <p>
                    <span>日期：</span>
                    <span>{{item.transactionDate}}</span>
                  </p>
                  <p>
                    <span>金额：</span>
                    <span>{{winFormatMoney(item.amount)}}</span>
                  </p>
                  <p>
                    <span>订单号：</span>
                    <span>{{item.transactionNo}}</span>
                  </p>
                  <p>
                    <span>状态：</span>
                    <span :style="{color: item.statusDesc==='成功' ? '#09D577':'#D50926'}">{{item.statusDesc}}</span>
                  </p>
                </li>
                <li class="no-more" v-show="noMore">没有更多记录咯 !</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else>
          <question-page></question-page>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../js/my/money_info.js"></script>
<style scoped lang='scss'>
  @import "../../scss/my/money_info";
</style>


