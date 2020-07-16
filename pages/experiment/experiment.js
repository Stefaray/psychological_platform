/* 
1 用户上滑页面 滚动条触底 开始加载下一页数据
  1 找到滚动条触底事件  微信小程序官方开发文档寻找
  2 判断还有没有下一页数据
    1 获取到总页数  只有总条数
      总页数 = Math.ceil(总条数 /  页容量  pagesize)
      总页数     = Math.ceil( 23 / 10 ) = 3
    2 获取到当前的页码  pagenum
    3 判断一下 当前的页码是否大于等于 总页数 
      表示 没有下一页数据

  3 假如没有下一页数据 弹出一个提示
  4 假如还有下一页数据 来加载下一页数据
    1 当前的页码 ++
    2 重新发送请求
    3 数据请求回来  要对data中的数组 进行 拼接 而不是全部替换！！！
2 下拉刷新页面
  1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
    找到 触发下拉刷新的事件
  2 重置 数据 数组 
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动的关闭 等待效果

 */
const db = wx.cloud.database()
const collection  = db.collection('experiment')
const MAX_LIMIT = 100
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    PageCur:"experiment",
    tabs: [
      {
        id: 0,
        value: "最新",
        isActive: true
      },
      {
        id: 1,
        value: "时长",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    test:0,
    goodsList:[],
    goodsList_timeSort:[],
    goodsList_priceSort:[]
  },
 
  // 接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getGoodsList()
    var _this=this;
    db.collection('experiment').get({
      success: res =>{
         console.log(res.data);
         console.log(this);
         this.totalPages=Math.ceil(res.data.length/this.QueryParams.pagesize);
         console.log(this.totalPages)
         var copy1,copy2;
         copy1=this.copy(res.data)
         copy2=this.copy(res.data)
         this.setData({
          goodsList:          res.data.sort((a,b)=> b.create_date - a.create_date),
          goodsList_timeSort :copy1.sort((a,b)=> a.duration - b.duration),
          goodsList_priceSort:copy2.sort((a,b)=> b.reward - a.reward),

         })
      } 
    })
    wx.stopPullDownRefresh();
  },

  // 获取商品列表数据
  // getGoodsList(){
  //   var _this=this;
  //   db.collection('experiment').get({
  //     success:res =>{
  //       // // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
  //       // console.log(res.data)
  //       // //计算总数

  //       // console.log(res.data.length);
  //       // // this.totalPages=Math.ceil(res.data.length/this.QueryParams.pagesize);
  //       // console.log(typeof(res.data))
  //       test = res.data.length,
  //       console.log(test)
  //       this.setData({
  //         // 拼接了数组
          
  //         goodsList:res.data,
  //         goodsList_timeSort:[...this.data.goodsList_timeSort,...res.data].sort((a,b)=> a.duration - b.duration),
  //         goodsList_priceSort:[...this.data.goodsList_priceSort,...res.data].sort((a,b)=> a.reward - b.reward)
  //       })
  //       wx.stopPullDownRefresh();
  //     },
  //   })



  //   // const res=await request({url:"../../json/demo.json",data:this.QueryParams});
  //   // wx.request({
  //   //   url: 'http://ray34.cn-sh2.ufileos.com/%E5%A4%A7%E5%A4%8F%E6%9D%AF%2Fexperiment.json',
  //   //   success:(result)=>{
        
  //   //     const total=result.data.message.total;
  //   //     // 计算总页数
  //   //     this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
  //   //     console.log(this.totalPages);

  //   //     this.setData({
  //   //       // 拼接了数组
  //   //       goodsList:[...this.data.goodsList,...result.data.message.goods].sort((a,b)=> a.create_date - b.create_date),
  //   //       goodsList_timeSort:[...this.data.goodsList_timeSort,...result.data.message.goods].sort((a,b)=> a.duration - b.duration),
  //   //       goodsList_priceSort:[...this.data.goodsList_priceSort,...result.data.message.goods].sort((a,b)=> a.reward - b.reward)
  //   //     })
       
      
  //   //     // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
  //   //     wx.stopPullDownRefresh();
        
        
  //   //   }
  //   // });
  //   // 获取 总条数 
  // },

  

  


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
  copy(a){
    var m=[]
    // console.log("in copy")
    // console.log(a)
    for(let i=0;i<a.length;i++){
      m.push(a[i])
    }
    return m
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
    db.collection('experiment').get({
      success: res =>{
        //  console.log(res.data);
        //  console.log(this);
         this.totalPages=Math.ceil(res.data.length/this.QueryParams.pagesize);
        //  console.log(this.totalPages)
         var copy1,copy2;
         this.setData({
          goodsList:          res.data.sort((a,b)=> b.create_date - a.create_date),
          goodsList_timeSort :copy1.sort((a,b)=> a.duration - b.duration),
          goodsList_priceSort:copy2.sort((a,b)=> b.reward - a.reward),

         })
      } 
    })
    wx.stopPullDownRefresh();
  }
})