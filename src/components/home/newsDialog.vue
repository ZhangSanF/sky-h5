<template>
    <div class="home_news_dialog">
        <div class="news_container">
            <!--tab标签-->
            <div v-if="showDialog.showInfo" class="tab_box">{{ $t("msg.notice") }}</div>
            <div v-else class="tab_box">提示</div>
            <!--消息内容-->
            <div v-if="showDialog.showInfo" class="outerWrapper">
              {{showDialog.content}}
            </div>
            <div v-else class="outerWrapper" style="text-align: center">
              {{showDialog.content}}
            </div>
            <!--我知道了-->
            <div class="confirm_btn" @click="closeDialogBox">{{$t('msg.i_know')}}</div>
        </div>
    </div>
</template>

<script src="../../js/home/newsDialog.js"></script>

<style scoped lang="scss">
    @import "../../scss/home/homeNewsDialog";
</style>
