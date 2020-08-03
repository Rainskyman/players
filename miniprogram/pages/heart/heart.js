// miniprogram/pages/heart/heart.js
import {
  initwindowsize
} from '../../untils/skytools.js'


const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rotateW: '',
    rotateH: '',
    addrotate: 0,
    heartlist: "真心的关注身边的每一个人，让Ta不在孤单",
    bendiheart: [],
    activecolor: '',
    upindex: 0,
    longimg: [
      'cloud://mooniessky-roneg.6d6f-mooniessky-roneg-1301466912/longpng/d.png',
      'cloud://mooniessky-roneg.6d6f-mooniessky-roneg-1301466912/longpng/c.png',
      'cloud://mooniessky-roneg.6d6f-mooniessky-roneg-1301466912/longpng/b.png',
      'cloud://mooniessky-roneg.6d6f-mooniessky-roneg-1301466912/longpng/a.png'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.initrotateBox()
    wx.showModal({
      title: '点击圆盘',
      content: '开始游戏',
    })

    if (wx.getStorageSync('Sgheart')) {
      this.setData({
        bendiheart: wx.getStorageSync('Sgheart')
      })
    } else {
      this.tkheartmsg()
    }
  },

  // 设置颜色
  upcolor() {
    var ind = this.data.upindex++
      var colorlist = ['#FF4040', '#FF34B3', '#EE3A8C', '#D15FEE', '#CD6839', '#8B8970', '#FFFFFF']
    if (ind > 6) {
      this.setData({
        upindex: 0,
        activecolor: '#000000'
      })
    } else {
      this.setData({
        activecolor: colorlist[ind]
      })
    }


    // bendiheart
    this.data.bendiheart = wx.getStorageSync('Sgheart')
    var lgt = this.data.bendiheart.length
    let mtnum = Math.random() * lgt
    let mtnum2 = parseInt(mtnum)
    this.setData({
      heartlist: this.data.bendiheart[mtnum2].heartmsg
    })
  },

  // 本地存储数据
  tkheartmsg() {
    db.collection('mooniesheart').get({
      success: function(res) {
        // console.log(res.data)
        wx.setStorageSync('Sgheart', res.data)
        this.setData({
          bendiheart: wx.getStorageSync('Sgheart')
        })
      },
      success:res=>{
        console.log(res)
      },
      fail: console.error
    })
  },


  // 随机旋转角度
  sheartg() {
    var degnum = 0
    var mandnum = Math.round(Math.random() * 10);
    var mandnum2 = Math.round(Math.random() * 10);
    console.log('时限' + mandnum)
    var startdeg = setInterval(() => {
      console.log('相加角度')
      degnum += 10
      this.setData({
        addrotate: degnum
      })
      if (degnum > mandnum2 * 100) {
        console.log(degnum)
        clearTimeout(startdeg)
      }
    }, 10)
  },


  // 设置旋转盒子
  initrotateBox() {
    var windowS = initwindowsize()
    console.log(windowS)

    this.setData({
      rotateW: windowS.windowW
    })
    console.log(this.data.rotateW)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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