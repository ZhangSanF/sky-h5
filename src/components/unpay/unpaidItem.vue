<template>
  <div class="unpaid_item_box">
    <div class="single_item">
      <!--双方队名-->
      <div class="result_line">
        <span>{{unpaidInfo.hTeam}}</span>
        <span class="team_score" v-show="playName(unpaidInfo.gamePlayId,unpaidInfo.betContent) === 0">{{unpaidInfo.oddsProject}}</span>
        <span class="team_vs">VS</span>
        <span >{{unpaidInfo.gTeam}}</span>
        <span class="team_score" v-show="playName(unpaidInfo.gamePlayId,unpaidInfo.betContent) === 1">{{unpaidInfo.oddsProject}}</span>
        <span class="team_score" v-if="unpaidInfo.matStatus == 1 && unpaidInfo.gameId == 'TYZQ'">
                  &nbsp;<template >({{parse(unpaidInfo.betContent).rePoint}})</template>
        </span>
      </div>
      <!--比赛名称-->
      <p class="game_name">{{formatStartDate(unpaidInfo.startTime)}}&nbsp;{{parse(unpaidInfo.betContent).leagueName}}</p>
      <!--比赛信息-->
      <p class="settle_status">
                <span class="game_kind">
                    {{unpaidInfo.gameName}}-{{unpaidInfo.playName}} &nbsp;
                  <!--判断是否滚球,是则显示投注时比分;否则不显示-->
                    <!--<span v-show="unpaidInfo.matStatus == 1 && unpaidInfo.gameId == 'TYZQ'">({{parse(unpaidInfo.betContent).rePoint}})</span>-->
                </span>
        <span :style="{color: unpaidInfo.status === 1 ? '#11A7DE' : unpaidInfo.status === 2 ? '#B1192B':'B1192B'}">
                    {{unpaidInfo.status === 1 ? $t('msg.normal') : unpaidInfo.status === 2 ? $t('msg.to_be_confirmed'):$t('msg.cancelled_by_system')}}
                </span>
      </p>
      <!--投注队名-->
      <p class="team_params">
        <span class="team_first_name">{{betWho(unpaidInfo)}}</span>
        <i class="at_icon">@</i>
        <span class="bet_rate">{{parse(unpaidInfo.betContent).odds}}</span>
      </p>
      <!--赔率信息-->
      <div class="forecast_result">
        <div class="bet_content">
          <span class="txt_style">投注额: </span>
          <span class="bet_num">{{winFormatMoney(unpaidInfo.betAmountStr)}}</span>
        </div>
        <div class="win_amount">
          <span class="txt_style">可赢金额: </span>
          <span class="bet_num">{{winFormatMoney(formatMoney(unpaidInfo.currentOdds,unpaidInfo.betAmount))}}</span>
        </div>
      </div>
      <!--投注订单信息-->
      <div class="other_info">
        <span>{{unpaidInfo.billNo}}</span>
        <div>
          <span>{{formatCreateDate(unpaidInfo.createDate)}}</span>
          <span>({{ unpaidInfo.plate === 'I' ? $t('msg.in_handicap'): unpaidInfo.plate === 'M' ? $t('msg.ma_handicap'): unpaidInfo.plate === 'E' ? $t('msg.eu_handicap'): $t('msg.hk_handicap') }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../js/unpaid/unpaidItem.js"></script>

<style scoped lang="scss">
  @import "../../scss/unpaid/unpaid_item.scss";
</style>

