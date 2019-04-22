
import { CONST, storages,store,base,tools,util} from "@/js/public/port";
import BScroll from 'better-scroll';
export default {
    name: 'My_index',
    data(){
        return {
            liItem:[
                {liId:0,liIconL:'icon-qianbao',liContent:this.$t("msg.account_history") ,liNum:12,liIconY:'icon-youjiantou'},
                {liId:1,liIconL:'icon-gonggao',liContent:this.$t("msg.msg_notice"),liNum:12,liIconY:'icon-youjiantou'},
                {liId:2,liIconL:'icon-shezhi',liContent:this.$t("msg.bet_setting"),liNum:12,liIconY:'icon-youjiantou'},
                {liId:3,liIconL:'icon-result',liContent:this.$t("msg.result") ,liNum:12,liIconY:'icon-youjiantou'},
                {liId:4,liIconL:'icon-rule',liContent:this. $t("msg.rule"),liNum:12,liIconY:'icon-youjiantou'},
                {liId:5,liIconL:'icon-privacy',liContent:this.$t("msg.privacy_terms"),liNum:12,liIconY:'icon-youjiantou'},
                {liId:6,liIconL:'icon-duty',liContent:this.$t("msg.gaming_resp"),liNum:12,liIconY:'icon-youjiantou'}
            ],
            isclose:storages.getSession('isclose') == null ? true:storages.getSession('isclose')==1,
            showClose:'icon-xianshi xianshi',
            mine:this.$t("msg.mine"),
            storagesMoney:0,



        }
    },
    methods:{
      winFormatMoney(data){
        if(data == null){
          return "0.00";
        }
      return util.winFormatMoney(data);
      },
      goHome(){
          store.state.touchVal = 'home_center';
          this.$router.push({path: '/home/home_center'});
       },
        //路由跳转
        goView(index){
            switch (index) {
              case 0:
                if(store.state.user){

                  //this.$router.push({path: '/home/home_mine_money'});
                  store.state.myMoneyParams.tradeType='1';
                  store.state.myMoneyParams.computedTime='1';
                  this.$router.push({path: '/home/money'});
                }else{
                  store.commit('updateDialog', {isShow: true, showInfo: false,content:'此功能仅对登录用户开放'})
                }
                break;

              case 1:
                store.state.homeToNotice = '2';
                if(store.state.user){
                  this.$router.push({path: '/home/home_mine_msg'});
                }else{
                  store.commit('updateDialog', {isShow: true, showInfo: false,content:'此功能仅对登录用户开放'})
                }
                break;

              case 2:
                this.$router.push({path: '/home/home_mine_betSet'});
                break;

              case 3:
                this.$router.push({path: '/home/result'});
                break;

              case 4:
                this.$router.push({path: '/home/rule'});
                break;

              case 5:
                this.$router.push({path: '/home/privacy'});
                break;

              case 6:
                this.$router.push({path: '/home/responsibility'});
                break;
            }
        },
        //控制金额显示隐藏
        stateClose(){
            if(this.isclose === true){
                this.isclose = false;
                this.showClose = 'icon-yincang yincang'
                storages.setSession('isclose',0);
            }else{
                this.isclose = true;
                this.showClose = 'icon-xianshi xianshi';
              storages.setSession('isclose',1);
            }
        },
        //退出登录
        Tlogin(){
            base.methods.logOut();
            this.$router.push({path: '/log_in'});
        },

      goLogin(){
        this.$router.push({path: '/log_in'});
      },

      updateMoney(){
        if(store.state.user){
          base.methods.getMoney();
        }else{
          store.commit('updateDialog', {isShow: true, showInfo: false,content:'此功能仅对登录用户开放'})
          return;
        }

      }
    },
    computed: {
      user: {
        get(){
          let user = store.state.user;
          if(user!=null){
            this.storagesMoney = user.money;
            return user;
          }else{
            this.storagesMoney = 0;
            return null;
          }
        }
     }
},
    mounted(){
        this.$store.commit('homeHeaderControl',{shwoback:false,type:'none',val:'',footShow:true});
        store.state.user = storages.getUserObjSession("user");
        if(storages.isLogin()){
          base.methods.getMoney();
        }
        this.$nextTick(function () {
            if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.outerWrapper,{
                    hasVerticalScroll: true,
                    tap:true,
                    click:true
                })
            } else {
                this.scroll.refresh();
            }
        })
    }
}
