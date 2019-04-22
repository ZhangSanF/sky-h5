<template>
  <div>
    <ul v-if="dataLen > 0" ref="setHeight">
      <li class="msg_item"
          v-for="(item,index) in notice_content"
          :key="index"
          @click="goToDetail({time:item.createTime,content:item.content})">
        <header class="msg_date">{{item.createTime}}</header>
        <div class="msg_abbr_content" ref="msg_content">
          {{item.content}}
        </div>
      </li>
      <li class="pullUp_success" v-if="pull_success">没有更多记录咯 !</li>
    </ul>
    <div v-else>
      <question-page></question-page>
    </div>
  </div>

</template>

<script type="text/javascript" src="../../js/home/gameNotice.js"></script>

<style scoped lang="scss">
    @import "../../scss/my/game_notice";
</style>
