
import { store , base} from "@/js/public/port";
import BScroll from 'better-scroll';
export default {
  data() {
    return {
      gaming_resp:this.$t("msg.gaming_resp"),
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
    base.methods.getRuleHtml('responsibility.html');
    this.$store.commit('homeHeaderControl',{shwoback:true,type:'string',val:this.gaming_resp,footShow:false});
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
