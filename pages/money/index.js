// pages/money/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    ownerImg:'',           // 包主 头像
    showView: false
  },
  onClose() {
    this.setData({ show: false });
  },
  receiveRedBag:function(e){
    this.setData({
      show: true
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    showView: (options.showView == "true" ? true : false)
  }
  , onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  initial:function(res){
    this.setData({
      ownerImg: data.head_img
    })
  },
  endBtn:function(e){
    wx.redirectTo({
      url: '/pages/que_finish/que_finish'
    })
    
  },

  
})