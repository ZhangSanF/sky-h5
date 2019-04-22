/**
* 网球赛果
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
            <transition name="fade" v-for="(item,key2) in items" :key="key2" >
              <div class="result-box" v-show="showBox[key].content" ref="contentshow"  >
                <div class="result-info">
                  <div>{{item.startTimeStr}}</div>
                  <div>{{item.hTeam}}</div>
                  <div>{{item.gTeam}}</div>
                </div>
                <div class="result-detail">
                  <div class="detail-top">
                    <div>第一盘</div>
                    <div>{{item.s1H}}</div>
                    <div>{{item.s1G}}</div>
                  </div>
                  <div class="detail-top">
                    <div>第二盘</div>
                    <div>{{item.s2H}}</div>
                    <div>{{item.s2G}}</div>
                  </div>
                  <div class="detail-top">
                    <div>第三盘</div>
                    <div>{{item.s3H}}</div>
                    <div>{{item.s3G}}</div>
                  </div>

                  <div class="detail-top">
                    <div>第四盘</div>
                    <div>{{item.s4H}}</div>
                    <div>{{item.s4G}}</div>
                  </div>

                  <div class="detail-top">
                    <div>第五盘</div>
                    <div>{{item.s5H}}</div>
                    <div>{{item.s5G}}</div>
                  </div>

                  <div class="detail-top">
                    <div>让局</div>
                    <div>{{item.numberwinH}}</div>
                    <div>{{item.numberwinG}}</div>
                  </div>

                  <div class="detail-top">
                    <div>赛局球员:大小</div>
                    <div>{{item.numberwinH}}</div>
                    <div>{{item.numberwinG}}</div>
                  </div>

                  <div class="detail-top">
                    <div class="color-style">完赛</div>
                    <div  class="color-style">{{item.fullH}}</div>
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

<script src="../../js/home_regulation/wqResult.js"></script>
<style scoped lang="scss">
  @import '../../scss/home_regulation/ballsResult';
</style>
