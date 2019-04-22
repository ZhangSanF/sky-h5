

import {store,base,tools} from "@/js/public/port";
import BScroll from 'better-scroll';
import questionPage from '../../views/question_page/questionPage'
export default {
  props:['nameActive','newTime'],
  data() {
    return {
      showBox:{},
    }
  },
  components: {questionPage},
  methods: {
    switchdown(index,key){
      this.showBox[key].content = !this.showBox[key].content
      if(this.showBox[key].content == true){
        document.getElementsByClassName('icon-box')[index].style.transform = 'rotate(-90deg)'
      }else{
        document.getElementsByClassName('icon-box')[index].style.transform = 'rotate(-180deg)'
      }
    },
    //选择时间&球类赛果时把icon退回
    iconDown(){
      let iconRotate = document.getElementsByClassName('icon-box');
      for(let i=0;i<iconRotate.length;i++){
        iconRotate[i].style.transform = 'rotate(-90deg)'
      }
    },
    getShowBox(){
      let data = store.state.matchsResult;
      if(data){
        let array = {};
        for(let key in data){
          if(Object.keys(this.showBox).indexOf(key)<0){
            array[key] = {'content':true };
          }else{
            array[key] = this.showBox[key]
          }
        }
        this.showBox = array;
      }
    },
  },
  computed: {
    bagresult(){
      this.getShowBox();
      return this.$store.state.matchsResult;
    },
  },
  mounted(){
    this.$nextTick(function () {
      //发送请求
      base.methods.getResult({date:this.newTime == '' ? tools.formatDate(new Date().getTime()- 12 * 60 * 60 * 1000,'YY-MM-DD') : this.newTime,currPage:'1',lottery:'32'});
      if(!this.scroll) {
        this.scroll = new BScroll(this.$refs.outerWrapper,{
          hasVerticalScroll: true,
          tap:true,
          click:true,
        })
      } else {
        this.scroll.refresh();
      }
    })
  },
  watch:{
   /* nameActive(val,oldVal){
      // 30/足球,31/篮球,32/网球,33/排球,34/棒球,35/其他,36/羽毛球,37/斯诺克,38/兵乓球
      switch (val){
        case this.$t("msg.football_result") : base.methods.getResult({date:this.newTime == '' ? tools.formatDate(new Date().getTime()- 12 * 60 * 60 * 1000,'YY-MM-DD') : this.newTime,currPage:'1',lottery:'30'});break;//足球
        case this.$t("msg.basketball_result") : base.methods.getResult({date:this.newTime == '' ? tools.formatDate(new Date().getTime()- 12 * 60 * 60 * 1000,'YY-MM-DD') : this.newTime,currPage:'1',lottery:'31'});break;//篮球
        case this.$t("msg.baseball_result") : base.methods.getResult({date:this.newTime == '' ? tools.formatDate(new Date().getTime()- 12 * 60 * 60 * 1000,'YY-MM-DD') : this.newTime,currPage:'1',lottery:'34'});break;//棒球
        case this.$t("msg.otherball_result") : base.methods.getResult({date:this.newTime == '' ? tools.formatDate(new Date().getTime()- 12 * 60 * 60 * 1000,'YY-MM-DD') : this.newTime,currPage:'1',lottery:'35'});break;//其他
        case this.$t("msg.volleyball_result") : base.methods.getResult({date:this.newTime == '' ? tools.formatDate(new Date().getTime()- 12 * 60 * 60 * 1000,'YY-MM-DD') : this.newTime,currPage:'1',lottery:'33'});break;//排球
        case this.$t("msg.tennisball_result") : base.methods.getResult({date:this.newTime == '' ? tools.formatDate(new Date().getTime()- 12 * 60 * 60 * 1000,'YY-MM-DD') : this.newTime,currPage:'1',lottery:'32'});break;//网球
      }
      //this.iconDown();
      this.scroll.scrollTo(0, 0);
    },*/
    newTime(val){
      store.commit('add_result_data', []);
      switch (this.nameActive){
        case this.$t("msg.football_result") : base.methods.getResult({date:val,currPage:'1',lottery:'30'});break;//足球
        case this.$t("msg.basketball_result") : base.methods.getResult({date:val,currPage:'1',lottery:'31'});break;//篮球
        case this.$t("msg.baseball_result") : base.methods.getResult({date:val,currPage:'1',lottery:'34'});break;//棒球
        case this.$t("msg.otherball_result") : base.methods.getResult({date:val,currPage:'1',lottery:'35'});break;//其他
        case this.$t("msg.volleyball_result") : base.methods.getResult({date:val,currPage:'1',lottery:'33'});break;//排球
        case this.$t("msg.tennisball_result") : base.methods.getResult({date:val,currPage:'1',lottery:'32'});break;//网球
      }
    //  this.iconDown();
      this.scroll.scrollTo(0, 0)
    }
  },
  created(){
    this.getShowBox();
  }
}
