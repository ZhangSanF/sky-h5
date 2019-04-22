/**
* 规则页面
*
*/
<template>
    <div class="rule">
        <div class="tab-box" v-model="activeTab">
            <span v-for="item in tabList" :class="[activeTab === item.name ? 'actives' : '', 'tab-text']" @click="activeState(item.name)">
                {{ item.label }}
            </span>
        </div>
        <div class="underline-style" ref="underline"></div>
        <div class="main_body">
            <!--体育-->
            <div class="select-style" v-model="activeTab" v-if="activeTab == 'sportsRules'">
                <popup-picker cancelText="取消" confirmText="确定"  :data="ruleNameList" v-model="value" @on-change="change()" @on-show="selectShow" @on-hide="selectHide(this)"></popup-picker>
                <div class="icon-box" ref="iconBox"><span class="iconfont icon-fanhui icon-style"></span></div>
            </div>
            <div ref="outerWrapper" class="outerWrapper" :style="{top: activeTab == 'sportsRules' ? '1.52rem' : '0.87rem'}">
                <div  v-model="activeTab">
                    <!--体育规则-->
                    <!--<div v-if="activeTab == 'sportsRules'"  v-html="ruleHtml">-->
                    <div style="position: relative" id="ruleData" v-html="ruleHtml">
                        <!--<div class="rule-content-box">-->
                            <!--<div class="rule-content">-->
                              <!--<component :is="currentView"></component>-->
                            <!--</div>-->
                          <!--&lt;!&ndash;<p v-html=" htmlData"></p>&ndash;&gt;-->
                        <!--</div>-->
                    </div>
                    <!--规则与条款-->
                    <!--<div v-else-if="activeTab == 'rulesProvisions'" v-html="ruleHtml">-->

                    <!--</div>-->
                    <!--&lt;!&ndash;赔率计算&ndash;&gt;-->
                    <!--<div v-else v-html="ruleHtml">-->

                    <!--</div>-->
                </div>
              <div v-if="activeTab == 'sportsRules'" class="box" @click="goTop">
                  <img ref="goTop" src="../../../static/imgs/go_top@2x.png" class="go-top" alt="">
              </div>
            </div>
        </div>
    </div>
</template>

<script src="../../js/home_regulation/rule.js"></script>
<style scoped lang="scss">
  @import '../../scss/home_regulation/rule';
</style>
<style lang="scss">
  @import '../../scss/home_regulation/vux_select';
</style>
