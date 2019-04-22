import {store} from '@/js/public/port'
import questionPage from '@/views/question_page/questionPage'
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
            this.$router.push({path:'/home/home_mine_msg/news_detail', query:{title:params.title,time:params.createTime,content:params.content,sender:params.createUsername} })
        }
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
