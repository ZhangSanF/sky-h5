<template>
    <div class="msg_detail">
        <header class="msg_date">{{ $route.query.time }}</header>
        <article class="msg_abbr_content" ref="msg_content">
            {{ $route.query.content }}
        </article>
    </div>
</template>

<script src="../../js/my/msg_notice_detail.js"></script>

<style scoped lang="scss">
    @import "../../scss/my/msg_notice_detail";
</style>
