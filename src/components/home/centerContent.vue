/**
* 首页中间内容组件
*/
<template>
    <div>
        <div class="center-content" v-if="!hotMatches.playMaintenance">
            <!--暂无数据-->
            <div v-if="zqHotData.length==0 && lmHotData.length==0 && bqHotData.length==0 && wqHotData.length==0 && pqHotData.length==0 && qtHotData.length==0">
              <div class="hot-page">
                  <div class="box">
                    <img src="../../../static/imgs/my/home_nodata@2x.png" alt="">
                    <p>{{ $t("msg.noData") }}</p>
                  </div>
              </div>
            </div>

            <!-- 热门足球赛事開始-->
            <div v-if="zqHotData.length>0" class="hot-sport">
              <div class="center-content-li-first">
                <div class="center-content-left">
                  <!--足球-->
                  <span class="iconfont icon-zuqiu center-content-img"></span>
                  <span class="center-content-span">足球</span>
                </div>
                <div class="center-content-center" >
                  <div class="title-box">
                    <span>独赢</span>
                    <span>让球</span>
                    <span>大小</span>
                  </div>
                </div>
              </div>
              <!--第一场-->
              <div class="center-content-li-two" v-if="zqHotData.length>0" v-for="(itemDetail,key) in zqHotData" :key="'fb'+itemDetail.id"  >
                <div class="ball-detaill">
                  <!--内容-->
                    <div class="item-info">
                      <!--左-->
                      <div @click="morePlay(itemDetail,'TYZQ',hotDateType.zqDateType)" class="content-left">
                        <div class="content-left-first">
                          <div>
                            <span class="first-name-top">{{itemDetail.hteam}}</span>
                          </div>
                          <div class="score" >
                             <span class="card">
                             <span  v-show="itemDetail.hillegal !== '0' && itemDetail.hillegal !== undefined" class="red-card">{{itemDetail.hillegal}}</span>
                             </span>
                          </div>
                          <div class="first-score" v-if="hotDateType.zqDateType === '1'"> {{itemDetail.hscore}} </div>
                        </div>
                        <div class="content-left-two">
                          <div>
                            <span class="first-name-top">{{itemDetail.gteam}}</span>
                          </div>
                          <div class="first-score" >
                            <span class="card">
                              <span  v-show="itemDetail.gillegal !== '0' && itemDetail.gillegal !== undefined" class="red-card">{{itemDetail.gillegal}}</span>
                            </span>
                          </div>
                          <div class="first-score" v-if="hotDateType.zqDateType === '1'">{{itemDetail.gscore}}</div>
                        </div>
                        <div class="content-left-three">
                          <div v-if="hotDateType.zqDateType === '1'">{{itemDetail.liveTime}}</div>
                          <div v-if="hotDateType.zqDateType != '1'">{{forMatDate(itemDetail.startTime)}}</div>
                          <div class="more_Num">+{{itemDetail.morePlayNum}}</div>
                        </div>
                      </div>
                      <!--中-->
                      <div class="content-center">
                        <div class="content-detail" >
                          <!-- 独赢-->
                          <div class="all-alone-win">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.zqdy,'dyz',itemDetail.a_capot_h,'TYZQ',hotDateType.zqDateType)">
                                <span>主</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="zqDetailOddsChangeClass(key, '','a_capot_h_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdy]===undefined ? '-':itemDetail.a_capot_h!=null?formatOdds(itemDetail.a_capot_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqDetailOddsChangeClass(key, '','a_capot_h_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdy]===undefined ? '-':itemDetail.a_capot_h!=null?formatOdds(itemDetail.a_capot_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqOddsChangeTag(key, '','a_capot_h_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.zqdy,'dyk',itemDetail.a_capot_g,'TYZQ',hotDateType.zqDateType)">
                                <span>客</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="zqDetailOddsChangeClass(key, '','a_capot_d_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdy]===undefined ?  '-':itemDetail.a_capot_g!=null?formatOdds(itemDetail.a_capot_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqDetailOddsChangeClass(key, '','a_capot_d_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdy]===undefined ? '-':itemDetail.a_capot_g!=null?formatOdds(itemDetail.a_capot_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqOddsChangeTag(key, '','a_capot_d_change')"></span>
                              </div>
                              <div  class="all-style"
                                    @click="betDialogHandler(itemDetail,1,hotPlayType.zqdy,'dyh',itemDetail.a_capot_d,'TYZQ',hotDateType.zqDateType)">
                                <span>和</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="zqDetailOddsChangeClass(key, '','a_capot_g_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdy]===undefined ? '-':itemDetail.a_capot_d!=null?formatOdds(itemDetail.a_capot_d):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqDetailOddsChangeClass(key, '','a_capot_g_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdy]===undefined ? '-':itemDetail.a_capot_d!=null?formatOdds(itemDetail.a_capot_d):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqOddsChangeTag(key, '','a_capot_g_change')"></span>
                              </div>
                            </template>
                          </div>
                          <!-- 全场让球-->
                          <div class="all-let-the-ball">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.zqrq,'zr',itemDetail.a_concede_h,'TYZQ',hotDateType.zqDateType)">
                                <span :class="[itemDetail.concede ? 'showitems' : 'hideitems']">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqrq]===undefined ? '':itemDetail.a_concede_num}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="zqDetailOddsChangeClass(key, '','a_concede_h_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqrq]===undefined ? '-':itemDetail.a_concede_h!=null?formatOdds(itemDetail.a_concede_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqDetailOddsChangeClass(key, '','a_concede_h_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqrq]===undefined ? '-':itemDetail.a_concede_h!=null?formatOdds(itemDetail.a_concede_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqOddsChangeTag(key, '','a_concede_h_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.zqrq,'kr',itemDetail.a_concede_g,'TYZQ',hotDateType.zqDateType)">
                                <span :class="[!itemDetail.concede? 'showitems' : 'hideitems']">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqrq]===undefined ? '':itemDetail.a_concede_num}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="zqDetailOddsChangeClass(key, '','a_concede_g_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqrq]===undefined ? '-':itemDetail.a_concede_g!=null?formatOdds(itemDetail.a_concede_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqDetailOddsChangeClass(key, '','a_concede_g_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqrq]===undefined ? '-':itemDetail.a_concede_g!=null?formatOdds(itemDetail.a_concede_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqOddsChangeTag(key, '','a_concede_g_change')"></span>
                              </div>

                            </template>
                          </div>
                          <!-- 全场大小-->
                          <div class="all-size">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.zqdx,'dxz',itemDetail.a_d_num,'TYZQ',hotDateType.zqDateType)">
                                <span>{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdx]===undefined ? '':itemDetail.a_dq_num}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="zqDetailOddsChangeClass(key, '','a_d_num_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdx]===undefined ? '-':itemDetail.a_d_num!=null?formatOdds(itemDetail.a_d_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqDetailOddsChangeClass(key, '','a_d_num_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdx]===undefined ? '-':itemDetail.a_d_num!=null?formatOdds(itemDetail.a_d_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqOddsChangeTag(key, '','a_d_num_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.zqdx,'dxk',itemDetail.a_x_num,'TYZQ',hotDateType.zqDateType)">
                                <span></span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="zqDetailOddsChangeClass(key, '','a_x_num_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdx]===undefined ? '-':itemDetail.a_x_num!=null?formatOdds(itemDetail.a_x_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqDetailOddsChangeClass(key, '','a_x_num_change')">{{openItem[hotDateType.zqDateType]['TYZQ'][3][hotPlayType.zqdx]===undefined ? '-':itemDetail.a_x_num!=null?formatOdds(itemDetail.a_x_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="zqOddsChangeTag(key, '','a_x_num_change')"></span>
                              </div>

                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="center-content-li-three" @click="sportsClick(hotDateType.zqDateType,'TYZQ')">
                <div>
                  <span>所有足球{{getDateTypeName(hotDateType.zqDateType)}}</span><span style="color: #999999;margin-left: 5px"></span>
                  <span class="iconfont icon-youjiantou center-content-li-three-img"></span>
                </div>
              </div>
            </div>
            <!-- 热门足球赛事结束-->

            <!-- 热门蓝球赛事开始-->
            <div v-if="lmHotData.length>0" class="hot-sport">
              <div class="center-content-li-first">
                <div class="center-content-left">
                  <!--篮球-->
                  <span class="iconfont icon-lanqiu center-content-img"></span>
                  <span class="center-content-span" >篮球&美式足球</span>
                </div>
                <div class="center-content-center" >
                  <div class="title-box">
                    <span>独赢</span>
                    <span>让球</span>
                    <span>大小</span>
                  </div>
                </div>
              </div>
              <!--第一场-->
              <div class="center-content-li-two" v-if="lmHotData.length>0" v-for="(itemDetail,key) in lmHotData" :key="'lm'+itemDetail.id"  >
                <div class="ball-detaill">
                  <!--内容-->
                    <div class="item-info">
                      <!--左-->
                      <div @click="morePlay(itemDetail,'TYLM',hotDateType.lmDateType)" class="content-left">
                        <div class="content-left-first">
                          <div>
                            <span class="first-name-top">{{itemDetail.hteam}}</span>
                          </div>
                          <div class="first-score" v-if="hotDateType.lmDateType === '1'">{{itemDetail.hscore}}</div>
                        </div>
                        <div class="content-left-two">
                          <div>
                            <span class="first-name-top">{{itemDetail.gteam}}</span>
                          </div>
                          <div class="first-score" v-if="hotDateType.lmDateType === '1'">{{itemDetail.gscore}}</div>
                        </div>
                        <div class="content-left-three">
                          <div v-if="itemDetail.isLive === '1'" class="iconfont icon-gunqiu icon-style"></div>
                          <div v-if="hotDateType.lmDateType === '1'">{{
                            itemDetail.liveTime == 'Q1'?'第一节':
                              itemDetail.liveTime == 'Q2'?'第二节':
                                itemDetail.liveTime == 'Q3'?'第三节':
                                  itemDetail.liveTime == 'Q4'?'第四节':
                                    itemDetail.liveTime == 'HT'?'半场':
                                      itemDetail.liveTime == 'H1'?'上半场':
                                        itemDetail.liveTime == 'H2' ? '下半场' : '加时'
                            }} {{ itemDetail.liveTime == 'HT'?'':itemDetail.lastTime}}</div>
                          <div v-if="hotDateType.lmDateType != '1'">{{forMatDate(itemDetail.startTime)}}</div>
                          <div class="more_Num">+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                        </div>

                        <!--          <div class="content-left-three">
                    <div>{{itemDetail.liveStep}} {{itemDetail.lastTime}}</div>
                    <div>+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                    </div>-->
                      </div>
                      <!--中-->
                      <div class="content-center">
                        <div class="content-detail" >
                          <!-- 独赢-->
                          <div class="all-alone-win">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.lqdy,'dyz',itemDetail.capot_h,'TYLM',hotDateType.lmDateType)">
                                <span>主</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="lmDetailOddsChangeClass(key, '','capot_h_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqdy]===undefined ? '-':itemDetail.capot_h!=null?formatOdds(itemDetail.capot_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmDetailOddsChangeClass(key, '','capot_h_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqdy]===undefined ? '-':itemDetail.capot_h!=null?formatOdds(itemDetail.capot_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmOddsChangeTag(key, '','capot_h_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.lqdy,'dyk',itemDetail.capot_g,'TYLM',hotDateType.lmDateType)">
                                <span>客</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="lmDetailOddsChangeClass(key, '','capot_g_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqdy]===undefined ? '-':itemDetail.capot_g!=null?formatOdds(itemDetail.capot_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmDetailOddsChangeClass(key, '','capot_g_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqdy]===undefined ? '-':itemDetail.capot_g!=null?formatOdds(itemDetail.capot_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmOddsChangeTag(key, '','capot_g_change')"></span>
                              </div>
                            </template>
                          </div>
                          <!-- 全场让球-->
                          <div class="all-let-the-ball">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.lqrf,'zr',itemDetail.concede_g,'TYLM',hotDateType.lmDateType)">
                                <span :class="[itemDetail.concede? 'showitems' : 'hideitems']">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqrf]===undefined ? '':itemDetail.concede_num}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="lmDetailOddsChangeClass(key, '','concede_h_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqrf]===undefined ? '-':itemDetail.concede_h!=null?formatOdds(itemDetail.concede_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmDetailOddsChangeClass(key, '','concede_h_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqrf]===undefined ? '-':itemDetail.concede_h!=null?formatOdds(itemDetail.concede_h):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmOddsChangeTag(key, '','concede_h_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.lqrf,'kr',itemDetail.concede_h,'TYLM',hotDateType.lmDateType)">
                                <span :class="[!itemDetail.concede? 'showitems' : 'hideitems']">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqrf]===undefined ? '':itemDetail.concede_num}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="lmDetailOddsChangeClass(key, '','concede_g_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqrf]===undefined ? '-':itemDetail.concede_g!=null?formatOdds(itemDetail.concede_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmDetailOddsChangeClass(key, '','concede_g_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqrf]===undefined ? '-':itemDetail.concede_g!=null?formatOdds(itemDetail.concede_g):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'":class="lmOddsChangeTag(key, '','concede_g_change')"></span>
                              </div>

                            </template>
                          </div>
                          <!-- 全场大小-->
                          <div class="all-size">
                            <template >
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.lqdx,'dxz',itemDetail.d_num,'TYLM',hotDateType.lmDateType)">
                                <span>{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqdx]===undefined ? '':itemDetail.dq_num}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="lmDetailOddsChangeClass(key, '','d_num_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqdx]===undefined ? '-':itemDetail.d_num!=null?formatOdds(itemDetail.d_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmDetailOddsChangeClass(key, '','d_num_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqdx]===undefined ? '-':itemDetail.d_num!=null?formatOdds(itemDetail.d_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmOddsChangeTag(key, '','d_num_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.lqdx,'dxk',itemDetail.x_num,'TYLM',hotDateType.lmDateType)">
                                <span></span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="lmDetailOddsChangeClass(key, '','x_num_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqdx]===undefined ? '-':itemDetail.x_num!=null?formatOdds(itemDetail.x_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmDetailOddsChangeClass(key, '','x_num_change')">{{openItem[hotDateType.lmDateType]['TYLM'][3][hotPlayType.lqdx]===undefined ? '-':itemDetail.x_num!=null?formatOdds(itemDetail.x_num):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="lmOddsChangeTag(key, '','x_num_change')"></span>
                              </div>

                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="center-content-li-three" @click="sportsClick(hotDateType.lmDateType,'TYLM')">
                <div>
                  <span>所有篮球&美式足球{{getDateTypeName(hotDateType.lmDateType)}}</span><span style="color: #999999;margin-left: 5px"></span>
                  <span class="iconfont icon-youjiantou center-content-li-three-img"></span>
                </div>
              </div>
            </div>
            <!--热门篮球赛事结束-->

            <!--热门棒球赛事开始-->
            <div  v-if="bqHotData.length>0" class="hot-sport">
              <div class="center-content-li-first">
                <div class="center-content-left">
                  <!--棒球-->
                  <span class="iconfont icon-bangqiu center-content-img"></span>
                  <span class="center-content-span">棒球</span>
                </div>
                <div class="center-content-center" >
                  <div class="title-box">
                    <span>独赢</span>
                    <span>让球</span>
                    <span>大小</span>
                  </div>
                </div>
              </div>
              <!--第一场-->
              <div class="center-content-li-two" v-if="bqHotData.length>0" v-for="(itemDetail,key) in bqHotData" :key="'bq'+itemDetail.id"  >
                <div class="ball-detaill">
                  <!--内容-->
                    <div class="item-info">
                      <!--左-->
                      <div @click="morePlay(itemDetail,'TYBQ',hotDateType.bqDateType)" class="content-left">
                        <div class="content-left-first">
                          <div>
                            <span class="first-name-top">{{itemDetail.hteam}}</span>
                          </div>
                          <div class="first-score" v-if="hotDateType.bqDateType === '1'">{{itemDetail.hscore}}</div>
                        </div>
                        <div class="content-left-two">
                          <div>
                            <span class="first-name-top">{{itemDetail.gteam}}</span>
                          </div>
                          <div class="first-score" v-if="hotDateType.bqDateType === '1'">{{itemDetail.gscore}}</div>
                        </div>

                        <div class="content-left-three">
                          <div v-if="itemDetail.isLive === '1'" class="iconfont icon-gunqiu icon-style"></div>
                          <div v-if="hotDateType.bqDateType === '1'"></div>
                          <div v-if="hotDateType.bqDateType != '1'">{{forMatDate(itemDetail.startTime)}}</div>
                          <div class="more_Num">+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                        </div>
                        <!--                <div class="content-left-three">
                        <div>{{itemDetail.liveTime}}</div>
                        <div>+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                      </div>-->
                      </div>
                      <!--中-->
                      <div class="content-center">
                        <div class="content-detail" >
                          <!-- 独赢-->
                          <div class="all-alone-win">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.bqdy,'dyz',itemDetail.dIorMH,'TYBQ',hotDateType.bqDateType)">
                                <span>主</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="bqDetailOddsChangeClass(key, '','dIorMH_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqdy]===undefined ? '-':itemDetail.dIorMH != null ? formatOdds(itemDetail.dIorMH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqDetailOddsChangeClass(key, '','dIorMH_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqdy]===undefined ? '-':itemDetail.dIorMH != null ? formatOdds(itemDetail.dIorMH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqOddsChangeTag(key, '','dIorMH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.bqdy,'dyk',itemDetail.dIorMC,'TYBQ',hotDateType.bqDateType)">
                                <span>客</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="bqDetailOddsChangeClass(key, '','dIorMC_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqdy]===undefined ? '-':itemDetail.dIorMC != null ? formatOdds(itemDetail.dIorMC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqDetailOddsChangeClass(key, '','dIorMC_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqdy]===undefined ? '-':itemDetail.dIorMC != null ? formatOdds(itemDetail.dIorMC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqOddsChangeTag(key, '','dIorMC_change')"></span>
                              </div>
                            </template>
                          </div>
                          <!-- 全场让球-->
                          <div class="all-let-the-ball">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.bqrq,'rqz',itemDetail.dIorRH,'TYBQ',hotDateType.bqDateType)">
                                <span :class="[itemDetail.dStrong==='H' ? 'showitems' : 'hideitems']">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqrq]===undefined ? '':itemDetail.dRatio}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="bqDetailOddsChangeClass(key, '','dIorRH_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqrq]===undefined ? '-':itemDetail.dIorRH != null ? formatOdds(itemDetail.dIorRH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqDetailOddsChangeClass(key, '','dIorRH_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqrq]===undefined ? '-':itemDetail.dIorRH != null ? formatOdds(itemDetail.dIorRH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqOddsChangeTag(key, '','dIorRH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.bqrq,'rqk',itemDetail.dIorRC,'TYBQ',hotDateType.bqDateType)">
                                <span :class="[itemDetail.dStrong==='C' ? 'showitems' : 'hideitems']" >{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqrq]===undefined ? '':itemDetail.dRatio}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="bqDetailOddsChangeClass(key, '','dIorRC_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqrq]===undefined ? '-':itemDetail.dIorRC != null ? formatOdds(itemDetail.dIorRC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqDetailOddsChangeClass(key, '','dIorRC_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqrq]===undefined ? '-':itemDetail.dIorRC != null ? formatOdds(itemDetail.dIorRC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqOddsChangeTag(key, '','dIorRC_change')"></span>
                              </div>
                            </template>
                          </div>
                          <!-- 全场大小-->
                          <div class="all-size">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.bqdx,'dxz',itemDetail.dIorOUH,'TYBQ',hotDateType.bqDateType)">
                                <span>{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqdx]===undefined ? '':itemDetail.dRatioO}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="bqDetailOddsChangeClass(key, '','dIorOUH_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqdx]===undefined ? '':itemDetail.dIorOUH != null ? formatOdds(itemDetail.dIorOUH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqDetailOddsChangeClass(key, '','dIorOUH_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqdx]===undefined ? '':itemDetail.dIorOUH != null ? formatOdds(itemDetail.dIorOUH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqOddsChangeTag(key, '','dIorOUH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.bqdx,'dxk',itemDetail.dIorOUC,'TYBQ',hotDateType.bqDateType)">
                                <span></span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="bqDetailOddsChangeClass(key, '','dIorOUC_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqdx]===undefined ? '':itemDetail.dIorOUC != null ? formatOdds(itemDetail.dIorOUC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="bqDetailOddsChangeClass(key, '','dIorOUC_change')">{{openItem[hotDateType.bqDateType]['TYBQ'][3][hotPlayType.bqdx]===undefined ? '':itemDetail.dIorOUC != null ? formatOdds(itemDetail.dIorOUC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :style="bqOddsChangeTag(key, '','dIorOUC_change')"></span>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="center-content-li-three" @click="sportsClick(hotDateType.bqDateType,'TYBQ')">
                <div>
                  <span>所有棒球{{getDateTypeName(hotDateType.bqDateType)}}</span><span style="color: #999999;margin-left: 5px"></span>
                  <span class="iconfont icon-youjiantou center-content-li-three-img"></span>
                </div>
              </div>
            </div>
            <!--热门棒球赛事结束-->

            <!--热门网球赛事开始-->
            <div  v-if="wqHotData.length>0" class="hot-sport">
              <div class="center-content-li-first">
                <div class="center-content-left">
                  <!--网球-->
                  <span class="iconfont icon-wangqiu center-content-img"></span>
                  <span class="center-content-span">网球</span>
                </div>
                <div class="center-content-center" >
                  <div class="title-box">
                    <span>独赢</span>
                    <span>让盘</span>
                    <span>大小</span>
                  </div>
                </div>
              </div>
              <!--第一场-->
              <div class="center-content-li-two" v-if="wqHotData.length>0" v-for="(itemDetail,key) in wqHotData" :key="'wq'+itemDetail.id"  >
                <div class="ball-detaill">
                  <!--内容-->
                    <div class="item-info">
                      <!--左-->
                      <div @click="morePlay(itemDetail,'TYWQ',hotDateType.wqDateType)" class="content-left">
                        <div class="content-left-first">
                          <div>
                            <span class="first-name-top">{{itemDetail.hteam}}</span>
                          </div>
                          <div  class="first-score" v-if="hotDateType.wqDateType === '1'">{{itemDetail.hscore !== -1 ? itemDetail.hscore:'A'}}</div>
                        </div>
                        <div class="content-left-two">
                          <div>
                            <span class="first-name-top">{{itemDetail.gteam}}</span>
                          </div>
                          <div  class="first-score" v-if="hotDateType.wqDateType === '1'">{{itemDetail.gscore !== -1 ? itemDetail.gscore:'A'}}</div>
                        </div>
                        <div class="content-left-three">
                          <!--<div  v-if="itemDetail.isLive != '1'" class="iconfont icon-gunqiu icon-style"></div>-->
                          <!--<div></div>-->
                          <div v-if="hotDateType.wqDateType === '1'">盘:{{itemDetail.scoreGameH}}-{{itemDetail.scoreGameC}}  局:{{itemDetail.scoreSetH}}-{{itemDetail.scoreSetC}}</div>
                          <div v-if="hotDateType.wqDateType != '1'">{{itemDetail.showdelay == 'Y' ? '天气延赛':forMatDate(itemDetail.startTime)}}</div>
                          <div class="more_Num">+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                        </div>
                        <!--         <div class="content-left-three">
                     <div>{{itemDetail.liveTime}}</div>
                     <div>+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                   </div>-->
                      </div>
                      <!--中-->
                      <div class="content-center">
                        <div class="content-detail" >
                          <!-- 独赢-->
                          <div class="all-alone-win">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.wqdy,'dyz',itemDetail.dIorMH,'TYWQ',hotDateType.wqDateType)">
                                <span>主</span>
                                <span v-if="oddsSelect() === 'oddsCss1'"  :class="wqDetailOddsChangeClass(key, '','dIorMH_change')">{{openItem[hotDateType.wqDateType]['TYWQ'][3][hotPlayType.wqdy]===undefined ? '-':itemDetail.dIorMH != null ? formatOdds(itemDetail.dIorMH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="wqDetailOddsChangeClass(key, '','dIorMH_change')">{{openItem[hotDateType.wqDateType]['TYWQ'][3][hotPlayType.wqdy]===undefined ? '-':itemDetail.dIorMH!=null?itemDetail.dIorMH:'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'"  :class="wqOddsChangeTag(key, '','dIorMH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.wqdy,'dyk',itemDetail.dIorMC,'TYWQ',hotDateType.wqDateType)">
                                <span>客</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="wqDetailOddsChangeClass(key, '','dIorMC_change')">{{openItem[hotDateType.wqDateType]['TYWQ'][3][hotPlayType.wqdy]===undefined ? '-':itemDetail.dIorMC != null ? formatOdds(itemDetail.dIorMC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="wqDetailOddsChangeClass(key, '','dIorMC_change')">{{openItem[hotDateType.wqDateType]['TYWQ'][3][hotPlayType.wqdy]===undefined ? '-':itemDetail.dIorMC!=null?itemDetail.dIorMC:'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="wqOddsChangeTag(key, '','dIorMC_change')"></span>
                              </div>
                            </template>
                          </div>
                          <!-- 全场让球-->
                          <div class="all-let-the-ball">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.wqrp,'rqz',itemDetail.dIorRH,'TYWQ',hotDateType.wqDateType)">
                                <span :class="[itemDetail.dStrong=='H' ? 'showitems' : 'hideitems']"> {{openItem[hotDateType.wqDateType]['TYWQ'][3][hotPlayType.wqrp]===undefined ? '':itemDetail.dRatio}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="wqDetailOddsChangeClass(key, '','dIorRH_change')">{{openItem[hotDateType.wqDateType]['TYWQ'][3][hotPlayType.wqrp]===undefined ? '-':itemDetail.dIorRH != null ? formatOdds(itemDetail.dIorRH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="wqDetailOddsChangeClass(key, '','dIorRH_change')">{{openItem[hotDateType.wqDateType]['TYWQ'][3][hotPlayType.wqrp]===undefined ? '-':itemDetail.dIorRH!=null?itemDetail.dIorRH:'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="wqOddsChangeTag(key, '','dIorRH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.wqrp,'rqk',itemDetail.dIorRC,'TYWQ',hotDateType.wqDateType)">
                                <span :class="[itemDetail.dStrong=='C' ? 'showitems' : 'hideitems']">{{openItem[hotDateType.wqDateType]['TYWQ'][3][hotPlayType.wqrp]===undefined ? '':itemDetail.dRatio}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="wqDetailOddsChangeClass(key, '','dIorRC_change')">{{openItem[hotDateType.wqDateType]['TYWQ'][3][hotPlayType.wqrp]===undefined ? '-':itemDetail.dIorRC != null ? formatOdds(itemDetail.dIorRC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="wqDetailOddsChangeClass(key, '','dIorRC_change')">{{openItem[hotDateType.wqDateType]['TYWQ'][3][hotPlayType.wqrp]===undefined ? '-':itemDetail.dIorRC!=null?itemDetail.dIorRC:'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="wqOddsChangeTag(key, '','dIorRC_change')"></span>
                              </div>
                            </template>
                          </div>
                          <!--全场大小-->
                          <div class="all-size">
                            <div class="all-style" @click="betDialogHandler(item,betData.host,betData.betType.football.qcdx,'dxqd')"><span></span><span>-</span></div>
                            <div class="all-style" @click="betDialogHandler(item,!betData.host,betData.betType.football.qcdx,'dxqx')"><span></span><span>-</span></div>
                            <!-- <div class="all-style"><span>{{itemDetail.a_capot_h}}</span><span>{{itemDetail.a_capot_h}}</span></div>-->
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="center-content-li-three" @click="sportsClick(hotDateType.wqDateType,'TYWQ')">
                <div>
                  <span>所有网球{{getDateTypeName(hotDateType.wqDateType)}}</span><span style="color: #999999;margin-left: 5px"></span>
                  <span class="iconfont icon-youjiantou center-content-li-three-img"></span>
                </div>
              </div>
            </div>
            <!--热门网球赛事结束-->


            <!--热门排球赛事开始-->
            <div  v-if="pqHotData.length>0" class="hot-sport">
              <div class="center-content-li-first">
                <div class="center-content-left">
                  <!--排球-->
                  <span class="iconfont icon-paiqiu center-content-img"></span>
                  <span class="center-content-span">排球</span>
                </div>
                <div class="center-content-center" >
                  <div class="title-box">
                    <span>独赢</span>
                    <span>让局</span>
                    <span>大小</span>
                  </div>
                </div>
              </div>
              <!--第一场-->
              <div class="center-content-li-two" v-if="pqHotData.length>0" v-for="(itemDetail,key) in pqHotData" :key="'pq'+itemDetail.id"  >
                <div class="ball-detaill">
                  <!--内容-->
                    <div class="item-info">
                      <!--左-->
                      <div @click="morePlay(itemDetail,'TYPQ',hotDateType.pqDateType)" class="content-left">
                        <div class="content-left-first">
                          <div>
                            <span class="first-name-top">{{itemDetail.hteam}}</span>
                          </div>
                          <div class="first-score" v-if="hotDateType.pqDateType === '1'">{{itemDetail.hscore}}</div>
                        </div>
                        <div class="content-left-two">
                          <div>
                            <span class="first-name-top">{{itemDetail.gteam}}</span>
                          </div>
                          <div class="first-score" v-if="hotDateType.pqDateType === '1'">{{itemDetail.gscore}}</div>
                        </div>

                        <div class="content-left-three">
                          <div v-if="itemDetail.isLive === '1'" class="iconfont icon-gunqiu icon-style"></div>
                          <div v-if="hotDateType.pqDateType === '1'">局:{{itemDetail.scoreSetH}}-{{itemDetail.scoreSetC}}</div>
                          <div v-if="hotDateType.pqDateType != '1'">{{forMatDate(itemDetail.startTime)}}</div>
                          <div class="more_Num">+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                        </div>
                        <!--       <div class="content-left-three">
                   <div>{{itemDetail.liveTime}}</div>
                   <div>+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                   </div>-->
                      </div>
                      <!--中-->
                      <div class="content-center">
                        <div class="content-detail" >
                          <!-- 独赢-->
                          <div class="all-alone-win">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.pqdy,'dyz',itemDetail.dIorMH,'TYPQ',hotDateType.pqDateType)">
                                <span>主</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="pqDetailOddsChangeClass(key, '','dIorMH_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqdy]===undefined ? '-':itemDetail.dIorMH != null ? formatOdds(itemDetail.dIorMH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="pqDetailOddsChangeClass(key, '','dIorMH_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqdy]===undefined ? '-':itemDetail.dIorMH != null ? formatOdds(itemDetail.dIorMH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="pqOddsChangeTag(key, '','dIorMH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.pqdy,'dyk',itemDetail.dIorMC,'TYPQ',hotDateType.pqDateType)">
                                <span>客</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="pqDetailOddsChangeClass(key, '','dIorMC_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqdy]===undefined ? '-':itemDetail.dIorMC != null ? formatOdds(itemDetail.dIorMC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="pqDetailOddsChangeClass(key, '','dIorMC_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqdy]===undefined ? '-':itemDetail.dIorMC != null ? formatOdds(itemDetail.dIorMC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="pqOddsChangeTag(key, '','dIorMC_change')"></span>
                              </div>
                            </template>
                          </div>
                          <!-- 全场让球-->
                          <div class="all-let-the-ball">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.pqrf,'zr',itemDetail.dIorRH,'TYPQ',hotDateType.pqDateType)">
                                <span :class="[itemDetail.dStrong=='H' ? 'showitems' : 'hideitems']"> {{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqrf]===undefined ? '':itemDetail.dRatio}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'"  :class="pqDetailOddsChangeClass(key, '','dIorRH_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqrf]===undefined ? '-':itemDetail.dIorRH != null ? formatOdds(itemDetail.dIorRH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="pqDetailOddsChangeClass(key, '','dIorRH_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqrf]===undefined ? '-':itemDetail.dIorRH != null ? formatOdds(itemDetail.dIorRH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'"  :class="pqOddsChangeTag(key, '','dIorRH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.pqrf,'kr',itemDetail.dIorRC,'TYPQ',hotDateType.pqDateType)">
                                <span :class="[itemDetail.dStrong=='C' ? 'showitems' : 'hideitems']">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqrf]===undefined ? '':itemDetail.dRatio}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="pqDetailOddsChangeClass(key, '','dIorRC_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqrf]===undefined ? '-':itemDetail.dIorRC != null ? formatOdds(itemDetail.dIorRC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="pqDetailOddsChangeClass(key, '','dIorRC_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqrf]===undefined ? '-':itemDetail.dIorRC != null ? formatOdds(itemDetail.dIorRC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="pqOddsChangeTag(key, '','dIorRC_change')"></span>
                              </div>
                            </template>
                          </div>
                          <!-- 全场大小-->
                          <div class="all-size">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.pqdx,'zfdxkd',itemDetail.dIorOUH,'TYPQ',hotDateType.pqDateType)">
                                <span>{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqdx]===undefined ? '-':itemDetail.dRatioO}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="pqDetailOddsChangeClass(key, '','dIorOUH_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqdx]===undefined ? '-':itemDetail.dIorOUH != null ? formatOdds(itemDetail.dIorOUH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="pqDetailOddsChangeClass(key, '','dIorOUH_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqdx]===undefined ? '-':itemDetail.dIorOUH != null ? formatOdds(itemDetail.dIorOUH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="pqOddsChangeTag(key, '','dIorOUH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.pqdx,'zfdxkx',itemDetail.dIorOUC,'TYPQ',hotDateType.pqDateType)">
                                <span>{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqdx]===undefined ? '':itemDetail.dRatioU}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="pqDetailOddsChangeClass(key, '','dIorOUC_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqdx]===undefined ? '-':itemDetail.dIorOUC != null ? formatOdds(itemDetail.dIorOUC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="pqDetailOddsChangeClass(key, '','dIorOUC_change')">{{openItem[hotDateType.pqDateType]['TYPQ'][3][hotPlayType.pqdx]===undefined ? '-':itemDetail.dIorOUC != null ? formatOdds(itemDetail.dIorOUC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'"  :class="pqOddsChangeTag(key, '','dIorOUC_change')"></span>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="center-content-li-three" @click="sportsClick(hotDateType.pqDateType,'TYPQ')">
                <div>
                  <span>所有排球{{getDateTypeName(hotDateType.pqDateType)}}</span><span style="color: #999999;margin-left: 5px"></span>
                  <span class="iconfont icon-youjiantou center-content-li-three-img"></span>
                </div>
              </div>
            </div>
            <!--热门排球赛事结束-->


            <!--热门其他赛事开始-->
            <div  v-if="qtHotData.length>0" class="hot-sport">
              <div class="center-content-li-first">
                <div class="center-content-left">
                  <!--其他-->
                  <span class="iconfont icon-qita center-content-img"></span>
                  <span class="center-content-span">其他</span>
                </div>
                <div class="center-content-center" >
                  <div class="title-box">
                    <span>独赢</span>
                    <span>让球</span>
                    <span>大小</span>
                  </div>
                </div>
              </div>
              <!--第一场-->
              <div class="center-content-li-two" v-if="qtHotData.length>0" v-for="(itemDetail,key) in qtHotData" :key="'pq'+itemDetail.id"  >
                <div class="ball-detaill">
                  <!--内容-->
                    <div class="item-info">
                      <!--左-->
                      <div @click="morePlay(itemDetail,'TYQT',hotDateType.qtDateType)" class="content-left">
                        <div class="content-left-first">
                          <div>
                            <span class="first-name-top">{{itemDetail.hteam}}</span>
                          </div>
                          <div class="first-score"  v-if="hotDateType.qtDateType === '1'">{{itemDetail.hscore}}</div>
                        </div>
                        <div class="content-left-two">
                          <div>
                            <span class="first-name-top">{{itemDetail.gteam}}</span>
                          </div>
                          <div class="first-score" v-if="hotDateType.qtDateType === '1'">{{itemDetail.gscore}}</div>
                        </div>
                        <div class="content-left-three">
                          <div v-if="itemDetail.isLive === '1'" class="iconfont icon-gunqiu icon-style"></div>
                          <div v-if="hotDateType.qtDateType === '1'"></div>
                          <div v-if="hotDateType.qtDateType != '1'">{{forMatDate(itemDetail.startTime)}}</div>
                          <div class="more_Num">+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                        </div>
                        <!--         <div class="content-left-three">
                     <div></div>
                     <div>+{{itemDetail.morePlayNum?itemDetail.morePlayNum:'0'}}</div>
                   </div>-->
                      </div>
                      <!--中-->
                      <div class="content-center">
                        <div class="content-detail" >
                          <!-- 独赢-->
                          <div class="all-alone-win">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.qtdy,'dy',itemDetail.dIorMH,'TYQT',hotDateType.qtDateType)">
                                <span>主</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="qtDetailOddsChangeClass(key, '','dIorMH_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdy]===undefined ? '-':itemDetail.hasOwnProperty('dIorMH') && '' != itemDetail.dIorMH ?formatOdds(itemDetail.dIorMH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtDetailOddsChangeClass(key, '','dIorMH_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdy]===undefined ? '-':itemDetail.hasOwnProperty('dIorMH') && '' != itemDetail.dIorMH ?formatOdds(itemDetail.dIorMH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtOddsChangeTag(key, '','dIorMH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.qtdy,'dy',itemDetail.dIorMC,'TYQT',hotDateType.qtDateType)">
                                <span>客</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="qtDetailOddsChangeClass(key, '','dIorMC_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdy]===undefined ? '-':(itemDetail.hasOwnProperty('dIorMC') && '' != itemDetail.dIorMC )?formatOdds(itemDetail.dIorMC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtDetailOddsChangeClass(key, '','dIorMC_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdy]===undefined ? '-':(itemDetail.hasOwnProperty('dIorMC') && '' != itemDetail.dIorMC )?formatOdds(itemDetail.dIorMC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtOddsChangeTag(key, '','dIorMC_change')"></span>
                              </div>
                              <!--v-if="itemDetail.hasOwnProperty('dIorMN') && '' != itemDetail.dIorMN !=''"-->
                              <div  class="all-style"
                                   @click="betDialogHandler(itemDetail,1,hotPlayType.qtdy,'dyh',itemDetail.dIorMN,'TYQT',hotDateType.qtDateType)">
                                <span>和</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="qtDetailOddsChangeClass(key, '','dIorMN_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdy]===undefined ? '-':(itemDetail.hasOwnProperty('dIorMN') && '' != itemDetail.dIorMN !='')?formatOdds(itemDetail.dIorMN):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtDetailOddsChangeClass(key, '','dIorMN_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdy]===undefined ? '-':(itemDetail.hasOwnProperty('dIorMN') && '' != itemDetail.dIorMN !='')?formatOdds(itemDetail.dIorMN):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtOddsChangeTag(key, '','dIorMN_change')"></span>
                              </div>
                            </template>
                          </div>
                          <!-- 全场让球-->
                          <div class="all-let-the-ball">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.qtrq,'qcrq',itemDetail.dIorRH,'TYQT',hotDateType.qtDateType)">
                                <span :class="[itemDetail.dStrong=='H' ? 'showitems' : 'hideitems']">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtrq]===undefined ? '':itemDetail.dRatio}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="qtDetailOddsChangeClass(key, '','dIorRH_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtrq]===undefined ? '-':itemDetail.hasOwnProperty('dIorRH') && '' != itemDetail.dIorRH ?formatOdds(itemDetail.dIorRH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtDetailOddsChangeClass(key, '','dIorRH_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtrq]===undefined ? '-':itemDetail.hasOwnProperty('dIorRH') && '' != itemDetail.dIorRH ?formatOdds(itemDetail.dIorRH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtOddsChangeTag(key, '','dIorRH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.qtrq,'qcrq',itemDetail.dIorRC,'TYQT',hotDateType.qtDateType)">
                                <span :class="[itemDetail.dStrong=='C' ? 'showitems' : 'hideitems']">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtrq]===undefined ? '':itemDetail.dRatio}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="qtDetailOddsChangeClass(key, '','dIorRC_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtrq]===undefined ? '-':itemDetail.hasOwnProperty('dIorRC') && '' != itemDetail.dIorRC != ''?formatOdds(itemDetail.dIorRC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtDetailOddsChangeClass(key, '','dIorRC_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtrq]===undefined ? '-':itemDetail.hasOwnProperty('dIorRC') && '' != itemDetail.dIorRC != ''?formatOdds(itemDetail.dIorRC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtOddsChangeTag(key, '','dIorRC_change')"></span>
                              </div>
                            </template>
                          </div>
                          <!-- 全场大小-->
                          <div class="all-size">
                            <template>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,playType.host,hotPlayType.qtdx,'dxz',itemDetail.dIorOUH,'TYQT',hotDateType.qtDateType)">
                                <span>{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdx]===undefined ? '':itemDetail.dRatioO}}</span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="qtDetailOddsChangeClass(key, '','dIorOUH_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdx]===undefined ? '-':itemDetail.hasOwnProperty('dIorOUH') && '' != itemDetail.dIorOUH ?formatOdds(itemDetail.dIorOUH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtDetailOddsChangeClass(key, '','dIorOUH_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdx]===undefined ? '-':itemDetail.hasOwnProperty('dIorOUH') && '' != itemDetail.dIorOUH ?formatOdds(itemDetail.dIorOUH):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtOddsChangeTag(key, '','dIorOUH_change')"></span>
                              </div>
                              <div class="all-style"
                                   @click="betDialogHandler(itemDetail,!playType.host,hotPlayType.qtdx,'dxk',itemDetail.dIorOUC,'TYQT',hotDateType.qtDateType)">
                                <span></span>
                                <span v-if="oddsSelect() === 'oddsCss1'" :class="qtDetailOddsChangeClass(key, '','dIorOUC_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdx]===undefined ? '-':itemDetail.hasOwnProperty('dIorOUC') && '' !=  itemDetail.dIorOUC ?formatOdds(itemDetail.dIorOUC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtDetailOddsChangeClass(key, '','dIorOUC_change')">{{openItem[hotDateType.qtDateType]['TYQT'][3][hotPlayType.qtdx]===undefined ? '-':itemDetail.hasOwnProperty('dIorOUC') && '' !=  itemDetail.dIorOUC ?formatOdds(itemDetail.dIorOUC):'-'}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" :class="qtOddsChangeTag(key, '','dIorOUC_change')"></span>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="center-content-li-three" @click="sportsClick(hotDateType.qtDateType,'TYQT')">
                <div>
                  <span>所有其他{{getDateTypeName(hotDateType.qtDateType)}}</span><span style="color: #999999;margin-left: 5px"></span>
                  <span class="iconfont icon-youjiantou center-content-li-three-img"></span>
                </div>
              </div>
            </div>
            <!--热门其他赛事结束-->
        </div>
        <!--玩法维护2018-08-01 12:00:00-->
        <div v-else class="maintain-box">
          <div class="play-maintain">
            <div>
              <img src="../../../static/imgs/my/home_maintain@2x.png" alt="">
            </div>
            <div>
              <p>玩法维护中</p>
              <p>预计在 {{playforMatDate(hotMatches.endTime)}} (GMT+8) 完成！</p>
            </div>
          </div>
        </div>
    </div>


</template>

<script src="../../js/home/centerContent.js"></script>
<style scoped lang='scss'>
    @import '../../scss/centerContent/centerContent';
</style>
