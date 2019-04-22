/**
* 排球玩法
*/
<template>
  <div class="more-play">
    <div class="play-top"><span  name="team" class="playerNum">{{morePlayDetail.leagueName}}</span></div>
    <!--排球场-->
    <div class="football-field" >
      <!--排球场-->
      <img class="football-img" :src="images_volleyball" alt="">
      <!--排球场-->
      <div class="baseball-info" :style="{height : '1.41rem'}">
        <div class="title">
          <div class="title-left" v-if="dateType == '1'">{{morePlayDetail.liveStep}}</div>
          <div class="title-left" v-if="dateType != '1'">{{formatTimes(morePlayDetail.startTime)}}</div>
          <div class="title-right"><span>局</span><span>分</span></div>

        </div>
        <div class="title-content">
          <div class="names">{{morePlayDetail.hteam}}</div>  <!--name="team"-->
          <div class="names-number" v-if="data.length > 0"><span>{{morePlayDetail.scoreSetH!==morePlayDetail.undefined ?morePlayDetail.scoreSetH:'-'}}</span> <span>{{morePlayDetail.hscore!==undefined ? morePlayDetail.hscore:'-'}}</span> </div>
        </div>
        <div class="title-content-g">
          <div class="names">{{morePlayDetail.gteam}}</div>  <!--name="team"-->
          <div class="names-number" v-if="data.length > 0"><span>{{morePlayDetail.scoreSetC!==undefined?morePlayDetail.scoreSetC:'-'}}</span> <span>{{morePlayDetail.gscore!==undefined?morePlayDetail.gscore:'-'}}</span></div>
        </div>
