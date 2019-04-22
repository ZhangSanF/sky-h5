<template>
    <div class="ball_container">
        <scroller lockY :scrollbarX="false" >
            <div :style="{width: ballKind.length * .7 + (ballKind.length + 1) * .15 + 'rem'}">
                <!--<el-badge class="single_ball" v-for="(item,index) in ballKind" :key="item.id" :value="item.msgNum" :max="99">
                    <div class="inner_box" @click="goMatchesPage(item)">
                        <i :class="item.ballClass"></i>
                        <span class="ball_text">{{item.name}}</span>
                    </div>
                </el-badge>-->

                <div class="single_ball" @click="goMatchesPage(item)" v-for="(item,index) in ballKind" :key="item.id">
                    <!--信息条数: 判断数量, 超过99显示为: 99+ -->
                    <span class="info_num"
                          :style="{
                               width:String(item.msgNum).length === 3 ? '.28rem':'.18rem',
                               borderRadius:String(item.msgNum).length === 3 ? '.15rem' : '50%'
                          }"
                    >{{item.msgNum <= 99 ? item.msgNum : '99+'}}</span>
                    <!--球类图片-->
                    <i :class="item.ballClass"></i>
                    <!--球类名称-->
                    <span name="team" class="ball_text">{{item.name}}</span>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script src="../../js/home/ballKind.js"></script>
<style scoped lang="scss">
    @import "../../scss/home/ballKind.scss";
</style>
<style lang="scss">
    /*@import "../../scss/home/ballKind_no_scoped";*/
</style>
