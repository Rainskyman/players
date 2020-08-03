// miniprogram/pages/risk/risk.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Srisklist:[],
    persons:9,
    mathindex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    if (wx.getStorageSync('Srisk')){
      this.setData({
        Srisklist: wx.getStorageSync('Srisk')
      })  
      console.log('未执行sql')
    }else{
      this.tkriskmsg()
    
    }
  },
  // 本地存储数据
  tkriskmsg() {
    console.log("nihao")
    const that = this
    db.collection('mooniesrisk').get({
      success: function (res) {
        console.log(res)
        wx.setStorageSync('Srisk', res.data)
        that.setData({
          Srisklist: wx.getStorageSync('Srisk')
        })
      },
      fail: console.error
    })
  },

  changediv(e){
    console.log(e.detail.value)
    console.log(typeof (e.detail.value))
    let a = parseInt(e.detail.value)
    this.setData({
      persons: a
    })
  },

  startrisk(){
    // console.log('asd')
    let allperson = this.data.persons
    let mtnum = Math.random() * allperson
   let mtnum2 = parseInt(mtnum)
   console.log(mtnum2)
   var i=0
   var j=0
   var starttime = setInterval(()=>{
     this.setData({
       mathindex:i
     })
     i=i+1
     j++
     if (i > allperson){
       i=0
     }
     if (j > 30){
       this.setData({
         mathindex: mtnum2
       })
       clearInterval(starttime)
     }
   },50)
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