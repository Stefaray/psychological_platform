
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

const db = wx.cloud.database()
const collection  = db.collection('questionnaire')
Page({ 
  data: {
    PageCur:"questionnaire",
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
    goodsList:[],
    goodsList_timeSort:[],
    goodsList_priceSort:[],

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
    
    // this.data.s1 = new Date().format("yyyy-MM-dd"); 
    // console.log(this.data.time)
    // this.getGoodsList();
    var _this=this;
    db.collection('questionnaire').get({
      success: res =>{
         console.log(res.data);
         console.log(this);
         this.totalPages=Math.ceil(res.data.length/this.QueryParams.pagesize);
         console.log(this.totalPages)
        var copy1,copy2;
        // console.log(res.data)
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
  
  copy(a){
    var m=[]
    // console.log("in copy")
    // console.log(a)
    for(let i=0;i<a.length;i++){
      m.push(a[i])
    }
    return m
  },

  // 获取商品列表数据
  // getGoodsList(){
    
  //   // const res=await request({url:"../../json/demo.json",data:this.QueryParams});
  //   wx.request({
  //     url: 'http://ray34.cn-sh2.ufileos.com/demo.json',
  //     success:(result)=>{
        
  //       const total=result.data.message.total;
  //       // 计算总页数
  //       this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
  //       console.log(this.totalPages);

  //       this.setData({
  //         // 拼接了数组
  //         goodsList:[...this.data.goodsList,...result.data.message.goods].sort((a,b)=> a.upd_time - b.upd_time),
  //         goodsList_timeSort:[...this.data.goodsList_timeSort,...result.data.message.goods].sort((a,b)=> a.goods_price - b.goods_price),
  //         goodsList_priceSort:[...this.data.goodsList_priceSort,...result.data.message.goods].sort((a,b)=> a.goods_price - b.goods_price)
  //       })
       
      
  //       // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
  //       wx.stopPullDownRefresh();
        
        
  //     }
  //   });
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
      this.setData({
        goodsList:[],
        goodsList_priceSort:[],
        goodsList_timeSort:[]
      })
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
    db.collection('questionnaire').get({
      success: res =>{
         console.log(res.data);
         console.log(this);
         this.totalPages=Math.ceil(res.data.length/this.QueryParams.pagesize);
         console.log(this.totalPages)
         var copy1,copy2;
         this.setData({
          goodsList:          res.data.sort((a,b)=> b.create_date - a.create_date),
          goodsList_timeSort :copy1.sort((a,b)=> a.duration - b.duration),
          goodsList_priceSort:copy2.sort((a,b)=> b.reward - a.reward),

         })
      } 
    })
    wx.stopPullDownRefresh();
  },
  

  
})