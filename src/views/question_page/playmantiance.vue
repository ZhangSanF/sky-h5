<template>
  <!--
0:玩法维护
-->
    <div class="question_page">
        <!--无数据/网络不好/系统繁忙/暂无此功能/维护/地区禁止访问/IP禁止/系统升级-->
        <div class="no_data_page">
            <i v-show="playMaintenance.question_reason === '0'"  class="iconfont icon-gamemaintain question_icon"></i>

            <p class="question_title">{{ playMaintenance.title }}</p>

             <div class="system_maintain" v-show="playMaintenance.question_reason === '0' ">
                <span>{{ playMaintenance.content_time_before }}</span>
                <span class="content_time">{{ playMaintenance.content_time }}</span>
                <span>{{ playMaintenance.content_time_after }}</span>
            </div>

        </div>
    </div>
</template>


<script src="../../js/question_page/playmaintiance.js"></script>

<style scoped lang="scss">
    @import "../../scss/question_page";
</style>
