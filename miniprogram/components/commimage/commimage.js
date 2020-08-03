// components/commimage/commimage.js
import {
  initwindowsize
} from '../../untils/skytools.js'
const app = getApp()
const db = wx.cloud.database()
const _ = db.command;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailurl: {
      type: String,
      value: null
    },
    da: {
      type: Object,
      value: []
    },
    hand: {
      type: Boolean,
      value: true
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    initpage() {
      var WH = initwindowsize()
      var weiBox = WH.windowW - 40
      var twimgW = (weiBox - 5) / 2
      var threimgW = (weiBox - 5) / 3
      this.setData({
        twoimgW: twimgW,
        threeimgW: threimgW
      })
    },

    yulan(e) {
      // console.log("文章"+e.currentTarget.dataset.da)
      // console.log("tupian" + e.currentTarget.dataset.index)
      // const wenindex = e.currentTarget.dataset.da
      const imgindex = e.currentTarget.dataset.index
      const yulanimgs = this.data.da.isuped

      wx.previewImage({
        urls: yulanimgs,
        current: yulanimgs[imgindex]
      })
    },

    // 点赞
    onPraise(e) {
      console.log("dianzan   云")
      const whichdata = this.data.da
      const id = whichdata._id
      const loginopid = app.globalData.openId
      var pd=[]
      if (app.globalData.userInfo) {
        let ispraises = false
        if (whichdata.praises) {
          whichdata.praises.forEach(val => {
            if (val == loginopid) {
              ispraises = true
              console.log('你已经点过赞了')
            }
          })
        }
        // 点赞
        if (!ispraises || !whichdata.praises) {
          wx.cloud.callFunction({
            name: "dian",
            data: {
              wid: id,
              zan: 1
            },
            success: res => {
              console.log(res)
              if (!whichdata.praises) {
                whichdata.praises = [loginopid];
              } else {
                whichdata.praises.push(loginopid);
              }
              whichdata.ispraises = true;
              pd = whichdata
              this.setData({
                da: pd
              })

            }
          })
        } else {
          wx.cloud.callFunction({
            name: "dian",
            data: {
              wid: id,
              zan: 0
            },
            success: res => {
              console.log(res)

              const isnotdian = this.data.da.praises
              const newdian = []
              isnotdian.forEach((val, ind) => {
                if (val != loginopid) {
                  newdian.push(val)
                }
              })
              whichdata.praises = newdian
              whichdata.ispraises = false
              pd = whichdata
              this.setData({
                da: pd
              })




            }
          })
        }



















      } else {
        wx.showModal({
          title: '还未授权',
          content: '右下角 + 号 授权',
        })
      }

    },


  },
  lifetimes: {
    attached() {
      this.initpage()
    }
  }
})