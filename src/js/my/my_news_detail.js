
import { store } from '@/js/public/port'

export default {
    name: '',
    data() {
        return {
            topTitle: this.$t('msg.website_news')
        }
    },
    components: {},
    methods: {},
    mounted() {
        this.$store.commit('homeHeaderControl',{shwoback:true,type:'string',val: this.topTitle,footShow:false})
    }
}
