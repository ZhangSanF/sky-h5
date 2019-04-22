<template>
    <div class="paid_item_box">
        <div class="single_item">
            <!--双方队名-->
            <div class="result_line">
                <span >{{parse(notPassTestData.betContent).team1}}</span>
                <span class="team_score" v-if="playName(notPassTestData.gamePlayId,notPassTestData.betContent)==0">{{notPassTestData.oddsProject}}</span>
                <span class="team_vs">VS</span>
                <span >{{parse(notPassTestData.betContent).team2}}</span>
                <span class="team_score" v-if="playName(notPassTestData.gamePlayId,notPassTestData.betContent)==1">{{notPassTestData.oddsProject}}</span>
                <span class="team_score" v-if="isPlayFootball(notPassTestData.gamePlayId)">&nbsp;({{parse(notPassTestData.betContent).rePoint}})</span>
                <span class="result" v-if="notPassTestData.status!=3 && notPassTestData.status!=0">&nbsp;({{notPassTestData.awardResult}})</span>
            </div>
            <!--比赛名称-->
            <p class="game_name">{{formatStartDate(notPassTestData.startTime)}}&nbsp;{{notPassTestData.leagueName}}</p>
            <!--比赛信息-->
            <p class="settle_status">
              <!--<template v-if="notPassTestData.isBalance == 1">({{notPassTestData.awardResult}})</template>-->
              <span class="game_kind">{{notPassTestData.gameName}}-{{notPassTestData.playName}} </span>
                <span class="settle_rs" :style="{color: notPassTestData.status == 1 ? '#333333' : '#B1192B'}">
                    {{notPassTestData.status == 1 ? $t('msg.settled') : $t('msg.cancelled_by_system')}}
                </span>
            </p>
            <!--投注队名-->
            <p class="team_params">
                <span class="team_first_name">{{betWho(notPassTestData)}}</span>
                <span class="at_icon">@</span>
                <span class="bet_rate">{{parse(notPassTestData.betContent).odds}}</span>
            </p>
            <!--赔率信息-->
            <div class="forecast_result">
                <div class="bet_content">
                    <span class="txt_style">投注额: </span>
                    <span class="bet_num">{{winFormatMoney(notPassTestData.betAmountStr)}}</span>
                </div>
                <div class="result_content" v-if="notPassTestData.isBalance==1">
                    <span class="txt_style" v-if="notPassTestData.winStatus==5">赢:<span class="win_num">+{{-notPassTestData.profit}}&nbsp;</span></span>
                    <span class="txt_style" v-if="notPassTestData.winStatus==4">赢一半:<span class="win_num">+{{-notPassTestData.profit}}&nbsp;</span></span>

                    <span class="txt_style" v-if="notPassTestData.winStatus==1">输: <span class="lose_num">-{{notPassTestData.profit}}&nbsp;</span></span>
                    <span class="txt_style" v-if="notPassTestData.winStatus==2">输一半: <span class="lose_num">-{{notPassTestData.profit}}&nbsp;</span></span>

                    <span class="txt_style" v-if="notPassTestData.winStatus==3">平:<span class="tie_num">0.00</span></span>
                    <span class="txt_style" v-if="notPassTestData.winStatus==6">比赛取消</span>

                </div>
                <div  class="bet_content" v-else>
                  <span class="txt_style" v-if="notPassTestData.winStatus==6">可赢金额:</span>
                  <span class="txt_style" style="color: #333333" v-if="notPassTestData.winStatus==6">{{winFormatMoney(formatMoney(notPassTestData.currentOdds ,notPassTestData.betAmount))}}</span>
                </div>
            </div>
            <!--投注订单信息-->
            <div class="other_info">
                <span>{{notPassTestData.billNo}}</span>
                <div>
                    <span>{{formatCreateDate(notPassTestData.createDate)}}</span>
                    <span>
                        ({{ notPassTestData.plate === 'I' ? $t('msg.in_handicap'): notPassTestData.plate === 'M' ? $t('msg.ma_handicap'): notPassTestData.plate === 'E' ? $t('msg.eu_handicap'): $t('msg.hk_handicap') }})
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="../../js/pay/paidItem.js"></script>

<style scoped lang="scss">
    @import "../../scss/pay/paid_item";
</style>

