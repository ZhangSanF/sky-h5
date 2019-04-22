/**
* 足球赛果
*
*/
<template>
    <div ref="outerWrapper" class="football-result" :style="{background: bagresult!=undefined && bagresult!=''  ? '' : '#ffffff'}">
        <div class="box">
            <div v-if="bagresult!=undefined && bagresult!='null' &&bagresult!='' ">
                <div class="result-list" v-for="(items,key,index) in bagresult" :key="key">
                <div class="title" @click="switchdown(index,key)">
                  <div class="title-font">{{items[0].mName}}</div>
                  <div class="icon-box" ref="iconBox"><span class="iconfont icon-fanhui icon-style"></span></div>
                </div>
                <transition name="fade"   v-for="(item,key2) in items" :key="key2">
                  <div class="result-box" ref="contentshow"  v-show="showBox[key].content" >
                    <div class="result-info">
                      <div>{{item.startTimeStr}}</div>
                      <div>{{item.hTeam}}</div>
                      <div>{{item.gTeam}}</div>
                    </div>
                    <div class="result-detail">
                      <div class="detail-top">
                        <div>半场</div>
                        <div>{{item.huH}}</div>
                        <div>{{item.huG}}</div>
                      </div>
                      <div class="detail-top ">
                        <div class="color-style">全场</div>
                        <div class="color-style">{{item.fullH}}</div>
                        <div class="color-style">{{item.fullG}}</div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div >
            </div>
            <div v-else>
                <question-page></question-page>
            </div>
        </div>
    </div>
</template>

<script src="../../js/home_regulation/zqResult.js"></script>
<style scoped lang="scss">
    @import '../../scss/home_regulation/ballsResult';
</style>
