// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const loginopid = wxContext.OPENID
  const wid = event.wid

  const dianqu = event.zan

  console.log("loginopid"+loginopid)

  console.log("wid"+wid)

  console.log("dianqu"+dianqu)
  if (dianqu == 1){
    return await db.collection("letsay").doc(wid).update({
      data: {
        "praises": _.push(loginopid)
      }
    })
  }else{

    //1. 先去获取微博中的praises数组
    const da = await db.collection("letsay").doc(wid).field({
      praises: true
    }).get()
    const praises = da.data.praises;
    //2. 然后将这个数组中的我的openId删掉
    const newPraises = [];
    praises.forEach((praise, index) => {
      if (praise != loginopid) {
        newPraises.push(praise)
      }
    })
    //3. 把这个新的praises数组重新设置到数据库中
    return await db.collection("letsay").doc(wid).update({
      data: {
        praises: newPraises
      }
    })
    




  }
  



 

}