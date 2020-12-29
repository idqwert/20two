// components/product/product.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    productData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentProduct: {
      count: 1
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
     // 加入购物车
  addshopcart(){
    let _id =  this.properties.productData._id;
    // console.log('_id ==> ', _id);
    let count = this.data.currentProduct.count;
    // console.log('count ==> ', count);

    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    //调用云函数【add_shopcart】
    wx.cloud.callFunction({
      name: 'add_shopcart',
      data: {
        pid: _id,
        count
      },

      success: result => {
        wx.hideLoading();
        console.log('addShopcart result ==> ', result);


        if (result.result._id) {
          wx.showToast({
            title: '加入购物成功',
            icon: 'none',
            duration: 2000,
            mask: true
          })

          //触发定义时间
          this.triggerEvent('addShopcart', {count: 1});
        } else {
          wx.showToast({
            title: '加入购物失败',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      },

      fail: err => {
        wx.hideLoading();
        console.log('err ==> ', err);
      }
    })
  }
  }
})
