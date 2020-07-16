// pages/createThird/createThird.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    require:"",

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
    active: 2,
  },


  require_get(event){
    var data=event.detail.value
  // console.log(data)
    this.setData({
      require:data
    })
    // console.log(this.data.require)
  },
  publish(){
    getApp().globalData.createPaper.attention=this.data.require

    wx.redirectTo({
    url:'/pages/createEnd/createEnd',
  })
  }


  

 
})