/**
* 篮球玩法
*/
<template>
  <div class="more-play">
    <!--top-->
    <div class="play-top"><span  name="team" class="playerNum">{{morePlayDetail.leagueName}}</span></div>

    <!--篮球场-->
    <div class="football-field">
      <!--篮球场-->
      <img class="football-img" :src="images_basketball" alt="">
      <!--篮球场-->
      <div class="basketball-info">
        <div class="info-title" v-if="dateType != '1'">{{formatTimes(morePlayDetail.startTime)}}</div>
        <div class="info-title"  v-if="dateType === '1'"> {{morePlayDetail.liveStep}} {{morePlayDetail.liveTime === 'HT'? '':morePlayDetail.lastTime}}</div>
        <!--<div class="info-title" v-if="dateType != '1'">即将开始</div>-->
        <div class="content">
          <div>
            <div class="numbers" v-if="dateType === '1'&&items.length > 0">{{morePlayDetail.hscore}}</div>
            <div class="numbers" v-else>{{morePlayDetail.hscore!=null ? morePlayDetail.hscore:'-' }}</div>
            <div class="fonts">{{morePlayDetail.hteam}}</div>  <!--name="team"-->
          </div>
          <div class="centers">VS</div>
          <div>
            <div class="numbers" v-if="dateType === '1'&&items.length > 0">{{morePlayDetail.gscore}}</div>
            <div class="numbers" v-else>{{morePlayDetail.gscore!=null ? morePlayDetail.gscore:'-'}}</div>
            <div class="fonts">{{morePlayDetail.gteam}}</div>  <!--name="team"-->
          </div>
        </div>
       <!-- <div class="footer">
          <div>Q1(18-20)</div>
          <div>Q2(18-20)</div>
          <div>Q3(18-20)</div>
          <div><span>Q4</span><span class="color-style">(18-18)</span></div>
        </div>-->
      </div>
    </div>

    <!--横向滚动-->
    <div class="sports-roll">

      <!--内容:style="{bottom: isMix == '1' && mixCount > 0 ? '0.49rem' : '0'}"-->
      <div v-if="items.length > 0" class="all-play" ref="outerWrapper">
          <div style="padding-bottom: 0.27rem">
            <!--让球-->
            <div class="concede" v-show="(activeTab == 'all' || activeTab == 'concede_size') && playType.BallPlayIsShow.isqcrq && chargeMainAndImpr(playType.rf)">
              <div class="concede-title" @click="switchBox('0')">
                <span>让球</span>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[0].content">
                  <div class="concede-name">
                    <div>{{hteam}}</div>
                    <div>{{gteam}}</div>
                  </div>
                  <ul>
                    <li class="concede-item" v-if="item.concede_g && item.concede_h "  v-for="(item,key) in items" :key="item.id+'rf'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.rf + (item.concede ? '0' : '2')]}"
                           @click="betDialogHandler(item,playType.host,playType.rf,'zr',item.concede_h)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.rf + (item.concede ? '0' : '2')]}">{{concedeTag(item.concede,item.concede_h)}} {{item.concede_num}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','concede_h_change')">{{formatOdds(item.concede_h)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','concede_h_change')">{{formatOdds(item.concede_h)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','concede_h_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.rf + (item.concede ? '1' : '3')]}"
                           @click="betDialogHandler(item,!playType.host,playType.rf,'kr',item.concede_g)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.rf + (item.concede ? '1' : '3')]}">{{concedeTag(!item.concede,item.concede_g)}} {{item.concede_num}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','concede_g_change')">{{formatOdds(item.concede_g)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','concede_g_change')">{{formatOdds(item.concede_g)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','concede_g_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!--得分/大小-->
            <div class="goal-size" v-show="(activeTab == 'all' || activeTab == 'goal_size') && playType.BallPlayIsShow.isqcdx && chargeMainAndImpr(playType.zfdx)">
              <div class="concede-title" @click="switchBox('1')">
                <span>总分:大/小</span>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[1].content">
                  <div class="concede-name">
                    <div>大</div>
                    <div>小</div>
                  </div>
                  <ul>
                    <li class="concede-item"   v-if="item.d_num && item.x_num" v-for="(item,key) in items" :key="item.id+'zfdx'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.zfdx + '0']}"
                           @click="betDialogHandler(item,playType.host,playType.zfdx,'dxz',item.d_num)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.zfdx + '0']}">{{item.dq_num}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','d_num_change')">{{formatOdds(item.d_num)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','d_num_change')">{{formatOdds(item.d_num)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','d_num_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.zfdx + '1']}"
                           @click="betDialogHandler(item,!playType.host,playType.zfdx,'dxk',item.x_num)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.zfdx + '1']}">{{item.xq_num}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','x_num_change')">{{formatOdds(item.x_num)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','x_num_change')">{{formatOdds(item.x_num)}}</div>
                        <div  v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','x_num_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!--独赢-->
            <div class="goal-size" v-show="(activeTab == 'all' || activeTab == 'capot') && playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)">
              <div class="concede-title" @click="switchBox('2')">
                <span>独赢</span>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[2].content">
                  <div class="concede-name">
                    <div>{{hteam}}</div>
                    <div>{{gteam}}</div>
                  </div>
                  <ul>
                    <li class="concede-item"  v-if="item.capot_h && item.capot_g"   v-for="(item,key) in items" :key="item.id+'dy'">
                      <div class="odd-even border" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '0']}"
                           @click="betDialogHandler(item,playType.host,playType.dy,'dyz',item.capot_h)">
                        <div v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','capot_h_change')">{{formatOdds(item.capot_h)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','capot_h_change')">{{formatOdds(item.capot_h)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','capot_h_change')"></div>
                      </div>
                      <div class="odd-even" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '1']}"
                           @click="betDialogHandler(item,!playType.host,playType.dy,'dyk',item.capot_g)">
                        <div v-if="oddsSelect() === 'oddsCss1'"  :class="oddsChangeClass(key, '','capot_g_change')">{{formatOdds(item.capot_g)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','capot_g_change')">{{formatOdds(item.capot_g)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'"  :class="oddsChangeTag(key, '','capot_g_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>


            <!--球队得分主队-->
            <div class="goal-size" v-show="(activeTab == 'all' || activeTab == 'total_size') && playType.BallPlayIsShow.isqddfz && chargeMainAndImpr(playType.dfdx)">
              <div class="concede-title" @click="switchBox('3')">
                <span>球队得分:主队-大/小</span>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[3].content">
                  <div class="concede-name">
                    <div>大</div>
                    <div>小</div>
                  </div>
                  <ul>
                    <li class="concede-item" v-if="item.ior_OUHO && item.ior_OUHU"   v-for="(item,key) in items" :key="item.id+'dfdx'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey +item.matchesDetailId + playType.dfdx + '0']}"
                           @click="betDialogHandler(item,playType.host,playType.dfdx,'zfdxzd',item.ior_OUHO)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey +item.matchesDetailId + playType.dfdx + '0']}"><!--大-->{{item.ratio_ouho}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_OUHO_change')">{{formatOdds(item.ior_OUHO)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_OUHO_change')">{{formatOdds(item.ior_OUHO)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_OUHO_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey +item.matchesDetailId + playType.dfdx + '1']}"
                           @click="betDialogHandler(item,!playType.host,playType.dfdx,'zfdxzx',item.ior_OUHU)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey +item.matchesDetailId + playType.dfdx + '1']}"><!--小-->{{item.ratio_ouhu}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_OUHU_change')">{{formatOdds(item.ior_OUHU)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_OUHU_change')">{{formatOdds(item.ior_OUHU)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_OUHU_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!--球队得分客队-->
            <div class="goal-size" v-show="(activeTab == 'all' || activeTab == 'total_size') && playType.BallPlayIsShow.isqddfk && chargeMainAndImpr(playType.dfdx)">
              <div class="concede-title" @click="switchBox('4')">
                <span>球队得分:客队-大/小</span>
                <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
              <transition name="fade">
                <div class="boxContent" v-if="showBox[4].content">
                  <div class="concede-name">
                    <div>大</div>
                    <div>小</div>
                  </div>
                  <ul>
                    <li class="concede-item"  v-if="item.ior_OUHO && item.ior_OUHU"  v-for="(item,key) in items" :key="item.id+'dy'">
                      <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey +item.matchesDetailId +playType.dfdx + '2']}"
                           @click="betDialogHandler(item,playType.host,playType.dfdx,'zfdxkd',item.ior_OUCO)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey +item.matchesDetailId +playType.dfdx + '2']}"><!--大-->{{item.ratio_ouco}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_OUCO_change')">{{formatOdds(item.ior_OUCO)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_OUCO_change')">{{formatOdds(item.ior_OUCO)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_OUCO_change')"></div>
                      </div>
                      <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey +item.matchesDetailId + playType.dfdx + '3']}"
                           @click="betDialogHandler(item,!playType.host,playType.dfdx,'zfdxkx',item.ior_OUCU)">
                        <div :class="{'checkedMixPlant': checkedMatches[item.onlykey +item.matchesDetailId + playType.dfdx + '3']}"><!--小-->{{item.ratio_oucu}}</div>
                        <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','ior_OUCU_change')">{{formatOdds(item.ior_OUCU)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','ior_OUCU_change')">{{formatOdds(item.ior_OUCU)}}</div>
                        <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','ior_OUCU_change')"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

          </div>
      </div>
      <!--没有数据显示问题页面-->
      <div v-if="items.length == 0 || ((!playType.BallPlayIsShow.isqddfk || !chargeMainAndImpr(playType.dfdx)) && (!playType.BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.rf))
        && (!playType.BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.zfdx)) && (!playType.BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy))
         && (!playType.BallPlayIsShow.isqddfz || !chargeMainAndImpr(playType.dfdx)))" >
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

<script src="../../js/play_balls/basketball_play.js"></script>
<style scoped lang='scss'>
  @import "../../scss/play_balls/all_balls_play";
</style>
