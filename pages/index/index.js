//index.js
//获取应用实例
const app = getApp()
Page({
  data:{
    page:1
  },
  onLoad(){
    var url='https://route.showapi.com/87-60?showapi_appid=167149&showapi_sign=f8b9f9cd6f9747b9ab6e16a06cf2bcc1&provinceName=北京';
    this.setData({
      url:url
    })
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url:url,
      success:res=>{
       this.setData({
         hospitalList:res.data.showapi_res_body.hospitalList
       })
       wx.hideLoading({})
      }
    })
  },
  onReachBottom(){
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: this.data.url+'&page='+(this.data.page+1),
      success:res=>{
        let newHospitalList=this.data.hospitalList.concat(res.data.showapi_res_body.hospitalList)
        this.setData({
          hospitalList:newHospitalList
        })
        wx.hideLoading({})
      }
    })
  },
  toDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id
    })
  }
})
