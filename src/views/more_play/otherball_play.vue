/**
* 其他玩法
*/
<template>
  <div class="more-play">
    <div class="play-top"><span  name="team"  class="playerNum">{{morePlayDetail.leagueName}}</span></div>
    <!--其他场-->
    <div class="football-field">
      <!--其他场-->
      <img class="football-img" :src="images_otherball" alt="">
      <!--其他场-->
      <div class="other-info">
        <div  v-if="baseParam.dateType != '1'" class="time-title">{{formatTimes(morePlayDetail.startTime)}}</div>
        <div  v-if="baseParam.dateType === '1'" class="time-title"></div>
        <div class="name-info">
          <div name="team" class="names">{{morePlayDetail.hteam}}</div>

          <div class="center-left">{{morePlayDetail.hscore}}</div>

          <div class="center-vs">VS</div>

          <div class="center-right">{{morePlayDetail.gscore}}</div>

          <div name="team" class="names">{{morePlayDetail.gteam}}</div>
        </div>
      </div>
    </div>

    <!--横向滚动-->
    <div class="sports-roll">
      <!--内容:style="{bottom: isMix == '1' && mixCount > 0 ? '0.49rem' : '0'}"-->
      <div v-if="items.length > 0" class="all-play" ref="outerWrapper">
          <div style="padding-bottom: 0.27rem">
            <!--独赢-->
            <div :class="isShowMN ? 'capot-three': 'goal-size'" v-show="(activeTab == 'all' || activeTab == 'capot') && playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)">
              <div :class="items[0].dIorMN != undefined ? 'capot-title':'concede-title'" @click="switchBox('0')">
                <div class="title-font">独赢</div>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[0].content">
                  <div :class="isShowMN ? 'title-info':'concede-name'">
                    <div>{{hteam}}</div>
                    <div v-if="isShowMN">和局</div>
                    <div>{{gteam}}</div>
                  </div>
                  <ul>
                    <li :class="isShowMN ? 'content-list':'concede-item'" v-if="item.dIorMH || item.dIorMN || item.dIorMC" v-for="(item,key) in items" :key="item.id+'dy'">
                      <div :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '0'],'odd-even border':!isShowMN}"
                           @click="betDialogHandler(item,playType.host,playType.dy,'dy',item.dIorMH)">
                        <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, '','dIorMH_change')">{{formatOdds(item.dIorMH)}}</span>
                        <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, '','dIorMH_change')">{{formatOdds(item.dIorMH)}}</span>
                        <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, '','dIorMH_change')"></span>

                      </div>
                      <div :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '2']}"
                           @click="betDialogHandler(item,1,playType.dy,'dyh',item.dIorMN)"
                           v-if="isShowMN">
                        <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, '','dIorMN_change')">{{formatOdds(item.dIorMN)}}</span>
                        <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, '','dIorMN_change')">{{formatOdds(item.dIorMN)}}</span>
                        <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, '','dIorMN_change')"></span>
                      </div>
                      <div :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '1'],'odd-even':!isShowMN}"
                           @click="betDialogHandler(item,!playType.host,playType.dy,'dy',item.dIorMC)">
                        <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, '','dIorMC_change')">{{formatOdds(item.dIorMC)}}</span>
                        <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, '','dIorMC_change')">{{formatOdds(item.dIorMC)}}</span>
                        <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, '','dIorMC_change')"></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!--让球-->
            <div class="concede"  v-show="(activeTab == 'all' || activeTab == 'concede_size') && playType.BallPlayIsShow.isqcrq  && chargeMainAndImpr(playType.qcrq)">
              <div class="concede-title" @click="switchBox('1')">
                <span>让球</span>
                <div class="icon-box"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[1].content">
                  <div class="concede-name">
                    <div>{{hteam}}</div>
                    <div>{{gteam}}</div>
                  </div>
                  <ul>
                    <li class="concede-item" v-if="item.dIorRH || item.dIorRC"  v-for="(item,key) in items" :key="item.id+'rqbc'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.dStrong=='H' ? '0' : '2')]}"
                           @click="betDialogHandler(item,playType.host,playType.qcrq,'qcrq',item.dIorRH)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.dStrong=='H' ? '0' : '2')]}">{{concedeTagH(item.dStrong,item.dIorRH)}} {{item.dRatio}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorRH_change')">{{formatOdds(item.dIorRH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorRH_change')">{{formatOdds(item.dIorRH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorRH_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.dStrong=='H' ? '1' : '3')]}"
                           @click="betDialogHandler(item,!playType.host,playType.qcrq,'qcrq',item.dIorRC)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.dStrong=='H' ? '1' : '3')]}">{{concedeTagC(item.dStrong,item.dIorRC)}} {{item.dRatio}}</div>
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
            <div class="goal-size" v-show="(activeTab == 'all' || activeTab == 'goal_size') && playType.BallPlayIsShow.isqcdx && chargeMainAndImpr(playType.qcdx)">

              <div class="concede-title" @click="switchBox('2')">
                <span><!--进球:-->大/小</span>
                <div class="icon-box"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[2].content">
                  <div class="concede-name">
                    <div>大</div>
                    <div>小</div>
                  </div>
                  <ul>
                    <li class="concede-item" v-if="item.dIorOUH || item.dIorOUC" v-for="(item,key) in items" :key="item.id+'dx'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '0']}"
                           @click="betDialogHandler(item,playType.host,playType.qcdx,'dxz',item.dIorOUH)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '0']}">{{item.dRatioO}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorOUH_change')">{{formatOdds(item.dIorOUH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorOUH_change')">{{formatOdds(item.dIorOUH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorOUH_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '1']}"
                           @click="betDialogHandler(item,!playType.host,playType.qcdx,'dxk',item.dIorOUC)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '1']}">{{item.dRatioU}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorOUH_change')">{{formatOdds(item.dIorOUC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorOUH_change')">{{formatOdds(item.dIorOUC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorOUH_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>


            <!--进球/单双-->
            <div class="goal-size" v-show="(activeTab == 'all' || activeTab == 'total_size') && playType.BallPlayIsShow.isds && chargeMainAndImpr(playType.ds)">
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
                    <li class="concede-item" v-if="item.dIorEOO || item.dIorEOE " v-for="(item,key) in items" :key="item.id+'dx'">
                      <div class="odd-even border" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.ds + '1']}"
                           @click="betDialogHandler(item,!playType.host,playType.ds,'ds',item.dIorEOO)">
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorEOO_change')">{{formatOdds(item.dIorEOO)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorEOO_change')">{{formatOdds(item.dIorEOO)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorEOO_change')"></div>
                      </div>
                      <div class="odd-even" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.ds + '0']}"
                           @click="betDialogHandler(item,playType.host,playType.ds,'ds',item.dIorEOE)">
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorEOE_change')">{{formatOdds(item.dIorEOE)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorEOE_change')">{{formatOdds(item.dIorEOE)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorEOE_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

          </div>
      </div>
      <!--没有数据显示问题页面-->
      <div v-if="items.length == 0 ||((!playType.BallPlayIsShow.isds || !chargeMainAndImpr(playType.dy)) && (!playType.BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy))
      && (!playType.BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.qcdx)) && (!playType.BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.qcrq)))" >
        <nodata-Page></nodata-Page>
      </div>

      <!--交易单弹窗-->

    </div>

    <!--综合过关底部-->
    <div class="reach-footer" v-show="isMix == '1' && mixCount > 0">
      <div class="footer-content" @click="showMixBet()">
        <span class="content-font">综合过关-投注单</span>
        <div class="yuan"><span class="yuan-num">{{mixCount}}</span></div>
      </div>
    </div>

  </div>
</template>

<script src="../../js/play_balls/otherball_play.js"></script>
<style scoped lang='scss'>
  @import "../../scss/play_balls/all_balls_play";
</style>
