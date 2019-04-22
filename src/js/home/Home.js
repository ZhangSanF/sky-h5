
import { XHeader } from "vux";
import homeFotter from '@/components/home/homeFotter';
import homeHeader from '@/components/home/homeHeader';
import loading from '@/components/loading';
import store from '../store';
import storages from '../public/storages'
import tradeDialog from '../../components/public/tradeDialog.vue'
import toast from '../../components/toast'
import newsDialog from '@/components/home/newsDialog.vue'
import {base,process} from "../public/port";
export default {
    name: "Home",
    data() {
        return {

        };
    },
    components: {
        XHeader,homeFotter,homeHeader,loading,tradeDialog,toast,newsDialog
    },
    computed:{
        homeHeaderConfig(){
            let headcon = this.$store.state.homeHeaderConfig;
            if(headcon)
                return headcon;
            return {
                shwoback: false,
                type: "icon",
                val: "top-logo"
            };
        },
        showLoading(){
            return this.$store.state.showLoading
        },
        toasting(){
          return this.$store.state.toasting;
        },
        footShow(){
            return this.$store.state.homeHeaderConfig.footShow
        },
      question_reason(){
        return this.$store.state.playMaintenance.question_reason;
      },
      is_showModal:{
        get: function () {
          return store.state.is_showModal;
        },
        set: function (newValue) {
          console.log(newValue, 'set')
          store.state.is_showModal = newValue;
        }
      },
      showDialog() {
          return store.state.newsDialog.isShow
      },

      images_logo(){
          if(store.state.isImageLogoNotNul && store.state.imagesLogoList)
          {
            return store.state.imagesLogoList
          }
          else
          {
            return [
              './static/imgs/perch/logo.png',//首页logo占位图
            ]
          }
      }
    },
  methods:{
    goToHomePage() { //关闭弹窗,返回页面
      store.state.is_showModal = false;
    },
    plusReady(){
      alert( "Vendor: " + window.plus.device.vendor );
   }
  },
    mounted(){
      store.state.user = storages.getUserObjSession("user")
      base.methods.getRuleJson(false);
      base.methods.getHomeNotice(false);

    }

};
