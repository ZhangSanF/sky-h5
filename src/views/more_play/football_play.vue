/**
* 足球玩法
*/
<template>
  <div class="more-play">
    <!--top-->
    <div class="play-top"><span  name="team"  class="playerNum">{{morePlayDetail.leagueName}}</span></div>
    <!--足球场-->
    <div class="football-field">
      <!--足球场图片-->
      <img class="football-img" :src="images_football" alt="">
      <!--足球场-->
      <div class="football-info">
        <div class="info-title">
          <div class="balls">
            <span v-if="dateType === '1'">滚球</span>
            <span v-if="dateType != '1'">{{formatMonthAndDay(morePlayDetail.startTime)}}</span>
            <span v-if="dateType === '1'">{{morePlayDetail.liveTime}}</span>
            <span v-if="dateType != '1'">{{formatHours(morePlayDetail.startTime)}}</span>
          </div>
        </div>
        <div class="info-name">
          <div>
            <!--红牌-->
            <div class="score-box">
                <span v-show="hillegal !== '0' && dateType === '1'" class="red-card">{{morePlayDetail.hillegal}}</span>
            </div>
            <!--有图标-->
            <!--<div class="img-box">-->
              <!--<img class="img-style img-left-size" src="../../../static/imgs/home_sports_event/ml_brands@2x.png" alt="">-->
            <!--</div>-->
            <!--无图标-->
            <div class="no-img">
                <i class="zuqiu-box">
                  <i class="iconfont icon-zuqiu"></i>
                </i>
            </div>
            <div  class="left-name">{{morePlayDetail.hteam}}</div>  <!--name="team"-->
          </div>
          <div class="center-left" v-if="dateType === '1'&&items.length > 0">{{morePlayDetail.hscore}}</div>
          <div class="center-vs">VS</div>
          <div class="center-right" v-if="dateType === '1'&&items.length > 0">{{morePlayDetail.gscore}}</div>
          <div>
            <!--红牌-->
            <div class="score-box">
              <span v-show="gillegal !== '0' && dateType === '1'" class="red-card">{{morePlayDetail.gillegal}}</span>
            </div>
            <!--<div class="img-box">-->
            <!--<img class="img-style img-right-size" src="../../../static/imgs/home_sports_event/hjmdl_brands@2x.png" alt="">-->
            <!--</div>-->
            <div class="no-img">
              <i class="zuqiu-box">
                <i class="iconfont icon-zuqiu zuqiu"></i>
              </i>
            </div>
            <div  class="right-name">{{morePlayDetail.gteam}}</div>  <!--name="team"-->
          </div>
        </div>

      </div>
    </div>

    <!--横向滚动-->
    <div class="sports-roll">
      <!--内容:style="{bottom: isMix == '1' && mixCount > 0 ? '0.49rem' : '0'}"-->
      <div v-if="items.length > 0" class="all-play" ref="outerWrapper">
        <div style="padding-bottom: 0.27rem">
          <!--独赢-->
          <div class="capot-three" v-show="(activeTab == 'all' || activeTab == 'capot') && playType.BallPlayIsShow.isdy   && items.length > 0 && chargeMainAndImpr(playType.dy)">
            <div class="capot-title"  @click="switchBox('0')">
              <div class="title-font">独赢</div>
              <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div v-if="showBox[0].content">
                <div class="title-info">
                  <div>{{hteam}}</div>
                  <div>和局</div>
                  <div>{{gteam}}</div>
                </div>
                <ul>
                  <li class="content-list" v-if="item.a_capot_h && item.a_capot_d && item.a_capot_g " v-for="(item,key) in items" :key="item.id+'dy'">
                    <div :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '0']}"
                         @click="betDialogHandler(item,playType.host,playType.dy,'dyz',item.a_capot_h)">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, '','a_capot_h_change')">{{formatOdds(item.a_capot_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, '','a_capot_h_change')">{{formatOdds(item.a_capot_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, '','a_capot_h_change')"></span>
                    </div>
                    <div :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '2']}"
                         @click="betDialogHandler(item,1,playType.dy,'dyh',item.a_capot_d)">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, '','a_capot_d_change')">{{formatOdds(item.a_capot_d)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, '','a_capot_d_change')">{{formatOdds(item.a_capot_d)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, '','a_capot_d_change')"></span>
                    </div>
                    <div :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '1']}"
                         @click="betDialogHandler(item,!playType.host,playType.dy,'dyk',item.a_capot_g)">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, '','a_capot_g_change')">{{formatOdds(item.a_capot_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, '','a_capot_g_change')">{{formatOdds(item.a_capot_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, '','a_capot_g_change')"></span>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!--让球-->
          <div class="concede" v-show="(activeTab == 'all' || activeTab == 'concede_size') && playType.BallPlayIsShow.isqcrq  &&items.length > 0 && chargeMainAndImpr(playType.qcrq)">
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
                <ul >
                  <li class="concede-item" v-if="item.a_concede_h && item.a_concede_g"  v-for="(item,key) in items" :key="item.id+'rqbc'">
                    <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.concede ? '0' : '2')]}"
                         @click="betDialogHandler(item,playType.host,playType.qcrq,'zr',item.a_concede_h)">
                      <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.concede ? '0' : '2')]}">{{concedeTag(item.concede,item.a_concede_h)}} {{item.a_concede_num}}</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','a_concede_h_change')">{{formatOdds(item.a_concede_h)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','a_concede_h_change')">{{formatOdds(item.a_concede_h)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','a_concede_h_change')"></div>
                    </div>
                    <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.concede ? '1' : '3')]}"
                         @click="betDialogHandler(item,!playType.host,playType.qcrq,'kr',item.a_concede_g)">
                      <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcrq + (item.concede ? '1' : '3')]}">{{concedeTag(!item.concede,item.a_concede_g)}} {{item.a_concede_num}}</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','a_concede_g_change')">{{formatOdds(item.a_concede_g)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','a_concede_g_change')">{{formatOdds(item.a_concede_g)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','a_concede_g_change')"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!--进球/大小-->
          <div class="goal-size" v-show="(activeTab == 'all' || activeTab == 'goal_size') && playType.BallPlayIsShow.isqcdx &&items.length > 0 && chargeMainAndImpr(playType.qcdx) ">
            <div class="concede-title" @click="switchBox('2')">
              <span>进球:大/小</span>
              <div class="icon-box"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[2].content">
                <div class="concede-name">
                  <div>大</div>
                  <div>小</div>
                </div>
                <ul >
                  <li class="concede-item" v-if="item.a_d_num && item.a_x_num" v-for="(item,key) in items" :key="item.id+'dx'">
                    <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '0']}"
                         @click="betDialogHandler(item,playType.host,playType.qcdx,'dxz',item.a_d_num)">
                      <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '0']}" >{{item.a_dq_num}}</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','a_d_num_change')">{{formatOdds(item.a_d_num)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','a_d_num_change')">{{formatOdds(item.a_d_num)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','a_d_num_change')"></div>
                    </div>
                    <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '1']}"
                         @click="betDialogHandler(item,!playType.host,playType.qcdx,'dxk',item.a_x_num)">
                      <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.qcdx + '1']}">{{item.a_xq_num}}</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','a_x_num_change')">{{formatOdds(item.a_x_num)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','a_x_num_change')">{{formatOdds(item.a_x_num)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','a_x_num_change')"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!--单双-->
          <div class="goal-size" v-show="(activeTab == 'all' || activeTab == 'total_size') && playType.BallPlayIsShow.isds   && items.length > 0 && chargeMainAndImpr(playType.ds)">
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
                  <li class="concede-item" v-if="item.a_d_odds && item.a_s_odds " v-for="(item,key) in items" :key="item.id+'ds'">
                    <div class="odd-even border" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.ds + '1']}"
                         @click="betDialogHandler(item,!playType.host,playType.ds,'dsz',item.a_d_odds)">
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','a_d_odds_change')">{{formatOdds(item.a_d_odds)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','a_d_odds_change')">{{formatOdds(item.a_d_odds)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','a_d_odds_change')"></div>
                    </div>
                    <div class="odd-even" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.ds + '0']}"
                         @click="betDialogHandler(item,playType.host,playType.ds,'dsk',item.a_s_odds)">
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','a_s_odds_change')">{{formatOdds(item.a_s_odds)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','a_s_odds_change')">{{formatOdds(item.a_s_odds)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','a_s_odds_change')"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!--独赢-上半场-->
          <div class="capot-three" v-show="(activeTab == 'all' || activeTab == 'capot') && playType.BallPlayIsShow.isbcdy   && items.length > 0 && chargeMainAndImpr(playType.bcdy)">
            <div class="capot-title"  @click="switchBox('4')">
              <div class="title-font">独赢-上半场</div>
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
                  <li class="content-list" v-if="item.u_capot_h && item.u_capot_d && item.u_capot_g" v-for="(item,key) in items" :key="item.id+'dysbc'">
                    <div :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdy + '0']}"
                         @click="betDialogHandler(item,playType.host,playType.bcdy,'dyz',item.u_capot_h)">
                      <span class="list-left"></span>
                      <span  v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, '','u_capot_h_change')">{{formatOdds(item.u_capot_h)}}</span>
                      <span  v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, '','u_capot_h_change')">{{formatOdds(item.u_capot_h)}}</span>
                      <span  v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, '','u_capot_h_change')"></span>
                    </div>
                    <div :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdy + '2']}"
                         @click="betDialogHandler(item,1,playType.bcdy,'dyh',item.u_capot_d)">
                      <span class="list-left"></span>
                      <span v-if="oddsSelect() === 'oddsCss1'"  class="list-right" :class="oddsChangeClass(key, '','u_capot_d_change')">{{formatOdds(item.u_capot_d)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeClass(key, '','u_capot_d_change')">{{formatOdds(item.u_capot_d)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeTag(key, '','u_capot_d_change')"></span>
                    </div>
                    <div :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdy + '1']}"
                         @click="betDialogHandler(item,!playType.host,playType.bcdy,'dyk',item.u_capot_g)">
                      <span class="list-left"></span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, '','u_capot_g_change')">{{formatOdds(item.u_capot_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, '','u_capot_g_change')">{{formatOdds(item.u_capot_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, '','u_capot_g_change')"></span>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!--让球-上半场-->
          <div class="concede" v-show="(activeTab == 'all' || activeTab == 'concede_size') && playType.BallPlayIsShow.isbcrq  &&items.length > 0 && chargeMainAndImpr(playType.bcrq)">
            <div class="concede-title" @click="switchBox('5')">
              <span>让球-上半场</span>
              <div class="icon-box" ref="iconBox1"><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[5].content">
                <div class="concede-name">
                  <div>{{hteam}}</div>
                  <div>{{gteam}}</div>
                </div>
                <ul>
                  <li class="concede-item" v-if="item.u_concede_h && item.u_concede_g"  v-for="(item,key) in items" :key="item.id+'rqsbc'">
                    <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcrq + (item.concede ? '0' : '2')]}"
                         @click="betDialogHandler(item,playType.host,playType.bcrq,'sbzr',item.u_concede_h)">
                      <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcrq + (item.concede ? '0' : '2')]}">{{concedeTag(item.half_concede,item.u_concede_h)}} {{item.u_concede_num}}</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','u_concede_h_change')">{{formatOdds(item.u_concede_h)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','u_concede_h_change')">{{formatOdds(item.u_concede_h)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','u_concede_h_change')"></div>
                    </div>
                    <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcrq + (item.concede ? '1' : '3')]}"
                         @click="betDialogHandler(item,!playType.host,playType.bcrq,'sbkr',item.u_concede_g)">
                      <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcrq + (item.concede ? '1' : '3')]}">{{concedeTag(!item.half_concede,item.u_concede_g)}} {{item.u_concede_num}}</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','u_concede_g_change')">{{formatOdds(item.u_concede_g)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','u_concede_g_change')">{{formatOdds(item.u_concede_g)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','u_concede_g_change')"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!--进球/大小-上半场-->
          <div class="goal-size" v-show="(activeTab == 'all' || activeTab == 'goal_size') && playType.BallPlayIsShow.isbcdx  &&items.length > 0 && chargeMainAndImpr(playType.bcdx) ">
            <div class="concede-title" @click="switchBox('6')">
              <span>进球:大/小-上半场</span>
              <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[6].content">
                <div class="concede-name">
                  <div>大</div>
                  <div>小</div>
                </div>
                <ul>
                  <li class="concede-item" v-if="item.u_d_num && item.u_x_num " v-for="(item,key) in items" :key="item.id+'dxsbc'">
                    <div class="concede-item-left" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdx + '0']}"
                         @click="betDialogHandler(item,playType.host,playType.bcdx,'dxz',item.u_d_num)">
                      <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdx + '0']}">{{item.u_dq_num}}</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','u_d_num_change')">{{formatOdds(item.u_d_num)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','u_d_num_change')">{{formatOdds(item.u_d_num)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','u_d_num_change')"></div>
                    </div>
                    <div class="concede-item-right" :class="{'checkedMix': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdx + '1']}"
                         @click="betDialogHandler(item,!playType.host,playType.bcdx,'dxk',item.u_x_num)">
                      <div :class="{'checkedMixPlant': checkedMatches[item.onlykey + item.matchesDetailId + playType.bcdx + '1']}">{{item.u_xq_num}}</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, '','u_x_num_change')">{{formatOdds(item.u_x_num)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, '','u_x_num_change')">{{formatOdds(item.u_x_num)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, '','u_x_num_change')"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!--波胆-->
          <div class="correct-three" v-show="(activeTab == 'all') && isMix != '1' && playType.BallPlayIsShow.isbd  && items.length > 0 && chargeMainAndImpr(betType.football.bd)">
            <div class="correct-title"  @click="switchBox('7')">
              <div class="title-font">波胆</div>
              <div class="icon-box" ref=""><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[7].content">
                <div class="title-info">
                  <div>主队<!--{{hteam}}--></div>
                  <div>和</div>
                  <div>客队<!--{{gteam}}--></div>
                </div>
                <ul v-if="item.footballCorrect"  v-for="(item,key) in items" :key="item.id+'dysbc'">

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bd10,'bd10',item.footballCorrect.oneozero_h)">
                      <span class="list-left-score">1:0</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','oneozero_h_change')">{{formatOdds(item.footballCorrect.oneozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','oneozero_h_change')">{{formatOdds(item.footballCorrect.oneozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','oneozero_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bd00,'bd00',item.footballCorrect.zeroozero)">
                      <span class="list-left-score">0:0</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','zeroozero_change')">{{formatOdds(item.footballCorrect.zeroozero)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','zeroozero_change')">{{formatOdds(item.footballCorrect.zeroozero)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','zeroozero_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bd10,'bd01',item.footballCorrect.oneozero_g)">
                      <span class="list-left-score">0:1</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','oneozero_g_change')">{{formatOdds(item.footballCorrect.oneozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','oneozero_g_change')">{{formatOdds(item.footballCorrect.oneozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','oneozero_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bd20,'bd20',item.footballCorrect.twoozero_h)">
                      <span class="list-left-score">2:0</span>
                      <span v-if="oddsSelect() === 'oddsCss1'"  class="list-right" :class="oddsChangeClass(key, 'footballCorrect','twoozero_h_change')">{{formatOdds(item.footballCorrect.twoozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeClass(key, 'footballCorrect','twoozero_h_change')">{{formatOdds(item.footballCorrect.twoozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeTag(key, 'footballCorrect','twoozero_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bd11,'bd11',item.footballCorrect.oneoone)">
                      <span class="list-left-score">1:1</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','oneoone_change')">{{formatOdds(item.footballCorrect.oneoone)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','oneoone_change')">{{formatOdds(item.footballCorrect.oneoone)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','oneoone_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bd20,'bd02',item.footballCorrect.twoozero_g)">
                      <span class="list-left-score">0:2</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','twoozero_g_change')">{{formatOdds(item.footballCorrect.twoozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','twoozero_g_change')">{{formatOdds(item.footballCorrect.twoozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','twoozero_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bd21,'bd21',item.footballCorrect.twooone_h)">
                      <span class="list-left-score">2:1</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','twooone_h_change')">{{formatOdds(item.footballCorrect.twooone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','twooone_h_change')">{{formatOdds(item.footballCorrect.twooone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','twooone_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bd22,'bd22',item.footballCorrect.twootwo)">
                      <span class="list-left-score">2:2</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','twootwo_change')">{{formatOdds(item.footballCorrect.twootwo)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','twootwo_change')">{{formatOdds(item.footballCorrect.twootwo)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','twootwo_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bd21,'bd21',item.footballCorrect.twooone_g)">
                      <span class="list-left-score">1:2</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','twooone_g_change')">{{formatOdds(item.footballCorrect.twooone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','twooone_g_change')">{{formatOdds(item.footballCorrect.twooone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','twooone_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bd30,'bd30',item.footballCorrect.threeozero_h)">
                      <span class="list-left-score">3:0</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeozero_h_change')">{{formatOdds(item.footballCorrect.threeozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeozero_h_change')">{{formatOdds(item.footballCorrect.threeozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','threeozero_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bd33,'bd33',item.footballCorrect.threeothree)">
                      <span class="list-left-score">3:3</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeothree_change')">{{formatOdds(item.footballCorrect.threeothree)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeothree_change')">{{formatOdds(item.footballCorrect.threeothree)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','threeothree_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bd30,'bd03',item.footballCorrect.threeozero_g)">
                      <span class="list-left-score">0:3</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeozero_g_change')">{{formatOdds(item.footballCorrect.threeozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeozero_g_change')">{{formatOdds(item.footballCorrect.threeozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','threeozero_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bd31,'bd31',item.footballCorrect.threeoone_h)">
                      <span class="list-left-score">3:1</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeoone_h_change')">{{formatOdds(item.footballCorrect.threeoone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeoone_h_change')">{{formatOdds(item.footballCorrect.threeoone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','threeoone_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bd44,'bd44',item.footballCorrect.fourofour)">
                      <span class="list-left-score">4:4</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourofour_change')">{{formatOdds(item.footballCorrect.fourofour)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourofour_change')">{{formatOdds(item.footballCorrect.fourofour)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','fourofour_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bd31,'bd13',item.footballCorrect.threeoone_g)">
                      <span class="list-left-score">1:3</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeoone_g_change')">{{formatOdds(item.footballCorrect.threeoone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeoone_g_change')">{{formatOdds(item.footballCorrect.threeoone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','threeoone_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bd32,'bd32',item.footballCorrect.threeotwo_h)">
                      <span class="list-left-score">3:2</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeotwo_h_change')">{{formatOdds(item.footballCorrect.threeotwo_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeotwo_h_change')">{{formatOdds(item.footballCorrect.threeotwo_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','threeotwo_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bdqt,'bdother',item.footballCorrect.hOther)">
                      <span class="list-left-score">其他</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','hOther_change')">{{formatOdds(item.footballCorrect.hOther)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','hOther_change')">{{formatOdds(item.footballCorrect.hOther)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','hOther_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bd32,'bd23',item.footballCorrect.threeotwo_g)">
                      <span class="list-left-score">2:3</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeotwo_g_change')">{{formatOdds(item.footballCorrect.threeotwo_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','threeotwo_g_change')">{{formatOdds(item.footballCorrect.threeotwo_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','threeotwo_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list">
                    <div @click="betDialogHandler(item,playType.host,betType.football.bd40,'bd40',item.footballCorrect.fourozero_h)">
                      <span class="list-left-score">4:0</span>
                      <span  v-if="oddsSelect() === 'oddsCss1'"  class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourozero_h_change')">{{formatOdds(item.footballCorrect.fourozero_h)}}</span>
                      <span  v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourozero_h_change')">{{formatOdds(item.footballCorrect.fourozero_h)}}</span>
                      <span  v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeTag(key, 'footballCorrect','fourozero_h_change')"></span>
                    </div>
                    <div>
                      <span class="list-left-score"></span>
                      <span class="list-right"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bd40,'bd04',item.footballCorrect.fourozero_g)">
                      <span class="list-left-score">0:4</span>
                      <span  v-if="oddsSelect() === 'oddsCss1'"  class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourozero_g_change')">{{formatOdds(item.footballCorrect.fourozero_g)}}</span>
                      <span  v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourozero_g_change')">{{formatOdds(item.footballCorrect.fourozero_g)}}</span>
                      <span  v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeTag(key, 'footballCorrect','fourozero_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bd41,'bd41',item.footballCorrect.fouroone_h)">
                      <span class="list-left-score">4:1</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fouroone_h_change')">{{formatOdds(item.footballCorrect.fouroone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fouroone_h_change')">{{formatOdds(item.footballCorrect.fouroone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','fouroone_h_change')"></span>
                    </div>
                    <div>
                      <span class="list-left-score"></span>
                      <span class="list-right"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bd41,'bd14',item.footballCorrect.fouroone_g)">
                      <span class="list-left-score">1:4</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fouroone_g_change')">{{formatOdds(item.footballCorrect.fouroone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fouroone_g_change')">{{formatOdds(item.footballCorrect.fouroone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','fouroone_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bd42,'bd42',item.footballCorrect.fourotwo_h)">
                      <span class="list-left-score">4:2</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourotwo_h_change')">{{formatOdds(item.footballCorrect.fourotwo_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourotwo_h_change')">{{formatOdds(item.footballCorrect.fourotwo_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','fourotwo_h_change')"></span>
                    </div>
                    <div>
                      <span class="list-left-score"></span>
                      <span class="list-right"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bd42,'bd24',item.footballCorrect.fourotwo_g)">
                      <span class="list-left-score">2:4</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourotwo_g_change')">{{formatOdds(item.footballCorrect.fourotwo_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourotwo_g_change')">{{formatOdds(item.footballCorrect.fourotwo_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','fourotwo_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bd43,'bd43',item.footballCorrect.fourothree_h)">
                      <span class="list-left-score">4:3</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourothree_h_change')">{{formatOdds(item.footballCorrect.fourothree_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourothree_h_change')">{{formatOdds(item.footballCorrect.fourothree_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballCorrect','fourothree_h_change')"></span>
                    </div>
                    <div>
                      <span class="list-left-score"></span>
                      <span class="list-right"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bd43,'bd34',item.footballCorrect.fourothree_g)">
                      <span class="list-left-score">3:4</span>
                      <span v-if="oddsSelect() === 'oddsCss1'"  class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourothree_g_change')">{{formatOdds(item.footballCorrect.fourothree_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeClass(key, 'footballCorrect','fourothree_g_change')">{{formatOdds(item.footballCorrect.fourothree_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeTag(key, 'footballCorrect','fourothree_g_change')"></span>
                    </div>
                  </li>

                  <!--<li class="content-list">
                    <div @click="betDialogHandler(item,1,betType.football.bdqt,'bdother',item.footballCorrect.hOther)">
                      <span class="list-left">其他</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','hOther_change')">{{formatOdds(item.footballCorrect.hOther)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right">{{formatOdds(item.footballCorrect.hOther)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballCorrect','hOther_change')"></span>
                    </div>

                  </li>-->

                </ul>
              </div>
            </transition>
          </div>

          <!--上半-波胆-->
          <div class="correct-three" v-show="(activeTab == 'all') && isMix!='1' && playType.BallPlayIsShow.isbcbd  && items.length > 0 && chargeMainAndImpr(betType.football.bcbd)">
            <div class="correct-title"  @click="switchBox('8')">
              <div class="title-font">上半-波胆</div>
              <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[8].content">
                <div class="title-info">
                  <div>主队<!--{{hteam}}--></div>
                  <div>和</div>
                  <div>客队<!--{{gteam}}--></div>
                </div>
                <ul v-if="item.footballHalfCorrect"  v-for="(item,key) in items" :key="item.id+'dysbc'">

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bcbd10,'bcbd10',item.footballHalfCorrect.oneozero_h)">
                      <span class="list-left-score">1:0</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','oneozero_h_change')">{{formatOdds(item.footballHalfCorrect.oneozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','oneozero_h_change')">{{formatOdds(item.footballHalfCorrect.oneozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','oneozero_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bcbd00,'bcbd00',item.footballHalfCorrect.zeroozero)">
                      <span class="list-left-score">0:0</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','zeroozero_change')">{{formatOdds(item.footballHalfCorrect.zeroozero)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','zeroozero_change')">{{formatOdds(item.footballHalfCorrect.zeroozero)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','zeroozero_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bcbd10,'bcbd01',item.footballHalfCorrect.oneozero_g)">
                      <span class="list-left-score">0:1</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','oneozero_g_change')">{{formatOdds(item.footballHalfCorrect.oneozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','oneozero_g_change')">{{formatOdds(item.footballHalfCorrect.oneozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','oneozero_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bcbd20,'bcbd20',item.footballHalfCorrect.twoozero_h)">
                      <span class="list-left-score">2:0</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','twoozero_h_change')">{{formatOdds(item.footballHalfCorrect.twoozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','twoozero_h_change')">{{formatOdds(item.footballHalfCorrect.twoozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','twoozero_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bcbd11,'bcbd11',item.footballHalfCorrect.oneoone)">
                      <span class="list-left-score">1:1</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','oneoone_change')">{{formatOdds(item.footballHalfCorrect.oneoone)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','oneoone_change')">{{formatOdds(item.footballHalfCorrect.oneoone)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','oneoone_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bcbd20,'bcbd02',item.footballHalfCorrect.twoozero_g)">
                      <span class="list-left-score">0:2</span>
                      <span v-if="oddsSelect() === 'oddsCss1'"  class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','twoozero_g_change')">{{formatOdds(item.footballHalfCorrect.twoozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','twoozero_g_change')">{{formatOdds(item.footballHalfCorrect.twoozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','twoozero_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bcbd21,'bcbd21',item.footballHalfCorrect.twooone_h)">
                      <span class="list-left-score">2:1</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','twooone_h_change')">{{formatOdds(item.footballHalfCorrect.twooone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','twooone_h_change')">{{formatOdds(item.footballHalfCorrect.twooone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','twooone_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bcbd22,'bcbd22',item.footballHalfCorrect.twootwo)">
                      <span class="list-left-score">2:2</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','twootwo_change')">{{formatOdds(item.footballHalfCorrect.twootwo)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','twootwo_change')">{{formatOdds(item.footballHalfCorrect.twootwo)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','twootwo_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bcbd21,'bcbd12',item.footballHalfCorrect.twooone_g)">
                      <span class="list-left-score">1:2</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','twooone_g_change')">{{formatOdds(item.footballHalfCorrect.twooone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','twooone_g_change')">{{formatOdds(item.footballHalfCorrect.twooone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','twooone_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bcbd30,'bcbd30',item.footballHalfCorrect.threeozero_h)">
                      <span class="list-left-score">3:0</span>
                      <span  v-if="oddsSelect() === 'oddsCss1'"  class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeozero_h_change')">{{formatOdds(item.footballHalfCorrect.threeozero_h)}}</span>
                      <span  v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeozero_h_change')">{{formatOdds(item.footballHalfCorrect.threeozero_h)}}</span>
                      <span  v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','threeozero_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bcbd33,'bcbd33',item.footballHalfCorrect.threeothree)">
                      <span class="list-left-score">3:3</span>
                      <span v-if="oddsSelect() === 'oddsCss1'"  class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeothree_change')">{{formatOdds(item.footballHalfCorrect.threeothree)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeothree_change')">{{formatOdds(item.footballHalfCorrect.threeothree)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','threeothree_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bcbd30,'bcbd03',item.footballHalfCorrect.threeozero_g)">
                      <span class="list-left-score">0:3</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeozero_g_change')">{{formatOdds(item.footballHalfCorrect.threeozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeozero_g_change')">{{formatOdds(item.footballHalfCorrect.threeozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','threeozero_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list">
                    <div @click="betDialogHandler(item,playType.host,betType.football.bcbd31,'bcbd31',item.footballHalfCorrect.threeoone_h)">
                      <span class="list-left-score">3:1</span>
                      <span v-if="oddsSelect() === 'oddsCss1'"  class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeoone_h_change')">{{formatOdds(item.footballHalfCorrect.threeoone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeoone_h_change')">{{formatOdds(item.footballHalfCorrect.threeoone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','threeoone_h_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bcbdqt,'bcbdother',item.footballHalfCorrect.hOther)">
                      <span class="list-left-score">其他</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','hOther_change')">{{formatOdds(item.footballHalfCorrect.hOther)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','hOther_change')">{{formatOdds(item.footballHalfCorrect.hOther)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','hOther_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bcbd31,'bcbd13',item.footballHalfCorrect.threeoone_g)">
                      <span class="list-left-score">1:3</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeoone_g_change')">{{formatOdds(item.footballHalfCorrect.threeoone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeoone_g_change')">{{formatOdds(item.footballHalfCorrect.threeoone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','threeoone_g_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,playType.host,betType.football.bcbd32,'bcbd32',item.footballHalfCorrect.threeotwo_h)">
                      <span class="list-left-score">3:2</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeotwo_h_change')">{{formatOdds(item.footballHalfCorrect.threeotwo_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeotwo_h_change')">{{formatOdds(item.footballHalfCorrect.threeotwo_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','threeotwo_h_change')"></span>
                    </div>
                    <div>
                      <span class="list-left-score"></span>
                      <span class="list-right"></span>
                    </div>
                    <div @click="betDialogHandler(item,!playType.host,betType.football.bcbd32,'bcbd23',item.footballHalfCorrect.threeotwo_g)">
                      <span class="list-left-score">2:3</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeotwo_g_change')">{{formatOdds(item.footballHalfCorrect.threeotwo_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','threeotwo_g_change')">{{formatOdds(item.footballHalfCorrect.threeotwo_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHalfCorrect','threeotwo_g_change')"></span>
                    </div>
                  </li>

                <!--  <li class="content-list">
                    <div @click="betDialogHandler(item,1,betType.football.bcbdqt,'bcbdother',item.footballHalfCorrect.hOther)">
                      <span class="list-left">其他</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','hOther_change')">{{formatOdds(item.footballHalfCorrect.hOther)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right">{{formatOdds(item.footballHalfCorrect.hOther)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHalfCorrect','hOther_change')"></span>
                    </div>
                  </li>-->

                </ul>
              </div>
            </transition>
          </div>

          <!--总进球-->
          <div class="all-half" v-show="(activeTab == 'all') && isMix != '1' &&playType.BallPlayIsShow.iszjq  && items.length > 0 && chargeMainAndImpr(betType.football.zjqs)">
            <div class="all-half-title" @click="switchBox('9')">
              <span>总进球</span>
              <div class="icon-box" ><span class="iconfont icon-fanhui bottom-arrow"></span></div>
            </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[9].content">
                  <ul v-if="item.footballGoals" v-for="(item,key) in items" :key="item.id+'zjqs'">
                    <li class="all-half-item" @click="betDialogHandler(item,1,betType.football.zjqs01,'zjqs01',item.footballGoals.zerotoone)">
                      <div>0-1</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, 'footballGoals','zerotoone_change')">{{formatOdds(item.footballGoals.zerotoone)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, 'footballGoals','zerotoone_change')">{{formatOdds(item.footballGoals.zerotoone)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, 'footballGoals','zerotoone_change')"></div>
                    </li>
                    <li class="all-half-item" @click="betDialogHandler(item,1,betType.football.zjqs23,'zjqs23',item.footballGoals.twotothree)">
                      <div>2-3</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, 'footballGoals','twotothree_change')">{{formatOdds(item.footballGoals.twotothree)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, 'footballGoals','twotothree_change')">{{formatOdds(item.footballGoals.twotothree)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, 'footballGoals','twotothree_change')"></div>
                    </li>
                    <li class="all-half-item" @click="betDialogHandler(item,1,betType.football.zjqs46,'zjqs46',item.footballGoals.fourtosix)">
                      <div>4-6</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, 'footballGoals','fourtosix_change')">{{formatOdds(item.footballGoals.fourtosix)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, 'footballGoals','fourtosix_change')">{{formatOdds(item.footballGoals.fourtosix)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, 'footballGoals','fourtosix_change')"></div>
                    </li>
                    <li class="all-half-item" @click="betDialogHandler(item,1,betType.football.zjqs7,'zjqs7',item.footballGoals.sevenup)">
                      <div>7或以上</div>
                      <div v-if="oddsSelect() === 'oddsCss1'" :class="oddsChangeClass(key, 'footballGoals','sevenup_change')">{{formatOdds(item.footballGoals.sevenup)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeClass(key, 'footballGoals','sevenup_change')">{{formatOdds(item.footballGoals.sevenup)}}</div>
                      <div v-if="oddsSelect() === 'oddsCss2'" :class="oddsChangeTag(key, 'footballGoals','sevenup_change')"></div>
                    </li>
                  </ul>
              </div>
            </transition>
          </div>

          <!--半场/全场-->
          <div class="correct-three" v-show="(activeTab == 'all') && isMix != '1' && playType.BallPlayIsShow.isbqc  && items.length > 0 && chargeMainAndImpr(betType.football.bqc)">
              <div class="correct-title"  @click="switchBox('10')">
                <div class="title-font">半场/全场</div>
                <div class="icon-box" ref=""><span class="iconfont icon-fanhui bottom-arrow"></span></div>
              </div>
            <transition name="fade">
              <div class="boxContent" v-if="showBox[10].content">
                <ul v-if="item.footballHta" v-for="(item,key) in items" :key="item.id+'bqc'">
                   <li class="content-list">
                    <div @click="betDialogHandler(item,1,betType.football.bqczz,'bqczz',item.footballHta.hh)">
                      <span class="list-left">主/主</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHta','hh_change')">{{formatOdds(item.footballHta.hh)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHta','hh_change')">{{formatOdds(item.footballHta.hh)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHta','hh_change')"></span>
                    </div>
                     <div @click="betDialogHandler(item,1,betType.football.bqchz,'bqchz',item.footballHta.dh)">
                       <span class="list-left">和/主</span>
                       <span v-if="oddsSelect() === 'oddsCss1'"  class="list-right" :class="oddsChangeClass(key, 'footballHta','dh_change')">{{formatOdds(item.footballHta.dh)}}</span>
                       <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeClass(key, 'footballHta','dh_change')">{{formatOdds(item.footballHta.dh)}}</span>
                       <span v-if="oddsSelect() === 'oddsCss2'"  class="list-right" :class="oddsChangeTag(key, 'footballHta','dh_change')"></span>
                     </div>
                     <div @click="betDialogHandler(item,1,betType.football.bqckz,'bqckz',item.footballHta.gh)">
                       <span class="list-left">客/主</span>
                       <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHta','gh_change')">{{formatOdds(item.footballHta.gh)}}</span>
                       <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHta','gh_change')">{{formatOdds(item.footballHta.gh)}}</span>
                       <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHta','gh_change')"></span>
                     </div>
                  </li>

                  <li class="content-list" >
                    <div  @click="betDialogHandler(item,1,betType.football.bqczh,'bqczh',item.footballHta.hd)">
                      <span class="list-left">主/和</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHta','hd_change')">{{formatOdds(item.footballHta.hd)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHta','hd_change')">{{formatOdds(item.footballHta.hd)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHta','hd_change')"></span>
                    </div>
                    <div  @click="betDialogHandler(item,1,betType.football.bqchh,'bqchh',item.footballHta.dd)">
                      <span class="list-left">和/和</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHta','dd_change')">{{formatOdds(item.footballHta.dd)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHta','dd_change')">{{formatOdds(item.footballHta.dd)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHta','dd_change')"></span>
                    </div>
                    <div  @click="betDialogHandler(item,1,betType.football.bqckh,'bqckh',item.footballHta.gd)">
                      <span class="list-left">客/和</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHta','gd_change')">{{formatOdds(item.footballHta.gd)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHta','gd_change')">{{formatOdds(item.footballHta.gd)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHta','gd_change')"></span>
                    </div>
                  </li>

                  <li class="content-list" >
                    <div @click="betDialogHandler(item,1,betType.football.bqczk,'bqczk',item.footballHta.hg)">
                      <span class="list-left">主/客</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHta','hg_change')">{{formatOdds(item.footballHta.hg)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHta','hg_change')">{{formatOdds(item.footballHta.hg)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHta','hg_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bqchk,'bqchk',item.footballHta.dg)">
                      <span class="list-left">和/客</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHta','dg_change')">{{formatOdds(item.footballHta.dg)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHta','dg_change')">{{formatOdds(item.footballHta.dg)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHta','dg_change')"></span>
                    </div>
                    <div @click="betDialogHandler(item,1,betType.football.bqckk,'bqckk',item.footballHta.gg)">
                      <span class="list-left">客/客</span>
                      <span v-if="oddsSelect() === 'oddsCss1'" class="list-right" :class="oddsChangeClass(key, 'footballHta','gg_change')">{{formatOdds(item.footballHta.gg)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeClass(key, 'footballHta','gg_change')">{{formatOdds(item.footballHta.gg)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="list-right" :class="oddsChangeTag(key, 'footballHta','gg_change')"></span>
                    </div>
                  </li>


                </ul>
              </div>
            </transition>
          </div>

        </div>

      </div>
      <!--没有数据显示问题页面-->
      <div v-if="items.length == 0 ||((!playType.BallPlayIsShow.isbqc || !chargeMainAndImpr(betType.football.bqc)) && (!playType.BallPlayIsShow.iszjq || !chargeMainAndImpr(betType.football.zjqs))
      && (!playType.BallPlayIsShow.isbd || !chargeMainAndImpr(betType.football.bd)) && (!playType.BallPlayIsShow.isbcbd || !chargeMainAndImpr(betType.football.bcbd)) && (!playType.BallPlayIsShow.isbcdy || !chargeMainAndImpr(playType.bcdy))
      && (!playType.BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy)) && (!playType.BallPlayIsShow.isds || !chargeMainAndImpr(playType.ds)) && (!playType.BallPlayIsShow.isbcdx || !chargeMainAndImpr(playType.bcdx))
      && (!playType.BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.qcdx)) && (!playType.BallPlayIsShow.isbcrq || !chargeMainAndImpr(playType.bcrq)) && (!playType.BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.qcrq)))" >
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

<script src="../../js/play_balls/football_play.js"></script>
<style scoped lang='scss'>
  @import "../../scss/play_balls/all_balls_play";
</style>
