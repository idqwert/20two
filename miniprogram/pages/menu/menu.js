// miniprogram/pages/menu/menu.js
Page({
  
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  onShareAppMessage() {
    return {
      title: 'movable-view',
      path: 'page/component/pages/movable-view/movable-view'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    init:()=>{},
    pictures:['../../images/bar1.jpg','../../images/bar2.jpg','../../images/bar3.jpg','../../images/bar4.jpg'],
    menuList:['精选','菜单'],
    allmenulist:[
      {title:"正点",type:"zhen"},
      {title:"粥",type:"zhou"},
      {title:"粉",type:"fen"},
      {title:"面",type:"mian"},
      {title:"饭",type:"fan"},
      {title:"包",type:"bao"},
      {title:"肠",type:"chang"},
    ],
    menulistindex:0,
    allmenulistindex:0,
    indicatorDots: false,
    list:[],
    products:[],
    activeMenuIndex: 0,
    //正在加载中
    loading: true,
    x:0,
    y:0,

    shopcartCount: 0,

    isAdd:false,

    price:0

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendMenu();

    this.getProductByType('zhen');
    this.getcartprice();
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

  toggleMenuIndex(e){
    let currentIndex = e.currentTarget.dataset.index;
    if(currentIndex == this.data.menulistindex){
      return;
    }
    this.setData({
      menulistindex:currentIndex
    })
  },
  alltoggleMenuIndex(e){
    let currentIndex = e.currentTarget.dataset.index;
    if(currentIndex == this.data.allmenulistindex){
      return;
    }
    this.setData({
      allmenulistindex:currentIndex
    })
  },

  getRecommendMenu(){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    wx.cloud.callFunction({
      name:'get_recommend_menu',
      success:result =>{
        
        wx.hideLoading();
        // console.log(result)
        this.setData({
          list: result.result.data
        })

      },
      fail:err =>{
        wx.hideLoading();
        console.log("err ==>",err);
      }
    })
  },

  tap() {

      this.setData({
        x: 80,
        y: 0
      })

   
  },

  toggleMenuList(e) {
    // console.log('e ==> ', e);
    let currentIndex = e.currentTarget.dataset.index;
    if (currentIndex == this.data.activeMenuIndex) {
      return;
    }

    this.setData({
      activeMenuIndex: currentIndex
    })

    //切换商品数据
    this.getProductByType(e.currentTarget.dataset.type);
  },

  getProductByType(type) {

    //type: 商品类型

    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.cloud.callFunction({
      name: 'get_products',

      //携带参数
      data: {
        type
      },

      success: result => {
        wx.hideLoading();

        // console.log('result ==> ', result);

        this.setData({
          loading: false,
          products: result.result.data
        })
        
      },
      fail: err => {
        wx.hideLoading();
        console.log('err ==> ', err);
      }
    })
  },

  //修改currentIndex
  modifyCurrentIndex(e) {
    console.log('modifyCurrentIndex e ==> ', e);
    console.log('modifyCurrentIndex e.detail ==> ', e.detail);

    let index = e.currentTarget.dataset.index;
    console.log('modifyCurrentIndex index ==> ', index);
    

    this.data.products[index].rules[e.detail.rulesIndex].currentIndex = e.detail.index;

    this.setData({
      products: this.data.products
    })
  },

  //添加购物车成功后，累加数量
  modifyShopcartCount(e) {
    // console.log('modifyShopcartCount e.detail ==> ', e.detail);


    this.setData({
      shopcartCount: ++this.data.shopcartCount,
      isAdd:true
    })

    setTimeout(()=>{
      this.setData({
        isAdd:false
      },600)
    })
  },

  addrecommend(e){
    // console.log(e)
    let _id =  e.currentTarget.dataset.id;

    let count = 1 ;
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // })

    //调用云函数【add_shopcart】
    wx.cloud.callFunction({
      name: 'add_shopcart',
      data: {
        pid: _id,
        count
      },

      success: result => {
        wx.hideLoading();
        // console.log('addShopcart result ==> ', result);
        if (result.result._id) {
          wx.showToast({
            title: '加入购物成功',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          this.setData({
            shopcartCount: ++this.data.shopcartCount
          })
          //触发定义时间
          this.triggerEvent('addShopcart', {count: 1});

          this.getcartprice()
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
  },
  //获取购物车价格
  getcartprice(){
    wx.cloud.callFunction({
      name:'get_cartprice',
      success:result =>{
        // console.log(result)
        let count = 0;
        count = result.result.data.length
        // console.log(count)
        for(let i in result.result.data){
          this.getbyid(result.result.data[i].pid)
        }
        this.setData({
          shopcartCount:count
        })
      },
      fail:err =>{
        console.log(err)
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
        let itemprice = Number(result.result.data[0].price) 
        this.setData({
          price:this.data.price+itemprice
        })
      },
      fail:err =>{
        wx.hideLoading();
        console.log("err ==>",err);
      }
    })
  },
  //跳转回home
  tohome(){
    wx:wx.switchTab({
      url: '/pages/home/home',
    })
  }
 
  
})
 