/**
* 篮球
*/
<template>
  <div class="allBallStyle">
    <!--综合过关底部-->
    <div class="reach-footer" v-show="isMix == '1' && mixCount > 0">
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
        <span name="team" class="name-font">{{nav_label}}({{ballName}})</span>
      </div>
      <div class="info-detail">
        <div class="info-box">
          <div>独赢</div>
          <div>让球</div>
          <div>大小</div>
        </div>
      </div>
    </div>

    <div ref="outerWrapper" class="list-box" :style="{background: items!=undefined && items!='' && !items.playMaintenance ? '' : '#ffffff',top: nav_label == '滚球' ? '1.54rem' : '2.1rem'}" >
      <!--赛事详情-->
        <div class="scroller-box">
          <div v-if="items!=undefined && items!='' && maintanceCode!=='D000'"  >
            <div class="ball-detail-list"  v-for="(item,key,index) in items" :key="key">
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
                  <div class="ball-detaill"  v-for="(itemDetail,indexT) in item" :key="indexT+'bb'+itemDetail.id">
                    <!--内容-->
                      <div class="item-info">
                        <!--左-->
                        <div @click="morePlay(itemDetail)" class="content-left">
                          <div class="content-left-first">
                            <div>
                              <span class="first-name-top">{{itemDetail.hteam}}</span>
                            </div>
                            <div class="score">
                              <span class="card">
                                <!--<span class="red-card">1</span>
                                <span class="yellow-card">2</span>-->
                              </span>
                              <span v-show="dateType === '1'" class="first-score">{{itemDetail.hscore}}</span>
                            </div>
                          </div>
                          <div class="content-left-two">
                            <div>
                              <span class="first-name-top">{{itemDetail.gteam}}</span>
                            </div>
                            <div class="score">
                              <span class="card">
                                <!--<span class="red-card">1</span>
                                <span class="yellow-card">2</span>-->
                              </span>
                              <span v-show="dateType === '1'" class="first-score">{{itemDetail.gscore}}</span>
                            </div>
                          </div>
                          <div class="content-left-three">
                            <div v-if="itemDetail.isLive === '1'" class="iconfont icon-gunqiu icon-style"></div>
                            <div v-if="dateType === '1'">{{
                              itemDetail.liveTime == 'Q1'?'第一节':
                              itemDetail.liveTime == 'Q2'?'第二节':
                              itemDetail.liveTime == 'Q3'?'第三节':
                              itemDetail.liveTime == 'Q4'?'第四节':
                              itemDetail.liveTime == 'HT'?'半场':
                              itemDetail.liveTime == 'H1'?'上半场':
                              itemDetail.liveTime == 'H2' ? '下半场' : '加时'
                              }} {{ itemDetail.liveTime == 'HT'?'':itemDetail.lastTime}}</div>
                            <div v-if="dateType != '1'">{{forMatDate(itemDetail.startTime)}}</div>
                            <div class="more_Num">+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                          </div>
                        </div>
                        <!--中-->
                        <div class="content-center">
                          <div class="content-detail" >
                            <!-- 独赢-->
                            <div class="all-alone-win">
                              <!--v-if="play[playType.dy]!=undefined"-->
                              <template >
                              <div class="all-style" :class="{'checkedMix': checkedMatches[itemDetail.onlykey + itemDetail.matchesDetailId + playType.dy + '0']}"
                                   @click="betDialogHandler(itemDetail,playType.host,playType.dy,'dyz',itemDetail.capot_h)">
                                <span>主</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, indexT,'capot_h_change')">{{play[playType.dy]===undefined?'-':itemDetail.capot_h!=null?formatOdds(itemDetail.capot_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, indexT,'capot_h_change')">{{play[playType.dy]===undefined?'-':itemDetail.capot_h!=null?formatOdds(itemDetail.capot_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, indexT,'capot_h_change')"></span>
                              </div>
                              <div class="all-style" :class="{'checkedMix': checkedMatches[itemDetail.onlykey + itemDetail.matchesDetailId + playType.dy + '1']}"
                                   @click="betDialogHandler(itemDetail,!playType.host,playType.dy,'dyk',itemDetail.capot_g)">
                                <span>客</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, indexT,'capot_g_change')">{{play[playType.dy]===undefined?'-':itemDetail.capot_g!=null?formatOdds(itemDetail.capot_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, indexT,'capot_g_change')">{{play[playType.dy]===undefined?'-':itemDetail.capot_g!=null?formatOdds(itemDetail.capot_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, indexT,'capot_g_change')"></span>
                              </div>
                              </template>
                            </div>
                            <!-- 全场让球-->
                            <div class="all-let-the-ball">
                              <!--v-if="play[playType.rf]!=undefined"-->
                              <template >
                              <div class="all-style" :class="{'checkedMix': checkedMatches[itemDetail.onlykey + itemDetail.matchesDetailId + playType.rf + (itemDetail.concede ? '0' : '2')]}"
                                   @click="betDialogHandler(itemDetail,playType.host,playType.rf,'zr',itemDetail.concede_h)">
                                <span :class="[itemDetail.concede? 'showitems' : 'hideitems']">{{play[playType.rf]===undefined?' ':itemDetail.concede_num}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, indexT,'concede_h_change')">{{play[playType.rf]===undefined?'-':itemDetail.concede_h!=null?formatOdds(itemDetail.concede_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, indexT,'concede_h_change')">{{play[playType.rf]===undefined?'-':itemDetail.concede_h!=null?formatOdds(itemDetail.concede_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, indexT,'concede_h_change')"></span>
                              </div>
                              <div class="all-style" :class="{'checkedMix': checkedMatches[itemDetail.onlykey + itemDetail.matchesDetailId + playType.rf + (itemDetail.concede ? '1' : '3')]}"
                                   @click="betDialogHandler(itemDetail,!playType.host,playType.rf,'kr',itemDetail.concede_g)">
                                <span :class="[!itemDetail.concede? 'showitems' : 'hideitems']">{{play[playType.rf]===undefined?' ':itemDetail.concede_num}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, indexT,'concede_g_change')">{{play[playType.rf]===undefined?'-':itemDetail.concede_g!=null?formatOdds(itemDetail.concede_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, indexT,'concede_g_change')">{{play[playType.rf]===undefined?'-':itemDetail.concede_g!=null?formatOdds(itemDetail.concede_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, indexT,'concede_g_change')"></span>

                              </div>
                                </template>
                            </div>
                            <!-- 全场大小-->
                            <div class="all-size">
                              <!--v-if="play[playType.zfdx]!=undefined"-->
                              <template >
                              <div class="all-style" :class="{'checkedMix': checkedMatches[itemDetail.onlykey + itemDetail.matchesDetailId + playType.zfdx + '0']}"
                                   @click="betDialogHandler(itemDetail,playType.host,playType.zfdx,'dxz',itemDetail.d_num)">
                                <span>{{play[playType.zfdx]===undefined?' ':itemDetail.dq_num}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, indexT,'d_num_change')">{{play[playType.zfdx]===undefined?'-':itemDetail.d_num!=null?formatOdds(itemDetail.d_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, indexT,'d_num_change')">{{play[playType.zfdx]===undefined?'-':itemDetail.d_num!=null?formatOdds(itemDetail.d_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, indexT,'d_num_change')"></span>
                              </div>

                              <div class="all-style" :class="{'checkedMix': checkedMatches[itemDetail.onlykey + itemDetail.matchesDetailId + playType.zfdx + '1']}"
                                   @click="betDialogHandler(itemDetail,!playType.host,playType.zfdx,'dxk',itemDetail.x_num)">
                                <span></span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, indexT,'x_num_change')">{{play[playType.zfdx]===undefined?'-':itemDetail.x_num!=null?formatOdds(itemDetail.x_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, indexT,'x_num_change')">{{play[playType.zfdx]===undefined?'-':itemDetail.x_num!=null?formatOdds(itemDetail.x_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, indexT,'x_num_change')"></span>
                            </div>
                              </template>
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


<script src="../../js/balls/basketBall.js"></script>

<style scoped lang="scss">
  @import '../../scss/balls/allBallStyle';
</style>
