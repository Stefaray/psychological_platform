// pages/que_finish/que_finish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 3,
    toastHidden: true, //
    toastText: '',//文本  
  },

  
  endBtn:function(e){
    wx.redirectTo({
      url: '/pages/questionnaire/questionnaire'
    })
    
  },
  onToastChanged: function () {
    this.setData({
      toastHidden: true
    });
  },
  nextPage:function(e){
    this.setData({
      toastHidden: false, //提交
      toastText: '提交成功',//文本  
    }),
    wx.redirectTo({
      url: '/pages/my/my'
    })
    
  },
})