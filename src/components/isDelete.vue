/**
* 综合过关确认删除弹窗
*
*/
<template>
    <div class="login-alert">
        <div class="box">
            <p class="title">提示</p>
            <div class="content">需要删除此条数据?</div>
            <div class="footer">
                <p @click="isClose(0)">取消</p>
                <p @click="isClose(1)">删除</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
      data(){
          return{

          }
      },
      methods:{
          isClose(data){
              this.$emit('isDelete',data);
          }
      },
      mounted(){}
  }
</script>
<style scoped lang='scss'>
  @import "../scss/home/homeNewsDialog";
</style>
