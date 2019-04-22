<template>
    <div id="log_in">
        <div class="game_logo">
            <i class="iconfont icon-zuqiu icon_logo"></i>
        </div>
        <div class="input_box">
            <!--账号-->
            <div class="input_account">
                <input type="text" :placeholder="$t('msg.login_input_name')" v-model="username" contenteditable="true">
                <i class="iconfont icon-yonghuming user_icon"></i>
            </div>
            <!--密码-->
            <div class="input_pwd">
                <input type="password" :placeholder="$t('msg.login_password')" v-model="password" v-if="showPwd" contenteditable="true"/>
                <input type="text" :placeholder="$t('msg.login_password')" v-model="password" v-else contenteditable="true"/>
                <i class="iconfont icon-mima "></i>
                <b class="iconfont icon-yincang " v-if="showPwd" @click="pwdState"></b>
                <b class="iconfont icon-xianshi " v-else @click="pwdState"></b>
            </div>
            <!--登录-->
            <div class="login_now" @click="login">{{ $t("msg.login") }}</div>
            <!--忘记密码/免费注册-->
            <div class="register_box">
                <span class="forget_pwd">{{ $t("msg.forgetPass") }}</span>
                <span class="register" @click="goToReg">{{ $t("msg.freeRegister") }}</span>
            </div>
        </div>
    </div>
</template>

<script src="../js/home/logIn.js"></script>

<style scoped lang="scss">
    @import "../scss/logIn";
</style>

