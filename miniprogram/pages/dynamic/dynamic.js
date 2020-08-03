// miniprogram/pages/dynamic/dynamic.js

const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [1, 2, 3, 5, 6],
    thispagedata: [],
    hasmore: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  loadpage(start = 0) {

    const that = this

    wx.cloud.callFunction({
      name: "getdatas",
      data: {
        start: start
      }
    }).then(res => {
      console.log("云函数返回res")
      console.log(res.result.datas)
      console.log("云函数返回res")
      const pagedata = res.result.datas
      let hasmore = true
      if (pagedata.length == 0) {
        hasmore = false
      } else {
        hasmore = true
      }
      let newpagedata = []
      if (start > 0) {
        newpagedata = that.data.thispagedata.concat(pagedata)
      } else {
        newpagedata = pagedata
      }

      that.setData({
        thispagedata: newpagedata,
        hasmore: hasmore
      })
    })
  },
  choosesend(e) {
    console.log(e)
    if (app.isLogin()) {
      console.log('send')
      wx.showActionSheet({
        itemList: ['文字', '图文', '视频'],
        success: res => {
          console.log(res.tapIndex)
          const sendindex = res.tapIndex
          if (sendindex == 0) {
            wx.navigateTo({
              url: '../write/write?sendtype=' + sendindex,
            })
          } else if (sendindex == 1) {
            wx.navigateTo({
              url: '../write/write?sendtype=' + sendindex,
            })
          } else {
            wx.chooseVideo({
              success: res => {
                console.log(res)
                const lingshivideo = res.tempFilePath
                this.setData({
                  lingshivideo: lingshivideo
                })
                wx.navigateTo({
                  url: '../write/write?sendtype=' + sendindex,
                })
              }
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },


 
  // // 点赞
  // onPraise(e) {
  //   const trueindex = e.currentTarget.dataset.da
  //   const pd = this.data.thispagedata
  //   const whichdata = pd[trueindex]
  //   const opid = whichdata._openid
  //   const id = whichdata._id
  //   const loginopid = app.globalData.openId
  //   let ispraises = false
  //   if (whichdata.praises) {
  //     whichdata.praises.forEach(val => {
  //       if (val == loginopid) {
  //         ispraises = true
  //         console.log('你已经点过赞了')
  //       }
  //     })
  //   }
  //   if (!ispraises) {
  //     console.log("赞的微博")
  //     db.collection('letsay').doc(whichdata._id).update({
  //       data: {
  //         "praises": db.command.push(loginopid)
  //       },
  //       success: res => {
  //         console.log(res)
  //         if (!whichdata.praises) {
  //           whichdata.praises = [loginopid]
  //         } else {
  //           whichdata.praises.push(loginopid)
  //         }
  //         whichdata.ispraises = true
  //         pd[trueindex] = whichdata
  //         this.setData({
  //           thispagedata: pd,
  //         })
  //       }
  //     })
  //   } else {
  //     console.log("取消赞的微博")
  //     db.collection('letsay').doc(whichdata._id).field({
  //       praises: true
  //     }).get().then(res => {
  //       console.log(res.data.praises)
  //       const isnotdian = res.data.praises
  //       const newdian = []
  //       isnotdian.forEach((val, ind) => {

  //         if (val != loginopid) {
  //           newdian.push(val)
  //         }

  //         whichdata.praises = newdian
  //         whichdata.ispraises=false
  //         pd[trueindex] = whichdata

  //         this.setData({
  //           thispagedata: pd
  //         })

  //         db.collection("letsay").doc(whichdata._id).update({
  //           data: {
  //             praises: newdian
  //           }
  //         })


  //       })



  //     })
  //   }
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadpage()
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
    console.log("底部")
    this.loadpage(0);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("底部")
    this.loadpage(this.data.thispagedata.length);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})