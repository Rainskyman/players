// pages/joke/joke.js

const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bcolor: 'white',
    wcolor: 'black',
    smmodel: true,
    hasmore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // that.getJokes();
    this.getmyjoke()
  },
  chmodel() {
    if (this.data.smmodel) {
      this.setData({
        smmodel: false,
        bcolor: 'black',
        wcolor: 'white',
      })
    } else {
      this.setData({
        smmodel: true,
        bcolor: 'white',
        wcolor: 'black',
      })
    }
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
    console.log("dibu")
    console.log(this.data.jokes.length)

    this.getmyjoke(this.data.jokes.length);
    // var that = this;
    // var page = that.data.page;
    // that.getJokes(page + 1);
  },

  getmyjoke(hd = 0) {
    console.log('hd=='+hd)
    let p = db.collection("jks")
    if (hd > 0) {
      p = p.skip(hd)
    }
    p.limit(10).get({
      success: res => {
        console.log(res.data)
        console.log("sqql")
        let pgjokes = res.data
        let newjokes = []
        let hasmore=true
        if (pgjokes.length == 0) {
          hasmore = false
        } else {
          hasmore = true
        }



        if (hd > 0) {
          newjokes = this.data.jokes.concat(pgjokes)
        } else {
          newjokes = pgjokes
        }
        this.setData({
          jokes: newjokes,
          hasmore: hasmore
        })
      }
    })
  },

  // getJokes: function(page) {
  //   var that = this;
  //   var timestamp = null;
  //   if (page === 1) {
  //     timestamp = parseInt((new Date()).getTime() / 1000);
  //   } else {
  //     timestamp = that.data.timestamp;
  //   }
  //   wx.request({
  //     // 9a6a2b6e80acd63bc57e39874b4b2dc0
  //     url: 'http://v.juhe.cn/joke/content/list.php',
  //     data: {
  //       key: "a4bd8dc9bb936ec74280cc12664eb582",
  //       time: timestamp,
  //       page: page,
  //       pagesize: 20,
  //       sort: "desc"
  //     },
  //     success: function(res) {
  //       var jokes = res.data.result.data;
  //       if (!jokes) {
  //         that.setData({
  //           hasmore: false
  //         });

  //         return;
  //       }
  //       var oldJokes = that.data.jokes;
  //       var newJokes = [];
  //       if (!oldJokes || page === 1) {
  //         newJokes = jokes;
  //       } else {
  //         newJokes = oldJokes.concat(jokes);
  //       }
  //       that.setData({
  //         jokes: newJokes,
  //         timestamp: timestamp,
  //         page: page
  //       });
  //     }
  //   })
  // }
})