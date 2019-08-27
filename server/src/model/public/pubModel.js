/* eslint no-return-await:0 */
const mysql = require('mysql');
const QcloudSms = require("qcloudsms_js");


const mysqlConnection = mysql.createConnection({
    host: '49.234.40.20',
    user: 'root',
    password: 'Dby!!0426',
    port : 3306,
    database : 'medisan_crm'
})

const codeConfig = {
    appid: 1400245773,
    appkey: '0219138b7827e8ece442dcec12fdaa30',
    random: Math.floor(Math.random()*Math.random()*10000),
    time:  Date.parse(new Date()) / 1000,
    templateId: 398377,
    smsSign: 'hisanlian'
}

class pubModel {
    
    txSendModel() {
        const qcloudsms = QcloudSms(codeConfig.appid, codeConfig.appkey);
        return qcloudsms;
    }
}

module.exports = new pubModel();
