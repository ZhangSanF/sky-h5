/**
* 首页顶部组件
* Luffy 2018-7-27
*/
<template>
    <div class="page" ref="page">
        <!--轮播图-->
        <swiper v-if="image_zw.length > 1" :options="swiperOption">
          <swiper-slide v-for="item in image_zw" :key="item.id">
            <img :src="item.src" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script src="../../js/home/centerTop.js"></script>

<style lang="scss">
    @import "../../scss/home/centerTop_no_scoped";
</style>

<style scoped lang="scss">
    @import "../../scss/home/centerTop";
</style>
