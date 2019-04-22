
import BScroll from 'better-scroll';
import { store ,base} from "@/js/public/port";
export default {
    data() {
        return {
            privacy_terms:this.$t("msg.privacy_terms"),
        }
    },
    components: {  },
    methods: {

    },
    computed: {
      ruleHtml:function () {
        return store.state.ruleHtml;
      }
    },
    mounted(){
      base.methods.getRuleHtml('privacy.html');
        this.$store.commit('homeHeaderControl',{shwoback:true,type:'string',val:this.privacy_terms,footShow:false});
        this.$nextTick(function(){
            if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.outerWrapper,{
                    hasVerticalScroll: true,
                    tap:true,
                    click:true
                })
            } else {
                this.scroll.refresh();
            }
        })

    }
}
