// miniprogram/pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upimgpath:'',
    drawOb:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      upimgpath: options.imgurl,
      drawOb:options.mypal
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '一起来画画',
      path: '/pages/share/share',
      // imageUrl: this.data.upimgpath,
      success: function (res) {
        // 转发成功
        console.log('转发成功')
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败')
        console.log(res)
      }
    }

  },
  clickSave: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.upimgpath,
      success:res=>{
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail:res=>{
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  
  watersave(){
   console.log('water')
  },
  goback(){
    wx.navigateBack({
      delta: 1
    })
  }
  
})