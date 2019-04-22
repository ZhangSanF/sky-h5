import { store , util } from "@/js/public/port";
import Util from "../util/util";


export default {
    name: '',
    props:[ 'passTestData'],
    data() {
        return {
        }
    },
    components: {  },
    methods: {
      winFormatMoney(data){
        return Util.winFormatMoney(data);
      },
      //格式化球赛开始时间
      formatStartTime:function(str){
        return util.formatTimeTwo(str);
      },
      //格式化时间
      formatCreateTime:function(str){
        return util.formatDate.UnixToDate(str,-12, 'MDhms', '');
      },

      //格式化betcontent
      parse:function (str) {
        return JSON.parse(str)
      },
      formatOdds (data) {
        return data.substring(0,data.indexOf(".") + 3);
      },
      formatMoney (currentOdds,amount) {
        return util.betAward(currentOdds,amount);
      },
    },
    mounted(){

    },
  filters:{
    betAward: function (currentOdds, amount) {
      return util.betAward(currentOdds, amount);
    },
  },
}
