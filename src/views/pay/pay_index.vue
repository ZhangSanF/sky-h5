<template>
    <div id="My_paid_index">
        <!--用户余额-->
        <span class="paid_sum"><!--￥{{ userBalance }}--></span>
        <!--导航标签-->
        <div class="tab_box" v-model="activeTab">
            <span :class="[activeTab == item.label ? activeClass : '', normalStyle]" v-for="item in tabList" @click="activeState(item.label)" >
                {{ item.label }}
            </span>
        </div>
        <!--下划线-->
        <div class="underline_style" ref="underline"></div>
        <!--下拉刷新图标-->
        <div v-if="pullDownStart"><refresh></refresh></div>
        <!--中间内容-->
        <div ref="outerWrapper" class="outerWrapper" :style="{background: resolvedData.length > 0  ? '' : '#ffffff',padding: resolvedData.length > 0  ? '0 0.15rem' : '0'}">
            <div v-model="activeTab" class="content_container">
                <div v-if="resolvedData.length > 0" ref="setHeight">
                    <!--统计-->
                    <div class="statistics">
                        <div><span>投注额：</span><span class="bet">{{format(countBetAmount)}}元</span></div>
                        <div><span>盈利额：</span><span class="profit-shu">{{format(countBetAward)}}元</span></div>
                    </div>
                    <div v-for="item in resolvedData">
                      <paid-item :notPassTestData="item" v-if="item.isMix == '0'"></paid-item>
                      <!--综合过关-->
                      <pass-test :passTestData="item" v-if="item.isMix == '1'"></pass-test>
                    </div>
                    <div class="pullUp_success" v-if="noMore">没有更多记录咯!</div>
                </div>

                <!--当没有数据时显示问题页面-->
                <div  v-if="resolvedData.length === 0" >
                    <question-page></question-page>
                </div>
            </div>
        </div>
        <!--上拉加载图标-->
        <div v-if="pullUpStart" class="pull_up"><refresh></refresh></div>
    </div>
</template>

<script src="../../js/pay/pay_index.js"></script>

<style scoped lang='scss'>
    @import "../../scss/pay/paid_index";
</style>
