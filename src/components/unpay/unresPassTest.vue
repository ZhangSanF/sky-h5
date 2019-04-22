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
                <div class="single_item" v-for="list in parse(passTestData.betContent)" >
                    <div class="result_line">
                        <span>{{ list.team1 }}</span>
                        <span class="team_score" v-if="list.isHteam == 'Y'">{{list.point}}</span>
                        <span class="team_vs">VS</span>
                        <span >{{list.team2}}</span>
                        <!--<span class="game_score">({{item.betContent.rePoint}})</span>-->
                        <span class="team_score" v-if="list.isHteam == 'N'">{{list.point}}</span>
                    </div>
                    <p class="game_name">{{formatStartTime(list.startTime)}}&nbsp;{{list.leagueName}}</p>
                    <p class="settle_status">
                        <span class="game_kind">
                            {{passTestData.gameName}}-{{list.mixType}}
                            <!--{{item.gameName}}-{{list.mixType}} &nbsp;({{item.rePoint}})-->
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

                        </div>
                        <span class="cancel_state"  :style="{color: passTestData.status === 1 ? '#11A7DE' : passTestData.status === 2 ? '#B1192B':'333333'}">
                          {{passTestData.status === 1 ? $t('msg.normal') : passTestData.status === 2? $t('msg.to_be_confirmed') : $t('msg.cancelled_by_system')}}
                        </span>
                    </div>
                    <div class="forecast_result">
                        <div class="bet_content">
                            <span class="txt_style">投注额: </span>
                            <span class="bet_num">{{winFormatMoney(passTestData.betAmount)}}</span>
                        </div>
                        <div class="win_amount">
                            <span class="txt_style">可赢金额: </span>
                            <span class="bet_num">{{winFormatMoney(formatMoney(passTestData.currentOdds,passTestData.betAmount))}}</span>
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

<script src="../../js/unpaid/unresPassTest.js"></script>

<style scoped lang="scss">
    @import "../../scss/unpaid/unres_pass_test.scss";
</style>

