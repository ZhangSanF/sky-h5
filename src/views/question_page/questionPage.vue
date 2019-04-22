<template>
  <!--
0:玩法维护
1:系统维护
2:系统升级
3:暂无数据
4:功能开发中
5:暂无网络
6:系统繁忙
-->
    <div class="question_page">
        <!--无数据/网络不好/系统繁忙/暂无此功能/维护/地区禁止访问/IP禁止/系统升级-->
        <div class="no_data_page">
            <i v-show="playMaintenance.question_reason === '0'"  class="iconfont icon-gamemaintain question_icon"></i>
            <i v-show="playMaintenance.question_reason === '3'"  class="iconfont icon-no_content question_icon"></i>
            <i v-show="playMaintenance.question_reason === '4'"  class="iconfont icon-wait question_icon"></i>
            <i v-show="playMaintenance.question_reason === '5'"  class="iconfont icon-no_network question_icon"></i>
            <i v-show="playMaintenance.question_reason === '6'"  class="iconfont icon-busy question_icon"></i>
            <!--IP禁止-->
            <!--<i v-if="playMaintenance.question_reason == '6'"  class="iconfont icon-ip_ban question_icon"></i>-->
            <!--地区禁止-->
            <!--<i v-if="playMaintenance.question_reason == '6'"  class="iconfont icon-areas_prohibited question_icon"></i>-->

            <p class="question_title">{{ playMaintenance.title }}</p>

            <!--判断是否系统升级/系统维护-->
            <div class="question_content" v-show="playMaintenance.question_reason !== '1' && playMaintenance.question_reason !== '2' ">
                {{ playMaintenance.content }}
            </div>

             <div class="system_maintain" v-show="playMaintenance.question_reason === '0'">
                <span>{{ playMaintenance.content_time_before }}</span>
                <span class="content_time">{{ playMaintenance.content_time }}</span>
                <span>{{ playMaintenance.content_time_after }}</span>
            </div>
            <!--暂无数据
            <div class="system_maintain" v-if="playMaintenance.question_reason === '3'">
              <span>{{ playMaintenance.content }}</span>
            </div> -->

            <!--根据问题原因判断要显示的按钮-->
            <!--<span class="operation_btn" @click="goBack" v-if="playMaintenance.question_reason === '4'">{{ $t("msg.back") }}</span>-->
            <span class="operation_btn" @click="refreshPage" v-show="playMaintenance.question_reason === '3' || playMaintenance.question_reason === '5' ">{{ $t("msg.fresh") }}</span>
            <span class="operation_btn" @click="reTry" v-show="playMaintenance.question_reason === '6' ">{{ $t("msg.retry") }}</span>
        </div>
    </div>
</template>


<script src="../../js/question_page/question_page.js"></script>

<style scoped lang="scss">
    @import "../../scss/question_page";
</style>
