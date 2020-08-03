// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();



// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  const openid = wxContext.OPENID
  const start = event.start


  let pmise = db.collection("letsay")
  if (start > 0) {
    pmise = pmise.skip(start)
  }
  const dataRes = await pmise.limit(10).orderBy('sendtime', "desc").get()
  const datas = dataRes.data
  if (datas.length > 0) {
    datas.forEach((da, ind) => {
      da.ispraises = false
      if (da.praises && da.praises.length > 0) {
        da.praises.forEach((p, i) => {
          if (p == openid) {
            da.ispraises = true
          }
        })
      }
    })
  }


  return {
    datas
  }
}