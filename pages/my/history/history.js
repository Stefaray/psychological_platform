const app = getApp();
const db = wx.cloud.database()
const collection  = db.collection('history')
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,    
    goodsList:[]
  },
  onLoad: function (options) {
    // this.getGoodsList();
    db.collection('history').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        // res.data 包含该记录的数据
        console.log(res)
        var copy1;
        copy1=this.copy(res.data)
        this.setData({
          goodsList:copy1.sort((a,b)=> b.reward - a.reward),
        })
      }
    })
  },
  copy(a){
    var m=[]
    // console.log("in copy")
    // console.log(a)
    for(let i=0;i<a.length;i++){
      m.push(a[i])
    }
    return m
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});
