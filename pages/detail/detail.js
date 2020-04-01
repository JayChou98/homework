// pages/detail/detail.js
Page({
  onLoad(options){
    let id = options.id
    wx.request({
      url: 'https://route.showapi.com/87-59?showapi_appid=167149&showapi_sign=f8b9f9cd6f9747b9ab6e16a06cf2bcc1&id='+id,
      success:res=>{
        this.setData({
          detail:res.data.showapi_res_body
        })
      }
    })
  }
})