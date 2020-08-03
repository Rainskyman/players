// miniprogram/pages/isme/isme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{
        icon: 'message.png',
        info: '我的消息',
        way: 'memsg'
      },
      {
        icon: 'pointer.png',
        info: '真心话添加',
        way: 'meshop'
      },
      {
        icon: 'vip.png',
        info: '大冒险添加',
        way: 'mecard'
      },
    ],
    isdashang:false

  },


  memsg() {wx.showToast({
    title: '哒哒哒哒的审判吧',
  })},
  meshop() {wx.showToast({
    title: '哒哒哒哒的审判吧',
  })},
  mecard() {wx.showToast({
    title: '哒哒哒哒的审判吧',
  })},

  dashang(){
    console.log('sads')
    const that =this
    that.setData({
      isdashang:true
    })
    setTimeout(function(){
      that.setData({
        isdashang: false
      })
    },5000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})