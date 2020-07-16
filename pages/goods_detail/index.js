//index.js
//获取应用实例

const db = wx.cloud.database()
const collection  = db.collection('questionnaire')
Page({
  data: {
    PageCur:"launch",
    elements: [{
        title: '问卷要求',
        name: '工具简介：小程序layout设计工具，可视化方式进行小程序UI设计。通过鼠标拖拽组件方式进行UI布局。工具提供符合微信视觉统一的模板，并且按照FlexBox方式可视化布局。自动生成wxml和wxss，复制到微信开发者工具中即可同步显示。视频介绍请移步优酷',
        color: 'cyan',
        icon: 'newsfill'
      }
    ],
    des:'',
    tmp:''
  },
  indexNavigator:function(e){
    wx.navigateBack({ changed: true });
  },
  nextPage:function(e){
    wx.redirectTo({
      url: '/pages/test/test?_id='+this.data.tmp
    })
  },
  onLoad: function (options) {
    const {_id} = options;
    this.data.tmp = _id;
    // console.log(this.data.tmp)
    // this.setData({
    //   PageCur:options._id
    // })
    // console.log(PageCur)
    // console.log('failure')
    db.collection('questionnaire').doc(_id).get({
      success: res => {
        this.setData({
          des :res.data.des
        })
      }
      
    })
  },
  
  
})