<!--        <div class="footer">
        <div class="times">{{forMatDate(startTime)}}</div>
        &lt;!&ndash;<div class="times-number" v-if="dateType == '1'" ><span>分:</span><span>55-62(117)</span></div>&ndash;&gt;
        </div>-->
      </div>

    </div>

    <!--横向滚动-->
    <div class="sports-roll">
      <!--内容:style="{bottom: baseParam.isMix == '1' && mixCount > 0 ? '0.49rem' : '0'}"-->
      <div v-if="data.length > 0" class="all-play" ref="outerWrapper">
        <div style="padding-bottom: 0.27rem">
          <div  v-for="item in  items">
          <!--独赢-->
          <div class="concede"
               v-show="(activeTab == 'all' || activeTab == 'capot')&& item[0].dIorMH && item[0].dIorMC && playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)">
            <div class="concede-title" @click="switchBox(item[0].id+'dy')">
              <span>独赢{{title(item[0].hteam,false)}}</span>
              <div class="icon-box" :id="item[0].id+'dy'"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[item[0].id+'dy'].content">
                <div class="concede-name">
                  <div>{{item[0].hteam}}</div>
                  <div>{{item[0].gteam}}</div>
                </div>
                <ul>
                  <li v-if="item[0].dIorMH && item[0].dIorMC" class="concede-item"  v-for="(i,key) in item" :key="i.id+'dy'">
                      <div class="concede-item-left"  :class="{'checkedMix': checkedMatches[i.onlykey+ i.matchesDetailId + playType.dy + '0']}"
                           @click="betDialogHandler(i,playType.host,playType.dy,'dyz',i.dIorMH)">
                        <span v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','dIorMH_change')">{{formatOdds(i.dIorMH)}}</span>
                        <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorMH_change')">{{formatOdds(i.dIorMH)}}</span>
                        <span v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','dIorMH_change')"></span>
                      </div>
                      <div class="concede-item-right"  :class="{'checkedMix': checkedMatches[i.onlykey +i.matchesDetailId + playType.dy + '1']}"
                           @click="betDialogHandler(i,!playType.host,playType.dy,'dyk',i.dIorMC)">
                        <span v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','dIorMC_change')">{{formatOdds(i.dIorMC)}}</span>
                        <span v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorMC_change')">{{formatOdds(i.dIorMC)}}</span>
                        <span v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','dIorMC_change')"></span>
                      </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!--全场让局-->
          <div class="concede"
               v-show="(activeTab == 'all' || activeTab == 'let_score') && item[0].dIorRH && item[0].dIorRC && playType.BallPlayIsShow.isqcrq && chargeMainAndImpr(playType.rf)">
            <div class="concede-title" @click="switchBox(item[0].id+'rj')">
              <span>{{title(item[0].hteam,true)}}</span>
              <div class="icon-box" :id="item[0].id+'rj'"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[item[0].id+'rj'].content">
                <div class="concede-name">
                  <div>{{item[0].hteam}}</div>
                  <div>{{item[0].gteam}}</div>
                </div>
                <ul>
                  <li v-if="item[0].dIorRH && item[0].dIorRC" class="concede-item"  v-for="(i,key) in item" :key="i.id+'rf'">
                      <div class="concede-item-left"
                        :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId +  playType.rf + (i.dStrong === 'H' ? '0' : '2')]}"
                        @click="betDialogHandler(i,playType.host,playType.rf,'zr',i.dIorRH)">
                        <div  :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId +  playType.rf + (i.dStrong === 'H' ? '0' : '2')]}">{{concedeTagH(i.dStrong,i.dIorRH)}} {{i.dRatio}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','dIorRH_change')">{{formatOdds(i.dIorRH)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorRH_change')">{{formatOdds(i.dIorRH)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','dIorRH_change')"></div>
                      </div>
                      <div class="concede-item-right"
                        :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.rf + (i.dStrong === 'H' ? '1' : '3')]}"
                        @click="betDialogHandler(i,!playType.host,playType.rf,'kr',i.dIorRC)">
                        <div  :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.rf + (i.dStrong === 'H' ? '1' : '3')]}">{{concedeTagC(i.dStrong,item.dIorRH)}} {{i.dRatio}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','dIorRC_change')">{{formatOdds(i.dIorRC)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeClass(key, '','dIorRC_change')">{{formatOdds(i.dIorRH)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','dIorRC_change')"></div>
                      </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!--总分大小-->
          <div class="concede"
               v-show="(activeTab == 'all' || activeTab == 'total_size') && item[0].dIorOUH && item[0].dIorOUC && playType.BallPlayIsShow.isqcdx && chargeMainAndImpr(playType.zfdx)">
            <div class="concede-title" @click="switchBox(item[0].id+'dx')">
              <span>总分:大小{{title(item[0].hteam,false)}}</span>
              <div class="icon-box" :id="item[0].id+'dx'"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[item[0].id+'dx'].content">
                <div class="concede-name">
                  <div>大</div>
                  <div>小</div>
                </div>
                <ul>
                  <li v-if="item[0].dIorOUH && item[0].dIorOUC" class="concede-item"  v-for="(i,key) in item" :key="item[0].id+'zfdx'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[i.onlykey+ i.matchesDetailId + playType.zfdx + '0']}"
                            @click="betDialogHandler(i,playType.host,playType.zfdx,'zfdxzd',i.dIorOUH)">
                        <div :class="{'checkedMixPlant': checkedMatches[i.onlykey+ i.matchesDetailId + playType.zfdx + '0']}">{{i.dRatioO}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','dIorOUH_change')">{{formatOdds(i.dIorOUH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorOUH_change')">{{formatOdds(i.dIorOUH)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','dIorOUH_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.zfdx + '1']}"
                           @click="betDialogHandler(i,!playType.host,playType.zfdx,'zfdxzx',i.dIorOUC)">
                        <div :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.zfdx + '1']}">{{i.dRatioU}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','dIorOUC_change')">{{formatOdds(i.dIorOUC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','dIorOUC_change')">{{formatOdds(i.dIorOUC)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','dIorOUC_change')"></div>
                      </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!--球队得分-->
          <div class="concede"
               v-show="(activeTab == 'all' || activeTab == 'homeTeamScore') && item[0].ior_OUHO && item[0].ior_OUHU && playType.BallPlayIsShow.isqddfz && chargeMainAndImpr(playType.dfdx)">
            <div class="concede-title" @click="switchBox(item[0].id+'qddfdxz')">
              <span>球队得分:主队-大/小{{title(item[0].hteam,false)}}</span>
              <div class="icon-box" :id="item[0].id+'qddfdxz'"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[item[0].id+'qddfdxz'].content">
                <div class="concede-name">
                  <div>大</div>
                  <div>小</div>
                </div>
                <ul>
                  <li v-if="item[0].ior_OUHO && item[0].ior_OUHU" class="concede-item" v-for="(i,key) in item" :key="i.id+'dfdx'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[i.onlykey+i.matchesDetailId + playType.dfdx + '0']}"
                            @click="betDialogHandler(i,playType.host,playType.dfdx,'zfdxzd',i.ior_OUHO)">
                        <div class="list-left" :class="{'checkedMixPlant': checkedMatches[i.onlykey+i.matchesDetailId + playType.dfdx + '0']}">{{i.ratio_ouho}}</div>
                        <div class="list-right" v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','ior_OUHO_change')">{{formatOdds(i.ior_OUHO)}}</div>
                        <div class="list-right" v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_OUHO_change')">{{formatOdds(i.ior_OUHO)}}</div>
                        <div class="list-right" v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','ior_OUHO_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[i.onlykey+ i.matchesDetailId +  playType.dfdx + '1']}"
                            @click="betDialogHandler(i,!playType.host,playType.dfdx,'zfdxzx',i.ior_OUHU)">
                        <div class="list-left" :class="{'checkedMixPlant': checkedMatches[i.onlykey+ i.matchesDetailId +  playType.dfdx + '1']}">{{i.ratio_ouhu}}</div>
                        <div class="list-right" v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_OUHU_change')">{{formatOdds(i.ior_OUHU)}}</div>
                        <div class="list-right" v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_OUHU_change')">{{formatOdds(i.ior_OUHU)}}</div>
                        <div class="list-right" v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_OUHU_change')"></div>
                      </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

            <!--球队得分-->
          <div class="concede"
               v-show="(activeTab == 'all' || activeTab == 'visitTeamScore') && item[0].ior_OUCO && item[0].ior_OUCU && playType.BallPlayIsShow.isqddfz && chargeMainAndImpr(playType.dfdx)">
            <div class="concede-title" @click="switchBox(item[0].id+'qddfdxk')">
              <span>球队得分:客队-大/小{{title(item[0].gteam,false)}}</span>
              <div class="icon-box" :id="item[0].id+'qddfdxk'"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[item[0].id+'qddfdxk'].content">
                <div class="concede-name">
                  <div>大</div>
                  <div>小</div>
                </div>
                <ul>
                  <li v-if="item[0].ior_OUCO && item[0].ior_OUCU" class="concede-item" v-for="(i,key) in item" :key="i.id+'dfdx'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[i.onlykey+i.matchesDetailId+playType.dfdx + '2']}"
                            @click="betDialogHandler(i,playType.host,playType.dfdx,'zfdxkd',i.ior_OUCO)">
                        <div  :class="{'checkedMixPlant': checkedMatches[i.onlykey+item.matchesDetailId+playType.dfdx + '2']}">{{i.ratio_ouco}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','ior_OUCO_change')">{{formatOdds(i.ior_OUCO)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeClass(key, '','ior_OUCO_change')">{{formatOdds(i.ior_OUCO)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','ior_OUCO_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[i.onlykey + i.matchesDetailId + playType.dfdx + '3']}"
                            @click="betDialogHandler(i,!playType.host,playType.dfdx,'zfdxkx',i.ior_OUCU)">
                        <div :class="{'checkedMixPlant': checkedMatches[i.onlykey + i.matchesDetailId + playType.dfdx + '3']}">{{i.ratio_oucu}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','ior_OUCU_change')">{{formatOdds(i.ior_OUCU)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_OUCU_change')">{{formatOdds(i.ior_OUCU)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','ior_OUCU_change')"></div>
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
      <div v-if="items.length == 0 ||((!playType.BallPlayIsShow.isqddfz || !chargeMainAndImpr(playType.dfdx)) && (!playType.BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.zfdx))
      && (!playType.BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.rf))  && (!playType.BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy)))" >
        <nodata-Page></nodata-Page>
      </div>

      <!--交易单弹窗-->

    </div>

    <div class="reach-footer" v-show="baseParam.isMix == '1' && mixCount > 0">
      <div class="footer-content" @click="showMixBet()">
        <span class="content-font">综合过关-投注单</span>
        <div class="yuan"><span class="yuan-num">{{mixCount}}</span></div>
      </div>
    </div>

  </div>
</template>

<script src="../../js/play_balls/volleyball_play.js"></script>
<style scoped lang='scss'>
  @import "../../scss/play_balls/all_balls_play";
</style>
