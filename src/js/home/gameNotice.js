import questionPage from '@/views/question_page/questionPage'
import {store,util} from "@/js/public/port";
import Util from "../util/util";
export default {
    name: '',
    props: ['notice_content','pull_success'],
    components: {questionPage},
    data() {
        return {

        }
    },
    methods: {
        goToDetail(params) {
            store.state.homeToNotice='3';
            this.$router.push({path:'/home/home_mine_msg/msg_detail', query:{time:params.time,content:params.content} })
        },
      //格式化时间
      formatStartDate:function(time){
        return Util.formatTime(Util.formatDate.UnixToDate(time, -12, 'MDhm'));
      },
    },
    mounted() {



    },
  computed:{
    dataLen() {
      return store.state.announcement_data.noticeDataLen;
    }
  },
  watch:{
    dataLen(val){
        this.$nextTick(function(){
          if(this.$refs.setHeight){
            this.$refs.setHeight.style.minHeight = window.screen.availHeight/100 - 0.9 + 'rem'
          }
        })
    }
  }
}
