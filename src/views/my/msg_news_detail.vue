<template>
    <div class="news_detail">
        <header class="news_header_line">
           <!-- <span class="news_title">{{ $route.query.title }}</span>-->
            <span class="news_date">{{ $route.query.time }}</span>
        </header>
        <article class="msg_abbr_content" ref="msg_content">
            {{ $route.query.content }}
        </article>
        <!--<div class="news_sender">{{$t('msg.msg_sender')}}：{{ $route.query.sender }}</div>-->
    </div>

</template>

<script src="../../js/my/my_news_detail.js"></script>

<style scoped lang="scss">
    @import "../../scss/my/msg_news_detail";
</style>
