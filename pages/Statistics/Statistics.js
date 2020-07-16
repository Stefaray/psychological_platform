// pages/Statistics/Statistics.js
import * as echarts from '../../ec-canvas/echarts';
const db = wx.cloud.database();
const Statistics=db.collection('Statistics')
const question=db.collection('questionnaire')
var questionList=[]
var option = {
  
};

var chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  

  chart.setOption(option);
  return chart;
}


Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
        onInit: initChart
      
    },
    activeNames: ['1'],
    question:{
      title:"",
      des:"",
      questions:[]
    },
    pageIndexArray:[]
    ,showProblem:{},
    cssWidth:60,
    option:{},
    chartType:0,
    
  },

  

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var ques_id=options.ques_id
    question.where(
      {
        _id:ques_id
      }
    ).get({
        success:res =>{
          var re=res.data[0]
          console.log(re)
          this.setData({
            "question.title":re.title,
            "question.des":re.des
          })
          let arrr=[];
          // var questionList=[]

          if(re.questions.length>100){
            this.setData({
              cssWidth:this.data.cssWidth+12
            })
          }
          if(re.questions.length>1000){
            this.setData({
              cssWidth:this.data.cssWidth+12
            })
          }
        
          for (let i = 0; i < re.questions.length; i++) {
            arrr.push(i+1)
          }
          this.setData({
            pageIndexArray:arrr
          })
         
          for (let i = 0; i < re.questions.length; i++) {
            var problem={}
            var ques = re.questions[i];
            
            problem.text=ques.text
            problem.options=[]
            for(let j=0;j<ques.options.length;j++){
              var option={}
              option.text=ques.options[j]
              problem.options.push(option)
            }
            
            problem.type=ques.type
            
            questionList.push(problem)
          }
         
          Statistics.where({
            ques_id:ques_id
          }).get({
            success:res =>{
            //  console.log(res)
              var arr=res.data
              console.log(arr)
              var hashMap=[]
              
              for (let i = 0; i < arr.length; i++) {
                
                const data = arr[i].data;
             
                for (let j=0;j<data.length;j++){
                  //第一个问题的或回答
                  if(questionList[j].type==2){
                    if(!hashMap[j+""]){
                      hashMap[j+""]=[]
                    }
                    hashMap[j+""].push(data[j])
                  }
                  else if(questionList[j].type==0){
                    if(!hashMap[j+"_"+data[j]]){
                      hashMap[j+"_"+data[j]]=0
                    }
                    hashMap[j+"_"+data[j]]++;
                  }
                  else if(questionList[j].type==1){
                    for(let k=0;k<data[j].length;k++){
                      if(!hashMap[j+"_"+data[j][k]]){
                        hashMap[j+"_"+data[j][k]]=0
                      }
                      hashMap[j+"_"+data[j][k]]++;
                    }
                  }
                
                }

              }
              // console.log(hashMap)
              
              for (let i = 0; i < questionList.length; i++) {
                var problem = questionList[i];
                
                switch(problem.type){
                  case 0:case 1:
                    var cnt=[]
                    for(let j=0;j<problem.options.length;j++){
                      var op=problem.options[j]
                      let key=i+"_"+op.text
                      if(!hashMap[key]){
                        hashMap[key]=0
                      }
                      op.cnt=hashMap[key]
                      
                    }
                    break
                  case 2:
                    var answers=[]
                    var key=i+""
                    for(let j=0;j<hashMap[key].length;j++){
                      answers.push(hashMap[key][j])
                    }
                    problem.answers=answers
                    break
                }
                
                
              }

              // console.log(questionList)
              this.setData({
                "question.questions":questionList,
              })

              this.UpdateProblem(options.page)

            }
          })
         

        }
    })

  },
  UpdateProblem(page_i){
  
    this.setData({
      page_i:page_i,
      "showProblem":this.data.question.questions[page_i-1]
    })

    this.set_BarOption()

  }
  ,

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  },


  gotoPage(event){
    console.log(event)
    var page_i=event.currentTarget.dataset.i
    this.UpdateProblem(page_i)
      
  },

  set_BarOption(){
    
    
    var problem=this.data.showProblem
    console.log(problem)
    var optionValue=[];
        var optionText=[];
    if(problem.type!=2){
        
        for (let i = 0; i < problem.options.length; i++) {
          const element = problem.options[i];
          optionValue.push(element.cnt)
          optionText.push("选项"+(i+1))
        }
        optionText.push("")

    }
    var title=this.data.showProblem.text
    option = {
      
      tooltip: {},
      
      xAxis: {
          data: optionText,
          axisLabel:{
            showMaxLabel: false
        }
      },
      yAxis: {axisLabel:{
        showMaxLabel: true
    }},
      series: [{
          name: '人数',
          type: 'bar',
          data: optionValue
      }]
  };
    if(chart==null){
      this.setData({
        ec:{
          onInit:initChart
        }
      })
    }
    console.log(chart)
    chart.setOption(option)
  },


  


daochu(){
  
  var buffer=[]
  var question=this.data.question.questions
  buffer[0]=this.data.question.title
  buffer[1]="问题,选项or回答,人数\n"
  for(let i=0;i<question.length;i++){
    let problem=question[i]
    buffer[1]+=problem.text+","+"\n"
    
    if(problem.type!=2){
      let ops=problem.options
      buffer[1]+=ops[0].text+","+ops[0].cnt+"\n"
      for(let j=1;j<ops.length;j++){
          buffer[1]+=","+ops[j].text+","+ops[j].cnt+"\n"
      }
    }
    else{
      let ans=problem.answers
      buffer[1]+=ans[0]+"\n"
      for(let j=1;j<ans.length;j++){
        buffer[1]+=","+ans[j]+"\n"
      }
    }
    


  }
   getApp().globalData.buffer=buffer;
  
  wx.redirectTo({
    url: '/pages/csvContent/csvContent'
  });
}


})


