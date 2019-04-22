import { store , util} from "@/js/public/port";
import Util from "../util/util";

export default {
    name: '',
    props:['notPassTestData'],
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
      //验证该玩法是否滚球足球，只有滚球足球才需要展示下注时的比分
      isPlayFootball:function (type) {
        let types = ['3020011','3020012','3020014','3020013','3020021','3020022','3020023'];
        if(types.indexOf(type) >= 0){ // &&
          return true;
        }else {
          return false;
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
