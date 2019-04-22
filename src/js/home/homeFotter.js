import {storages,store,router} from '@/js/public/port'
import tools from '../public/tools'
import base from '../public/base'

export default {
  name: 'homeFotter',
  data() {
    return {
    }
  },
  computed: {
    touching() {
      return store.state.touchVal
    },
    footShow() {
      return store.state.homeHeaderConfig.footShow;
    }
  },
  watch: {
    footShow: function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        let path = this.$router.history.current.path;//this.$router.path.lastIndexOf('/')
        this.touchVal = path.substring(path.lastIndexOf('/') + 1);
      }
    }
  },
  methods: {
    changeCard(val) {
      if(val !== 'home_center' && val !== 'home_mine' && !storages.isLogin()){
        store.commit('updateDialog', {isShow: true, showInfo: false,content:'此功能仅对登录用户开放'})
      }else {
        if(val === 'home_pay' || val === 'home_unpay' || val === 'home_mine'){
          store.state.timerFresh = false;
          store.state.footClick = true;
          store.state.isHome = false;
          store.state.shwoback = false;
        }else{
          store.state.timerFresh = true;
          store.state.isHome = true;
        }
        store.state.touchVal = val;
       /* if (storages.isLogin() && val === 'home_mine') {
          base.methods.getMoney();
        }*/
        router.replace(`/home/${val}`)
      }
    }
  },
  mounted() {
    store.commit('mathFootHeight', this.$refs.foot.offsetHeight);
  }
}
