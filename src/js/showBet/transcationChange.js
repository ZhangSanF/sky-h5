/* eslint-disable eol-last,arrow-spacing,key-spacing,no-multi-spaces */
/**
 * Created by andy on 18-5-4.
 */
import Util from '../util/util'
import base from '../public/base'
import store from '../store/index'
export default {
  data: {

  },
  methods: {
    oddClassObj: ['1', '2'],
    oddsSelect () {
      let oddss = window.sessionStorage.getItem('oddsCss') ? window.sessionStorage.getItem('oddsCss') : 'oddsCss1';
      return oddss;
    },
    _this : this,
    oddsChangeClass (teamName, key, propertyKey, that) {
        if (Object.keys(that.newMsg).length > 0 && Util.isNotEmpty(that.newMsg[teamName]) &&
        Util.isNotEmpty(that.newMsg[teamName][key]) &&
        Util.isNotEmpty(that.newMsg[teamName][key][propertyKey])) {
        return that.newMsg[teamName][key][propertyKey];
      } else {
        return "0";
      }
    },
    oddsChange (that) {
      let _this = that
      let copyMsg = {}
      let lg = Object.keys(_this.oldMsg).length
      let once = true
      let oddClassObj = this.oddClassObj;
      for (let key in _this.newMsg) {
        copyMsg[key] = _this.newMsg[key]
        let newOdss = _this.newMsg[key].exOdds;
        let oldOdds = _this.oldMsg[key].exOdds;
        if (newOdss !== oldOdds) {
          if (newOdss - oldOdds > 0) {
            copyMsg[key]["exOdds_change"] = oddClassObj[0]
          } else {
            copyMsg[key]["exOdds_change"] = oddClassObj[1]
          }
        }
      }
      _this.newMsg = Object.assign({}, copyMsg);
      console.log(_this.newMsg,"_this.newMsg")

    },

    watchMsg (now, old, that) {
      if (Util.isNotEmpty(now) && Util.isNotEmpty(old) && !now.playMaintenance) {
          Object.assign(that.oldMsg, old)
          Object.assign(that.newMsg, now)
          this.oddsChange(that);
      }
    },

  }
}
