
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    pictures:['../../images/bar1.jpg','../../images/bar2.jpg','../../images/bar3.jpg','../../images/bar4.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeAutoplay()
    this.intervalChange()
    this.changeIndicatorDots()

    // this.setData({
    //   title: options.title
    // })
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

  changeAutoplay() {
    this.setData({
      autoplay: true
    })
  },
  intervalChange() {
    this.setData({
      interval: 4000
    })
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: true
    })
  },
})