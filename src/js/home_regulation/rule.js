
import {  PopupPicker  } from 'vux'
import BScroll from 'better-scroll'
import QA_sport from "../../components/rule/QA_sport"
import outright from '../../components/rule/outright'
import parlays_multiples from '../../components/rule/parlays_multiples'
import roulNf from '../../components/rule/roul_nf'
import archery from '../../components/rule/archery'
import athletic from '../../components/rule/athletic'
import aussie from '../../components/rule/aussie'
import cricket from '../../components/rule/cricket'
import cycling from '../../components/rule/cycling'
import darts from '../../components/rule/darts'
import e_sports from '../../components/rule/e_sports'
import field_hockey from '../../components/rule/field_hockey'
import football from '../../components/rule/football'
import badminton from '../../components/rule/badminton'
import baseball from '../../components/rule/baseball'
import basketball from '../../components/rule/basketball'
import beach_soccer from '../../components/rule/beach-soccer'
import beach_volleyball from '../../components/rule/beach-volleyball'
import boxing from '../../components/rule/boxing'
import golf from '../../components/rule/golf'
import gymnastics from '../../components/rule/gymnastics'
import handball from '../../components/rule/handball'
import futsal from '../../components/rule/futsal'
import ice_hockey from '../../components/rule/ice-hockey'
import judo from '../../components/rule/judo'
import lacrosse from '../../components/rule/lacrosse'
import medal_betting from '../../components/rule/medal-betting'
import motor_sports from '../../components/rule/motor-sports'
import olympics from '../../components/rule/olympics'
import rowing from '../../components/rule/rowing'
import rugby_league from '../../components/rule/rugby-league'
import snooker from '../../components/rule/snooker'
import softball from '../../components/rule/softball'
import table_tennis from '../../components/rule/table-tennis'
import tennis from '../../components/rule/tennis'
import tamp from '../../components/rule/tamp'
import volleyball from '../../components/rule/volleyball'
import water_polo from '../../components/rule/water-polo'
import weightlifting from '../../components/rule/weightlifting'
import  wintersports_winterolympics from '../../components/rule/wintersports-winterolympics'
import {store,base} from "@/js/public/port";


export default {
    data() {
        return {
            rule:this.$t("msg.rule"),
            value: ['一般体育说明'],
            list: [['一般体育说明', '冠军', '连串过关/复式过关', '美式足球', '射箭和射击', '田径', '澳式足球',
              '板球', '自行车', '飞镖', '电子竞技', '曲棍球', '足球', '室内足球', '羽毛球', '棒球', '篮球',
              '沙滩足球', '沙滩排球', '拳击 / 搏斗', '高尔夫', '体操', '手球', '冰球', '柔道、摔交、跆拳道', '长曲棍球', '体育/奖章投注',
              '赛车', '奥林匹克或相关事件投注', '赛艇和皮划艇', '橄榄球联盟', '斯诺克/台球', '垒球', '乒乓球', '网球',
              '三项全能和现代五项运', '排球','水球', '排举重球', '冬季运动 冬季奥运会/比赛']],
            tabList: [
                {label:this.$t("msg.sports_rules"), name:'sportsRules'},//体育规则
                {label:this.$t("msg.rules_provisions"), name:'rulesProvisions'},//规则与条款
                {label:this.$t("msg.price_calculation"), name:'priceCalculation'}//赔率计算
            ],
            activeTab:'sportsRules',
            currentView: 'QA_sport',
        }
    },
    components: { PopupPicker ,
      QA_sport,
      outright,
      parlays_multiples,
      roulNf,
      archery,
      athletic,
      aussie,
      cricket,
      cycling,
      darts,
      e_sports,
      field_hockey,
      football,
      futsal,
      badminton,
      baseball,
      basketball,
      beach_soccer,
      beach_volleyball,
      boxing,
      golf,
      gymnastics,
      handball,
      ice_hockey,
      judo,
      lacrosse,
      medal_betting,
      motor_sports,
      olympics,
      rowing,
      rugby_league,
      snooker,
      softball,
      table_tennis,
      tennis,
      tamp,
      volleyball,
      water_polo,
      weightlifting,
      wintersports_winterolympics
    },
    methods: {
        //横向滚动
        activeState(tabName) {
            this.activeTab = tabName;
            if( tabName === 'sportsRules' ) {
                this.$refs.underline.style.transform = 'translate(0,0)';
                this.change();
            }else if ( tabName === 'rulesProvisions') {
                this.$refs.underline.style.transform= 'translate(1.25rem,0)';
              base.methods.getRuleHtml('senondpage.html');
            }else if ( tabName === 'priceCalculation') {
                this.$refs.underline.style.transform= 'translate(2.5rem,0)';
              base.methods.getRuleHtml('oddsCompute.html');
            }
            this.scroll.scrollTo(0, 0)
        },
        //iconfont旋转--当select出现时
        selectShow(){
          //  this.$refs.iconBox.style.transform = 'rotate(90deg)';
        },
        //iconfont旋转--当select关闭时
        selectHide(that){
         //   this.$refs.iconBox.style.transform = 'rotate(-90deg)';
        },
      change(){
        let val = this.value[0];
        store.state.ruleHtml = '';
        base.methods.getRuleHtml(this.getRuleUrl(val));
      },
      getRuleUrl(ruleName){
          for(let i=0;i<this.ruleJson.length;i++)
          {
             if(ruleName==this.ruleJson[i].name)
             {
                return this.ruleJson[i].file;
             }
          }
      },
      initScoller(){
        //页面一滚动
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.outerWrapper, {
            hasVerticalScroll: true,
            tap: true,
            click: true,
          })
        } else {
          this.scroll.refresh();
        }
      },
      goTop(){
        let val = this.value[0];
        store.state.ruleHtml = '';
        base.methods.getRuleHtml(this.getRuleUrl(val));
      },
      toOpacity(){
        this.scroll.on('scrollStart', () => {
            this.$refs.goTop.style.opacity = '1'
        })
        this.scroll.on('scrollEnd', () => {
          this.$refs.goTop.style.opacity = '.3'
        })
      }
    },
    computed: {
      ruleNameList: {
        get: function () {
          console.log(store.state.ruleNameList,'store.state.ruleNameList')
          return store.state.ruleNameList;
        },
        set: function (newValue) {
          store.state.ruleNameList = newValue;
        }
      },
      ruleJson: {
        get: function () {
          console.log(store.state.ruleJson,'store.state.ruleJson')
          return store.state.ruleJson;
        },
        set: function (newValue) {
          store.state.ruleNameList = newValue;
        }
      },
      ruleHtml:{
        get:function () {
          return store.state.ruleHtml;
        }
      }
    },
    bind: function (el, binding, vnode, oldVnode) {
      document.addEventListener('scroll', scrollHandler)
    },
    mounted(){
      this.change();
        this.$store.commit('homeHeaderControl',{shwoback:true,type:'string',val:this.rule,footShow:false});
        //当内容多时滚动
        this.$nextTick(function () {
          this.initScoller();
          this.toOpacity()
        })

    },
    created(){
      //this.loadDat();
    }
}

