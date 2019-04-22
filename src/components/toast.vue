/**
* toast
*
*/
<template>
  <div class="toast">
      <div class="content">{{infoMsg}}</div>
  </div>
</template>

<script>
  import store from '../js/store/index';
  export default {
    computed:{
      infoMsg:function () {
        return  store.state.infoMsg;
      }
    }

  }
</script>
<style scoped lang='scss'>
  @import '../scss/toast';
</style>

