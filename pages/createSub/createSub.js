const db = wx.cloud.database();
const collection = db.collection('questionnaire')
var appInst =  getApp();


Page({

data:{

  title:"",
  des:""
  ,
  questions:[
    
  ]

  
  ,
  options:[
    {text:'单选题',value:0},
    {text:'多选题',value:1},
    {text:'填空题',value:2},

  ],
  show:true,



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
  active: 1,


    
},
showPopup() {
  this.setData({ show: true });
},

onClose() {
  this.setData({ show: false });
}
  ,
  toggle(res){
    if(res){
      return false;
    }
    return true;
  }
  ,
addProblem(event){
    // console.log(show);
    // console.log(this.data.show)
    var show=this.toggle(this.data.show);
    this.setData({
      show:show
    })
    
},
selectProblem(event){
  var type=event.currentTarget.dataset.type
  wx.redirectTo({
    url:'/pages/radio/radio?type='+type,
  })

},
remove(event){
  // console.log(event.currentTarget.dataset.index)
  wx.showModal({
    title: '提示',
    content: '确定要删除吗？',
    success: res=> {
      if (res.confirm) {
          // 用户点击了确定 可以调用删除方法了
          var i=parseInt(event.currentTarget.dataset.index)
          var arr=this.data.questions
          arr.splice(i,1)
          this.setData({
            questions:arr
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })




  

},

publish(){
  //将当前所有的question保存到globalData的createPaper里
  appInst.globalData.createPaper.questions=this.data.questions;
  
  var arr=this.data.questions;
  if(arr.length==0){
    wx.showToast({
      title: '请至少添加一个问题',
      icon: 'none',
      duration: 2000
    })
  }else{
    appInst.globalData.createPaper.total=arr.length;
    wx.redirectTo({
      url:'/pages/createThird/createThird',
    })
  }


  
}
,


onLoad:function(options){
  var arr=appInst.globalData.createPaper.questions
  if(!arr){
    arr=[]
  }
  appInst.globalData.createPaper.questions=arr;
  
  this.setData({
    questions:arr,
    title:appInst.globalData.createPaper.title,
    des:appInst.globalData.createPaper.des
  })
 
}

})



