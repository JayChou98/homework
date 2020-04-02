// miniprogram/pages/list/list.js
const db = wx.cloud.database();
Page({
  onLoad(){
    db.collection('users').get().then(res=>{
      this.setData({
        list:res.data
      })
    }).catch(err=>{
      console.log(err);
    })
  }
})