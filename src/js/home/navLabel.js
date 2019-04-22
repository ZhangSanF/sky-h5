import {Tab, TabItem, Scroller} from 'vux'
import BallKind from '../../components/home/ballKind.vue'
import {router, CONST, tools, storages, store, base} from "@/js/public/port";


export default {
    name: '',
    props: ['underline'],
    components: { Scroller, BallKind, Tab, TabItem},
    data() {
        return {
            activeClass: 'active',
            normalStyle: 'tab_text',
            underline_style: {
                width: '33.33%',
                height: '2px',
                backgroundColor: '#11A7DE',
                transform: 'translate(0,0)',
                transition: 'transform .3s linear 0s'
            }
        }
    },
    computed:{
        dateTypeTabList: {
            get: function () {
                return store.state.dateTypeTab;
            }
        },
        activeTab: {
            get: function () {
                return store.state.baseParam;
            },
            set: function (val) {
                this.activeTab = val;
            }
        }
    },
    methods: {
        activeState(tabName, dateType) {
            if(tabName == 'live'){
                this.underline_style.transform = 'translate(0,0)'
            }else if(tabName == 'today'){
                this.underline_style.transform = 'translate(1.25rem,0)';
            }else if(tabName == 'future'){
                this.underline_style.transform = 'translate(2.5rem,0)';
            }
            let baseParam = store.state.baseParam;
            this.activeTab.dateType = dateType;
            this.activeTab.gameType = '';
            baseParam.dateType = dateType;
            store.commit('baseParam', baseParam);
            // base.methods.changeBall(dateType, null);
            store.state.user = storages.getUserObjSession("user")
            base.methods.getSourceConfig(false);
            base.methods.getMainPageMap(false);
            base.methods.getGameType(false);
            base.methods.getHotMatches(true);

        },
    },
    mounted() {
        let tabName = 'live';
        for(let index in this.dateTypeTabList){
            if(this.dateTypeTabList[index].dateType == this.activeTab.dateType)
                tabName = this.dateTypeTabList[index].name;
        }
        this.activeState(tabName, this.activeTab.dateType);
    }
}
