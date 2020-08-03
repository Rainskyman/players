// miniprogram/pages/write/write.js
import {
  initwindowsize,
  getUUID,
  getExt
} from '../../untils/skytools.js'
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationmsg: null,
    choosedimgs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const uppage = getCurrentPages()
    const videopath = uppage[0].data.lingshivideo

    var WH = initwindowsize()
    var weiBox = WH.windowW - 40
    var imgWidth = (weiBox - 7.5) / 3



    this.setData({
      sendtype: options.sendtype,
      setimgWidth: imgWidth,
    })
    if (this.data.sendtype == 2) {
      this.setData({
        videopath: videopath
      })
    }
  },



  // oUkLY5QOrTZW0orYmUsZGjJM_I48
  startsubmit(e) {
    console.log("内容" + e.detail.value.content)
    const wenben = e.detail.value.content
    this.checkwenben(wenben)
  },

  // 检测文本
  checkwenben(wenben) {
    wx.cloud.callFunction({
      name: "checktxt",
      data: {
        wenben
      },
      success: res => {
        console.log('状态码' + res.result.errcode)
        if (res.result.errcode == 0) {
          console.log(res)
          this.setData({
            opid: res.result.openid
          })
          this.whattype(wenben)
          // wx.showModal({
          //   title: 'ok',
          //   content: '成功',
          // })
        } else {
          wx.showModal({
            title: 'fail',
            content: res.result.errmsg,
          })
        }
      }
    })
  },
  // 判断类型并上传数据库
  whattype(wenben) {
    let ontype = this.data.sendtype
    const phone = wx.getSystemInfoSync()

    let mathweizhi = Math.random() * 8
    let mathweizhi2 = parseInt(mathweizhi)
    console.log(mathweizhi2)


    let model = phone.model
    // model.replace(/<.*>/,"")
    const dd = ['水星', '火星', '冥王星', '土星', '木星', '金星', '塞伯坦', '光之国']
    const weizhi = this.data.locationmsg ? this.data.locationmsg : dd[mathweizhi2]
    const author = app.globalData.userInfo.nickName
    const header = app.globalData.userInfo.avatarUrl
    let opid = this.data.opid
    const sendtime = db.serverDate()
    // console.log("类型=" + ontype)
    // console.log("文本=" + wenben)
    // console.log("位置=" + weizhi)
    // console.log("昵称=" + author)
    // console.log("oppenid=" + opid)
    // console.log("手机" + model)
    // console.log(sendtime)

    if (ontype == 0) {
      console.log('储存文本')
      this.sendwen(opid, author, header, wenben, weizhi, sendtime, model)
    } else if (ontype == 1) {
      console.log('储存文本+图')
      if (this.data.choosedimgs.length > 0) {
        console.log('有图片')
        wx.showLoading({
          title: '上传图片中',
        })
        const isuped = []
        this.data.choosedimgs.forEach((val, ind) => {
          console.log(val)
          const uppath = this.productfile(opid, val)
          wx.cloud.uploadFile({
            filePath: val,
            cloudPath: uppath,
            success: res => {
              console.log(res)
              isuped.push(res.fileID);
              if (isuped.length == this.data.choosedimgs.length) {
                // 接下来就是发布微博了
                wx.hideLoading()
                this.sendimgwenben(opid, author, header,wenben, isuped, weizhi, sendtime, model)
              }
            }
          })
        })
      } else {
        console.log('没有图片')
      }
    } else {
      console.log('储存文本+视频')
      if (this.data.videopath) {
        wx.showLoading({
          title: '上传视频中',
        })
        let upvideopath = this.productvideofile(opid, this.data.videopath)
        wx.cloud.uploadFile({
          filePath: this.data.videopath,
          cloudPath: upvideopath,
          success: res => {
            console.log(res)
            if (res.fileID) {
              wx.hideLoading()
              this.sendvideowenben(opid, author, header, wenben, res.fileID, weizhi, sendtime, model)
            }
          }
        })
      } else {
        console.log('不存在视频')
      }
    }
  },
  // 只有文本
  sendwen(opid, author, header, wenben, weizhi, sendtime, model) {
    wx.showLoading({
      title: '正在发表',
    })
    db.collection('letsay').add({
      data: {
        oppenid: opid,
        author: author,
        header: header,
        wenben: wenben,
        weizhi: weizhi,
        phone: model,
        sendtime: sendtime
      },
      success: res => {
      
        if (res._id) {
          wx.hideLoading()
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 3000,
            success: res => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          wx.showToast({
            title: '失败',
            duration: 1500
          })
        }
      }
    })
  },
    // 图片+文本存入
  sendimgwenben(opid, author, header, wenben, isuped, weizhi, sendtime, model) {
    console.log('=====')
    wx.showLoading({
      title: '正在发表',
    })
    db.collection('letsay').add({
      data: {
        oppenid: opid,
        author: author,
        header: header,
        wenben: wenben,
        isuped: isuped,
        weizhi: weizhi,
        phone: model,
        sendtime: sendtime
      },
      success: res => {
        console.log(res._id)
        wx.hideLoading()
        if (res._id) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            success: res => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          wx.showToast({
            title: '失败',
      
            duration: 1500
          })
        }
      }
    })

  },
  sendvideowenben(opid, author, header, wenben, vdpath, weizhi, sendtime, model) {
    wx.showLoading({
      title: '正在发表',
    })
    db.collection('letsay').add({
      data: {
        oppenid: opid,
        author: author,
        header: header,
        wenben: wenben,
        vdpath: vdpath,
        weizhi: weizhi,
        sendtime: sendtime,
        phone: model
      },
      success: res => {
        wx.hideLoading()
        console.log(res._id)
        if (res._id) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            success:res=>{
              wx.navigateBack({
                delta: 1
              })
            }
          })

        } else {
          wx.showToast({
            title: '失败',
            duration: 1500
          })
        }
      }
    })
  },


  // 生成每一位用户的文件
  productfile(id, pth) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const b = getExt(pth)
    const imgpath = "truesay" + "/" + id + "/" + "images" + "/" + year + "/" + month + "/" + day + "/" + getUUID() + "." + b
    return imgpath;
  },
  productvideofile(id, pth) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const c = getExt(pth)
    const imgpath = "truesay" + "/" + id + "/" + "video" + "/" + year + "/" + month + "/" + day + "/" + getUUID() + "." + c
    return imgpath;
  },



  // 删除图片
  onRmove(e) {
    const removeindex = e.target.dataset.index;
    const tempImages = this.data.choosedimgs;
    console.log(removeindex)

    tempImages.splice(removeindex, 1);
    this.setData({
      choosedimgs: tempImages
    })
  },
  // 选择图片
  onAddImageTap() {
    const that = this
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        const chimg = res.tempFilePaths
        const oldchimg = that.data.choosedimgs
        const newchimg = oldchimg.concat(chimg)

        that.setData({
          choosedimgs: newchimg
        })
      },
    })
  },

  // 预览
  yulan(e) {
    const that = this;
    const index = e.currentTarget.dataset.index;
    const current = that.data.choosedimgs[index];
    wx.previewImage({
      urls: that.data.choosedimgs,
      current: current
    })
  },
  // 获取位置
  getlocation(e) {

    const that = this
    wx.getSetting({
      success: res => {
        const islocation = res.authSetting['scope.userLocation']
        if (islocation) {
          that.openlocation()
        } else {
          wx.authorize({
            scope: 'scope.userLocation',
            success: res => {

              that.openlocation()
            }
          })
        }
      }
    })
  },
  openlocation() {
    const that = this
    wx.chooseLocation({
      success: function(res) {
        if (res.name) {
          delete res['errMsg']
          console.log(res)
          that.setData({
            locationmsg: res.name
          })
        }

      },
    })
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