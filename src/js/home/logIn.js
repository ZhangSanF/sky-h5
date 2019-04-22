import { router, CONST, tools, storages, store,axios } from "@/js/public/port";
export default {
    name: '',
    data() {
        return {
            username: '',
            password: '',
            showPwd: true
        }
    },
    components: {},
    methods: {
        pwdState() {
            this.showPwd = !this.showPwd;
        },
        //登录
        /* login(){
             if(this.username === ''){return false;}
             if(this.password === ''){return false;}
             this.$api.Axios('post', CONST.LOGIN, {username:this.username,password:this.password}, function(data) {
                 storages.setUserObjSession('users',{username:data.username,money:data.money});
             });
             this.$router.push({path: '/home',query:{} });
         },
 */
        login:function () {
            let _this = this;
            if (this.username === '' || this.password === '') {
                alert('请输入用户名密码');
                return;
            }
            axios({
                baseURL: CONST.AGENCY,
                url: CONST.LOGIN,
                method: 'post',
                params: {username: this.username, password: this.password}
            }).then(function (data) {
              if(data.success){
                storages.setUserObjSession('user',{username:data.username,money:data.money});
                store.state.user = {username:data.username,money:data.money};
                store.state.touchVal = 'home_center';
                _this.$router.push({path: '/home',query:{} });
              }else {
                // tools.showMessege(data.message)
                store.commit('updateDialog', {isShow: true, showInfo: false,content:data.message})
              }

            }).catch(function (err) {
                _this.$iView.Message.error(err)
            });

        },
        //跳转
        goToReg() {
            this.$router.push({path:'/home/log_in/reg_now'})
        }
    },
}
