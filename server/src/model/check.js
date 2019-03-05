/* eslint no-return-await:0 */
const mysql = require('mysql');

class checkModel {
    changeTh(str,sign) {
        const thListEN = {
            "editor": "录入人编号",
            "province": "省份",
            "qualified": "是否合格",
            "company": "公司名称",
            "legalPersonName": "法人",
            "registeredCapital": "注册资金",
            "businessLicenseValidDate": "营业执照有效期",
            "licenseValidDate": "许可证有效期",
            "GSPLicenseValidDate": "GSP证书有效期",
            "purchasePersonName": "采购人",
            "medisanPurchaseValidDate": "哈三联采购委托有效期",
            "lxMedisanPurchaseValidDate": "兰西采购委托有效期",
            "receivingEntrusted": "收货委托",
            "qualityAgreement": "质保协议",
            "openAccountPermission": "开户许可",
            "billingInformation": "开票信息",
            "surveySystem": "调查体系",
            "sealImpression": "印章印模",
            "recordDate": "整理时间",
            "positionId": "位置",
            "nowDate": "日期",
            "checkTrue": "条件"
        }
        const thListCH  = {
            "GSP证书有效期": "GSPLicenseValidDate",
            "位置": "positionId",
            "公司名称": "company",
            "兰西采购委托有效期": "lxMedisanPurchaseValidDate",
            "印章印模": "sealImpression",
            "哈三联采购委托有效期": "medisanPurchaseValidDate",
            "开户许可": "openAccountPermission",
            "开票信息": "billingInformation",
            "录入人编号": "editor",
            "收货委托": "receivingEntrusted",
            "整理时间": "recordDate",
            "日期": "nowDate",
            "是否合格": "qualified",
            "条件": "checkTrue",
            "法人": "legalPersonName",
            "注册资金": "registeredCapital",
            "省份": "province",
            "营业执照有效期": "businessLicenseValidDate",
            "许可证有效期": "licenseValidDate",
            "调查体系": "surveySystem",
            "质保协议": "qualityAgreement",
            "采购人": "purchasePersonName"
        }
        if(!str && str != false){
            return null
        }else if(str){
            if(sign === 'EN'){
                return thListEN[str]
            }else{
                return thListCH[str]
            }
        }else{
            return str
        }

    }

    checkString(str) {
        if(!str || str == true){
            return false
        }else if(/.*[\u4e00-\u9fa5]+.*/.test(str)){
            return true
        }else if(/^[a-zA-Z\ ]+$/.test(str)){
            return true
        }else{
            return false
        }
    }

    changeMark(str){
        if(!str && str != false) {
            return null
        }else{
            return str == '√' ? true : /[Xx\×\?\？]+/.test(str) ? false : str
        }
    }

    changeWan(str){
        if(!str && str != false){
            return null
        }else{
            return /^[\d.\d]+[万]$/.test(str) ?  parseFloat(str) : str
        }
    }

    timeExcelToTimeUnix(str){
        if(!str && str != false){
            return null
        }else if(str == "长期"){
            return 0
        }else{
            if(!parseInt(str)){
                return 2

            }else if(!parseInt(str-1)){
                return 3
            }else{
                return (str-19-70*365)*86400-8*3600
            }
        }
    }
}

module.exports = new checkModel();
