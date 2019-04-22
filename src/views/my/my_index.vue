/**
* 首页底部选项卡:我的
* Luffy 2018-7-27
*/
<template>
    <div id="My_index">
        <div class="my-header">
            <div class="home-header">
            <!--  <div class="left" @click="goHome">
                <i class="iconfont icon-fanhui"></i>
              </div>-->
              {{ $t("msg.mine") }}
            </div>
            <div class="my-header-content">
                <div class="my-header-content-left">
                    <img class="my-header-img" src="../../../static/imgs/my/head_portrait577@2x.png" alt="">
                    <div v-if="user!=undefined  && user!=null && user!=''">{{user.username}}</div>
                    <div v-else>{{ $t("msg.myWelcome") }}</div>
                </div>
                <div v-if="user!=undefined && user!=null && user!=''" class="my-header-content-right" @click="Tlogin">
                    <span>{{ $t("msg.logOut") }}</span><span class="iconfont icon-tuichu my-header-content-right-ziti"></span>
                </div>
              <div v-else class="my-header-content-right" @click="goLogin">
                <span>登录</span><span class="iconfont icon-tuichu my-header-content-right-ziti"></span>
              </div>

            </div>
        </div>
        <div class="my-content">
            <div class="my-content-top" >
                <div class="my-content-top-l">
                    <div>{{ $t("msg.balance") }}</div>
                    <div v-if="isclose" class="my-content-money">¥ <span>{{winFormatMoney(storagesMoney)}}</span></div>
                    <div v-else class="my-content-money">
                        <span>¥ </span>
                        <span class="money-hide">******</span>
                    </div>
                </div>
                <div class="my-content-top-r" >
                    <span class="iconfont icon-shuaxin" @click="updateMoney"></span>
                    <span>|</span>
                    <span :class="isclose ? 'iconfont icon-xianshi xianshi':'iconfont icon-yincang yincang'" @click="stateClose"></span>
                </div>
            </div>
            <div class="scroll-box" ref="outerWrapper">
                <ul class="my-content-ul">
                <li class="my-content-ul-li" v-for="item in liItem" @click="goView(item.liId)">
                  <div class="my-content-ul-li-l">
                    <span :class="'iconfont ' + item.liIconL"></span>
                    <span>{{item.liContent}}</span>
                    <!--<div v-if="item.liId != 2">
                        <div>
                          <span class="message-num">{{item.liNum}}</span>
                        </div>
                      </div>-->
                  </div>
                  <span :class="'iconfont ' + item.liIconY +' my-content-ul-li-ziti'" ></span>
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>

<script src="../../js/my/my_index.js"></script>
<style scoped lang='scss'>
    @import '../../scss/my/my_index';
</style>

