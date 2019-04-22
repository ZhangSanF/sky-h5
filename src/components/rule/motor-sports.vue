<template>
  <div class="rule-info"><!--资料区-->
    <p class="b sub">赛车</p>
    <p class="b sub"><em>最后更新日期：05/07/2017</em></p>
    <p class="b sub">一般规则</p>
    <ul class="ul-decimal">
      <li>如果原定比赛场地更改，所有的注单将被视为无效。 </li>
      <li>每场赛事的结果均以奖台上排名为最终结果。如之后发生丧失资格或修正结果将不予以计算。 </li>
      <li>所有注单均以FIA/FIM官方公布的车手排位赛果为准。 </li>
    </ul>
    <p class="b sub">投注类型</p>
    <ul style="margin-left: 15px;">
      <p class="b sub">冠军投注</p>
      <ul class="ul-decimal">
        <li>如果车队/车手无法进行比赛，所有注单仍然有效。 </li>
      </ul>
      <p class="b sub">二选一投注</p>
      <ul class="ul-decimal">
        <li>若两位配对车手其中一位缺席正式比赛﹐所有注单将一律被取消。 </li>
        <li>投注将以所投车手最终排名优于另一位车手的排名为赢。 </li>
        <li>如果双方车手都未完成比赛，则所有注单将一律被取消。 </li>
        <li>如果双方车手已经开始比赛，但其中一位车手未能完成比赛，则另一位完成比赛的车手将被视为胜者。 </li>
      </ul>
      <p class="b sub">让位赛</p>
      <ul class="ul-decimal">
        <li>让排位数盘口即在比赛正式开始前， 一方驾驶人/车手已得到另一方所让的虚拟排位数， 以领先的情况下开始比赛。 </li>
        <li>只有双方驾驶人/车手的名字均在FIA/FIM官方公布的赛果名单里，投注才将被视为有效。 </li>
        <li>如果其中一方驾驶人/车手无法完成比赛，不论任何原因，投注都将被取消。 </li>
        <li>在计算让位分数下，投注将以所投车手最终排名优于另一车手的排名为赢。 </li>
        <ul style="margin-left: 25px;">
          <p>范例</p>
          <table width="100%" border="0" cellspacing="1" cellpadding="0">
            <tbody><tr class="tabletit">
              <td>赛事</td>
              <td>车手</td>
              <td colspan="2">让排位</td>
            </tr>
            <tr class="tabledetail">
              <td rowspan="2" class="center">意大利大奖赛</td>
              <td class="b dred">刘易斯•汉密尔顿</td>
              <td class="center">1.5</td>
              <td class="center">0.93</td>
            </tr>
            <tr class="tabledetail">
              <td class=" b dblu">费尔南多•阿隆索</td>
              <td>&nbsp;</td>
              <td class="center">0.93</td>
            </tr>
            </tbody></table>
          <p class="b sub">赛果</p>
          <p>刘易斯•汉密尔顿 第三名<br>
            费尔南多•阿隆索 第四名 </p>
          <p class="b sub">注单结果</p>
          <p>由于在让位赛开始时，费尔南多•阿隆索已获取1.5排位的让位，所以他领先刘易斯•汉密尔顿。 </p>
        </ul>
      </ul>
      <p class="b sub">最快圈</p>
      <ul class="ul-decimal">
        <li>预测哪位车手获取正是比赛最快圈数的记录。 </li>
        <li>排位圈和练习圈不予计算。 </li>
      </ul>
      <p class="b sub">达成成绩或排名之车手数</p>
      <ul class="ul-decimal">
        <li>预测会有多少位车手将完成最少90%或更多圈数并且被FIA视为排名完成者。</li>
      </ul>
      <p class="b sub">安全车</p>
      <ul class="ul-decimal">
        <li>预测安全车是否将会出现在比赛中。</li>
        <li>如果比赛由安全车引领开始，所有安全车注单将将被取消。</li>
        <li>VSC (虚拟安全车) 不算为安全车。</li>
      </ul>
      <p class="b sub">输赢比数</p>
      <ul class="ul-decimal">
        <li>预测在比赛结束时，一名车手与第二名车手之间的时间差。 </li>
      </ul>
      <p class="b sub">前三名（颁奖台站位）</p>
      <ul class="ul-decimal">
        <li>预测，在正式比赛中第一名，第二名以及第三车手获得者。 </li>
        <li>每场赛事的结果均以奖台上排名为最终结果，如之后发生任何改变都不予以计算。 </li>
      </ul>
      <p class="b sub">单 / 双</p>
      <ul class="ul-decimal">
        <li>预测车手最总排位是单还是双。 </li>
        <li>如果车手未完成比赛，所有注单一律取消。 </li>
      </ul>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'motor-sports'
  }
</script>
