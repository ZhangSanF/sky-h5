/**
* 棒球玩法
*/
<template>
  <div class="more-play">
    <!--top-->
    <div class="play-top"><span  name="team"  class="playerNum">{{morePlayDetail.leagueName}}</span></div>

    <!--棒球场-->
    <div class="football-field">
      <!--棒球场-->
      <img class="football-img" :src="images_baseball" alt="">
      <!--棒球场-->
      <div class="baseball-info" :style="{height : false ? '1.41rem' : '1.12rem'}">
        <div class="title">
          <div class="title-left" v-if="dateType == '1'"></div>
          <div class="title-left" v-if="dateType != '1'">{{formatTimes(morePlayDetail.startTime)}}</div>
          <div class="title-right"><span>分</span></div>
        </div>
        <div class="title-content">
          <div class="names">{{morePlayDetail.hteam}}</div>  <!--name="team"-->
          <div class="names-number" v-if="items.length > 0"><span>{{morePlayDetail.hscore!=undefined ? morePlayDetail.hscore:'-'}}</span></div>
        </div>
        <div class="title-content" style="border-bottom: none">
          <div class="names">{{morePlayDetail.gteam}}</div>  <!--name="team"-->
          <div class="names-number" v-if="items.length > 0"><span>{{morePlayDetail.gscore!=undefined ? morePlayDetail.gscore:'-'}}</span></div>
        </div>
        <!--<div class="footer" v-if="dateType != '1'">-->
          <!--<div class="times">20-25  18-25</div>-->
          <!--<div class="times-number" ><span>分:</span><span>55-62(117)</span></div>-->
        <!--</div>-->
      </div>

    </div>

    <!--横向滚动-->
    <div class="sports-roll">
      <!--内容:style="{bottom: isMix == '1' && mixCount > 0 ? '0.49rem' : '0'}"-->
      <div  v-if="items.length > 0" class="all-play" ref="outerWrapper">
          <div style="padding-bottom: 0.27rem" v-for="(item,key) in items" :key="'base'+item.id">
            <!--独赢-->
            <div class="goal-size" v-show="(activeTab=='all' || activeTab=='capot') && playType.BallPlayIsShow.isdy && item.dIorMH && item.dIorMC && chargeMainAndImpr(playType.dy)">
              <div class="concede-title" @click="switchBox('0')">
                <span>独赢</span>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[0].content">
                  <div class="concede-name">
                    <div>{{hteam}}</div>
                    <!--<div>和局</div>-->
                    <div>{{gteam}}</div>
                  </div>
                  <ul>
                    <li class="concede-item" :key="item.id+'dy'">
                      <div class="odd-even border" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '0']}"
                           @click="betDialogHandler(item,betData.host,playType.dy,'dyz',item.dIorMH)">
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorMH_change')">{{formatOdds(item.dIorMH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorMH_change')">{{formatOdds(item.dIorMH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorMH_change')"></div>
                      </div>
                      <!--<div class="concede-item-left"  @click="betDialogHandler(item,1,playType.dy,'dyh')">-->
                        <!--<div>{{formatOdds(item.dIorMN)}}</div>-->
                      <!--</div>-->
                      <div class="odd-even" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '1']}"
                           @click="betDialogHandler(item,!betData.host,playType.dy,'dyk',item.dIorMC)">
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorMC_change')">{{formatOdds(item.dIorMC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorMC_change')">{{formatOdds(item.dIorMC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorMC_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!--让球-->
            <div class="concede" v-show="(activeTab=='all' || activeTab=='concede_size') && playType.BallPlayIsShow.isqcrq && item.dIorRH && item.dIorRC && chargeMainAndImpr(playType.qcrq)">
              <div class="concede-title" @click="switchBox('1')">
                <span>让球</span>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[1].content">
                  <div class="concede-name">
                    <div>{{hteam}}</div>
                    <div>{{gteam}}</div>
                  </div>
                  <ul>
                    <li class="concede-item"  :key="item.id+'rqbc'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.dStrong === 'H' ? '0' : '2')]}"
                           @click="betDialogHandler(item,betData.host,playType.qcrq,'sbzr',item.dIorRH)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.dStrong === 'H' ? '0' : '2')]}">{{concedeTagH(item.dStrong,item.dIorRH)}} {{item.dRatio}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorRH_change')">{{formatOdds(item.dIorRH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorRH_change')">{{formatOdds(item.dIorRH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorRH_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.dStrong === 'H' ? '1' : '3')]}"
                           @click="betDialogHandler(item,!betData.host,playType.qcrq,'sbkr',item.dIorRC)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.dStrong === 'H' ? '1' : '3')]}">{{concedeTagC(item.dStrong,item.dIorRC)}} {{item.dRatio}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorRC_change')">{{formatOdds(item.dIorRC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorRC_change')">{{formatOdds(item.dIorRC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorRC_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!--进球/大小-->
            <div class="goal-size" v-show="(activeTab=='all' || activeTab=='goal_size') && playType.BallPlayIsShow.isqcdx && item.dIorOUH && item.dIorOUC && chargeMainAndImpr(playType.qcdx)">
              <div class="concede-title" @click="switchBox('2')">
                <span>进球:大/小</span>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[2].content">
                  <div class="concede-name">
                    <div>大</div>
                    <div>小</div>
                  </div>
                  <ul>
                    <li class="concede-item" :key="item.id+'dx'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '0']}"
                           @click="betDialogHandler(item,betData.host,playType.qcdx,'dxz',item.dIorOUH)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '0']}">{{item.dRatioO}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorOUH_change')">{{formatOdds(item.dIorOUH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorOUH_change')">{{formatOdds(item.dIorOUH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorOUH_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '1']}"
                           @click="betDialogHandler(item,!betData.host,playType.qcdx,'dxk',item.dIorOUC)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '1']}">{{item.dRatioU}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorOUC_change')">{{formatOdds(item.dIorOUC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorOUC_change')">{{formatOdds(item.dIorOUC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorOUC_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!--单双-->
            <div class="goal-size" v-show="(activeTab=='all' || activeTab=='single_pair') && playType.BallPlayIsShow.isds && item.dIorEOO && item.dIorEOE && chargeMainAndImpr(playType.ds)">
              <div class="concede-title" @click="switchBox('3')">
                <span>单双</span>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[3].content">
                  <div class="concede-name">
                    <div>单</div>
                    <div>双</div>
                  </div>
                  <ul>
                    <li class="concede-item"  :key="item.id+'ds'">
                      <div class="odd-even border" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.ds + '1']}"
                           @click="betDialogHandler(item,!betData.host,playType.ds,'dsz',item.dIorEOO)">
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorEOO_change')">{{formatOdds(item.dIorEOO)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorEOO_change')">{{formatOdds(item.dIorEOO)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorEOO_change')"></div>
                      </div>
                      <div class="odd-even"  :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.ds + '0']}"
                           @click="betDialogHandler(item,betData.host,playType.ds,'dsk',item.dIorEOE)">
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorEOE_change')">{{formatOdds(item.dIorEOE)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorEOE_change')">{{formatOdds(item.dIorEOE)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorEOE_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!--首5局让球-->
            <div class="concede" v-show="(activeTab=='all' || activeTab=='concede_firstFive') && playType.BallPlayIsShow.isbcrq && item.ior_HRH && item.ior_HRC && chargeMainAndImpr(playType.bcrq)">
              <div class="concede-title" @click="switchBox('5')">
                <span>让球-首5局</span>
                <div class="icon-box" ref="iconBox1"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[5].content">
                  <div class="concede-name">
                    <div>{{hteam}}</div>
                    <div>{{gteam}}</div>
                  </div>
                  <ul>
                    <li class="concede-item"  :key="item.id+'rqsbc'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcrq + (item.hstrong === 'H' ? '0' : '2')]}"
                           @click="betDialogHandler(item,betData.host,playType.bcrq,'sbzr',item.ior_HRH)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcrq + (item.hstrong === 'H' ? '0' : '2')]}">{{concedeTagH(item.dStrong,item.ior_HRH)}} {{item.hratio}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_HRH_change')">{{formatOdds(item.ior_HRH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_HRH_change')">{{formatOdds(item.ior_HRH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_HRH_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcrq + (item.hstrong === 'H' ? '1' : '3')]}"
                           @click="betDialogHandler(item,!betData.host,playType.bcrq,'sbkr',item.ior_HRC)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcrq + (item.hstrong === 'H' ? '1' : '3')]}">{{concedeTagC(item.dStrong,item.ior_HRC)}} {{item.hratio}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_HRC_change')">{{formatOdds(item.ior_HRC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_HRC_change')">{{formatOdds(item.ior_HRC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_HRC_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!--进球/大小-上半场-->
            <div class="goal-size" v-show="(activeTab=='all' || activeTab=='size_firstFive') && playType.BallPlayIsShow.isbcdx && item.ior_HOUH && item.ior_HOUC && chargeMainAndImpr(playType.bcdx)">
              <div class="concede-title" @click="switchBox('6')">
                <span>进球:大/小-首5局</span>
                <div class="icon-box" ref="iconBox3"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[6].content">
                  <div class="concede-name">
                    <div>大</div>
                    <div>小</div>
                  </div>
                  <ul>
                    <li class="concede-item" :key="item.id+'dxsbc'">
                      <div class="concede-item-left"  :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdx + '0']}"
                           @click="betDialogHandler(item,betData.host,playType.bcdx,'dxz',item.ior_HOUH)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdx + '0']}">{{item.hratio_o}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_HOUH_change')">{{formatOdds(item.ior_HOUH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_HOUH_change')">{{formatOdds(item.ior_HOUH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_HOUH_change')"></div>
                      </div>
                      <div class="concede-item-right"  :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdx + '1']}"
                           @click="betDialogHandler(item,!betData.host,playType.bcdx,'dxk',item.ior_HOUC)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdx + '1']}">{{item.hratio_u}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_HOUC_change')">{{formatOdds(item.ior_HOUC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_HOUC_change')">{{formatOdds(item.ior_HOUC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_HOUC_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!--独赢-上半场-->
            <div class="capot-three" v-show="(activeTab=='all' || activeTab=='capot_firstFive') && playType.BallPlayIsShow.isbcdy && item.ior_HMH && item.ior_HMC && chargeMainAndImpr(playType.zkh)">
              <div class="capot-title" @click="switchBox('4')">
                <span>独赢-首5局</span>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[4].content">
                  <div class="title-info">
                    <div>{{hteam}}</div>
                    <div>和局</div>
                    <div>{{gteam}}</div>
                  </div>
                  <ul>
                    <li class="content-list"  :key="item.id+'dysbc'">
                      <div class="concede-item-left" @click="betDialogHandler(item,betData.host,playType.bcdy,'sbdyz',item.ior_HMH)">
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_HMH_change')">{{formatOdds(item.ior_HMH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_HMH_change')">{{formatOdds(item.ior_HMH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_HMH_change')"></div>
                      </div>
                      <div class="concede-item-left" @click="betDialogHandler(item,1,playType.bcdy,'sbdyh',item.ior_HMN)">
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_HMN_change')">{{formatOdds(item.ior_HMN)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_HMN_change')">{{formatOdds(item.ior_HMN)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_HMN_change')"></div>
                      </div>
                      <div class="concede-item-right" @click="betDialogHandler(item,!betData.host,playType.bcdy,'sbdyk',item.ior_HMC)">
                        <div v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','ior_HMC_change')">{{formatOdds(item.ior_HMC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_HMC_change')">{{formatOdds(item.ior_HMC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_HMC_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

          </div>
      </div>
      <!--没有数据显示问题页面-->
      <div v-if="items.length == 0 || ((!playType.BallPlayIsShow.isbcdx || !chargeMainAndImpr(playType.bcdx)) && (!BallPlayIsShow.isbcrq || !chargeMainAndImpr(playType.bcrq))
        && (!playType.BallPlayIsShow.isbcdy || !chargeMainAndImpr(playType.zkh))  && (!playType.BallPlayIsShow.isds || !chargeMainAndImpr(playType.ds))
        && (!playType.BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.qcdx)) && (!playType.BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.qcrq))
        && (!playType.BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy)))" >
        <nodata-Page></nodata-Page>
      </div>
      <!--交易单弹窗-->

    </div>

    <!--综合过关底部-->
    <div class="reach-footer" v-show="isMix == '1' && mixCount > 0" @click="showMixBet()">
      <div class="footer-content">
        <span class="content-font">综合过关-投注单</span>
        <div class="yuan"><span class="yuan-num">{{mixCount}}</span></div>
      </div>
    </div>

  </div>
</template>

<script src="../../js/play_balls/baseball_play.js"></script>
<style scoped lang='scss'>
  @import "../../scss/play_balls/all_balls_play";
</style>
