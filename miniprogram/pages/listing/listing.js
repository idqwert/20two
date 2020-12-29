// miniprogram/pages/listing/listing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price:'',
    shoplist:'',
    name:'',
    phone:'',
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlisting()
    this.getaddressismo()
  },
  //获取listing的菜品
  getlisting(){
    wx.cloud.callFunction({
      name:'get_listing',
      success:result =>{
        console.log(result)
        this.setData({
          shoplist:result.result.data[0].shoplist,
          price:result.result.data[0].price
        })
      },
      fail:err =>{
        console.log(err)
      }
    })
  },
  //获取默认地址
  getaddressismo(){
    wx.cloud.callFunction({
      name:'get_address_ismo',
      success:result =>{
        console.log(result)
        let a =result.result.data[0].addressitem
        this.setData({
          name:a.name,
          phone:a.phone,
          address:a.city +'  '+ a.address
        })
      },
      fail:err =>{
        console.log(err)
      }
    })
  },
  //添加本页信息到list
  addtolist(){
    let listitem={
      price:'',
      shoplist:'',
      name:'',
      phone:'',
      address:'',
      ispay:false
    }
    listitem.price = this.data.price
    listitem.shoplist = this.data.shoplist
    listitem.name = this.data.name
    listitem.phone = this.data.phone
    listitem.address = this.data.address
    // console.log(listitem)
    wx.cloud.callFunction({
      name:'addto_list',
      data:{
        listitem
      },
      success:result =>{
        console.log(result)
        wx.cloud.callFunction({
          name:'clear_listing',
          success:result =>{
            console.log(result);
            wx.switchTab({
              url: '/pages/order/order',
            })
          },
          fail:err =>{
            console.log(err)
          }
        })
      },
      fail:err =>{
        console.log(err)
      }
    })
  }

})