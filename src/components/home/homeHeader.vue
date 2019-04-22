/**
* 首页头部组件
* Luffy 2018-7-28
*/
<template>
    <div id="home-header">
        <Timer2></Timer2>
        <Timer></Timer>
        <div class="left" v-if="leftOptions" @click="backRouter"><i class="iconfont icon-fanhui icon-style"></i></div>
        <slot></slot>
    </div>
</template>

<script src="../../js/home/homeHeader.js"></script>

<style scoped lang='scss'>
    @import "../../scss/home/homeHeader";
</style>
