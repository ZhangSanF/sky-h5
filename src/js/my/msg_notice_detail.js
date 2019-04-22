
import { store } from '@/js/public/port'

export default {
    name: '',
    data() {
        return {
            topTitle: this.$t('msg.game_notice')
        }
    },
    components: {},
    methods: {},
    mounted() {
        this.$store.commit('homeHeaderControl',{shwoback:true,type:'string',val:this.topTitle,footShow:false})
    }
}
