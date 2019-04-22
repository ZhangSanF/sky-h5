import {store,base,process} from "@/js/public/port";
export default {
    name: '',
    data() {
        return {  }
    },
    components: {  },
    methods: {
        goBack() {
          process.getData(0,true);
        },
        refreshPage() {
          process.getData(0,true);
        },
        reTry() {
          process.getData(0,true);
        },

    },
    computed:{
        playMaintenance(){
            return store.state.playMaintenance;
        }
    }
}
