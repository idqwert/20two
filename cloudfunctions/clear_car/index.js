// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//获取数据库引用
let db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  //event: 含有携带的参数，用户id
  console.log('event ==> ', event);
  const _= db.command;
  return await db.collection('shopcart').where({
    count : _.exists(true)
  }).remove()
}