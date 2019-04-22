import { store ,util} from "@/js/public/port";
import Util from "../util/util";

export default {
    name: '',
    props:['passTestData'],
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
      //获取综合过关子注单的赛果
      getResult:function (key) {
        let str = this.passTestData.awardResult.toString();
        if(!util.isEmptyObject(str)){
          var result=str.split("R");
          if(result!=null){
            return result[key];
          }
        }
      },
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
      //格式化赔率
      formatOdds (data) {
        return data.substring(0,data.indexOf(".") + 3);
      },
      playName: function (playname, betContent) {
        return util.playName(playname, betContent);
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
