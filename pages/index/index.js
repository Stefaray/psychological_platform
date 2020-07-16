//index.js
//获取应用实例




Page({
  data: {
    PageCur: 'questionnaire'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: '心理实验平台',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})
