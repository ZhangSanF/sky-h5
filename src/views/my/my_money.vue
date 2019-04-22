/**
* 首页底部选项卡:钱包记录
* Luffy 2018-7-28
*/
<template>
    <div id="My_money">
        <!--导航标签-->
        <div class="tab_box" v-model="activeTab">
            <span :class="[activeTab == item.label ? activeClass : '', normalStyle]" v-for="item in tabList" @click="activeState(item.label)" >
                {{ item.label }}
            </span>
        </div>

        <!--tab下划线-->
        <div class="underline-style" ref="underline"></div>

        <!--下拉刷新图标-->
        <div v-if="pullDownStart"><refresh></refresh></div>
        <!--<transition name="fade" mode="out-in">-->
            <!--<div class="dropDown_success" v-if="pullDownSuccess">刷新成功</div>-->
        <!--</transition>-->
        <!--内容-->
        <div ref="outerWrapper" class="outerWrapper" :style="{background: bagmoney!=undefined && bagmoney!=''  ? '' : '#ffffff'}">
            <div v-model="activeTab" class="content_container" >
                <div v-if="bagmoney!=undefined && bagmoney!=''" >
                    <!--24小时-->
                    <div>
                        <div>
                            <ul class="my_money_content" ref="setHeight">
                                <li class="content-list" v-for="(item,index) in bagmoney">
                                    <div class="content-left">
                                        <div style="margin-left: 0.1rem ; width: 0.5rem;" >
                                            <span class="content-time">{{item.transactionDate}}</span>
                                        </div>
                                        <div style="margin-left: 0.3rem ; width: 1.3rem;">
                                          <div class="content-name">{{item.tradeDesc}}</div>
                                            <div class="content-money"><span style="font-size: 0.12rem">¥</span> {{item.amount}}</div>
                                        </div>
                                        <!--<div style="margin-left: 0.2rem">-->
                                          <!--<div class="content-name">{{item.tradeDesc}}</div>-->
                                        <!--</div>-->
                                    </div>
                                    <!--待处理-->
                                    <div class="content-right" style="color: #999999"  v-if="item.status == '1'">{{ $t("msg.pending") }}</div>
                                    <!--处理中-->
                                    <div class="content-right" style="color: #999999"  v-else-if="item.status == '2'">{{ $t("msg.being_processed") }}</div>
                                    <!--成功-->
                                    <div class="content-right" style="color: #09D577" v-else-if="item.status == '3'">{{ $t("msg.successful") }}</div>
                                    <!--失败-->
                                    <div class="content-right" style="color: #09D577" v-else="item.status == '4'">{{ $t("msg.failure") }}</div>
                                </li>
                                <li class="no-more" v-show="noMore">没有更多记录咯!</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <question-page></question-page>
                </div>
            </div>
        </div>

        <!--上拉加载图标-->
        <div v-if="pullUpStart" class="pull_up"><refresh></refresh></div>
        <!--<transition name="fade" mode="out-in">-->
            <!--<div class="pullUp_success" v-if="pullUpSuccess">加载成功</div>-->
        <!--</transition>-->
      <!--<transition name="fade" mode="out-in">-->
        <!--<div class="pullUp_success" v-if="noMore">没有更多记录咯!</div>-->
      <!--</transition>-->
    </div>
</template>

<script src="../../js/my/my_money.js"></script>
<style scoped lang='scss'>
    @import '../../scss/my/my_money';
</style>

