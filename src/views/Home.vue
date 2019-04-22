<template>
    <div class="home">
        <home-header v-if="homeHeaderConfig.type == 'icon'" :left-options="homeHeaderConfig.shwoback">
            <!--<i :class="homeHeaderConfig.val"></i>-->
          <img :src="images_logo" class="header-img" alt="">
        </home-header>
        <home-header v-else-if="homeHeaderConfig.type == 'string'" :left-options="homeHeaderConfig.shwoback">
            {{homeHeaderConfig.val}}
        </home-header>
        <div v-else-if="homeHeaderConfig.type == 'none'"></div>
        <router-view/>

        <home-fotter v-show="footShow"></home-fotter>
        <loading v-show="showLoading"></loading>
        <toast v-show="toasting"></toast>
        <!--交易单弹窗-->
        <tradeDialog v-if="is_showModal" v-on:goToHomePage="goToHomePage">
        </tradeDialog>
        <!--通知消息弹窗/提示弹窗-->
        <news-dialog v-if="showDialog"></news-dialog>
    </div>

</template>

<script src="../js/home/Home.js"></script>

<style scoped lang='scss'>
    @import "../scss/Home";
</style>
