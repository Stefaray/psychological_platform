//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      complete: (res) => {
        var code = res.code;
        // console.log('code'+code)
        var appid = "wxea99836557f11f70";
        var secret = "5b77463d50d50ba928b34fc395b5a288";
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code',
          success:(res2)=>{
            console.log(res2.data.openid)
            this.globalData.openid =  res2.data.openid
            
          }
        })
      },
    })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


    // app.js

     
  this.globalData = {
    openid:'',
  } // 务必确保这一行在前面
   
  wx.getSystemInfo({
    success: e => {
      this.globalData.StatusBar = e.statusBarHeight;
      let custom = wx.getMenuButtonBoundingClientRect();
      this.globalData.Custom = custom;  
      this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    }
  })
  wx.cloud.init({
    traceUser: true,
})


  },
  globalData: {
    userInfo: null
  }
})