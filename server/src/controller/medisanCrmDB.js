const mysqlService = require('../service/medisanCrmDb');

class MysqlController {
    async resApi(ctx) {
        ctx.body = {
            status: 200,
            statusText: 'res',
            data: await mysqlService.mysqlConnect(),
        }
    }
    async givenApi(ctx) {
        const reqObj = ctx.request.body
        ctx.body = {
            status: 200,
            statusText: 'res',
            data: await mysqlService.given(reqObj),
        }
        // ctx.body = {
        //     status: 200,
        //     statusText: 'res',
        //     data: ctx.query.phone,
        // }
    }

}

module.exports = new MysqlController();
