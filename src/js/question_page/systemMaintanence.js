import {store,base,process} from "@/js/public/port";
import systemTimer from "../../components/public/systemTimer"
export default {
    name: '',
    data() {
        return {  }
    },
    components: { systemTimer },
    methods: {
        goBack() {
          process.getData(0,true);
        },
        refreshPage() {
          store.state.timerFresh = true;
          store.state.loginStatus = true;
          process.getData(0,true);
        },
        reTry() {
          process.getData(0,true);
        },

    },
    computed:{
        playMaintenance(){
          console.log(store.state.playMaintenance,'store.state.playMaintenance')
            return store.state.playMaintenance;
        }
    }
}
