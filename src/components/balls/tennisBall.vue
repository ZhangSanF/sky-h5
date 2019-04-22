/**
* 网球
*/
<template>
  <div class="allBallStyle">
    <!--综合过关底部-->
    <div class="reach-footer" v-show="isMix == '1' && mixCount>0">
      <div class="footer-content" @click="showMixBet()">
        <span class="content-font">综合过关-投注单</span>
        <div class="yuan"><span class="yuan-num">{{mixCount}}</span></div>
      </div>
    </div>

    <!---->
    <div  class="football-info">
      <div class="info-name">
        <span v-if="dateType === '1'" class="iconfont icon-gunqiu icon-style"></span>
        <span v-if="dateType === '2'" class="iconfont icon-jinri icon-style"></span>
        <span v-if="dateType === '0'" class="iconfont icon-zaopan icon-style"></span>
        <span class="name-font">{{nav_label}}({{ballName}})</span>
      </div>
      <div  class="info-detail">
        <div class="info-box">
          <div>独赢</div>
          <div>让盘</div>
          <div>大小</div>
        </div>
      </div>
    </div>

    <div ref="outerWrapper" class="list-box" :style="{background: items!=undefined && items!='' && !items.playMaintenance ? '' : '#ffffff',top: nav_label == '滚球' ? '1.54rem' : '2.1rem'}" >
      <!--赛事详情-->
        <div class="scroller-box">
          <div v-if="items!=undefined && items!='' && maintanceCode!=='D000'">
            <div class="ball-detail-list"   v-for="(item,key,index) in items" :key="key" >
              <!--头部-->
              <div class="info-title" @click="stateContent(index,key,item.showContent)">
                <div class="title">{{key}}</div>
                <div class="content-right">
                  <div>{{item.length}}</div>
                  <div  :class="dateType === '1' ? 'icon-box':'icon-box-today'">
                    <span class="iconfont icon-youjiantou icon-style"></span>
                  </div>
                </div>
              </div>
              <!--球详情-->
              <transition name="fade">
                  <div class="sum-height" v-show="showBox[key].content">
                <div class="ball-detaill" v-for="(itemDetail,indexT) in item" :key="indexT+'tennis'+itemDetail.id">
                  <!--内容-->
                    <div class="item-info">
                      <!--左-->
                      <div @click="morePlay(itemDetail)" class="content-left">
                        <div class="content-left-first">
                          <div>
                            <!-- name="team"-->
                            <span class="first-name-top">{{itemDetail.hteam}}</span>
                          </div>
                          <div class="score">
                            <span class="card">
                              <!--<span class="red-card">1</span>
                              <span class="yellow-card">2</span>-->
                            </span>
                            <span v-show="dateType === '1'" class="first-score">{{itemDetail.hscore !== -1 ? itemDetail.hscore:'A'}}</span>
                          </div>
                        </div>
                        <div class="content-left-two">
                          <div>
                            <!--name="team"-->
                            <span class="first-name-top" >{{itemDetail.gteam}}</span>
                          </div>
                          <div class="score">
                            <span class="card">
                              <!--<span class="red-card">1</span>
                              <span class="yellow-card">2</span>-->
                            </span>
                            <span v-show="dateType === '1'" class="first-score">{{itemDetail.gscore !== -1 ? itemDetail.gscore:'A'}}</span>
                          </div>
                        </div>
                        <div class="content-left-three">
                          <div  v-show="itemDetail.isLive == '1' && dateType !='1'" class="iconfont icon-gunqiu icon-style"></div>
                          <div v-if="dateType === '1'">盘:{{itemDetail.scoreGameH}}-{{itemDetail.scoreGameC}}  局:{{itemDetail.scoreSetH}}-{{itemDetail.scoreSetC}}</div>
                          <div v-if="dateType != '1'">{{itemDetail.showdelay == 'Y' ? '天气延赛':forMatDate(itemDetail.startTime)}}</div>
                          <div class="more_Num">+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                        </div>
                      </div    >
                      <!--中-->
                      <div class="content-center">
                        <div class="content-detail" >
                          <!-- 独赢-->
                          <div class="all-alone-win">
                            <!--v-if="play[playType.dy]!=undefined"-->
                            <template >
                            <div class="all-style" :class="{'checkedMix': checkedMatches[itemDetail.onlykey + itemDetail.matchesDetailId + playType.dy + '0']}" @click="betDialogHandler(itemDetail,playType.host,playType.dy,'dyz',itemDetail.dIorMH)">
                              <span>主</span>
                              <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, indexT,'dIorMH_change')">{{play[playType.dy]===undefined?'-':itemDetail.dIorMH != null ? formatOdds(itemDetail.dIorMH):'-'}}</span>
                              <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, indexT,'dIorMH_change')">{{play[playType.dy]===undefined?'-':itemDetail.dIorMH!=null?itemDetail.dIorMH:'-'}}</span>
                              <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, indexT,'dIorMH_change')"></span>
                            </div>
                            <div class="all-style" :class="{'checkedMix': checkedMatches[itemDetail.onlykey + itemDetail.matchesDetailId + playType.dy + '1']}" @click="betDialogHandler(itemDetail,!playType.host,playType.dy,'dyk',itemDetail.dIorMC)">
                              <span>客</span>
                              <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, indexT,'dIorMC_change')">{{play[playType.dy]===undefined?'-':itemDetail.dIorMC != null ? formatOdds(itemDetail.dIorMC):'-'}}</span>
                              <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, indexT,'dIorMC_change')">{{play[playType.dy]===undefined?'-':itemDetail.dIorMC!=null?itemDetail.dIorMC:'-'}}</span>
                              <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, indexT,'dIorMC_change')"></span>
                            </div>
                            </template>
                          </div>
                          <!-- 全场让球-->
                          <div class="all-let-the-ball">
                            <!--v-if="play[playType.rp]!=undefined"-->
                            <template >
                            <div class="all-style" :class="{'checkedMix': checkedMatches[itemDetail.onlykey + itemDetail.matchesDetailId + playType.rp + (itemDetail.dStrong === 'H' ? '0' : '2')]}"
                                 @click="betDialogHandler(itemDetail,playType.host,playType.rp,'rqz',itemDetail.dIorRH)">
                              <span :class="[itemDetail.dStrong=='H' ? 'showitems' : 'hideitems']">{{play[playType.rp]===undefined?' ':itemDetail.dRatio}}</span>
                              <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, indexT,'dIorRH_change')">{{play[playType.rp]===undefined?'-':itemDetail.dIorRH != null ? formatOdds(itemDetail.dIorRH):'-'}}</span>
                              <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, indexT,'dIorRH_change')">{{play[playType.rp]===undefined?'-':itemDetail.dIorRH!=null?itemDetail.dIorRH:'-'}}</span>
                              <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, indexT,'dIorRH_change')"></span>
                            </div>
                            <div class="all-style" :class="{'checkedMix': checkedMatches[itemDetail.onlykey + itemDetail.matchesDetailId + playType.rp + (itemDetail.dStrong === 'H' ? '1' : '3')]}"
                                 @click="betDialogHandler(itemDetail,!playType.host,playType.rp,'rqk',itemDetail.dIorRC)">
                              <span :class="[itemDetail.dStrong=='C' ? 'showitems' : 'hideitems']">{{play[playType.rp]===undefined?' ':itemDetail.dRatio}}</span>
                              <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, indexT,'dIorRC_change')">{{play[playType.rp]===undefined?'-':itemDetail.dIorRC != null ? formatOdds(itemDetail.dIorRC):'-'}}</span>
                              <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, indexT,'dIorRC_change')">{{play[playType.rp]===undefined?'-':itemDetail.dIorRC!=null?itemDetail.dIorRC:'-'}}</span>
                              <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, indexT,'dIorRC_change')"></span>
                            </div>
                            <!--<div class="all-style"><span></span><span>{{itemDetail.a_capot_h}}</span></div>-->
                            </template>
                          </div>
                          <!-- 全场大小-->
                          <div class="all-size">
                            <div class="all-style" @click="betDialogHandler(item,betData.host,betData.betType.football.qcdx,'dxqd')"><span>{{itemDetail.a_dq_num}}</span><span>-</span></div>
                            <div class="all-style" @click="betDialogHandler(item,!betData.host,betData.betType.football.qcdx,'dxqx')"><span>{{itemDetail.a_xq_num}}</span><span>-</span></div>
                            <!-- <div class="all-style"><span>{{itemDetail.a_capot_h}}</span><span>{{itemDetail.a_capot_h}}</span></div>-->
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              </transition>
            </div>
          </div>
          <!-- 玩法维护 -->
          <div v-else-if="items != undefined && maintanceCode==='D000'">
            <playmantiance></playmantiance>
          </div>
          <div v-else>
            <question-page></question-page>
          </div>
        </div>
    </div>

    <!--交易单弹窗-->

  </div>
</template>


<script src="../../js/balls/tennisBall.js"></script>

<style scoped lang="scss">
  @import '../../scss/balls/allBallStyle';
</style>
