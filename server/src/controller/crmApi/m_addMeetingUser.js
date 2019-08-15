const mysqlService = require('../../service/crm_service/mysql');

class MysqlController {
    async addUser(ctx) {
        ctx.body = {
            status: 200,
            statusText: 'excel',
            currentAuthority: await mysqlService.add(ctx),
        }
    }
}

module.exports = new MysqlController();