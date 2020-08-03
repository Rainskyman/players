// miniprogram/pages/guess/guess.js

var drawInfos = []
var startX = 0
var startY = 0
var bgColor = "white"
// 是否开始画画
var begin = false
var curDrawArr = []
Page({
  data: {
    hidden: true,
    currentColor: 'black',
    curWidthIndex: 0,
    lineWidthArr: [2, 4, 6, 10, 15],
    avaliableColors: ["black", "red", "blue", "gray", "#ff4081",
      "#009681", "#259b24", "green", "#0000CD", "#1E90FF", "#ADD8E6", "#FAEBD7", "#FFF0F5", // orange
      '#FFEBA3', '#FFDE7A', '#FFCE52', '#FFBB29', '#FFA500', '#D98600', '#B36800', '#8C4D00', '#663500',
      // red
      '#FFAFA3', '#FF887A', '#FF5D52', '#FF3029', '#FF0000', '#D90007', '#B3000C', '#8C000E', '#66000E',
      // green
      '#7BB372', '#58A650', '#389931', '#1A8C16', '#008000', '#005903', '#003303',
      // yellow
      '#FFF27A', '#FFF352', '#FFF829', '#FFFF00', '#D2D900', '#A7B300', '#7E8C00', '#586600',
      // cyan
      '#A3FFF3', '#7AFFF2', '#52FFF3', '#29FFF8', '#00FFFF', '#00D2D9', '#00A7B3', '#007E8C', '#005866',
      // blue
      '#A3AFFF', '#7A88FF', '#525DFF', '#2930FF', '#0000FF', '#0700D9', '#0C00B3', '#0E008C', '#0E0066',
      // Violet
      '#FAB1F7', '#EE82EE', '#C463C7', '#9B48A1', '#73317A', '#4D2154',
      "black"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    });

  },
  onReady: function() {
    this.context = wx.createCanvasContext('firstCanvas')
    // this.hiddenCanvasContext = wx.createCanvasContext("secondCanvas");
    this.init()
    this.fillBackground(this.context);
    // this.fillBackground(this.hiddenCanvasContext);

    this.draw();
  },

  // 初始化画布
  init: function() {
    this.context.setLineCap('round') // 让线条圆润
    this.context.strokeStyle = this.data.currentColor;
    this.context.setLineWidth(this.data.lineWidthArr[this.data.curWidthIndex]);
    this.setData({
      currentColor: this.data.currentColor,
      curWidthIndex: this.data.curWidthIndex
    });
  },


  // canvas上下文设置背景为白色
  fillBackground: function(context) {
    context.setFillStyle(bgColor);
    context.fillRect(0, 0, 500, 500); //TODO context的宽和高待定
    context.fill();
  },

  // 绘制canvas
  // isReverse: 是否保留之前的像素
  draw: function(isReverse = false, cb) {
    this.context.draw(isReverse, () => {
      if (cb && typeof(cb) == "function") {
        cb();
      }
    });
  },
  // 点击设置线条宽度
  clickChangeWidth: function(e) {
    let index = e.currentTarget.dataset.index;
    this.setLineWidthByIndex(index);
  },

  // 设置线条宽度
  setLineWidthByIndex: function(index) {
    let width = this.data.lineWidthArr[index];
    this.context.setLineWidth(width);
    this.setData({
      curWidthIndex: index
    });
  },

  // 点击设置线条颜色
  clickChangeColor: function(e) {
    let color = e.currentTarget.dataset.color;
    this.setCurrentColor(color);
  },

  // 设置线条颜色
  setCurrentColor: function(color) {
    this.data.currentColor = color;
    this.context.strokeStyle = color;
    this.setData({
      currentColor: color
    });
  },


  // 撤销
  clickFallback: function() {
    if (drawInfos.length >= 1) {
      drawInfos.pop();
    }
    this.reDraw();
  },
  // 橡皮
  clickErase: function() {
    this.setCurrentColor(bgColor);
  },
  // 清除
  clickClearAll: function() {
    this.fillBackground(this.context);
    this.draw();
    drawInfos = [];
    this.init();
  },
  // 预览
  pageView: function() {
    wx.canvasToTempFilePath({
      canvasId: 'firstCanvas',
      success: function(res) {
        wx.previewImage({
          current: res.tempFilePath,
          urls: [res.tempFilePath],
          success: function(res) {

          },
          fail: function(res) {

          },
        });
      },
      fail: function(res) {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
    }, this)
  },



  // 根据保存的绘制信息重新绘制
  reDraw: function() {
    this.init();
    this.fillBackground(this.context);
    // this.draw(false);
    for (var i = 0; i < drawInfos.length; i++) {
      this.context.strokeStyle = drawInfos[i].color;
      this.context.setLineWidth(drawInfos[i].lineWidth);
      let drawArr = drawInfos[i].drawArr;
      this.lineBegin(drawArr[0].x, drawArr[0].y)
      for (var j = 1; j < drawArr.length; j++) {
        this.lineAddPoint(drawArr[j].x, drawArr[j].y);
        // this.draw(true);
      }
      this.lineEnd();
    }
    this.draw();
  },






  touchStart(e) {
    console.log('开始画画的坐标')
    this.lineBegin(e.touches[0].x, e.touches[0].y)
    curDrawArr.push({
      x: e.touches[0].x,
      y: e.touches[0].y
    });
  },
  touchMove(e) {
    console.log('画画过程坐标')
    if (begin) {
      this.lineAddPoint(e.touches[0].x, e.touches[0].y);
      this.draw(true);
      curDrawArr.push({
        x: e.touches[0].x,
        y: e.touches[0].y
      });
    }
  },
  touchEnd(e) {
    console.log('画画结束')
    // console.log(e)
    drawInfos.push({
      drawArr: curDrawArr,
      color: this.data.currentColor,
      lineWidth: this.data.lineWidthArr[this.data.curWidthIndex],
    });
    curDrawArr = [];
    this.lineEnd();
  },

  // 绘制开始坐标点
  lineBegin: function(x, y) {
    begin = true;
    this.context.beginPath()
    startX = x;
    startY = y;
    this.context.moveTo(startX, startY)
    this.lineAddPoint(x, y);
  },
  // 不断绘制坐标点
  lineAddPoint: function(x, y) {
    this.context.moveTo(startX, startY)
    this.context.lineTo(x, y)
    this.context.stroke();
    startX = x;
    startY = y;
  },
  // 绘制结束
  lineEnd: function() {
    this.context.closePath();
    begin = false;
  },

  // 分享
  clickShare() {
    console.log('分享')
    wx.canvasToTempFilePath({
      canvasId: 'firstCanvas',
      success: res => {
        // console.log(res)
        console.log('第一张图的路劲')
        console.log(res.tempFilePath)
        console.log('第一张图的路劲')
        let thisimgurl = res.tempFilePath
        wx.navigateTo({
          url: `/pages/share/share?imgurl=${thisimgurl}&water=`,
        })
      }
    }, this)
  },


  huanti() {
    wx.showModal({
      title: '暂无功能',
      content: '敬请期待'
    })
  },
  xianshi() {
    wx.showModal({
      title: '暂无功能',
      content: '敬请期待'
    })
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