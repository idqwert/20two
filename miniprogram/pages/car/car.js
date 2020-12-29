// miniprogram/pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopcartitem:[],
    cartidbox:'',
    shopbox:[],
    shopnum:0,
    price:0,
    isshow:false,
    iconSize: [60],
    iconColor: ["red"],
    iconType: ['cancel']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopCart();
    // this.getbyid('this.cartidbox[0]');
    // this.showcartlist();
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

  //获取shopcart
  getShopCart(){
    this.setData({
      price:0,
      cartidbox:'',
      shopbox:[]
    })
    wx.cloud.callFunction({
      name:'get_shopcart',
      success:result => {
        // console.log(result);
        let cartiditem =[];
        let num = this.data.shopnum
        for(let i in result.result.data){
          cartiditem.push(result.result.data[i].pid);
          num++;
        }
        this.setData({
          //获取已经在购物车的商品id
          cartidbox:cartiditem,
          num 
        })
          //遍历this.cartidbox 输入 getbyid
        for(let i in this.data.cartidbox){
          this.getbyid(this.data.cartidbox[i])
        }
        // console.log(this.data.cartidbox)
      },
      fail:err =>{
        wx.hideLoading();
        console.log("err ==>",err);
      }
    })
  },
  //通过cartidbox的id获取详细商品数据
  getbyid(id){
    wx.cloud.callFunction({
      name:'get_carshop',
      data:{
        id
      },
      success:result => {
        // console.log(result);
        let shopitem = {id:'',title:'',price:'',url:'',count:1};
        let shopbox = this.data.shopbox
        let price = this.data.price
        shopitem.id = result.result.data[0]._id;
        shopitem.title = result.result.data[0].title;
        shopitem.price = result.result.data[0].price;
        price += Number(shopitem.price)
        shopitem.url = result.result.data[0].url;
        // shopitem.count = result.result.data[0].count;
        shopbox.push(shopitem);
        this.setData({
          shopbox,
          price
        })
        // console.log(this.data.shopbox);
      },
      fail:err =>{
        wx.hideLoading();
        console.log("err ==>",err);
      }
    })
  },
  //添加数量
  add(e){
    // console.log(e);
    let shopindex = e.target.dataset.index
    let shopbox = this.data.shopbox
    let price = this.data.price
    shopbox[shopindex].count++
    price += Number(shopbox[shopindex].price);
    this.setData({
      shopbox,
      price
    })
  },
  //减少数量
  reduce(e){
    // console.log(e);
    let shopindex = e.target.dataset.index
    let shopbox = this.data.shopbox
    let price = this.data.price
    if(shopbox[shopindex].count<=1){
      shopbox[shopindex].count=1
    }else{
      shopbox[shopindex].count--;
      price -= Number(shopbox[shopindex].price);
    }
    this.setData({
      shopbox,
      price
    })
  },
  //开启清除界面
  del(){
    // console.log("开启删除")
    let show = this.data.isshow
    if(show==false){
      show = true;
      this.setData({
        isshow:true
      })
    }else{
      show = false;
      this.setData({
        isshow:false
      })
    }
  },
  //点击删除该选项
  delitem(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let count = Number(e.currentTarget.dataset.count);

    let iprice = Number(e.currentTarget.dataset.price);

    let price = this.data.price;

    let delp = Number(count*iprice);

    price -= delp;

    this.setData({
      price
    })
    wx.cloud.callFunction({
      name:'del_shopcart',
      data:{
        id
      },
      success:result =>{
        this.getShopCart();
        
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000,
          mask: true
        })

      },
      fail:err =>{
        wx.hideLoading();
        console.log("err ==>",err);
      }
    })
  },
  //生成订单
  addtolist(){
    let shoplist = this.data.shopbox
    let price = this.data.price
    // console.log(shoplist,price)
    wx.cloud.callFunction({
      name:'addto_listing',
      data:{
        shoplist,
        price
      },
      success:result =>{
        console.log('提交成功')
        console.log(result)
        //提交订单后清空购物车
        wx.cloud.callFunction({
          name:'clear_car',
          success:result=>{
            console.log('清空购物车成功')
            // console.log(result)
            this.getShopCart();
            wx:navigator({
              url:'/pages/listing/listing'
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