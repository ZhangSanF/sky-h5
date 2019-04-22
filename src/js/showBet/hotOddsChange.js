/* eslint-disable eol-last,arrow-spacing,key-spacing,no-multi-spaces */
/**
 * Created by andy on 18-5-4.
 */
import Util from '../util/util'
import base from '../public/base'
export default {
  data: {

  },
  methods: {
    oddClassObj: ['1', '2'],
    _this : this,
    oddsSelect () {
      let oddss = window.sessionStorage.getItem('oddsCss') ? window.sessionStorage.getItem('oddsCss') : 'oddsCss1';
      return oddss;
    },

    zqDetailOddsChangeClass (index, className, propertyKey, that) {
      if (Object.keys(that.zqNewMsg).length > 0) {
        if (className !== '' && Util.isNotEmpty(that.zqNewMsg[index]) &&
          Util.isNotEmpty(that.zqNewMsg[index][className]) &&
          Util.isNotEmpty(that.zqNewMsg[index][className][propertyKey])) {
          return that.zqNewMsg[index][className][propertyKey]
        } else if (Util.isNotEmpty(that.zqNewMsg[index]) &&
          Util.isNotEmpty(that.zqNewMsg[index][propertyKey])) {
          return that.zqNewMsg[index][propertyKey]
        }
      }
      return "0";
    },
    zqDetailOddsChange (that) {
      let _this = that
      let once = true
      let copyMsg = []
      let oddClassObj = this.oddClassObj;
      let arr = that.zqNewMsg.map((v, i)=> {
        copyMsg[i] = Object.assign({}, v)
        return new Proxy(v, {
          get (target, propertyKey) {
            if (propertyKey.endsWith('_change')) {
              let keys = propertyKey.split('_change')[0]
              let isnow = Util.isNotEmpty(target[keys])
              let isold = Util.isNotEmpty(_this.zqOldMsg[i]) && Util.isNotEmpty(_this.zqOldMsg[i][keys])
              let plate = base.methods.getPlate();
              let color;
              if (isold && isnow) {
                let newOdss = target[keys]
                let oldOdds = _this.zqOldMsg[i][keys]
                if (newOdss !== oldOdds) {
                  if(plate === 'M' || plate === 'I'){
                    if (newOdss < 0 && oldOdds < 0) {
                      color = newOdss - oldOdds < 0? oddClassObj[1] : oddClassObj[0];
                    }else if(newOdss > 0 && oldOdds > 0){
                      color = newOdss - oldOdds > 0 ? oddClassObj[0] : oddClassObj[1];
                    }else {
                      if (plate === 'M') {
                        color = oldOdds < 0 && newOdss > 0 ? oddClassObj[1] : oddClassObj[0];
                      } else if (plate === 'I') {
                        color = oldOdds < 0 && newOdss > 0 ? oddClassObj[0] : oddClassObj[1];
                      }
                    }
                  }
                  if(newOdss-oldOdds>0){
                    copyMsg[i][propertyKey] = oddClassObj[0]
                  }else{
                    copyMsg[i][propertyKey] = oddClassObj[1]
                  }
                  if (once) {
                    once = false
                    setTimeout(()=> {
                      _this.zqNewMsg = Object.assign({}, copyMsg)
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
      that.zqNewMsg = [...arr]
    },

    zqWatchBallData (now, old, that) {
      if (now.length > 0 && old.length > 0 && !now.playMaintenance) {
        that.zqOldMsg = [...old]
        that.zqNewMsg = [...now]
        this.zqDetailOddsChange(that)
      }
    },
  //足球结束

    lmDetailOddsChangeClass (index, className, propertyKey, that) {
    if (Object.keys(that.lmNewMsg).length > 0) {
      if (className !== '' && Util.isNotEmpty(that.lmNewMsg[index]) &&
        Util.isNotEmpty(that.lmNewMsg[index][className]) &&
        Util.isNotEmpty(that.lmNewMsg[index][className][propertyKey])) {
        return that.lmNewMsg[index][className][propertyKey]
      } else if (Util.isNotEmpty(that.lmNewMsg[index]) &&
        Util.isNotEmpty(that.lmNewMsg[index][propertyKey])) {
        return that.lmNewMsg[index][propertyKey]
      }
    }
    return "0";
  },
    lmDetailOddsChange (that) {
    let _this = that
    let once = true
    let copyMsg = []
    let oddClassObj = this.oddClassObj;
    let arr = that.lmNewMsg.map((v, i)=> {
      copyMsg[i] = Object.assign({}, v)
      return new Proxy(v, {
        get (target, propertyKey) {
          if (propertyKey.endsWith('_change')) {
            let keys = propertyKey.split('_change')[0]
            let isnow = Util.isNotEmpty(target[keys])
            let isold = Util.isNotEmpty(_this.lmOldMsg[i]) && Util.isNotEmpty(_this.lmOldMsg[i][keys])
            let plate = base.methods.getPlate();
            let color;
            if (isold && isnow) {
              let newOdss = target[keys]
              let oldOdds = _this.lmOldMsg[i][keys]
              if (newOdss !== oldOdds) {
                if(plate === 'M' || plate === 'I'){
                  if (newOdss < 0 && oldOdds < 0) {
                    color = newOdss - oldOdds < 0? oddClassObj[1] : oddClassObj[0];
                  }else if(newOdss > 0 && oldOdds > 0){
                    color = newOdss - oldOdds > 0 ? oddClassObj[0] : oddClassObj[1];
                  }else {
                    if (plate === 'M') {
                      color = oldOdds < 0 && newOdss > 0 ? oddClassObj[1] : oddClassObj[0];
                    } else if (plate === 'I') {
                      color = oldOdds < 0 && newOdss > 0 ? oddClassObj[0] : oddClassObj[1];
                    }
                  }
                }
                if(newOdss-oldOdds>0){
                  copyMsg[i][propertyKey] = oddClassObj[0]
                }else{
                  copyMsg[i][propertyKey] = oddClassObj[1]
                }
                if (once) {
                  once = false
                  setTimeout(()=> {
                    _this.lmNewMsg = Object.assign({}, copyMsg)
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
    that.lmNewMsg = [...arr]
  },

  lmWatchBallData (now, old, that) {
    if (now.length > 0 && old.length > 0 && !now.playMaintenance) {
      that.lmOldMsg = [...old]
      that.lmNewMsg = [...now]
      this.lmDetailOddsChange(that)
    }
  },
  //蓝球结束

    bqDetailOddsChangeClass (index, className, propertyKey, that) {
      if (Object.keys(that.bqNewMsg).length > 0) {
        if (className !== '' && Util.isNotEmpty(that.bqNewMsg[index]) &&
          Util.isNotEmpty(that.bqNewMsg[index][className]) &&
          Util.isNotEmpty(that.bqNewMsg[index][className][propertyKey])) {
          return that.bqNewMsg[index][className][propertyKey]
        } else if (Util.isNotEmpty(that.bqNewMsg[index]) &&
          Util.isNotEmpty(that.bqNewMsg[index][propertyKey])) {
          return that.bqNewMsg[index][propertyKey]
        }
      }
      return "0";
    },
    bqDetailOddsChange (that) {
      let _this = that
      let once = true
      let copyMsg = []
      let oddClassObj = this.oddClassObj;
      let arr = that.bqNewMsg.map((v, i)=> {
        copyMsg[i] = Object.assign({}, v)
        return new Proxy(v, {
          get (target, propertyKey) {
            if (propertyKey.endsWith('_change')) {
              let keys = propertyKey.split('_change')[0]
              let isnow = Util.isNotEmpty(target[keys])
              let isold = Util.isNotEmpty(_this.bqOldMsg[i]) && Util.isNotEmpty(_this.bqOldMsg[i][keys])
              let plate = base.methods.getPlate();
              let color;
              if (isold && isnow) {
                let newOdss = target[keys]
                let oldOdds = _this.bqOldMsg[i][keys]
                if (newOdss !== oldOdds) {
                  if(plate === 'M' || plate === 'I'){
                    if (newOdss < 0 && oldOdds < 0) {
                      color = newOdss - oldOdds < 0? oddClassObj[1] : oddClassObj[0];
                    }else if(newOdss > 0 && oldOdds > 0){
                      color = newOdss - oldOdds > 0 ? oddClassObj[0] : oddClassObj[1];
                    }else {
                      if (plate === 'M') {
                        color = oldOdds < 0 && newOdss > 0 ? oddClassObj[1] : oddClassObj[0];
                      } else if (plate === 'I') {
                        color = oldOdds < 0 && newOdss > 0 ? oddClassObj[0] : oddClassObj[1];
                      }
                    }
                  }
                  if(newOdss-oldOdds>0){
                    copyMsg[i][propertyKey] = oddClassObj[0]
                  }else{
                    copyMsg[i][propertyKey] = oddClassObj[1]
                  }
                  if (once) {
                    once = false
                    setTimeout(()=> {
                      _this.bqNewMsg = Object.assign({}, copyMsg)
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
      that.bqNewMsg = [...arr]
    },

    bqWatchBallData (now, old, that) {
      if (now.length > 0 && old.length > 0 && !now.playMaintenance) {
        that.bqOldMsg = [...old]
        that.bqNewMsg = [...now]
        this. bqDetailOddsChange(that)
      }
    },
    //棒球结束

    wqDetailOddsChangeClass (index, className, propertyKey, that) {
      if (Object.keys(that.wqNewMsg).length > 0) {
        if (className !== '' && Util.isNotEmpty(that.wqNewMsg[index]) &&
          Util.isNotEmpty(that.wqNewMsg[index][className]) &&
          Util.isNotEmpty(that.wqNewMsg[index][className][propertyKey])) {
          return that.wqNewMsg[index][className][propertyKey]
        } else if (Util.isNotEmpty(that.wqNewMsg[index]) &&
          Util.isNotEmpty(that.wqNewMsg[index][propertyKey])) {
          return that.wqNewMsg[index][propertyKey]
        }
      }
      return "0";
    },
    wqDetailOddsChange (that) {
      let _this = that
      let once = true
      let copyMsg = []
      let oddClassObj = this.oddClassObj;
      let arr = that.wqNewMsg.map((v, i)=> {
        copyMsg[i] = Object.assign({}, v)
        return new Proxy(v, {
          get (target, propertyKey) {
            if (propertyKey.endsWith('_change')) {
              let keys = propertyKey.split('_change')[0]
              let isnow = Util.isNotEmpty(target[keys])
              let isold = Util.isNotEmpty(_this.wqOldMsg[i]) && Util.isNotEmpty(_this.wqOldMsg[i][keys])
              let plate = base.methods.getPlate();
              let color;
              if (isold && isnow) {
                let newOdss = target[keys]
                let oldOdds = _this.wqOldMsg[i][keys]
                if (newOdss !== oldOdds) {
                  if(plate === 'M' || plate === 'I'){
                    if (newOdss < 0 && oldOdds < 0) {
                      color = newOdss - oldOdds < 0? oddClassObj[1] : oddClassObj[0];
                    }else if(newOdss > 0 && oldOdds > 0){
                      color = newOdss - oldOdds > 0 ? oddClassObj[0] : oddClassObj[1];
                    }else {
                      if (plate === 'M') {
                        color = oldOdds < 0 && newOdss > 0 ? oddClassObj[1] : oddClassObj[0];
                      } else if (plate === 'I') {
                        color = oldOdds < 0 && newOdss > 0 ? oddClassObj[0] : oddClassObj[1];
                      }
                    }
                  }
                  if(newOdss-oldOdds>0){
                    copyMsg[i][propertyKey] = oddClassObj[0]
                  }else{
                    copyMsg[i][propertyKey] = oddClassObj[1]
                  }
                  if (once) {
                    once = false
                    setTimeout(()=> {
                      _this.wqNewMsg = Object.assign({}, copyMsg)
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
      that.wqNewMsg = [...arr]
    },

    wqWatchBallData (now, old, that) {
      if (now.length > 0 && old.length > 0 && !now.playMaintenance) {
        that.wqOldMsg = [...old]
        that.wqNewMsg = [...now]
        this.wqDetailOddsChange(that)
      }
    },
    //网球结束

    pqDetailOddsChangeClass (index, className, propertyKey, that) {
      if (Object.keys(that.pqNewMsg).length > 0) {
        if (className !== '' && Util.isNotEmpty(that.pqNewMsg[index]) &&
          Util.isNotEmpty(that.pqNewMsg[index][className]) &&
          Util.isNotEmpty(that.pqNewMsg[index][className][propertyKey])) {
          return that.pqNewMsg[index][className][propertyKey]
        } else if (Util.isNotEmpty(that.pqNewMsg[index]) &&
          Util.isNotEmpty(that.pqNewMsg[index][propertyKey])) {
          return that.pqNewMsg[index][propertyKey]
        }
      }
      return "0";
    },
    pqDetailOddsChange (that) {
      let _this = that
      let once = true
      let copyMsg = []
      let oddClassObj = this.oddClassObj;
      let arr = that.pqNewMsg.map((v, i)=> {
        copyMsg[i] = Object.assign({}, v)
        return new Proxy(v, {
          get (target, propertyKey) {
            if (propertyKey.endsWith('_change')) {
              let keys = propertyKey.split('_change')[0]
              let isnow = Util.isNotEmpty(target[keys])
              let isold = Util.isNotEmpty(_this.pqOldMsg[i]) && Util.isNotEmpty(_this.pqOldMsg[i][keys])
              let plate = base.methods.getPlate();
              let color;
              if (isold && isnow) {
                let newOdss = target[keys]
                let oldOdds = _this.pqOldMsg[i][keys]
                if (newOdss !== oldOdds) {
                  if(plate === 'M' || plate === 'I'){
                    if (newOdss < 0 && oldOdds < 0) {
                      color = newOdss - oldOdds < 0? oddClassObj[1] : oddClassObj[0];
                    }else if(newOdss > 0 && oldOdds > 0){
                      color = newOdss - oldOdds > 0 ? oddClassObj[0] : oddClassObj[1];
                    }else {
                      if (plate === 'M') {
                        color = oldOdds < 0 && newOdss > 0 ? oddClassObj[1] : oddClassObj[0];
                      } else if (plate === 'I') {
                        color = oldOdds < 0 && newOdss > 0 ? oddClassObj[0] : oddClassObj[1];
                      }
                    }
                  }
                  if(newOdss-oldOdds>0){
                    copyMsg[i][propertyKey] = oddClassObj[0]
                  }else{
                    copyMsg[i][propertyKey] = oddClassObj[1]
                  }
                  if (once) {
                    once = false
                    setTimeout(()=> {
                      _this.pqNewMsg = Object.assign({}, copyMsg)
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
      that.pqNewMsg = [...arr]
    },

    pqWatchBallData (now, old, that) {
      if (now.length > 0 && old.length > 0 && !now.playMaintenance) {
        that.pqOldMsg = [...old]
        that.pqNewMsg = [...now]
        this.pqDetailOddsChange(that)
      }
    },
    //排球结束

    qtDetailOddsChangeClass (index, className, propertyKey, that) {
      if (Object.keys(that.pqNewMsg).length > 0) {
        if (className !== '' && Util.isNotEmpty(that.pqNewMsg[index]) &&
          Util.isNotEmpty(that.pqNewMsg[index][className]) &&
          Util.isNotEmpty(that.pqNewMsg[index][className][propertyKey])) {
          return that.pqNewMsg[index][className][propertyKey]
        } else if (Util.isNotEmpty(that.pqNewMsg[index]) &&
          Util.isNotEmpty(that.pqNewMsg[index][propertyKey])) {
          return that.pqNewMsg[index][propertyKey]
        }
      }
      return "0";
    },
    qtDetailOddsChange (that) {
      let _this = that
      let once = true
      let copyMsg = []
      let oddClassObj = this.oddClassObj;
      let arr = that.pqNewMsg.map((v, i)=> {
        copyMsg[i] = Object.assign({}, v)
        return new Proxy(v, {
          get (target, propertyKey) {
            if (propertyKey.endsWith('_change')) {
              let keys = propertyKey.split('_change')[0]
              let isnow = Util.isNotEmpty(target[keys])
              let isold = Util.isNotEmpty(_this.pqOldMsg[i]) && Util.isNotEmpty(_this.pqOldMsg[i][keys])
              let plate = base.methods.getPlate();
              let color;
              if (isold && isnow) {
                let newOdss = target[keys]
                let oldOdds = _this.pqOldMsg[i][keys]
                if (newOdss !== oldOdds) {
                  if(plate === 'M' || plate === 'I'){
                    if (newOdss < 0 && oldOdds < 0) {
                      color = newOdss - oldOdds < 0? oddClassObj[1] : oddClassObj[0];
                    }else if(newOdss > 0 && oldOdds > 0){
                      color = newOdss - oldOdds > 0 ? oddClassObj[0] : oddClassObj[1];
                    }else {
                      if (plate === 'M') {
                        color = oldOdds < 0 && newOdss > 0 ? oddClassObj[1] : oddClassObj[0];
                      } else if (plate === 'I') {
                        color = oldOdds < 0 && newOdss > 0 ? oddClassObj[0] : oddClassObj[1];
                      }
                    }
                  }
                  if(newOdss-oldOdds>0){
                    copyMsg[i][propertyKey] = oddClassObj[0]
                  }else{
                    copyMsg[i][propertyKey] = oddClassObj[1]
                  }
                  if (once) {
                    once = false
                    setTimeout(()=> {
                      _this.pqNewMsg = Object.assign({}, copyMsg)
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
      that.pqNewMsg = [...arr]
    },

    qtWatchBallData (now, old, that) {
      if (now.length > 0 && old.length > 0 && !now.playMaintenance) {
        that.pqOldMsg = [...old]
        that.pqNewMsg = [...now]
        this.qtDetailOddsChange(that)
      }
    },
    //排球结束

},
}
