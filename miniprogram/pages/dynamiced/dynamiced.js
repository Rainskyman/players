// miniprogram/pages/dynamiced/dynamiced.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const windex = options.index
    const pages = getCurrentPages()
    const bpage = pages[0]
    const datas = bpage.data.thispagedata[windex]

    this.setData({
      da: datas
    })

    this.loadcomments()
  },
  loadcomments() {
    console.log("加载哪一个文章")
    console.log(this.data.da)
    db.collection('comments').where({
      wid: this.data.da._id
    }).orderBy('ctime', 'desc').get().then(res => {
      console.log(res)
      const getcomm = res.data
      getcomm.forEach((val) => {
        val.ctime = val.ctime.getTime()
      })
      this.setData({
        getcomm: getcomm
      })
    })
  },
  onFocusEvent() {
    this.setData({
      mask: true
    })
  },
  onBlurEvent() {
    this.setData({
      mask: false
    })
  },
  onConfirmEvent(e) {
    if(app.globalData.userInfo){
      const commentmsg = e.detail.value
      console.log(e.detail)
      console.log("当前文本" + this.data.da._id)
      // 1584104783300_0.23442041983351736_33613241
      1584104783300_0.23442041983351736_33613241

      db.collection('comments').add({
        data: {
          cauthor: app.globalData.userInfo.nickName,
          header: app.globalData.userInfo.avatarUrl,
          cwenben: commentmsg,
          ctime: db.serverDate(),
          wid: this.data.da._id
        }
      }).then(res => {
        // console.log(res)
        const cments = {
          "cauthor": app.globalData.userInfo.nickName,
          "header": app.globalData.userInfo.avatarUrl,
          "cwenben": commentmsg,
          "ctime": (new Date()).getTime()
        }
        const getcomms = this.data.getcomm
        getcomms.splice(0, 0, cments)
        this.setData({
          getcomm: getcomms
        })

      })
    }else{
      wx.showModal({
        title: '请在上页面授权',
        content: '右下角+',
      })
    }

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