<template>
      <div>
            <div class="dialog_mask" @click="goBackPage"></div>
            <div class="dialog_content" ref="bet">
                  <div>
                      <div class="title">
                          <div class="content">
                              <img src="../../../static/imgs/bet_title_left@2x.png" alt="">
                              <span>{{showTextObj[0].isMix==='0'?showTextObj[0].leagueName:'串关投注'}}</span>
                              <img src="../../../static/imgs/bet_title_right@2x.png" alt="">
                          </div>
                      </div>
                  </div>
                  <div class="body_part">
                      <div v-if="baseParam.isMix != 1" style="min-height: 1.35rem">
                          <!--对阵双方-->
                          <div class="teams_name">
                              <!--队伍名称-->
                              <div class="player_name_info">
                                  <span>
                                      {{showTextObj[0].hTeam}}
                                      <span class="team_score">{{oddsData[0].isWho == '0' || oddsData[0].isWho == '1' ? oddsData[0].detail : ' '}}</span>
                                  </span>
                                  <span class="vs_style">VS</span>
                                  <span>
                                      {{showTextObj[0].gTeam}}
                                      <span class="team_score">{{oddsData[0].isWho == '2' || oddsData[0].isWho == '3' ? oddsData[0].detail : ' '}}</span>
                                  </span>
                              </div>
                          </div>
                          <!--比赛信息-->
                          <div class="team1_info">
                              <div class="info-box">
                                  <div class="teams_name">
                                      {{showTextObj[0].betPoint}}
                                      <span class="team1_score">{{oddsData[0].xDetail == null ? '' : oddsData[0].xDetail}}</span>
                                  </div>
                                  <div class="center-score">@<span class="bold" :class="oddsChange(0,'exodds_change')">{{oddsData[0].exOdds}}</span></div>
                                  <div class="game_type_name">{{showTextObj[0].playName}} <template v-if="showTextObj[0].dateType==='1'"> ({{oddsData[0].hScore == -1 ? 'A':oddsData[0].hScore}}:{{oddsData[0].gScore == -1 ? 'A':oddsData[0].gScore}})</template></div>
                              </div>
                          </div>
                      </div>
                        <div v-else class="game_info" ref="dataWrapper">
                              <div>
                                    <!--综合过关投注信息-->
                                    <div>
                                          <div v-if="showTextObj.length == oddsData.length" class="chosen_bet_data_box">
                                                <div class="chosen_bet_item" :id="'div'+index" v-for="(item, index) in showTextObj" :key="index">
                                                      <span :style="{display}" class="iconfont icon-guanbi close_btn" @click="deleteItem(index)"></span>
                                                      <div class="pass_teams_name">
                                                            <span class="team1_name">{{item.hTeam}}</span>
                                                            <span class="team1_score" v-if="oddsData[index].isWho == '0' || oddsData[index].isWho == '1'">
                                                                  {{oddsData[index].detail == null ? '' : oddsData[index].detail}}
                                                            </span>
                                                            <span class="vs_style">VS</span>
                                                            <span class="team2_name">{{item.gTeam}}</span>
                                                            <span class="team1_score"  v-if="oddsData[index].isWho == '2' || oddsData[index].isWho == '3'">
                                                                  {{oddsData[index].detail == null ? '' : oddsData[index].detail}}
                                                             </span>
                                                      </div>
                                                      <div class="team1_infomation">
                                                            <span>  {{item.betPoint}}
                                                                  <span class="team1_score">{{oddsData[index].xDetail == null ? '' : oddsData[index].xDetail}}</span>
                                                                   @
                                                            </span>
                                                            <span class="team1_score" :class="oddsChange(index,'exodds_change')">{{oddsData[index].exOdds}}</span>
                                                      </div>
                                                      <div class="game_name">
                                                            {{item.playName}}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <!--投注信息-->
                        <div class="account_info">
                              <!--目前余额--><!--投注结果-->
                              <div class="cur_balance">
                                    <i class="inner_circle"></i>
                                    <i class="outer_circle"></i>
                                    <p class="balance_txt" v-if="orderState !== 'bet_result'">
                                      {{$t('msg.current_balance') }}: <span>{{userBalance}}</span>
                                    </p>
                                    <div class="bet_money_account" v-else>
                                          <span class="bet_txt_style">{{ $t('msg.bet_amount') }}:</span>
                                          <span class="bet_num_style">{{inputMoney}}</span>
                                    </div>
                                    <span class="left_line left-line-1"></span>
                                    <span class="left_line left-line-2"></span>
                              </div>
                              <!--单注最低--> <!--可赢额-->
                              <div class="single_bet">
                                    <i class="inner_circle"></i>
                                    <i class="outer_circle"></i>
                                    <p class="single_num" v-if="orderState !== 'bet_result'">
                                        <span>{{ $t('msg.single_bet_min') }}：{{minBet}}</span>
                                        <span>{{ $t('msg.single_bet_max') }}：{{maxBet}}</span>
                                    </p>
                                    <div class="win_money_account" v-else>
                                          <span class="win_txt_style">{{ $t('msg.may_win_amount') }}:</span>
                                          <span class="win_num_style">{{winFormatMoney(mayWinMoney)}}</span>
                                    </div>
                                    <span class="left_line left-line-1"></span>
                                    <span class="left_line left-line-2"></span>
                                    <span class="left_line left-line-3" v-if="orderState !== 'bet_result'"></span>
                                    <span class="left_line left-line-4" v-if="orderState !== 'bet_result'"></span>
                              </div>
                              <!--金额-->
                              <div v-if="orderState !== 'bet_result'" class="account_num">
                                    <i class="inner_circle"></i>
                                    <i class="outer_circle"></i>
                                    <p class="account_box">
                                          <span class="num_style">
                                              <input placeholder="" id="inputMoneyId" v-model="inputMoney" class="input_box" type="tel" v-on:input="checkMoney"  contenteditable="true" autocomplete="off"> <!--pattern="\d*" -->
                                          </span>
                                          <span class="unit_style">RMB</span>
                                    </p>
                                    <span v-if="orderState !== 'bet_result'" class="left_line left-line-1"></span>
                                    <span v-if="orderState !== 'bet_result'" class="left_line left-line-2"></span>
                                    <span v-if="orderState !== 'bet_result'" class="left_line left-line-3"></span>
                                    <span v-if="orderState !== 'bet_result'" class="left_line left-line-4"></span>
                                    <span v-if="orderState !== 'bet_result'" class="left_line left-line-5"></span>
                                    <span v-if="orderState !== 'bet_result'" class="left_line left-line-6"></span>
                              </div>
                              <!--投注单号-->
                              <div v-else class="bet-order">
                                  <i class="inner_circle"></i>
                                  <i class="outer_circle"></i>
                                  <p class="order-box">
                                      <span>{{ $t('msg.bet_order_code') }}: </span>
                                      <span>{{betCode}}</span>
                                  </p>
                              </div>
                              <!--选择-->
                              <div class="auto_choose" v-if="orderState !== 'bet_result'">
                                    <span @click="radioState">
                                        <i v-if="chooseRadio" class="iconfont icon-dagou radio_icon"></i>
                                        <i v-else class="no-select"></i>
                                        <span class="info">{{ $t('msg.accept_higher_bet_auto') }}</span>
                                    </span>
                                    <p class="refresh" @click="refreshTimer">
                                        <img src="../../../static/imgs/icon_recycle@2x.png" alt="">
                                        <span>{{timerCount}}</span>
                                    </p>
                              </div>
                              <!--提示信息-->
                              <div class="cur_bet_num" v-if="orderState !== 'bet_result' && infoMsg!=''&& infoMsg!=null" >
                                  <img class="error"  src="../../../static/imgs/sync_error@2x.png" alt="">
                                  <span>{{infoMsg}}</span>
                              </div>
                          <!--提示信息-->
                          <div class="cur_bet_num_suc" v-if="infoMsg!=''&& infoMsg!=null && orderState === 'bet_result'">
                            <img class="success" src="../../../static/imgs/sync_success@2x.png" alt="">
                            <span>{{infoMsg}}</span>
                          </div>
                        </div>
                        <!--确定按钮-->
                        <div class="confirm_btn" v-if="orderState === 'toConfirm'"  @click="changeConfirmState">
                              <span class="confirm_btn_txt">{{ $t('msg.confirm') }}</span>
                              <p class="single_num" v-if="orderState === 'toConfirm'">
                                    {{ $t('msg.will_win_amount') }} <span>{{winFormatMoney(mayWinMoney)}}</span> RMB
                              </p>
                        </div>
                        <!--下注提交中-->
                        <div class="confirming_bet" v-if="orderState === 'confirming'">
                              <p class="confirm_txt">{{ $t('msg.confirming') }}</p>
                              <p class="confirm_tip"  v-show="baseParam.dateType === '1'">{{ $t('msg.may_delay') }}</p>
                        </div>
                        <!--投注成功-->
                        <div class="bet_success" v-if="orderState === 'bet_result'">
                              <span class="continue_btn" @click="goBackPage">{{ $t('msg.continue') }}</span>
                              <span class="show_history" @click="goHistory">{{ $t('msg.show_bet_history') }}</span>
                        </div>
                  </div>
            </div>
            <toast v-show="toasting"></toast>
            <isDelete v-if="isClose" @isDelete="updateDelete"></isDelete>
      </div>
</template>

<script src="../../js/home_sports_event/tradeDialog.js"></script>

<style scoped lang="scss">
      @import "../../scss/home_sports_event/tradeDialog";
</style>
