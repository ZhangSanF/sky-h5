import { store , util} from "@/js/public/port";
import Util from "../util/util";

export default {
  name: '',
  props:['unpaidInfo'],
  data() {
    return {
    }
  },
  components: {  },
  methods: {
    winFormatMoney(data){
      return Util.winFormatMoney(data);
    },
    formatMoney (currentOdds,amount) {
      return util.betAward(currentOdds,amount);
    },
    //格式化时间
    formatStartDate:function(str){
      return util.formatDate.UnixToDateTwo(str,-12, 'yMDhm', '');
    },
    formatCreateDate:function(str){
      return util.formatDate.UnixToDate(str,-12, 'MDhms', '');
    },
    //格式化betcontent
    parse:function (str) {
      return JSON.parse(str)
    },
    playName: function (playname, betContent) {
      return util.playName(playname, betContent);
    },
    showScore: function (type) {
      let typeNum = Number(type)
      if (typeNum === 3020022 || typeNum === 3020023 || typeNum === 3020012 || typeNum === 3020013 || typeNum === 3020011
        || typeNum === 3020014 || typeNum === 3020021) {
        return true
      } else {
        return false
      }
    },
    betWho: function (i) {
      let obj = JSON.parse(i.betContent)
      var r1=/^3030/
      var r2=/^3040/
      if(r1.test(Number(i.gamePlayId))||r2.test(Number(i.gamePlayId))){
        return obj.bdPoint
      }else{
        return obj.betWho
      }
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
