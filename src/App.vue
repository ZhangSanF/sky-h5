<template>
    <div id="app" v-if="loginStatus">
        <router-view/>
    </div>
</template>

<script>
  import {base,store} from "../src/js/public/port";
    export default {
        name: 'App',
        computed : {
          loginStatus(){
            return store.state.loginStatus;
          },
        },
        watch: {

        },
      methods:{
      },
        mounted(){
            base.methods.apiLogin();
            document.addEventListener('touchmove',(event)=>{
                event.preventDefault();
            }, { passive: false });
        },
    }
</script>

<style lang='scss'>

</style>
