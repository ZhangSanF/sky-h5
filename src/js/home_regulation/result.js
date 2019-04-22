import {store, router, tools} from "@/js/public/port";
import {Datetime, Group, PopupPicker} from 'vux'

export default {
  data() {
    return {
      nameActive: [this.$t("msg.football_result")],//足球赛果
      list: [
        [this.$t("msg.basketball_result"),
          this.$t("msg.football_result"),
          this.$t("msg.baseball_result"),
          this.$t("msg.tennisball_result"),
          this.$t("msg.volleyball_result"),
          this.$t("msg.otherball_result")]],
      timeValue:tools.formatDate(new Date().getTime()- 12 * 60 * 60 * 1000,'YY-MM-DD'),
      newTime:'',
      maxTime:tools.formatDate(new Date(),'YY-MM-DD'),

    }
  },
  components: {Datetime, Group, PopupPicker},
  methods: {
    //时间选择
    change(values) {
      this.newTime = values;
    },
    //頭部賽果名稱選擇
    onChange(value) {
      switch (this.nameActive[0]) {
        case this.$t("msg.football_result") :
          router.push({name: 'footballResult'});
          break;
        case this.$t("msg.basketball_result") :
          router.push({name: 'basketballResult'});
          break;
        case this.$t("msg.baseball_result") :
          router.push({name: 'baseballResult'});
          break;
        case this.$t("msg.tennisball_result") :
          router.push({name: 'tennisballResult'});
          break;
        case this.$t("msg.volleyball_result") :
          router.push({name: 'volleyballResult'});
          break;
        case this.$t("msg.otherball_result") :
          router.push({name: 'otherballResult'});
          break;
      }
    },
    //iconfont旋转--当select出现时
    selectShow() {
      //  this.$refs.icontop.style.transform = 'rotate(90deg)';
    },
    //iconfont旋转--当select关闭时
    selectHide() {
      //  this.$refs.icontop.style.transform = 'rotate(-90deg)';
    },
  },
  computed: {},
  mounted() {
    this.$store.commit('homeHeaderControl', {shwoback: true, type: 'string', val: '', footShow: false});
  }
}
