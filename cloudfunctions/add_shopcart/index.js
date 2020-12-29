// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//获取数据库引用
let db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event ==> ', event);

  //生成加入购物车时间
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth()+1;
  let date = currentDate.getDate();

  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let time = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  event.time = time;

  return await db.collection('shopcart').add({
    data: event
  });

}