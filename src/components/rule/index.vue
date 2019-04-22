<template>
  <div class="rule-wrapper">
    <Tabs :animated="false">
      <TabPane label="体育规则">
        <div class="typeBox">选择体育项目：
          <Select v-model="sportOption" placeholder="一般体育说明" style="width:190px;" placeholder-color="red" @on-change="change(sportOption)">
            <Option v-for="(item ,index) in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <component :is="currentView"></component>
      </TabPane>
      <TabPane label="规则与条款">
        <p style="color:#ddd;margin:20px;">使用条款<br/><br/>
          享用本公司提供的服务是客户本人的意愿，其风险应由客户本人承担。参与我们服务的同时就说明客户认同本公司所提供<br/>
          的服务是正常、合理、公正、公平的。<br/><br/>
          某些法律规则在贵国居住的司法管辖区, 并未明文规定在线和非在线博彩是否允许客户有责任确保任何时候您的博彩行为<br/>
          在您所属地是属合法行为。<br/><br/>
        <p style="color:#ddd;margin:20px;">投注接受条件<br/><br/>
          如果阁下的投注信息正确，阁下是唯一对此投注承担责任的人。一旦本司确认您的注单，该注单不得取消，撤回或更改，<br/>
          并且该注单会视为您投注的有效证据。<br/><br/>
          所有在本公司客户账户交易记录显示确认信息的注单，本司都视为有效注单。每笔交易完成后，请查您的交易记录，<br/>
          若有任何问题请联系上线核查，否则您接受您的注单是正确的。<br/><br/>
          如果客户有欺诈，合谋，非法或其它不当行为，我们有权(唯一决定人)取消投注单或任何彩金。<br/>
          我们保留权利以任何理由拒绝任何交易或注单。<br/><br/>
        <p style="color:#ddd;margin:20px;">免责条款<br/><br/>
          对于任何情况下由于卫星收讯不良或延误，网路中断，或个人使用网站服务时的失误，疏忽，或对网站内容的误解所产生<br/>
          的任何损失，本公司概不负责。<br/><br/>
          公司不赋予任何责任对于公司的网站，服务器或网络中断，公司的服务器丢失信息或信息遭受破坏，不法分子攻击网站，<br/>
          服务器或网络供应商进入网站时候由于网络供应商原因造成的网络缓慢。<br/><br/>
        </p>
      </TabPane>
      <TabPane label="赔率计算列表">
              <table width="700" height="500" border="0" cellpadding="2" cellspacing="2">
                <tbody>
                <tr>
                  <td valign="top">
                    <table width="300" border="0" cellpadding="1" cellspacing="0" style="float: left;">
                      <tbody>
                      <tr>
                        <th>盘口类型</th>
                        <th>投注金额</th>
                        <th>赔率</th>
                        <th>赢</th>
                        <th>输</th>
                      </tr>
                      <tr >
                        <td>香港盘</td>
                        <td>1000</td>
                        <td>0.800</td>
                        <td>800</td>
                        <td>-1000</td>
                      </tr>
                      <tr >
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>1.130</td>
                        <td>1130</td>
                        <td>-1000</td>
                      </tr>
                      <tr >
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr >
                        <td>马来盘</td>
                        <td>1000</td>
                        <td>0.800</td>
                        <td>800</td>
                        <td>-1000</td>
                      </tr>
                      <tr >
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td class="negativeOdds">-0.880</td>
                        <td>1000</td>
                        <td class="negativeOdds">-880</td>
                      </tr>
                      <tr >
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>印尼盘</td>
                        <td>1000</td>
                        <td>1.130</td>
                        <td>1130</td>
                        <td>-1000</td>
                      </tr>
                      <tr >
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td class="negativeOdds">-1.250</td>
                        <td>1000</td>
                        <td class="negativeOdds">-1250</td>
                      </tr>
                      <tr >
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr >
                        <td>欧洲盘</td>
                        <td>1000</td>
                        <td>1.800</td>
                        <td>800</td>
                        <td>-1000</td>
                      </tr>
                      <tr >
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>2.130</td>
                        <td>1130</td>
                        <td>-1000</td>
                      </tr>
                      </tbody>
                    </table>
                    <table width="250px" border="0" cellpadding="1" cellspacing="0" style="float: right;">
                      <tbody>
                      <tr>
                        <th colspan="3">赔率转换表</th>
                      </tr>
                      <tr>
                        <td>香港盘</td>
                        <td>马来盘</td>
                        <td>印尼盘</td>
                      </tr>
                      <tr >
                        <td>0.10</td>
                        <td>0.10</td>
                        <td class="negativeOdds">-10.00</td>
                      </tr>
                      <tr >
                        <td>0.20</td>
                        <td>0.20</td>
                        <td class="negativeOdds">-5.00</td>
                      </tr>
                      <tr >
                        <td>0.35</td>
                        <td>0.35</td>
                        <td class="negativeOdds">-2.85</td>
                      </tr>
                      <tr >
                        <td>0.40</td>
                        <td>0.40</td>
                        <td class="negativeOdds">-2.50</td>
                      </tr>
                      <tr >
                        <td>0.50</td>
                        <td>0.50</td>
                        <td class="negativeOdds">-2.00</td>
                      </tr>
                      <tr >
                        <td>0.65</td>
                        <td>0.65</td>
                        <td class="negativeOdds">-1.53</td>
                      </tr>
                      <tr >
                        <td>0.75</td>
                        <td>0.75</td>
                        <td class="negativeOdds">-1.33</td>
                      </tr>
                      <tr >
                        <td>0.83</td>
                        <td>0.83</td>
                        <td class="negativeOdds">-1.20</td>
                      </tr>
                      <tr >
                        <td>0.96</td>
                        <td>0.96</td>
                        <td class="negativeOdds">-1.04</td>
                      </tr>
                      <tr >
                        <td>1.00</td>
                        <td class="negativeOdds">-1.00</td>
                        <td class="negativeOdds">-1.00</td>
                      </tr>
                      <tr >
                        <td>1.15</td>
                        <td class="negativeOdds">-0.86</td>
                        <td>1.15</td>
                      </tr>
                      <tr >
                        <td>1.35</td>
                        <td class="negativeOdds">-0.74</td>
                        <td>1.35</td>
                      </tr>
                      <tr >
                        <td>1.45</td>
                        <td class="negativeOdds">-0.68</td>
                        <td>1.45</td>
                      </tr>
                      <tr >
                        <td>1.55</td>
                        <td class="negativeOdds">-0.64</td>
                        <td>1.55</td>
                      </tr>
                      <tr >
                        <td>1.65</td>
                        <td class="negativeOdds">-0.60</td>
                        <td>1.65</td>
                      </tr>
                      <tr >
                        <td>1.74</td>
                        <td class="negativeOdds">-0.57</td>
                        <td>1.74</td>
                      </tr>
                      <tr >
                        <td>1.97</td>
                        <td class="negativeOdds">-0.50</td>
                        <td>1.97</td>
                      </tr>
                      <tr >
                        <td>2.05</td>
                        <td class="negativeOdds">-0.48</td>
                        <td>2.05</td>
                      </tr>
                      <tr >
                        <td>3.45</td>
                        <td class="negativeOdds">-0.28</td>
                        <td>3.45</td>
                      </tr>
                      <tr >
                        <td>4.25</td>
                        <td class="negativeOdds">-0.23</td>
                        <td>4.25</td>
                      </tr>
                      <tr >
                        <td>5.00</td>
                        <td class="negativeOdds">-0.20</td>
                        <td>5.00</td>
                      </tr>
                      <tr >
                        <td>8.00</td>
                        <td class="negativeOdds">-0.12</td>
                        <td>8.00</td>
                      </tr>
                      <tr >
                        <td>10.00</td>
                        <td class="negativeOdds">-0.10</td>
                        <td>10.00</td>
                      </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                </tbody>
              </table>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import QA_sport from "./QA_sport";
  import outright from './outright'
  import parlays_multiples from './parlays_multiples'
  import roulNf from './roul_nf'
  import archery from './archery'
  import athletic from './athletic'
  import aussie from './aussie'
  import cricket from './cricket'
  import cycling from './cycling'
  import darts from './darts'
  import e_sports from './e_sports'
  import field_hockey from './field_hockey'
  import football from './football'
  import badminton from './badminton'
  import baseball from './baseball'
  import basketball from './basketball'
  import beach_soccer from './beach-soccer'
  import beach_volleyball from './beach-volleyball'
  import boxing from './boxing'
  import golf from './golf'
  import gymnastics from './gymnastics'
  import handball from './handball'
  import futsal from './futsal'
  import ice_hockey from './ice-hockey'
  import judo from './judo'
  import lacrosse from './lacrosse'
  import medal_betting from './medal-betting'
  import motor_sports from './motor-sports'
  import olympics from './olympics'
  import rowing from './rowing'
  import rugby_league from './rugby-league'
  import snooker from './snooker'
  import softball from './softball'
  import table_tennis from './table-tennis'
  import tennis from './tennis'
  import tamp from './tamp'
  import volleyball from './volleyball'
  import water_polo from './water-polo'
  import weightlifting from './weightlifting'
  import  wintersports_winterolympics from './wintersports-winterolympics'
  export default {
    components: {
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
    data() {
      return {
        cityList: [
          {value: 'QA_sport', label: '一般体育说明'},
          {value: 'outright', label: '冠军'},
          {value: 'parlays_multiples', label: '连串过关/复式过关'},
          {value: 'roulNf', label: '美式足球'},
          {value: 'archery',label: '射箭和射击'},
          {value: 'athletic',label: '田径'},
          {value: 'aussie',label: '澳式足球'},
          {value: 'cricket',label: '板球'},
          {value: 'cycling',label: '自行车'},
          {value: 'darts',label: '飞镖'},
          {value: 'e_sports',label: '电子竞技'},
          {value: 'field_hockey',label: '曲棍球'},
          {value: 'football',label: '足球'},
          {value: 'futsal', label: '室内足球'},
          {value: 'badminton',label: '羽毛球'},
          {value: 'baseball',label: '棒球'},
          {value: 'basketball',label: '篮球'},
          {value: 'beach_soccer',label: '沙滩足球'},
          {value: 'beach_volleyball',label: '沙滩排球'},
          {value: 'boxing',label: '拳击 / 搏斗'},
          {value: 'golf',label: '高尔夫' },
          {value: 'gymnastics',label: '体操'},
          {value: 'handball',label: '手球'},
          {value: 'ice_hockey',label: '冰球'},
          {value: 'judo',label: '柔道、摔交、跆拳道'},
          {value: 'lacrosse',label: '长曲棍球'},
          {value: 'medal_betting',label: '体育/奖章投注'},
          {value: 'motor_sports',label: '赛车'},
          {value: 'olympics',label: '奥林匹克或相关事件投注'},
          {value: 'rowing',label: '赛艇和皮划艇'},
          {value: 'rugby_league',label: '橄榄球联盟'},
          {value: 'snooker',label: '斯诺克/台球'},
          {value: 'softball',label: '垒球'},
          {value: 'table_tennis',label: '乒乓球'},
          {value: 'tennis' ,label: '网球'},
          {value: 'tamp',label: '三项全能和现代五项运'},
          {value: 'volleyball',label: '排球'},
          {value: 'water_polo',label: '水球'},
          {value: 'weightlifting',label: '举重'},
          {value: 'wintersports_winterolympics',label: '冬季运动 冬季奥运会/比赛'}
        ],
        sportOption: '',//绑定value值
        currentView: 'QA_sport',
        selected: 0
      }
    },
    methods: {
      change(index) {
        this.currentView = index; // 切换currentView
      }
    }
  }
</script>
<style lang="scss">
  @import '../../themes/rule/rule';
</style>
