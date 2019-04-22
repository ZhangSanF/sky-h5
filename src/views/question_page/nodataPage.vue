<template>
  <!--
3:暂无数据,用来区别已结算和未结算出现玩法维护是混乱的情况

-->
    <div class="question_page">
        <!--无数据/网络不好/系统繁忙/暂无此功能/维护/地区禁止访问/IP禁止/系统升级-->
        <div class="no_data_page">
            <i class="iconfont icon-no_content question_icon"></i>
            <p class="question_title">{{ $t("msg.noData") }}</p>
            <!--判断是否系统升级/系统维护-->
            <div class="question_content">
              您所在的页面当前无数据
            </div>
            <!--根据问题原因判断要显示的按钮-->
            <span class="operation_btn" @click="refreshPage">{{ $t("msg.fresh") }}</span>

        </div>
    </div>
</template>


<script src="../../js/question_page/question_page.js"></script>

<style scoped lang="scss">
    @import "../../scss/question_page";
</style>
