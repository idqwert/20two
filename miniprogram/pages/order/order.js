// miniprogram/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listnavindex:0,
    navList:['全部','待支付','已完成'],
    listall:'',
    listnopay:'',
    listfinish:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist()
  },

  toggleMenuIndex(e){
    let currentIndex = e.currentTarget.dataset.index;
    if(currentIndex == this.data.menulistindex){
      return;
    }
    this.setData({
      listnavindex:currentIndex
    })
  },
  //获取listall数据
  getlist(){
    wx.cloud.callFunction({
      name:'get_list',
      success:result =>{
        console.log(result)
        this.setData({
          listall:result.result.data
        })
      },
      fail:err =>{
        console.log(err)
      }
    })
  }
})