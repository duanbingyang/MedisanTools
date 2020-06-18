const fileService = require('../service/file');
const qiniu = require('qiniu')

class FileController {
    async fileUploadapi(ctx) {
        const config = new qiniu.conf.Config();
        // 空间对应的机房
        config.zone = qiniu.zone.Zone_z2;
        // 是否使用https域名
        //config.useHttpsDomain = true;
        // 上传是否使用cdn加速
        //config.useCdnDomain = true;

        const localFile = ctx.request.files.file.path;
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        const key = ctx.request.files.file.name;
        const uploadToken = await fileService.fileIploadToken();
        // 文件上传
        formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
            respBody, respInfo) {
            if (respErr) {
                console.log(respErr)
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                console.log(respBody)
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        });
        ctx.body = {
            status: 200,
            statusText: '开始上传',
            currentAuthority: uploadToken
        };
    }
}

module.exports = new FileController();
