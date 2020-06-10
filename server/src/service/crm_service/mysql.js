const querystring = require("querystring");
const MysqlModel = require('../../model/crm_db/mysql');
const WeValidator = require('we-validator');
const getMysqlConnectionData = MysqlModel.getMysqlConnectionData;
const getMysqlPoolData = MysqlModel.getMysqlPoolData;
const getMysqlDataList = MysqlModel.getMysqlDataList;
const mysqlTableName = 'user_info'

class MysqlService {

    async mysqlConnect() {

        const sql = `SELECT * FROM ${mysqlTableName}`;

        return getMysqlConnectionData(sql)
    }

    async add(obj) {
        const url = obj.request.url;
        // const index = url.indexOf('?');
        // const params = url.substring(index+1,url.length);
        // const params_json = querystring.parse(params);
        const addKey = [];
        const params_json = obj.request.body
        let addData = '';

        const validate = this.validator(params_json)

        for(let i in params_json){
            addKey.push(i);
            if(params_json[i] === true || params_json[i] === false || params_json[i] === 'true' || params_json[i] === 'false'){
                addData = addData + ',' + params_json[i]
            }else{
                addData = addData + ',"' + params_json[i] + '"'
            }
        }
        const phoneCheck = await this.find({"sql": 'SELECT COUNT(*) FROM ' + mysqlTableName + ' WHERE phone = ' + params_json.phone })

        const verificationCode = this.verificationCode()

        addKey.push('code');
        addData = addData + ',"' + verificationCode + '"'

        if(!phoneCheck[0][0]['COUNT(*)']){
            const sql = 'INSERT INTO ' + mysqlTableName + ' (' + querystring.unescape(addKey) + ') VALUES ' + '(' + addData.substring(1,addData.length) + ')'
            console.log(sql)
            return {
                'code': 0,
                'msg': await getMysqlPoolData(sql),
                'verificationCode': verificationCode

            }
        }else{
            return {
                'code': 1,
                'msg': '该手机号已领取',
                'verificationCode': false
            }
        }
    }

    verificationCode() {
        var arr = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z",
                    "a","b","c","d","e","f","g","h","i","j","k","m","n","p","q","r","s","t","u","v","w","x","y","z",
                    0,1,2,3,4,5,6,7,8,9];
        var  rand1 = Math.floor((Math.random()*58));
        var  rand2 = Math.floor((Math.random()*58));
        var  rand3 = Math.floor((Math.random()*58));
        var  rand4 = Math.floor((Math.random()*58));
        var  rand5 = Math.floor((Math.random()*58));
        var  rand6 = Math.floor((Math.random()*58));
        return arr[rand1] + arr[rand2] + arr[rand3] + arr[rand4] + arr[rand5] + arr[rand6]
    }

    async find(obj) {
        const {count, sql, countSql} = obj
        // const countSql = 'SELECT COUNT(*) FROM test_copy'
        let countNum;
        let cbData = []
        let pageData = await getMysqlPoolData(sql)
        cbData.push(pageData)
        if(!!count){
            countNum = await getMysqlPoolData(countSql)
            cbData.push(countNum)
        }
        return cbData
    }

    async insert(obj) {
        const {count, sql, countSql} = obj
        const cbData = await getMysqlPoolData(sql)
        return cbData
    }

    async remove() {
        return await mysqlConnection.query('SELECT * FROM test', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ===================================', results);
            return results[0];
        });
    }

    async modify() {
        return await mysqlConnection.query('SELECT * FROM test', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ===================================', results);
            return results[0];
        });
    }

    async validator(formData) {
        let validatorInstance = new WeValidator({
            multiCheck: true,
            rules: {
                username: {
                    required: true
                },
                sex: {
                    required: true
                },
                company: {
                    required: true
                },
                phone: {
                    required: true,
                    mobile: true
                },
                address_prov: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: '请输入用户名'
                },
                sex: {
                    required: '请输入密码'
                },
                company: {
                    required: '请输入工作单位'
                },
                phone: {
                    required: '请输入手机号',
                    mobile: '手机号格式不正确'
                },
                address_prov: {
                    required: '请输入所在地'
                }
            }
        });

        return await validatorInstance.checkData(formData, this.onMessage)

    }

    onMessage(params) {
        console.log(params)
        return params
    }
}

module.exports = new MysqlService();
