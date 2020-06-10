const fileService = require('../../service/file-oss')
const xlsxParserService = require('../../service/xlsx')


class ERPFileController {

    async fileUploadapi(ctx) {
        const localFile = ctx.request.files.file.path;
        const key = ctx.request.files.file.name;
        // 上传文件至阿里私有OSS
        const result = await fileService.put(key, localFile)
        // 从阿里云OSS获取文件BUFFER内容
        const fileInfo = await fileService.getBuffer(result.name)
        // 将BUFFER内容转为object对象
        const xlsxObj = await xlsxParserService.xlsxToObj(fileInfo.content)
        // 将数据存入mysql数据库
        // const sqlData = await mysqlservice.add(xlsxObj)

        ctx.body = {
            code: result.res.status == 200 ? 0 : 1,
            imgURL: result.url ? result.url : 'upload file url Error',
            size: result.size ? result.size : '-1',
            content: xlsxObj
        };
    }
}



module.exports = new ERPFileController();