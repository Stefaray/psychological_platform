// pages/user/index.js
const app = getApp()
Page({
  data: {
    
    userinfo:{},
    // 被收藏的商品的数量
    collectNums:0,
    
  },
  
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    const collect=wx.getStorageSync("collect")||[];
    // this.login;
    

    this.setData({userinfo,collectNums:collect.length});
      
  },




  options: {
    addGlobalClass: true,
  },
  data: {
    show: false,
    
    PageCur:"my",
    visitTotal: 4,
    starCount: 2,
    forksCount: 80
    
  },
  showPopup() {
    
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
 
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  
})


