<template>
    <div class="home_center" >
        <div class="content-box" ref="outerWrapper">
            <div class="center">
              <!--顶部轮播图-->
              <center-top></center-top>
              <!--通知-->
              <div class="notice_bar">
                <a href="#" class="iconfont icon-laba notice_icon"></a>
                <a class="notice_text" ><!--关于世界杯体育注单结算的通知-->
                  <div id="box">
                   <!-- <ul id="con1" :class="{anim:animate}">
                      <li v-for="v in newNotice">
                        <SPAN>{{v.unContent}}</SPAN>
                      </li>
                    </ul>-->
                    <marquee :interval=parseInt(3000) :duration=parseInt(1000)>
                      <marquee-item v-for="(v,index) in homeNotice" :key="index"> <SPAN @click="showDialog(v.unContent)">{{v.unContent}}</SPAN></marquee-item>
                    </marquee>
                  </div>
                </a>
                <a class="arrow_icon" @click="clickMoreNotice">更多</a>
                <a href="#" class="iconfont icon-youjiantou more_notice_icon"></a>
              </div>
              <!--导航标签:选择种类-->
              <nav-label ></nav-label>
              <!--中间精选球展示-->
                <div class="center-content-title">{{ $t("msg.gun_ball") }}</div>
                <center-content ></center-content>
            </div>
        </div>
        <!--通知消息弹窗-->
        <!--<news-dialog v-if="showDialogStyle.isDisplay" @goToPage="goToPage"></news-dialog>-->

    </div>
</template>

<script src="../js/home/home_center.js"></script>
<style scoped lang='scss'>
    @import "../scss/home/homeCenter";
</style>
