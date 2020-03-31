//index.js
Page({
  onLoad(){
    wx.request({
      url: 'https://route.showapi.com/1700-1?showapi_appid=167149&showapi_sign=f8b9f9cd6f9747b9ab6e16a06cf2bcc1',
      success:(res)=>{
        console.log(res);
        this.setData({
          list:res.data.showapi_res_body.storylist
        })
      },
      fail(err){
        console.log(err)
      }
    })
  }
})
