<template>
    <!--判断屏幕尺寸,>=768时可以滚动-->
    <div class="outerWrapper" ref="outerWrapper" :style="{height: screenWidth >= 768 ? '4.58rem' : '6.2rem'}">
        <div class="bet_set_page">
            <!--语言版本-->
            <div class="choose_lang" >
                <p class="lang_selection">{{$t('msg.lang_version')}}</p>
                <div class="sim_item" @click="chooseSim">
                    <label :style="sim_chinese">{{$t('msg.sim_chinese')}}</label>
                    <i class="iconfont icon-dagou radio_button" v-show="sim_selected"></i>
                </div>
              <!--  <div  class="com_item" @click="chooseCom">
                    <label :style="com_chinese">{{$t('msg.com_chinese')}}</label>
                    <i class="iconfont icon-dagou radio_button" v-show="com_selected"></i>
                </div>-->
            </div>
            <!--赔率类型-->
            <div class="bet_type">
                <p class="bet_type_txt" >{{$t('msg.odds_type')}}</p>
                <div class="hk_disc" @click="chooseHk">
                    <label :style="hk">{{$t('msg.hk_handicap')}}</label>
                    <i class="iconfont icon-dagou radio_button" v-show="hk_selected"></i>
                </div>
                <div  class="ma_disc" @click="chooseMa">
                    <label :style="ma">{{$t('msg.ma_handicap')}}</label>
                    <i class="iconfont icon-dagou radio_button" v-show="ma_selected"></i>
                </div>
                <div  class="ind_disc" @click="chooseInd">
                    <label :style="ind">{{$t('msg.in_handicap')}}</label>
                    <i class="iconfont icon-dagou radio_button" v-show="ind_selected"></i>
                </div>
                <div  class="eu_disc" @click="chooseEu">
                  <label :style="eu">{{$t('msg.eu_handicap')}}</label>
                  <i class="iconfont icon-dagou radio_button" v-show="eu_selected"></i>
                </div>
            </div>
            <!--通知显示-->
            <div class="show_bet_notice">
                <div class="show_switch" v-model="isShow">
                    <span class="switch_txt">{{$t('msg.show_odds_notice')}}</span>
                    <i class="switch_icon_on" v-if="isShow" @click="toHideChoices"></i>
                    <i class="switch_icon_off" v-else @click="toShowChoices"></i>
                    <i class="swiper_circle" ref="swiper_circle"></i>
                </div>

                <transition name="fade" mode="out-in">
                    <div class="show_bet_rate" v-show="isShow">
                        <div class="bet_rate_color" @click="chooseBet">
                            <span class="txt_style">
                                <label :style="bet_rate_color">{{$t('msg.odds_color')}} &nbsp;</label>
                                <span class="rate_color_green">0.84 &nbsp;</span>
                                <span class="rate_color_red">0.96</span>
                            </span>
                            <i class="radio_button iconfont icon-dagou" v-show="color_selected"></i>
                        </div>
                        <div class="show_arrow" @click="chooseArrow">
                            <span class="arrow_txt_style">
                                <label :style="show_arrow">{{$t('msg.arrow_display')}} &nbsp;</label>
                                <!--<arrow_down_redspan class="arrow_num_style">0.84</arrow_down_redspan>-->
                                <span class="rate_color_green">0.84</span>
                                <span class="iconfont icon-arrows arrow_up_green" ></span>
                                <span class="rate_color_red">0.96</span>
                                <span class="iconfont icon-arrows arrow_down_red" ></span>
                            </span>
                            <i class=" radio_button iconfont icon-dagou" v-show="arrow_selected"></i>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script src="../../js/my/my_bet.js"></script>

<style scoped lang="scss">
    @import '../../scss/my/my_bet';
</style>
