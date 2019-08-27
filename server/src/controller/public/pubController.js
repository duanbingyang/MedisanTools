const pubService = require('../../service/public/pubServer');

class pubController {
    async txVerificationCode(ctx) {
        ctx.body = {
            status: 200,
            statusText: 'verificationCode',
            currentAuthority: await pubService.txSendCode(ctx),
        }
        // ctx.body = {
        //     status: 200,
        //     statusText: 'verificationCode',
        //     currentAuthority: {
        //         code: "dba132f6ab6a3e3d17a8d59e82105f4c",
        //         errmsg: "OK",
        //         ext: "",
        //         fee: 1,
        //         result: 0,
        //         sid: "2019:-8418857448111730027"
        //     }
        // }
    }
}

module.exports = new pubController();