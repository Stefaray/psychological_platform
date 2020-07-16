// components/bar/bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    PageCur:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
 

  /**
   * 组件的方法列表
   */
  methods: {
    
    handleItemTap(e){
      // 1 获取点击的索引
      const {index}=e.currentTarget.dataset;
      // 2 触发 父组件中的事件 自定义
      this.triggerEvent("tabsItemChange",{index});
    },

    NavChange1(e) {
      this.setData({
        PageCur: e.currentTarget.dataset.cur
      })
      wx.redirectTo({
        url: '/pages/questionnaire/questionnaire'
      })
    },
    NavChange2(e) {
      this.setData({
        PageCur: e.currentTarget.dataset.cur
      })
      wx.redirectTo({
        url: '/pages/experiment/experiment'
      })
    },
    NavChange3(e) {
      this.setData({
        PageCur: e.currentTarget.dataset.cur
      })
      wx.redirectTo({
        url: '/pages/launch/launch'
      })
    },
    NavChange4(e) {
      this.setData({
        PageCur: e.currentTarget.dataset.cur
      })
      wx.redirectTo({
        url: '/pages/message/message'
      })
    },
    NavChange5(e) {
      this.setData({
        PageCur: e.currentTarget.dataset.cur
      })
      wx.redirectTo({
        url: '/pages/my/my'
      })
    }

  }
})
