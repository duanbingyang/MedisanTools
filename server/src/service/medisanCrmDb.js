const MysqlModel = require('../model/medisanCrmDB');
const checkModel = require('../model/check');
const getMysqlConnectionData = MysqlModel.getMysqlConnectionData;
const getMysqlPoolData = MysqlModel.getMysqlPoolData;
const mysqlTableName = 'user_info'


class MysqlService {

    async mysqlConnect() {

        const sql = `SELECT * FROM ${mysqlTableName}`;

        return getMysqlPoolData(sql)
    }

    async given(obj) {
        const findSql = `SELECT COUNT(*) FROM ${mysqlTableName} WHERE phone = ${obj.phone}`
        const phoneList = await getMysqlPoolData(findSql)
        const phoneRepeatNum = phoneList[0]['COUNT(*)']
        if(phoneRepeatNum){

        }
        const sql = `UPDATE ${mysqlTableName} 
                    SET given = ${obj.given}
                    WHERE phone = ${obj.phone}`
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
            return results[0];
        });
    }

    async modify() {
        return await mysqlConnection.query('SELECT * FROM test', function (error, results, fields) {
            if (error) throw error;
            return results[0];
        });
    }
}
module.exports = new MysqlService();
