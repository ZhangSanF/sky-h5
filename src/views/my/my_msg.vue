<template>
    <div id="my_msg">
        <!--顶部消息类型选择-->
        <div class="btn_groups" v-model="currentBtn" >
            <span class="game_notice" @click="activeState($t('msg.game_notice'))" :style="{color:currentBtn== $t('msg.game_notice') ? '#11A7DE' : '#fff',background:currentBtn == $t('msg.game_notice') ? '#fff' : '' }">
                {{$t('msg.game_notice')}}
            </span>
            <span class="website_msg" @click="activeState($t('msg.website_news'))" :style="{color:currentBtn== $t('msg.website_news') ? '#11A7DE' : '#fff',background:currentBtn == $t('msg.website_news') ? '#fff' : '' }">
                {{$t('msg.website_news')}}
            </span>
        </div>
        <!--导航标签-->
        <div class="tab_box" v-model="activeTab">
            <span :class="[activeTab == item.label ? activeClass : '', normalStyle]" v-for="item in tabList" @click="activeState(item.label)" >
                {{ item.label }}
            </span>
        </div>
        <!--tab下划线-->
        <div class="underline_style" ref="underline"></div>
      <!--下拉刷新图标-->
      <div v-if="dropDown"><refresh></refresh></div>
        <!--内容-->
        <div ref="outerWrapper" class="outerWrapper" :style="{background: noticeInfo && noticeInfo.length == 0 ? '#ffffff' : ''}">
            <div v-model="activeTab" class="content_container" >
                <div>
                    <!--24小时-->
                    <div v-if="activeTab == $t('msg.minhours')">
                        <!--游戏公告-->
                        <div v-if="currentBtn == $t('msg.game_notice')"  >
                            <game-notice :notice_content="noticeInfo" :pull_success="pullSuccess"></game-notice>
                        </div>
                        <!--站点消息-->
                        <div v-else  >
                            <website-news :notice_content="noticeInfo" :pull_success="pullSuccess"></website-news>
                        </div>
                    </div>
                    <!--48小时-->
                    <div v-if="activeTab == $t('msg.maxhours')">
                        <!--游戏公告-->
                        <div v-if="currentBtn == $t('msg.game_notice')"  >
                            <game-notice :notice_content="noticeInfo" :pull_success="pullSuccess"></game-notice>
                        </div>
                        <!--站点消息-->
                        <div v-else  >
                            <website-news :notice_content="noticeInfo" :pull_success="pullSuccess"></website-news>
                        </div>
                    </div>
                    <!--本周-->
                    <div v-if="activeTab == $t('msg.thisWeek')">
                        <!--游戏公告-->
                        <div v-if="currentBtn == $t('msg.game_notice')"  >
                            <game-notice :notice_content="noticeInfo" :pull_success="pullSuccess"></game-notice>
                        </div>
                        <!--站点消息-->
                        <div v-else  >
                            <website-news :notice_content="noticeInfo" :pull_success="pullSuccess"></website-news>
                        </div>
                    </div>
                    <!--本月-->
                    <div v-if="activeTab == $t('msg.thisMonth')">
                        <!--游戏公告-->
                        <div v-if="currentBtn == $t('msg.game_notice')"  >
                            <game-notice :notice_content="noticeInfo" :pull_success="pullSuccess"></game-notice>
                        </div>
                        <!--站点消息-->
                        <div v-else  >
                            <website-news :notice_content="noticeInfo" :pull_success="pullSuccess"></website-news>
                        </div>
                    </div>
                </div>
              <!--无数据显示问题页面-->
            </div>
        </div>

      <!--上拉加载图标-->
      <div v-if="pullUp" class="pull_up"><refresh></refresh></div>
    </div>
</template>

<script src="../../js/my/my_msg.js"></script>

<style scoped lang="scss">
    @import "../../scss/my/my_msg";
</style>
