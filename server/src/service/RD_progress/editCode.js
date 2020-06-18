
const URL = require('url');
const MysqlModel = require('../../model/RD_progress/RD_progress');
const getMysqlConnectionData = MysqlModel.getMysqlConnectionData;
const getMysqlPoolData = MysqlModel.getMysqlPoolData;
const getMysqlDataList = MysqlModel.getMysqlDataList;
const mysqlTableName = 'edit_code'

class MysqlService {
    async editCode(obj) {
        const url = obj.request.url
        const data = URL.parse(url, true).query
        const sql = `select * from ${mysqlTableName} WHERE editCode = '${data.editCode}'`
        return getMysqlPoolData(sql)
    }
}
module.exports = new MysqlService();
