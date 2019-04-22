/**
 * axios 公共常量管理
 * Luffy 2018-7-27
 */
//const AGENCY = '/api/'
const AGENCY = process.env.NODE_ENV === 'production' ? '/' : '/api/';
//登录
const LOGIN = 'passport/login.html?t='+ Date.now();

const PROCESSURL ='data/process.html';      //对应的action:type_sum/play/odds/plate/notice/league/result_sum/result/settle_sum/more_odds

const SECURITYURL ='data/security.html';    //对应的action:wallet/bet_his/bet/new_odds

const tokenUrl ='data/Token.html';

const MERCHANT ='MML';

const AGENT = 'C560';

const LOGOUT = '/passport/logout.html';

const RULEURL = '/rcenter/play/rule/rule-h5-cn.json';

export default{
    AGENCY,
    LOGIN,
    PROCESSURL,
    SECURITYURL,
    MERCHANT,
    AGENT,
    LOGOUT,
   RULEURL,
}
