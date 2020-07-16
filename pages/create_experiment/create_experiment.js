const db = wx.cloud.database()
const collection  = db.collection('experiment')
Page({
  data: {
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
  onLoad: function (options) {
    
    this.setData({
      create_date: new Date().getTime()
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    this.data.QRcode = file;
    console.log(this.data.QRcode)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.path,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
  experiment_title: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  experiment_content: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  experiment_attention: function (e) {
    this.setData({
      attention: e.detail.value
    })
  },
  experiment_reward: function (e) {
    this.setData({
      reward: e.detail.value
    })
  },
  experiment_duration: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  experiment_place: function (e) {
    this.setData({
      place: e.detail.value
    })
  },
  experiment_task_time: function (e) {
    this.setData({
      task_time: e.detail.value
    })
    console.log(this.data.task_time)
  },
  submit() {  //点击输出middle view

    db.collection('experiment').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        title    :this.data.title,
        content  :this.data.content ,
        attention:this.data.attention ,
        reward   :this.data.reward ,
        duration :this.data.duration ,
        place    :this.data.place ,
        task_time:this.data.task_time ,
        QRcode   :this.data.QRcode ,
        create_date:this.data.create_date
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
    console.log("middle view catchtap"),
    wx.redirectTo({
      url: '/pages/experiment/experiment',
    });
  },
});