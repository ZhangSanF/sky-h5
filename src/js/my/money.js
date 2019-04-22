import base from "@/js/public/base";
import tools from '@/js/public/tools'
import {PopupPicker} from 'vux'
import {store} from "@/js/public/port";
export default {
  components: {PopupPicker},
  data() {
    return {
      account_history: this.$t("msg.account_history"),
      moneyList: [['转入', '转出', '下注', '注单取消', '注单派彩']],
      value: ['转入'],
      activeTab: this.$t('msg.minhours'),
      tabList: [
        {label: this.$t('msg.minhours'), name: '24hours'},
        {label: this.$t('msg.maxhours'), name: '48hours'},
        {label: this.$t('msg.thisWeek'), name: 'thisWeek'},
        {label: this.$t('msg.thisMonth'), name: 'thisMonth'}
      ],
      params: {//请求参数
        startDate: tools.computedTime('1'),
        tradeType: '1',//注单类型
        endDate: tools.formatDate(new Date()),
        order: 'N'
      },
    }
  },

  methods: {
    //获取查询条件
    onChange(value) {
      const val=value[0]
      if (val==='转入'){
        this.params.tradeType='1';
      }else if (val==='转出'){
        this.params.tradeType='2';
      }else if (val==='下注'){
        this.params.tradeType='3';
      }else if (val==='注单取消'){
        this.params.tradeType='4';
      }else {
        this.params.tradeType='9';
      }
      store.state.myMoneyParams.tradeType = this.params.tradeType;
    },
    toInfo() {
      this.$router.push({path: '/home/money/info',
        query:{
          tradeType:this.params.tradeType,
          startDate:this.params.startDate,
          endDate: tools.formatDate(new Date()),
        },
      })
    },
    selectTime(label) {
      this.activeTab = label
      let computedTime = "1";
      switch (this.activeTab) {
        case this.$t('msg.minhours'):
          //获取页面数据
          computedTime = "1";
          break;
        case this.$t('msg.maxhours'):
          computedTime = "2";
          break;
        case this.$t('msg.thisWeek'):
          computedTime = "3";
          break;
        case this.$t('msg.thisMonth'):
          computedTime = "4";
          break;
      }
      store.state.myMoneyParams.computedTime = computedTime;
      this.params.startDate = tools.computedTime(computedTime);
    },
    getValue(){
      let newValue = '';
      let tradeType = store.state.myMoneyParams.tradeType;
      switch (tradeType) {
        case "1":
          newValue = '转入';
          break;
        case "2":
          newValue = '转出';
          break;
        case "3":
          newValue = '下注';
          break;
        case "4":
          newValue = '注单取消';
          break;
        case "9":
          newValue = '注单派彩';
          break;
      }
         return newValue;
    },
    getComputeTime(){
      let newValue = '';
      let computedTime = store.state.myMoneyParams.computedTime;
      switch (computedTime) {
        case "1":
          newValue = this.$t('msg.minhours');
          break;
        case "2":
          newValue = this.$t('msg.maxhours');
          break;
        case "3":
          newValue = this.$t('msg.thisWeek');
          break;
        case "4":
          newValue = this.$t('msg.thisMonth');
          break;
      }
      this.selectTime(newValue);
    }
  },
  mounted() {
    this.value=[];
    this.value.push(this.getValue());
    this.getComputeTime();
    this.$store.commit('homeHeaderControl', {
      shwoback: true,
      type: 'string',
      val: this.account_history,
      footShow: false
    });
  }

}
