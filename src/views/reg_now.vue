<template>
    <div class="reg_page">
        <span class="backToLogin">登录</span>
        <!--用户账号-->
        <div class="new_account" >
            <input type="text" :placeholder="$t('msg.login_input_name')"  autofocus>
            <i class="iconfont icon-yonghuming user_icon" ></i>
        </div>
        <!--密码-->
        <div class="new_pwd">
            <input type="password" :placeholder="$t('msg.login_input_password')" v-model="newPwd" v-if="showPwd"/>
            <input type="text" :placeholder="$t('msg.login_input_password')" v-model="newPwd" v-else/>
            <i class="iconfont icon-mima pwd_icon"></i>
            <b class="iconfont icon-yincang " v-if="showPwd" @click="pwdState"></b>
            <b class="iconfont icon-xianshi " v-else @click="pwdState"></b>
        </div>
        <!--确认密码-->
        <div class="confirm_pwd">
            <input type="password" :placeholder="$t('msg.login_input_password')" v-model="confirmPwd" v-if="showConfirmPwd"/>
            <input type="text" :placeholder="$t('msg.login_input_password')" v-model="confirmPwd" v-else/>
            <i class="iconfont icon-querenmima pwd_again"></i>
            <b class="iconfont icon-yincang " v-if="showConfirmPwd" @click="confirmPwdState"></b>
            <b class="iconfont icon-xianshi " v-else @click="confirmPwdState"></b>
        </div>
        <!--验证码-->
        <div class="verify_code" >
            <input type="text" placeholder="请输入验证码" />
            <i class="iconfont icon-yanzhengma verigy_icon"></i>
        </div>
        <!--立即注册-->
        <div class="reg_now" @click="regSuccess">立即注册</div>
    </div>
</template>

<script src="../js/home/regNow.js"></script>

<style scoped lang="scss">
    @import "../scss/regNow";
</style>