//index.js
//获取应用实例
// import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
const db = wx.cloud.database()
const collection  = db.collection('experiment')
Page({
  
  indexNavigator:function(e){
    wx.navigateBack({ changed: true });
  },
  nextPage:function(e){
    this.setData({
      toastHidden: false, //吐司  
      toastText: '我是吐司',//吐司文本  
    })
  },
  
  data: {
    questionTask:"工具简介：小程序layout设计工具，可视化方式进行小程序UI设计。通过鼠标拖拽组件方式进行UI布局。\n工具提供符合微信视觉统一的模板，并且按照FlexBox方式可视化布局。\n自动生成wxml和wxss，复制到微信开发者工具中即可同步显示。视频介绍请移步优酷",
    PageCur:"launch",
    toastHidden: true, //吐司  
    toastText: '',//吐司文本  
    elements: [{
      title: '布局',
      name: 'layout',
      color: 'cyan',
      icon: 'newsfill'
    },
    {
      title: '背景',
      name: 'background',
      color: 'blue',
      icon: 'colorlens'
    }
    ],
    title:'',
    content:'',
    attention:'',
    reward:0,
    duration:'',
    place:'',
    task_time:'',
    QRcode:{},
    create_date:0,
  },
  onToastChanged: function () {
    this.setData({
      toastHidden: true
    });
  },
  onLoad: function (options) {
    const {_id} = options;
    console.log('failure')
    db.collection('experiment').doc(_id).get({
      success: res => {
        // res.data 包含该记录的数据
        this.setData({
          title      :res.data.title,
          content    :res.data.content,
          attention:res.data.attention,
          reward:res.data.reward,
          duration:res.data.duration,
          place:res.data.place,
          task_time:res.data.task_time,
          QRcode    :res.data.QRcode
        })
      }
    })
  },


})

