const md5 = require('md5');
const pubModel = require('../../model/public/pubModel');
const txSender = pubModel.txSendModel();
class pubService {

    async txSendCode(opts) {
        const sendMsgInfo = opts.request.body;
        const ssender = txSender.SmsSingleSender();
        const code =  parseInt(100000*Math.random()).toString().substring(0,4);
        const params = [code, "10"];
        const smsSign = "hisanlian";
        const templateId = 398377;

        console.log(code, 'txVerificationCode')

        return new Promise((resolve, reject) => {
            ssender.sendWithParam(sendMsgInfo.nationcode, sendMsgInfo.mobile, templateId, params, smsSign, "", "", function callback(err, res, resData) {
                if (err) {
                    console.log("err: ", err);
                    reject(err);
                } else {
                    console.log("request data: ", res.req);
                    console.log("response data: ", resData);
                    resData.code = md5(code);
                    resolve(resData);
                }
            });
        })

        
    }
}
module.exports = new pubService();
