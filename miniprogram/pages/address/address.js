// miniprogram/pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName: '',
    inputAddress: '',
    inputCity: '',
    inputPhone: '',
    switchChecked: true,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })

    this.getmsgbyid();
  },

  //实时获取4项地址数据
  bindname: function (e) {
    this.setData({
      inputName: e.detail.value
    })
  },
  bindcity: function (e) {
    this.setData({
      inputCity: e.detail.value
    })
  },
  bindaddress: function (e) {
    this.setData({
      inputAddress: e.detail.value
    })
  },
  bindphone: function (e) {
    this.setData({
      inputPhone: e.detail.value
    })
  },
  //是否默认地址
  switchChange(){
    if(this.data.switchChecked==true){
      this.setData({
        switchChecked:false
      })
    }else if(this.data.switchChecked==false){
      this.setData({
        switchChecked:true
      })
    }
  },

  //保存地址到数据库
  addad(){
    let addressitem = {
      name:'',
      city:'',
      address:'',
      phone:'',
    }
    let ismo = false
    addressitem.name = this.data.inputName
    addressitem.city = this.data.inputCity
    addressitem.address = this.data.inputAddress
    addressitem.phone = this.data.inputPhone
    ismo = this.data.switchChecked
    if(ismo==true){
      wx.cloud.callFunction({
        name:'update_address_ismo',
        success:result =>{
          // console.log(result)
          wx.cloud.callFunction({
            name:'add_newaddress',
            data:{
              addressitem,
              ismo
            },
            success:result =>{
              console.log('添加地址成功')
              wx.showToast({
                title: '添加新地址成功',
                icon: 'none',
                duration: 1000,
                mask: true
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
    
  },
  //根据拿到的id填入对应的地址信息
  getmsgbyid(){
    let id = this.data.id
    if(id!= undefined){
      wx.cloud.callFunction({
        name:'get_ad_byid',
        data:{
          id
        },
        success:result =>{
          // console.log(result)
          let msg = result.result.data[0].addressitem
          this.setData({
            inputName:msg.name,
            inputAddress:msg.address,
            inputCity:msg.city,
            inputPhone:msg.phone,
            switchChecked: result.result.data[0].ismo
          })
        },
        fail:err =>{
          console.log(err)
        }
      })
    }else{
      console.log('这是新增地址，没有id')
    }
    
  },
  //更新数据
  upad(){
    let id = this.data.id
    let newaddress ={      
      name:'',
      city:'',
      address:'',
      phone:'',
    }
    let ismo=false
    newaddress.name = this.data.inputName
    newaddress.city = this.data.inputCity
    newaddress.address = this.data.inputAddress
    newaddress.phone = this.data.inputPhone
    ismo = this.data.switchChecked
    if(ismo==true){
      wx.cloud.callFunction({
        name:'update_address_ismo',
        success:result =>{
          wx.cloud.callFunction({
            name:'updata_address',
            data:{
              id,
              newaddress,
              ismo
            },
            success:result =>{
              // console.log(result);
              wx.showToast({
                title: '更新地址成功',
                icon: 'none',
                duration: 1000,
                mask: true
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
    
  }
})
