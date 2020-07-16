// pages/radio/radio.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerslist:[],
    type:1,
    isMust:true,
    title:"",
    type_:1,
  },
  addOptions(){
    var arr = this.data.answerslist;
    arr.push("");
    this.setData({
      answerslist:arr
    })
  },

  addAnswer(event){
  var arr=this.data.answerslist;

  var i=parseInt(event.currentTarget.dataset.index)
  var option=event.detail.value
  arr[i]=option
  this.setData({
    answerslist:arr
  })
  },

  title(event){
    
    this.setData({
      title:event.detail.value
    })

  },
  changeIsmust(event){
      var status=!this.data.isMust
      this.setData({
        isMust:status
      })
  },
  remove(event){
    // console.log('长安了')
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: res=> {
        if (res.confirm) {
            // 用户点击了确定 可以调用删除方法了
            var i=parseInt(event.currentTarget.dataset.index)
            var arr=this.data.answerslist;
            arr.splice(i,1)
            this.setData({
              answerslist:arr
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

  }

  ,  
  onLoad: function (options) {
      console.log(options.type)
      if(options.type!=null){
        this.setData({
          "type": parseInt(options.type)
        });
      }
      
      if (parseInt(options.type)==0) {
        wx.setNavigationBarTitle({
          title: "单选题"//页面标题为路由参数
        })
      } else if(options.type==1) {
        wx.setNavigationBarTitle({
          title: "多选题"//页面标题为路由参数
        })
      }
      else if(options.type==2){
        wx.setNavigationBarTitle({
          title: "填空题"//页面标题为路由参数
        })
      }

     
      

  },

 
  submit(){
    // console.log()
    var ok=true;
    var data=this.data
    var question={}
    var arr=this.data.answerslist
    var real_arr=[];
    for(let i=0;i<arr.length;i++){
      if(arr[i]!=""){
        real_arr.push(arr[i])
      }
    }
    question.options=real_arr
    if(this.data.title==""){
      ok=false;
    }
    if(this.data.type==0){
        question.type='填空'
        if(real_arr.length==0){
          ok=false;
        }
    }else if(this.data.type==1){
      question.type='多选'
      if(real_arr.length==0){
        ok=false;
      }
    }else{
      question.type='填空'
    }
    this.data.type_=this.data.type
    question.type=this.data.type_
    question.text=this.data.title;
    question.isMust=this.data.isMust;
    
    if(ok){
      var arr=getApp().globalData.createPaper.questions
      // if(getApp().judgeNone(arr)){
      //   arr=[]
       
      // }
      if(arr.length == 0){
        arr=[]
      }
      arr.push(question)
      getApp().globalData.createPaper.questions=arr
      
  
      wx.redirectTo({
        url:'/pages/createSub/createSub',
      })
    }
    else{
      if(this.data.type==2)
      wx.showToast({
        title: '问题不能为空',
        icon: 'none',
        duration: 1000
      })
      else{
        wx.showToast({
          title: '问题不能为空且选项数大于0',
          icon: 'none',
          duration: 1000
        })
      }
    }
  
    
  }
})