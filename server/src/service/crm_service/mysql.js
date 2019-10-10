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

        console.log(validate)
        
        for(let i in params_json){
            addKey.push(i);
            addData = addData + ',"' + params_json[i] + '"';
        }
        const sql = 'INSERT INTO ' + mysqlTableName + ' (' + querystring.unescape(addKey) + ') VALUES ' + '(' + addData.substring(1,addData.length) + ')';
        console.log(sql, '===================')
        return getMysqlPoolData(sql)
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
