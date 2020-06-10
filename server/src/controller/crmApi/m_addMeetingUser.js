const mysqlService = require('../../service/crm_service/mysql');

class MysqlController {
    async addUser(ctx) {
        const mysqlResault = await mysqlService.add(ctx);
        if(!mysqlResault.code){
            const request = {};
            request.sqlMsg = mysqlResault.msg
            request.verificationCode = mysqlResault.verificationCode
            ctx.body = {
                code: 0,
                message: request,

            }
        }else{
            ctx.body = {
                status: 2,
                statusText: 'error',
                msg: mysqlResault.msg,
            }
        }
    }
}

module.exports = new MysqlController();