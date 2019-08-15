const querystring = require("querystring");
const MysqlModel = require('../../model/crm_db/mysql');
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
        const index = url.indexOf('?');
        const params = url.substring(index+1,url.length);
        const params_json = querystring.parse(params);
        const addKey = [];
        let addData = '';
        for(let i in params_json){
            addKey.push(i);
            addData = addData + ',"' + params_json[i] + '"';
        }
        const sql = 'INSERT INTO ' + mysqlTableName + ' (' + querystring.unescape(addKey) + ') VALUES ' + '(' + addData.substring(1,addData.length) + ')';
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
}
module.exports = new MysqlService();
