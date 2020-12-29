// miniprogram/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toCart: function(e) {
    let startX = e.changedTouches[0].clientX
    let startY = e.changedTouches[0].clientY
    console.log(startX, startY)
    let that = this
    var animation3 = wx.createAnimation({
        duration: 1,
        timingFunction: "step-start",
        delay: 0
    })
    var animation4 = wx.createAnimation({
        duration: 1,
        timingFunction: "step-start",
        delay: 0
    })
    animation3.translateX(startX).opacity(1).step()
    animation4.translateY(startY).step()
    this.setData({
        toCartShow:true,
        animationCart1: animation3.export(),
        animationCart2: animation4.export(),
    }, () => {
        //#cart为目标元素的id，请自行设置
        this.get_wxml('#cart', (rects) => {
            console.log('rects', rects)
            let targetX = rects[0].left
            let targetY = rects[0].top
            console.log(targetX, targetY)
            // 显示遮罩层
            var animation1 = wx.createAnimation({
                duration: 300,
                timingFunction: "ease-out",
                delay: 0
            })
            var animation2 = wx.createAnimation({
                duration: 300,
                timingFunction: "ease-in",
                delay: 0
            })
            animation1.translateX(targetX).opacity(0.3).step()
            animation2.translateY(targetY).step()
            this.setData({
                animationCart1: animation1.export(),
                animationCart2: animation2.export(),
            })
            setTimeout(()=>{
                this.setData({
                    toCartShow: false,
                })
            },300)
        })
    })
},
get_wxml: function(className, callback) {
    wx.createSelectorQuery().selectAll(className).boundingClientRect(callback).exec()
},
})