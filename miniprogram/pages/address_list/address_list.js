
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adbox:'',
    isdel:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getad()
  },

  //读取地址，遍历生成
  getad(){
    wx.cloud.callFunction({
      name:'get_address',
      success:result =>{
        console.log(result)
        let ad = result.result.data
        let ritem = {
          id:'',
          address:'',
          ismo:false
        }
        let radbox = [];
        for(let i in ad){
          ritem = {
            id:'',
            address:'',
            ismo:false
          }
          ritem.id = ad[i]._id;
          ritem.address = ad[i].addressitem
          ritem.ismo = ad[i].ismo
          radbox.push(ritem)
        }
        this.setData({
          adbox:radbox
        })
      },
      fail:err =>{
        console.log(err)
      }
    })
  },
  //更改地址跳转
  changead(e){
    let id = e.currentTarget.dataset.index
    // console.log(id)
    wx.navigateTo({
      url: "../address/address?id=" + id,
    })
  },
  //点击管理
  isdel(){
    if(this.data.isdel==false){
      this.setData({
        isdel:true
      })
    }else if(this.data.isdel==true){
      this.setData({
        isdel:false
      })
    }
  },
  //删除选中地址
  del(e){
    let id = e.currentTarget.dataset.index
    // console.log(id)
    wx.showModal({
      title: '提示', 
      content: '你确定删除该地址吗', 
      success: function (res) { 
        if (res.confirm) {
          wx.cloud.callFunction({
            name:'del_address',
            data:{
              id
            },
            success:result =>{
              // console.log(result)
              this.getad();
            },
            fail:err =>{
              console.log(err)
            }
          })
        } else {
          console.log('用户点击取消')
          return
        }
      }
    })
    
  }
})