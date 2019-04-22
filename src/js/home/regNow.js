import { store } from "@/js/public/port";

export default {
    name: '',
    data() {
        return {
            newPwd: '',
            confirmPwd: '',
            showPwd: true,
            showConfirmPwd: true,
        }
    },
    components: {  },
    methods: {
        pwdState() {
            this.showPwd = !this.showPwd;
        },
        confirmPwdState() {
            this.showConfirmPwd = !this.showConfirmPwd;
        },
        regSuccess() {
            this.$router.push({path:'/log_in',query:{} })
        }
    },
    computed: {

    },
    mounted(){
        this.$store.commit('homeHeaderControl',{shwoback:true,type:'string',val:'注册',footShow:false});
    }
}
