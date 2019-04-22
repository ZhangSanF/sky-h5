<template>
    <div>
        <div class="pass_test_container">
            <!--综合过关类型-->
            <div class="divider_title">
                <span class="pass_test">综合过关</span>
                <span class="test_type">{{ passTestData.playName.slice(passTestData.playName.indexOf('(') + 1, passTestData.playName.indexOf(')') ) }}</span>
            </div>
            <!--主体内容-->
            <div class="main_content">
                <!--投注明细-->
                <div class="single_item" v-for="(list,key) in parse(passTestData.betContent)">
                    <div class="result_line">
                        <span>{{ list.team1 }}</span>
                        <span class="team_score" v-if="list.isHteam == 'Y'">{{ list.point }}</span><!--让球数-->
                        <span class="team_vs">VS</span>
                        <span >{{ list.team2 }}</span>
                        <span class="team_score" v-if="list.isHteam == 'N'">{{list.point}}</span>
                        <span class="result">({{getResult(key)}})</span>
                      <!-- <span class="game_score" v-if="passTestData.status == 1">({{getResult(passTestData.awardResult,key)}})</span>最后比赛结果-->
                    </div>
                    <p class="game_name">{{formatStartTime(list.startTime)}}&nbsp;{{ list.leagueName }}</p>
                    <p class="settle_status">
                        <span class="game_kind"><!--投注时比分-->
                          {{passTestData.gameName}}-{{list.mixType}}
                            <!--{{passTestData.gameName}}-{{passTestData.playName}} &nbsp;({{ list.point }})-->
                        </span>
                    </p>
                    <p class="team_params">
                        <span class="team_first_name">{{list.betWho}}</span>
                        <i class="at_icon">@</i>
                        <span class="bet_rate">{{formatOdds(list.odds)}}</span>
                    </p>
                </div>
                <!--金额信息-->
                <div class="more_info">
                    <div class="pass_test_info">
                        <div class="pass_test_bet">
                            <span class="pass_test_num">{{passTestData.pass_bet}}</span>
                        </div>
                        <span class="cancel_state" :style="{color: passTestData.status === 1 ? '#333333' : '#B1192B'}">
                          {{passTestData.status === 1 ? $t('msg.settled') : $t('msg.cancelled_by_system')}}
                        </span>
                    </div>
                    <div class="forecast_result">
                        <div class="bet_content">
                            <span class="txt_style">投注额: </span>
                            <span class="bet_num">{{winFormatMoney(passTestData.betAmount)}}</span>
                        </div>
                        <div class="result_content">
                          <span class="txt_style" v-if="passTestData.winStatus==5">赢:<span class="win_num">+{{-passTestData.profit}}&nbsp;</span></span>
                          <span class="txt_style" v-if="passTestData.winStatus==4">赢一半:<span class="win_num">+{{-notPassTestData.profit}}&nbsp;</span></span>

                          <span class="txt_style" v-if="passTestData.winStatus==1">输: <span class="lose_num">-{{passTestData.profit}}&nbsp;</span></span>
                          <span class="txt_style" v-if="passTestData.winStatus==2">输一半: <span class="lose_num">-{{passTestData.profit}}&nbsp;</span></span>

                          <span class="txt_style" v-if="passTestData.winStatus==3">平:<span class="tie_num">0.00</span></span>
                          <span class="txt_style" v-if="passTestData.winStatus==6">可赢金额:{{winFormatMoney(formatMoney(passTestData.currentOdds,passTestData.betAmount))}}</span>
                        </div>
                    </div>
                    <div class="other_info">
                        <span>{{passTestData.billNo}}</span>
                        <div>
                            <span>{{formatCreateTime(passTestData.createDate)}}</span>
                            <span>
                            ({{ passTestData.plate === 'I' ? $t('msg.in_handicap'): passTestData.plate === 'M' ? $t('msg.ma_handicap'): passTestData.plate === 'E' ? $t('msg.eu_handicap'): $t('msg.hk_handicap') }})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script src="../../js/pay/passTest.js"></script>

<style scoped lang="scss">
    @import "../../scss/pay/pass_test.scss";
</style>

