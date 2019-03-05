const mysqlService = require('../service/mysql');

class MysqlController {
    async excelapi(ctx) {
        ctx.body = {
            status: 200,
            statusText: 'excel',
            currentAuthority: mysqlService.mysqlConnect(),
        }
    }
}

module.exports = new MysqlController();
