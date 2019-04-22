<template>
    <div>
      <div class="news_content_box" v-if="dataLen > 0" ref="setHeight">
        <div class="news_item"
             v-for="(item,index) in notice_content"
             :key="index"
             @click="goToDetail(item)">
          <header class="news_header_line">
            <!--<span class="news_title">{{item.title}}</span>-->
            <span class="news_date">{{item.createTime}}</span>
          </header>
          <div class="msg_abbr_content" ref="msg_content">{{item.content}}</div>
          <!--<div class="news_sender">{{$t('msg.msg_sender')}}：{{$t('msg.administrator')}}</div>-->
        </div>
        <div class="pullUp_success" v-if="pull_success">没有更多记录咯 !</div>
      </div>
      <div v-else>
        <question-page></question-page>
      </div>
      <!--无数据显示问题页面-->

    </div>

</template>

<script type="text/javascript" src="../../js/home/websiteNews.js"></script>

<style scoped lang="scss">
    @import "../../scss/my/website_news";
</style>
