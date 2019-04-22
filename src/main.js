// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router,store,base,vuei18n,LangEn,LangZhCHS,LangZhCHT} from '@/js/public/port'

window.Vue = Vue
Vue.config.productionTip = false

/* eslint-disable no-new */
const i18n = new vuei18n({
    locale: base.methods.getLanguage(),
    fallbackLocale: base.methods.getLanguage(),
    messages:{
        'en': LangEn,
        'zhCHS': LangZhCHS,
        'zhCHT': LangZhCHT
    }
})

new Vue({
    el: '#app',
    i18n,
    router,
    store,
    components: { App },
    template: '<App/>'
});
if (window.location.hash !== '#/log_in') router.push('/')





