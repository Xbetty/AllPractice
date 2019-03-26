Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
    indicatorDots: false,//是否显示面板指示点
    autoplay: false,//是否自动切换
    interval: 5000,//自动切换事件间隔
    duration: 1000, //滑动动画时长
    x: 0,
    y: 0
  },
  //是否显示面板指示点
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  // 是否自动切换
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  // 选择自动切换时间间隔
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  // 选择滑动动画时长
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  tap: function (e) {
    this.setData({
      x: 30,
      y: 30
    });
  },
  onChange: function (e) {
    console.log(e.detail)
  },
  onScale: function (e) {
    console.log(e.detail)
  },
  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo')
  },
  play() {
    this.videoCtx.play()
  },
  pause() {
    this.videoCtx.pause()
  }
})