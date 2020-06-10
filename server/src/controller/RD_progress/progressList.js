const mysqlService = require('../../service/RD_progress/progressList');

class MysqlController {

    async progressNodeUseId(ctx) {
        const returnData = await mysqlService.progressNodeUseId(ctx)
        console.log(returnData)
        
        ctx.body = {
            code: 0,
            data: returnData,
            msg: '请求成功',
        }
    }

    
    async selectProgressNodeUseId(ctx) {
        const returnData = await mysqlService.selectProgressNodeUseId(ctx)
        console.log(returnData)
        
        ctx.body = {
            code: 0,
            data: returnData,
            msg: '请求成功',
        }
    }

    async editProgressNode(ctx) {
        const returnData = await mysqlService.editProgressNode(ctx)
        console.log(returnData)
        
        ctx.body = {
            code: 0,
            data: returnData,
            msg: '请求成功',
        }
    }

    async deleteProgressNodeUseId(ctx) {
        const returnData = await mysqlService.deleteProgressNodeUseId(ctx)
        console.log(returnData)
        
        ctx.body = {
            code: 0,
            data: returnData,
            msg: '请求成功',
        }
    }

    async progressNode(ctx) {
        const returnData = await mysqlService.progressList(ctx)
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

    async addProgressNodeAdd(ctx) {
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
