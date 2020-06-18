const mysqlService = require('../../service/RD_progress/editCode');

class MysqlController {

    async editCode(ctx) {
        const returnData = await mysqlService.editCode(ctx)
        console.log(returnData)
        
        ctx.body = {
            code: 0,
            data: returnData,
            msg: '请求成功',
        }
    }

}

module.exports = new MysqlController();