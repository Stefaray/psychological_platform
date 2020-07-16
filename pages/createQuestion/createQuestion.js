

Page({

  /**
   * 页面的初始数据
   */
  data: {
    paper:{
      title:"",
      des:""
    },



    steps: [
      {
        text: '步骤一',
        desc: '问卷创建'
      },
      {
        text: '步骤二',
        desc: '问卷内容'
      },
      {
        text: '步骤三',
        desc: '答卷要求'
      },
      {
        text: '步骤四',
        desc: '设置奖励'
      },
      
    ],
    active: 0,
  },
  surveyName:function(e){
     var name=e.detail.value;
    var _m = "paper.title";
      this.setData({
        [_m]:name
      })
  },
  surveyCon:function(e) {
    var des = e.detail.value;
    var _m = "paper.des";
    this.setData({
      [_m]: des
    });
  },

  tostep:function(){
    if (this.data.paper.title == "" || this.data.paper.des == "") {
      wx.showToast({
        title: '请填写信息',
        icon: "none",
        duration: 800
      })
      return;
    }
    
    getApp().globalData.createPaper=this.data.paper
    // console.log(getApp().globalData.createPaper)
    wx.redirectTo({
      url: '/pages/createSub/createSub',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.init()
  },

  
})