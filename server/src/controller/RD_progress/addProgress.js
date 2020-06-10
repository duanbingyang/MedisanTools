const mysqlService = require('../../service/RD_progress/addProgress');

class MysqlController {

    async projectListUseId(ctx) {
        const returnData = await mysqlService.projectListUseId(ctx)
        console.log(returnData)
        
        ctx.body = {
            code: 0,
            data: returnData,
            msg: '请求成功',
        }
    }

    async projectList(ctx) {
        const returnData = await mysqlService.projectList(ctx)
        console.log(returnData)
        
        ctx.body = {
            code: 0,
            data: returnData,
            msg: '请求成功',
        }

        // if(returnData && returnData.affectedRows){
        //     ctx.body = {
        //         code: 0,
        //         data: returnData,
        //         msg: '请求成功',
        //     }
        // }else{
        //     ctx.body = {
        //         code: 109,
        //         data: '',
        //         msg: '请求失败，请检查sql语句',
        //     }
        // }
    }

    async addProgressApi(ctx) {
        const returnData = await mysqlService.add(ctx)
        console.log(returnData.affectedRows)
        if(returnData && returnData.affectedRows){
            ctx.body = {
                code: 0,
                data: returnData,
                msg: '请求成功',
            }
        }else{
            ctx.body = {
                code: 109,
                data: '',
                msg: '请求失败，请检查sql语句',
            }
        }
    }
}

module.exports = new MysqlController();
