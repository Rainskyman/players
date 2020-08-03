// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const request = require("request-promise")

const APPID = 'wxae9f245ce0c96b4e'
const APPSECRET = '82d281d58c12d528bbb1ea33581ee014'
const token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET
const CHECK_URL = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token="

// 友聚: wxae9f245ce0c96b4e

// 82d281d58c12d528bbb1ea33581ee014


// 云函数入口函数
exports.main = async(event, context) => {
  // console.log("event ==")

  // console.log(event)
  const checkwenben = event.wenben
  // console.log("checkwenben==")

  // console.log(checkwenben)

  const tokenResp = await request(token_url)
  // console.log("tokenResp===")

  // console.log(tokenResp)

  const token = JSON.parse(tokenResp).access_token
  // console.log("token===")

  // console.log(token)




  const checkResp = await request.post({
    uri: CHECK_URL + token,
    method: "POST",
    body: {
      content: checkwenben
    },
    json: true
  })

  // console.log("checkResp ==")

  // console.log(checkResp.errcode)
  const errcode = checkResp.errcode

  const wxContext = cloud.getWXContext()
  if (errcode==0){
    return {
      errcode: errcode,
      openid: wxContext.OPENID
    }
  }
  else{
    return { "errcode": errcode, "errmsg": "请修改敏感词汇再发布！" }
  }
}