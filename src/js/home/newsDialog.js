import BScroll from 'better-scroll';
import { base, store, tools } from '@/js/public/port';

export default {
    name: '',
    components: {  },
    data() {
        return {
          // unContent:store.state.homeNotice.result.noticelist[0].unContent,
        }
    },
    methods: {
        closeDialogBox() {
            // this.$emit('goToPage',{isShow: false})
            store.commit('updateDialog', {isShow: false, showInfo: true})
        }
    },
    mounted() {
        // this.$nextTick(() => {
        //     let options = {
        //         hasVerticalScroll: true,
        //         click: true,
        //         tap: true,
        //         stopPropagation: true,
        //         probeType: 3,
        //         scrollbar: {
        //             fade: false,
        //             interactive: false // 1.8.0 新增
        //         },
        //     };
        //     if(!this.scroll) {
        //         this.scroll = new BScroll(this.$refs.outerWrapper,options)
        //     } else {
        //         this.scroll.refresh();
        //     }
        //     //获取页面数据
        //     // base.methods.getAllAnnouncement({pageNum:'1',createTimeType:'0',startDate: tools.computedTime('3'),endDate: tools.formatDate(new Date())},true);
        // })
    },
    computed:{
      showDialog() {
        return store.state.newsDialog
      }
    }
}
