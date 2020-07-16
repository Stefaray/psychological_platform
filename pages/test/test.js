import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
var util = require('../../utils/util.js');  
const db = wx.cloud.database()
const collection  = db.collection('experiment')
const collection_history  = db.collection('history')
Page({
  data: {
    list: ['a', 'b', 'c'],
    toastHidden: true, // 
    toastText: '',//文本  
    i:0,
    q_id:'',
    a_id:'',
    result:[],
    res: [],
    questionList:[],
   //------------------------------------------//
    title:'',
    total:0,
    des:'',
    attention:'',
    questions:{
      type:0,
      text:'',
      options:[],
      isMust:true
    },
    reward:0,
    create_date:0,
    duration:0,
    //------------------------------------------//
    date:util.formatTime(new Date()),
    Type:0,
    task_id:'',
    title_history:'',
    author_openid:'',
  },

  checkboxChange: function(e) {
    // console.log(e)
    this.data.res[e.currentTarget.dataset.index] = e.detail.value
    // console.log(this.data.res)
   

  },
  radioChange: function(e) {
    // console.log(e)
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    // console.log(e)
    this.data.res[e.currentTarget.dataset.index] = e.detail.value
    // console.log(this.data.res)
    // result[i++] = e.detail.value;
  },
  textareaAInput: function (e) {
    console.log(e)
    this.data.res[e.currentTarget.dataset.index] = e.detail.value
    
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
    // this.perQuestionnaire();
    const {_id} = options;
    this.data.q_id = _id;
    // console.log('failure')
    // console.log(_id)
    db.collection('questionnaire').doc(_id).get({
      success: res => {
        
        // res.data 包含该记录的数据
        this.setData({
          title      :res.data.title,
          total    :res.data.total,
          des:res.data.des,
          attention:res.data.attention,
          questions:res.data.questions,
          reward:res.data.reward,
          create_date:res.data.create_date,
          duration    :res.data.duration,
          a_id : res.data._openid,
        })
      }
    })
    
  },
  
  // perQuestionnaire(){
  //   // const res=await request({url:"../../json/demo.json",data:this.QueryParams});
  //   wx.request({
  //     url: 'http://ray34.cn-sh2.ufileos.com/%E5%A4%A7%E5%A4%8F%E6%9D%AF%2Ftest6.json',
  //     success:(result)=>{
        
  //       const total=result.data.message.total;
  //       // 计算总页数
  //       this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
  //       console.log(this.totalPages);

  //       this.setData({
  //         questionList:[...this.data.questionList,...result.data.message.goods],
  //         questionTitle:     result.data.message.title,    
  //         questionTask:      result.data.message.task,     
  //         questionAttention: result.data.message.attention,
  //         // 拼接了数组
  //         // goodsList:[...this.data.goodsList,...result.data.message.goods].sort((a,b)=> a.upd_time - b.upd_time),
  //         // goodsList_timeSort:[...this.data.goodsList_timeSort,...result.data.message.goods].sort((a,b)=> a.goods_price - b.goods_price),
  //         // goodsList_priceSort:[...this.data.goodsList_priceSort,...result.data.message.goods].sort((a,b)=> a.goods_price - b.goods_price)
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
      wx.showToast({ title: '没有下一页数据',
                    icon: 'success',
                    duration: 500});
        
    }else{
      // 还有下一页数据
      //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      this.QueryParams.pagenum++;
      // this.questionList();
      this.setData({

        // questionList:[],
        title:'',
        total:0,
        des:'',
        attention:'',
        questions:{
          type:0,
          text:'',
          options:[],
          isMust:true
        },
        reward:0,
        create_date:0,
        duration:0  ,
        //------------------------------------------//

      })
    }
  },


  // 下拉刷新事件 
  onPullDownRefresh(){
    // 1 重置数组
    this.setData({
      title:'',
      total:0,
      des:'',
      attention:'',
      questions:{
        type:0,
        text:'',
        options:[],
        isMust:true
      },
      reward:0,
      create_date:0,
      duration:0  ,
      //------------------------------------------//

      
    })
    // 2 重置页码
    this.QueryParams.pagenum=1;
    // 3 发送请求
    this.questionList();
    this.questionTask();
    this.questionTitle();
    this.questionAttention();
  },


  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
    
  },
  

  noop() {},
  // 复选框结束
  onToastChanged: function () {
    this.setData({
      toastHidden: true
    });
  },
  nextPage:function(e){
   console.log(this.data.res)
    db.collection('history').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        task_id:     this.data.q_id,
        date: util.formatTime(new Date()),
        Type: 0,
        title: this.data.title,
        author_openid: this.data.a_id,
        reward: this.data.reward
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    }),
    db.collection('Statistics').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        ques_id:     this.data.q_id,
        data: this.data.res
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })



      // console.log("middle view catchtap")

    this.setData({
      toastHidden: false, //提交
      toastText: '提交成功',//文本  
    }),
    wx.redirectTo({
      url: '/pages/money/index'
    })
  },
})