<template>
  <!--
1:系统维护
2:系统升级
    -->
    <div class="systematic">
      <systemTimer v-show="playMaintenance.question_reason === '1' || playMaintenance.question_reason === '2' ||playMaintenance.question_reason === '5'" ></systemTimer>
        <p class="header" v-show="playMaintenance.question_reason === '1' || playMaintenance.question_reason === '2'">系统维护</p>
        <p class="header" v-show="playMaintenance.question_reason === '7'">禁止访问</p>
        <p class="header" v-show="playMaintenance.question_reason === '5'">暂无网络</p>
        <div class="content">
            <div class="box">

                <!--系统维护-->
                <i v-show="playMaintenance.question_reason === '1'"  class="iconfont icon-maintain question_icon"></i>
                <!--系统升级-->
                <i v-show="playMaintenance.question_reason === '2'" class="iconfont icon-upgrade question_icon"></i>

                <i v-show="playMaintenance.question_reason === '5'"  class="iconfont icon-no_network question_icon"></i>
                <!--地区禁止-->
                 <i v-if="playMaintenance.question_reason === '7'"  class="iconfont icon-areas_prohibited question_icon"></i>
                <!--标题-->
                <p class="title">{{ playMaintenance.title }}</p>

                <div class="info" v-show="playMaintenance.question_reason=== '7' || playMaintenance.question_reason=== '5'">
                  {{ playMaintenance.content }}
                </div>

                <div class="info" v-show="playMaintenance.question_reason === '1' || playMaintenance.question_reason === '2'">
                    <span>
                        {{ playMaintenance.content_time_before }}<span class="time">{{ playMaintenance.content_time }}</span>{{ playMaintenance.content_time_after }}
                    </span>
                </div>
              <span class="operation_btn" @click="refreshPage" v-show="playMaintenance.question_reason === '5' ">{{ $t("msg.fresh") }}</span>

            </div>

        </div>
    </div>
</template>

<script src="../../js/question_page/systemMaintanence.js"></script>
<style scoped lang="scss">
    @import "../../scss/systemMaintanence.scss";
</style>
