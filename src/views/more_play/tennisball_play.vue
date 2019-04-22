/**
* 网球玩法
*/
<template>
  <div class="more-play">
    <div class="play-top"><span  name="team"  class="playerNum">{{morePlayDetail.leagueName}}</span></div>
    <!--网球场-->
    <div class="football-field">
      <!--网球场-->
      <img class="football-img" :src="images_tennisball" alt="">
      <!--网球场-->
      <div class="tennis-info">
        <ul>
          <li class="list-info first">
            <!--<div class="no-title">10月22日 星期一  08:20</div>-->
            <div class="title">{{morePlayDetail.title}}</div>
            <div class="title-info"><span >盘</span><span class="center">局</span><span>分</span></div>
          </li>
          <li class="list-info two">
            <div class="names">{{morePlayDetail.hteam}}</div>  <!--name="team"-->
            <div><span class="color-number">{{morePlayDetail.scoreGameH!==undefined ? morePlayDetail.scoreGameH:'-'}}</span><span class="center-number color-number">{{morePlayDetail.scoreSetH!==undefined ? morePlayDetail.scoreSetH:'-'}}</span><span class="score">{{morePlayDetail.hscore==undefined ? '-':morePlayDetail.hscore == -1?'A':morePlayDetail.hscore}}</span></div>
          </li>
          <li class="list-info two">
            <div class="names">{{morePlayDetail.gteam}}</div>  <!--name="team"-->
            <div><span class="color-number">{{morePlayDetail.scoreGameC!==undefined? morePlayDetail.scoreGameC:'-'}}</span><span class="center-number color-number">{{morePlayDetail.scoreSetC!==undefined?morePlayDetail.scoreSetC:'-'}}</span><span class="score">{{morePlayDetail.gscore==undefined?'-':morePlayDetail.gscore == -1 ? 'A':morePlayDetail.gscore}}</span></div>
          </li>
        </ul>
      </div>
    </div>

    <!--横向滚动-->
    <div class="sports-roll">
      <!--内容:style="{bottom: isMix == '1' && mixCount > 0 ? '0.49rem' : '0'}"-->
      <div v-if="data.length > 0" class="all-play" ref="outerWrapper">
          <div style="padding-bottom: 0.27rem">
              <div v-for="item in items">
              <!--网球独赢-->
                <div class="goal-size" v-show="(activeTab=='all' || activeTab=='capot') && playIsShow(item,'dy') && BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)">
                  <div class="concede-title" @click="switchBox(item[0].id+'dy')">
                    <span>独赢{{titleData(item[0].hteam,false)}}</span>
                    <div class="icon-box" :id="item[0].id+'dy'"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
                  </div>
                  <transition name="fade">
                    <div class="boxContent" v-if="showBox[item[0].id+'dy'].content">
                    <div class="concede-name">
                      <div>{{item[0].hteam}}</div>
                      <div>{{item[0].gteam}}</div>
                    </div>
                    <ul>
                      <li class="concede-item" v-if="i.dIorMH && i.dIorMC" v-for="(i,key) in item" :key="i.id+'dy'">
                        <div class="odd-even border" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.dy + '0']}"
                             @click="betDialogHandler(i,playType.host,playType.dy,'dyz',i.dIorMH)">
                          <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorMH_change')">{{formatOdds(i.dIorMH)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorMH_change')">{{formatOdds(i.dIorMH)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorMH_change')"></div>
                        </div>
                        <div class="odd-even" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.dy + '1']}"
                             @click="betDialogHandler(i,!playType.host,playType.dy,'dyk',i.dIorMC)">
                          <div  v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorMC_change')">{{formatOdds(i.dIorMC)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorMC_change')">{{formatOdds(i.dIorMC)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorMC_change')"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  </transition>
                </div>

              <!--网球让盘-->

                <div class="concede" v-show="(activeTab=='all' || activeTab=='concede_size') && playIsShow(item,'rp') && BallPlayIsShow.isqcrq && chargeMainAndImpr(playType.rp)">
                  <div class="concede-title"  @click="switchBox(item[0].id+'rp')">
                    <span>{{titleData(item[0].hteam,true)}}</span>
                    <div class="icon-box" :id="item[0].id+'rp'"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
                  </div>
                  <transition name="fade">
                    <div class="boxContent" v-if="showBox[item[0].id+'rp'].content">
                    <div class="concede-name">
                      <div>{{item[0].hteam}}</div>
                      <div>{{item[0].gteam}}</div>
                    </div>
                    <ul >
                      <li class="concede-item"  v-for="(i,key) in item" :key="i.id+'rp'" v-show="i.dIorRH && i.dIorRC">
                        <div class="concede-item-left" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.rp + (i.dStrong === 'H' ? '0' : '2')]}"
                             @click="betDialogHandler(i,playType.host,playType.rp,'rqz',i.dIorRH)">
                          <div :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.rp + (i.dStrong === 'H' ? '0' : '2')]}">{{concedeTagH(i.dStrong,i.dIorRH)}} {{i.dRatio}}</div>
                          <div  v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorRH_change')">{{formatOdds(i.dIorRH)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorRH_change')">{{formatOdds(i.dIorRH)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorRH_change')"></div>
                        </div>
                        <div class="concede-item-right" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.rp + (i.dStrong === 'H' ? '1' : '3')]}"
                             @click="betDialogHandler(i,!playType.host,playType.rp,'rqk',i.dIorRC)">
                          <div :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.rp + (i.dStrong === 'H' ? '1' : '3')]}">{{concedeTagC(i.dStrong,i.dIorRC)}}  {{i.dRatio}}</div>
                          <div  v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorRC_change')">{{formatOdds(i.dIorRC)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorRC_change')">{{formatOdds(i.dIorRC)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorRC_change')"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  </transition>
                </div>

              <!--网球总局数大小-->
                <!--进球/大小-->
                <div class="goal-size" v-show="(activeTab=='all' || activeTab=='goal_size') && BallPlayIsShow.isqcdx && playIsShow(item,'dx') && chargeMainAndImpr(playType.zjsdx)">
                  <div class="concede-title" @click="switchBox(item[0].id+'dx')">
                    <!--<span>大小{{titleData(item[0].hteam,true)}}</span>-->
                    <span>总局数:大/小-{{titleData(item[0].hteam,true)}}</span>
                    <div class="icon-box" :id="item[0].id+'dx'"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
                  </div>
                  <transition name="fade">
                    <div class="boxContent" v-if="showBox[item[0].id+'dx'].content">
                    <div class="concede-name">
                      <div>大</div>
                      <div>小</div>
                    </div>
                    <ul >
                      <li class="concede-item"  v-for="(i,key) in item" :key="i.id+'zjsdx'" v-if="i.dIorOUH && i.dIorOUC">
                        <div class="concede-item-left" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.zjsdx + '0']}"
                             @click="betDialogHandler(i,playType.host,playType.zjsdx,'dxz',i.dIorOUH)">
                          <div :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.zjsdx + '0']}">{{i.dRatioO}}</div>
                          <div  v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorOUH_change')">{{formatOdds(i.dIorOUH)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorOUH_change')">{{formatOdds(i.dIorOUH)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorOUH_change')"></div>
                        </div>
                        <div class="concede-item-right" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.zjsdx + '1']}"
                             @click="betDialogHandler(i,!playType.host,playType.zjsdx,'dxk',i.dIorOUC)">
                          <div :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.zjsdx + '1']}">{{i.dRatioU}}</div>
                          <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorOUC_change')">{{formatOdds(i.dIorOUC)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorOUC_change')">{{formatOdds(i.dIorOUC)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','dIorOUC_change')"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  </transition>
                </div>

              <!--网球球员局数大小-->
                <div class="goal-size"  v-show="(activeTab=='all' || activeTab=='total_size') && item[0].isMaster==='Y' && item[0].hteam===hteam && BallPlayIsShow.isqddfz && chargeMainAndImpr(playType.zfdx)">
                  <div class="concede-title"  @click="switchBox(item[0].id+'zfdxz')">
                    <span name="team" class="playerNum">球员局数:主队-大/小</span>
                    <div class="icon-box" :id="item[0].id+'zfdxz'"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
                  </div>
                  <transition name="fade">
                    <div class="boxContent" v-if="showBox[item[0].id+'zfdxz'].content">
                    <div class="concede-name">
                      <div>大</div>
                      <div>小</div>
                    </div>
                    <ul >
                      <li class="concede-item" :key="i.id+'zjsdx'" v-if="i.ior_OUHU&&i.ior_OUHO" v-for="i in item">
                        <div class="concede-item-left" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.zfdx + '0']}"
                             @click="betDialogHandler(i,playType.host,playType.zfdx,'qyjsdxzd',i.ior_OUHO)">
                          <div :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.zfdx + '0']}">{{i.ratio_ouho}}</div>
                          <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(i.id+'zfdx', '','ior_OUHO_change')">{{formatOdds(i.ior_OUHO)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(i.id+'zfdx', '','ior_OUHO_change')">{{formatOdds(i.ior_OUHO)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(i.id+'zfdx', '','ior_OUHO_change')"></div>
                        </div>
                        <div class="concede-item-right" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.zfdx + '1']}"
                             @click="betDialogHandler(i,playType.host,playType.zfdx,'qyjsdxzx',i.ior_OUHU)">
                          <div :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.zfdx + '1']}">{{i.ratio_ouhu}}</div>
                          <div v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(item[0].id+'zfdx', '','ior_OUHU_change')">{{formatOdds(i.ior_OUHU)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(item[0].id+'zfdx', '','ior_OUHU_change')">{{formatOdds(i.ior_OUHU)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(i.id+'zfdx', '','ior_OUHU_change')"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  </transition>
                </div>

              <!--网球球员局数大小-->

                <div class="goal-size" v-show="(activeTab=='all' || activeTab=='total_size') && item[0].isMaster==='Y' && item[0].hteam===hteam && BallPlayIsShow.isqddfk && chargeMainAndImpr(playType.zfdx)">
                  <div class="concede-title"  @click="switchBox(item[0].id+'zfdxk')">
                    <span name="team" class="playerNum">球员局数:客队-大/小</span>
                    <div class="icon-box" :id="item[0].id+'zfdxk'"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
                  </div>
                  <transition name="fade">
                    <div class="boxContent" v-if="showBox[item[0].id+'zfdxk'].content">
                    <div class="concede-name">
                      <div>大</div>
                      <div>小</div>
                    </div>
                    <ul >
                      <li class="concede-item"  :key="i.id+'zjsdx'" v-if="i.ior_OUCO && i.ior_OUCU" v-for="i in item">
                        <div class="concede-item-left" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.zfdx + '2']}"
                             @click="betDialogHandler(i,playType.host,playType.zfdx,'qyjsdxkd',i.ior_OUCO)">
                          <div :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.zfdx + '2']}">{{i.ratio_ouco}}</div>
                          <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(i.id+'zfdx', '','ior_OUCO_change')">{{formatOdds(i.ior_OUCO)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(i.id+'zfdx', '','ior_OUCO_change')" >{{formatOdds(i.ior_OUCO)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(i.id+'zfdx', '','ior_OUCO_change')"></div>
                        </div>
                        <div class="concede-item-right" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.zfdx + '3']}"
                             @click="betDialogHandler(i,playType.host,playType.zfdx,'qyjsdxkx',i.ior_OUCU)">
                          <div :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.zfdx + '3']}">{{i.ratio_oucu}}</div>
                          <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(i.id+'zfdx', '','ior_OUCU_change')">{{formatOdds(i.ior_OUCU)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(i.id+'zfdx', '','ior_OUCU_change')">{{formatOdds(i.ior_OUCU)}}</div>
                          <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(i.id+'zfdx', '','ior_OUCU_change')"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  </transition>
                </div>

            </div>
          </div>
      </div>

      <!--没有数据显示问题页面-->
      <div v-if="items.length == 0 ||((!BallPlayIsShow.isqddfk || !chargeMainAndImpr(playType.zfdx)) && (!BallPlayIsShow.isqddfz || !chargeMainAndImpr(playType.zfdx) )
      && (!BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.zjsdx)) && (!BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.rp)) &&
      (!BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy)))" >
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

<script src="../../js/play_balls/tennisball_play.js"></script>
<style scoped lang='scss'>
  @import "../../scss/play_balls/all_balls_play";
</style>
