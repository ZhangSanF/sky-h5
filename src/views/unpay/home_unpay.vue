<template>
    <div class="unpaid_page_container">
        <span class="unpaid_sum"><!--￥{{userBalance}}--></span>
        <!--下拉刷新图标-->
        <div v-if="pullDownStart"><refresh></refresh></div>
        <!--<transition name="fade" mode="out-in">-->
            <!--<div class="dropDown_success" v-if="pullDownSuccess">{{$t('msg.refresh_success')}}</div>-->
        <!--</transition>-->

        <!--中间内容:style="{height: (screenHeight - 110)+'px'}"-->
        <div ref="outerWrapper" class="outerWrapper" :style="{background: unresolvedData.length > 0  ? '' : '#ffffff',padding: unresolvedData.length > 0  ? '0 0.15rem' : '0'}">
          <!--:style="{
                    padding:unresolvedData.length > 0 ? '.15rem':'0',
                    minHeight: (screenHeight - 110 + 1)+'px'
                 }"-->
            <div id="unpaid_page">
                <div  v-if="unresolvedData.length > 0" ref="setHeight">
                    <div v-for="item in unresolvedData">
                        <!--判断已结算数据中是否包含'综合过关',通过playName的值判断-->
                        <!--非综合过关-->
                        <unpaid-item v-if="item.isMix=='0'" :unpaidInfo="item"></unpaid-item>
                        <!--综合过关-->
                        <unres-pass-test v-if="item.isMix=='1'" :passTestData="item"></unres-pass-test>
                    </div>
                    <div class="pullUp_success" v-if="noMore">没有更多记录咯!</div>
                </div>

                <!--没有数据显示问题页面-->
                <div v-if="unresolvedData.length == 0" >
                    <question-page></question-page>
                </div>
            </div>
        </div>

        <!--上拉加载图标-->
        <div v-if="pullUpStart" class="pull_up"><refresh></refresh></div>
        <!--<transition name="fade" mode="out-in">-->
            <!--<div class="pullUp_success" v-if="pullUpSuccess">{{$t('msg.load_success')}}</div>-->
        <!--</transition>-->
      <!--<transition name="fade" mode="out-in">-->
        <!--<div class="pullUp_success" v-if="noMore">没有更多记录咯!</div>-->
      <!--</transition>-->
    </div>
</template>

<script src="../../js/unpaid/home_unpay.js"></script>

<style scoped lang='scss'>
    @import "../../scss/unpaid/home_unpay";
</style>

