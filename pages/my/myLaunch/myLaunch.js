// pages/massage/massage.js
var app = getApp();
const db = wx.cloud.database()
const collection  = db.collection('questionnaire')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageCur:"my",
    tabs: [
      {
        id: 0,
        value: "问卷",
        isActive: true
      },
      {
        id: 1,
        value: "实验",
        isActive: false
      }
    ],
    
    goodsList:[],
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  onLoad: function (options) {
    db.collection('questionnaire').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        // res.data 包含该记录的数据
        console.log(res)
        this.setData({
          goodsList:res.data
        })
      }
    })
  },

  // 获取商品列表数据
  

  
  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // 1 获取被点击的标题索引
    const {index}=e.detail;
    // 2 修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom(){
  //  1 判断还有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页数据
      //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      wx.showToast({ title: '没有下一页数据' });
        
    }else{
      // 还有下一页数据
      //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      this.QueryParams.pagenum++;
      // this.getGoodsList();
      // this.setData({
      //   goodsList:[],
      //   goodsList_priceSort:[],
      //   goodsList_timeSort:[]
      // })
    }
  },
  // 下拉刷新事件 
  onPullDownRefresh(){
    // 1 重置数组
    // this.setData({
    //   goodsList:[],
    //   goodsList_priceSort:[],
    //   goodsList_timeSort:[]
    // })
    // 2 重置页码
    this.QueryParams.pagenum=1;
    // 3 发送请求
    // this.getGoodsList();
    wx.stopPullDownRefresh();
  }
})
