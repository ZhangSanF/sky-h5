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
    detailOddsChangeClass (index, className, propertyKey, that) {
      if (Object.keys(that.newMsg).length > 0) {
        if (className !== '' && Util.isNotEmpty(that.newMsg[index]) &&
          Util.isNotEmpty(that.newMsg[index][className]) &&
          Util.isNotEmpty(that.newMsg[index][className][propertyKey])) {
          return that.newMsg[index][className][propertyKey]
        } else if (Util.isNotEmpty(that.newMsg[index]) &&
          Util.isNotEmpty(that.newMsg[index][propertyKey])) {
          return that.newMsg[index][propertyKey]
        }
      }
      return "0";
    },
    oddsChange (that) {
      let _this = that
      let copyMsg = {}
      let lg = Object.keys(_this.oldMsg).length
      let once = true
      let oddClassObj = this.oddClassObj;
      for (let key in _this.newMsg) {
        copyMsg[key] = [..._this.newMsg[key]]
        let arr = _this.newMsg[key].map((i, index)=> {
          i.index = key + ',' + index
          return new Proxy(i, {
            get (target, propertyKey) {
             // console.log(propertyKey,"propertyKey")
              if (typeof(propertyKey)==='string' && propertyKey.endsWith('_change') && lg > 0) {
                  let keys = propertyKey.split('_change')[0]
                  let indexs = target.index.split(',')
                  let isnow = Util.isNotEmpty(target[keys])
                  let isold = Util.isNotEmpty(_this.oldMsg[indexs[0]]) &&
                    Util.isNotEmpty(_this.oldMsg[indexs[0]][indexs[1]]) &&
                    Util.isNotEmpty(_this.oldMsg[indexs[0]][indexs[1]][keys])
                  if (isold && isnow) {
                    let newOdss = target[keys]
                    let oldOdds = _this.oldMsg[indexs[0]][indexs[1]][keys]
                    let plate = base.methods.getPlate();
                    let color;
                    if (newOdss !== oldOdds) {
                      if (plate === 'M' || plate === 'I') {
                        if (newOdss < 0 && oldOdds < 0) {
                          color = newOdss - oldOdds < 0 ? oddClassObj[1] : oddClassObj[0];
                        } else if (newOdss > 0 && oldOdds > 0) {
                          color = newOdss - oldOdds > 0 ? oddClassObj[0] : oddClassObj[1];
                        } else {
                          if (plate === 'M') {
                            color = oldOdds < 0 && newOdss > 0 ? oddClassObj[1] : oddClassObj[0];
                          } else if (plate === 'I') {
                            color = oldOdds < 0 && newOdss > 0 ? oddClassObj[0] : oddClassObj[1];
                          }
                        }
                      }
                      if (newOdss - oldOdds > 0) {
                        copyMsg[key][index][propertyKey] = oddClassObj[0];
                      } else {
                        copyMsg[key][index][propertyKey] = oddClassObj[1];
                      }
                      if (once) {
                        once = false
                        setTimeout(() => {
                          _this.newMsg = Object.assign({}, copyMsg)
                        })
                      }
                      return color
                    }

                  }
                }
              return target[propertyKey]
            }
          })
        })
        _this.newMsg[key].splice(0, arr.length, ...arr)
      }
    },
    detailOddsChange (that) {
      let _this = that
      let once = true
      let copyMsg = []
      let oddClassObj = this.oddClassObj;
      let arr = that.newMsg.map((v, i)=> {
        copyMsg[i] = Object.assign({}, v)
        return new Proxy(v, {
          get (target, propertyKey) {
              if (propertyKey.endsWith('_change')) {
                let keys = propertyKey.split('_change')[0]
                let isnow = Util.isNotEmpty(target[keys])
                let isold = Util.isNotEmpty(_this.oldMsg[i]) && Util.isNotEmpty(_this.oldMsg[i][keys])
                let plate = base.methods.getPlate();
                let color;
                if (isold && isnow) {
                  let newOdss = target[keys]
                  let oldOdds = _this.oldMsg[i][keys]
                  if (newOdss !== oldOdds) {
                    if (plate === 'M' || plate === 'I') {
                      if (newOdss < 0 && oldOdds < 0) {
                        color = newOdss - oldOdds < 0 ? oddClassObj[1] : oddClassObj[0];
                      } else if (newOdss > 0 && oldOdds > 0) {
                        color = newOdss - oldOdds > 0 ? oddClassObj[0] : oddClassObj[1];
                      } else {
                        if (plate === 'M') {
                          color = oldOdds < 0 && newOdss > 0 ? oddClassObj[1] : oddClassObj[0];
                        } else if (plate === 'I') {
                          color = oldOdds < 0 && newOdss > 0 ? oddClassObj[0] : oddClassObj[1];
                        }
                      }
                    }
                    if (newOdss - oldOdds > 0) {
                      copyMsg[i][propertyKey] = oddClassObj[0]
                    } else {
                      copyMsg[i][propertyKey] = oddClassObj[1]
                    }
                    if (once) {
                      once = false
                      setTimeout(() => {
                        _this.newMsg = Object.assign({}, copyMsg)
                      })
                    }
                    return color
                  }
                }
              }
            return target[propertyKey]
          }
        })
      })
      that.newMsg = [...arr]
    },
    watchMsg (now, old, that) {
      if (Util.isNotEmpty(now) && Util.isNotEmpty(old) && !now.playMaintenance) {
        let oddTag = store.state.oddsChangeTag;
        //解决切换让球，综合过关时的赔率颜色全部变化的错误
        if(oddTag.oldTag!=oddTag.newTag){
          Object.assign(that.oldMsg, null)
          Object.assign(that.newMsg, null)
          return;
        }else{
          Object.assign(that.oldMsg, old)
          Object.assign(that.newMsg, now)
        }
        this.oddsChange(that)
      }
    },
    watchBallData (now, old, that) {
      if (undefined !=now && now.length > 0 && undefined!=old && old.length > 0 && !now.playMaintenance) {
        that.oldMsg = [...old]
        that.newMsg = [...now]
        this.detailOddsChange(that)
      }
    }
  }
}
