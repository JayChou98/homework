//index.js
const db = wx.cloud.database();
Page({
  data:{
    localImg:'/images/add.png'
  },
  toSubmit(e) {
    console.log(e);
    
    var data = e.detail.value;
    db.collection('users').add({
      data:data
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
  chanceImg(){
    wx.chooseImage({
      complete: (res) => {
        var localImage=res.tempFilePaths[0];
        var name = new Date().getTime();
        var extend=/\.\w+$/.exec(localImage)[0];
        var imgurl = name+extend;
        wx.cloud.uploadFile({
          cloudPath:imgurl,
          filePath:localImage,
          success:res=>{
            this.setData({
              localImg:res.fileID
            })
          },
          fail:err=>{
            console.log(err);
          }
        })
      },
    })
  }
})