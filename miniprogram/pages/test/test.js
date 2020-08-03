// pages/test/test.js
const btnPos = wx.getMenuButtonBoundingClientRect();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: wx.getSystemInfoSync().windowHeight-btnPos.top-btnPos.height,
    // height: wx.getSystemInfoSync().windowHeight,

    scrollTop:0,
    zIndex:0
  },
  handleBottomClick:function(){
    console.log('eeee')
  },
  handleClick:function(){
      this.setData({ scrollTop: this.data.height-100})
  },
  handleScroll:function(e){
    console.log(e)
    if(e.detail.scrollTop<=20){
      this.setData({ zIndex: 1 })
    }else{
      this.setData({ zIndex: 0 })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})