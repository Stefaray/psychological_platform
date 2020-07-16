// pages/createEnd/createEnd.js
const db = wx.cloud.database();
const collection=db.collection('questionnaire')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    reward:0,
    duration:10,
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
    active: 3,
  },

  reward_get(event){
      var data=event.detail.value;
      this.setData({
        reward:data
      })
  }
  ,
  clock_get(event){
    var data=event.detail.value;
      this.setData({
        duration:data
      })
  }
,
publish(){
  getApp().globalData.createPaper.create_date=new Date().getTime()
  getApp().globalData.createPaper.duration=parseInt(this.data.duration)
  getApp().globalData.createPaper.reward=parseInt(this.data.reward)
  
    collection.add({
      // data 字段表示需新增的 JSON 数据
      data: getApp().globalData.createPaper
    })
    .then(res => {
      wx.showToast({
        title: '创建问卷成功!',
        icon: 'success',
        duration: 2000
      })
    })
    wx.redirectTo({
      url: '/pages/questionnaire/questionnaire',
    });
  

  

  
  
}
  
})