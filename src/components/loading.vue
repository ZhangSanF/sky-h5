<template>
  <div id="loading">
    <div class="loading-box">
      <div class="xzbox">
       <i class="iconfont icon-loading"></i>
      </div>
      <div class="shadom"></div>
      <div class="loadlite">
        <span>{{ $t("msg.loading") }}</span>
        <div class="animition1"></div>
        <div class="animition1"></div>
        <div class="animition1"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
}
</script>

<style scoped lang='scss'>
  @import '../scss/loading';
</style>

