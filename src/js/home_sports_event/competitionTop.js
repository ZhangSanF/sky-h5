import {store,base} from '../../js/public/port'
export default {
  props:['ballName','nav_label'],
  components: {

  },
  data() {
    return {
      downshow:true,
      alliancesort:false,
      timesort:true,
    }
  },
  methods:{
    //控制显示头部下拉
    switchdowm(){
      this.downshow = !this.downshow;
      if(this.downshow === true){
        //this.$refs.icontop.style.transform = 'rotate(-90deg)';//点击时不需要改变
      }else {
       // this.$refs.icontop.style.transform = 'rotate(90deg)';
      }
    },
    //点击筛选事件
    sortajax(index){
      if(index === '1'){ //联赛排序
        this.alliancesort = true;
        this.timesort = false;
        this.downshow = !this.downshow;
        //this.$refs.icontop.style.transform = 'rotate(-90deg)';
        store.state.sort = '0';

      }else{ //时间排序
        this.alliancesort = false;
        this.timesort = true;
        this.downshow = !this.downshow;
       // this.$refs.icontop.style.transform = 'rotate(-90deg)';
        store.state.sort = '1';
      }
        base.methods.getMatches(true);
    },
  },
  mounted() {
     // console.log(this.ballInfo)
  },
  computed:{

  }

};
