
const fileService = require('../service/file-oss')
const xlsxParserService = require('../service/xlsx')
const mysqlservice = require('../service/mysql')
const mtsqlTableName = 'realdata'
const config = require('../config/config-sql')

class FileController {

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
        const sqlData = await mysqlservice.add(xlsxObj)

        ctx.body = {
            code: result.res.status == 200 ? 0 : 1,
            imgURL: result.url ? result.url : 'upload file url Error',
            size: result.size ? result.size : '-1',
            content: xlsxObj
        };
    }

    async getFileapi(ctx) {
       
        const fileName = ctx.query.name;
        const result = await fileService.getBuffer(fileName)

        ctx.body = {
            code: 0,
            msg: '获取成功',
            file: result
        };
    }
    
    async getList(ctx) {
        const selectKey = ctx.query.key ? ctx.query.key : '*'
        const pageno = ctx.query.pageno ? ctx.query.pageno : 1
        const pagesize = ctx.query.pagesize ? ctx.query.pagesize : 10
        const count = ctx.query.count ? ctx.query.count : false
        const selectVal = ctx.query.selectval ? ctx.query.selectval : ''
        
        let sql = 'SELECT ' + selectKey + ' FROM '+ mtsqlTableName +' limit ' + ( pageno-1 ) * pagesize + ',' + pagesize
        let countSql = 'SELECT COUNT(*) FROM '+ mtsqlTableName +''
        let countSqlMain = 'SELECT * FROM '+ mtsqlTableName +' WHERE ' + 'company' + ' LIKE "%' + selectVal + '%"'

        if(selectVal){
            sql = 'SELECT * FROM '+ mtsqlTableName +' WHERE ' + 'company' + ' LIKE "%' + selectVal + '%" limit ' + ( pageno-1 ) * 10 + ',' + 10
            countSqlMain = 'SELECT * FROM '+ mtsqlTableName +' WHERE ' + 'company' + ' LIKE "%' + selectVal + '%"'
            countSql = "select COUNT(*) from (" + countSqlMain + ") AS table200"
        }
        const result = await mysqlservice.find({
            sql: sql,
            count: count,
            countSql: countSql
        })
        console.log(result)
        ctx.body = {
            code: 0,
            msg: '获取成功',
            file: result[0],
            count: result[1] ? result[1][0]['COUNT(*)'] : ''
        };
    }
    
    async search(ctx) {
        const selectKey = ctx.query.key ? ctx.query.key : '*'
        const selectVal = ctx.query.selectval ? ctx.query.selectval : '*'
        const pageno = ctx.query.pageno ? ctx.query.pageno : 1
        const pagesize = ctx.query.pagesize ? ctx.query.pagesize : 10
        const count = ctx.query.count ? ctx.query.count : false
        const sql = 'SELECT * FROM '+ mtsqlTableName +' WHERE ' + 'company' + ' LIKE "%' + selectVal + '%"'
        const realSql = 'SELECT * FROM '+ mtsqlTableName +' WHERE ' + 'company' + ' LIKE "%' + selectVal + '%" limit ' + ( pageno-1 ) * 10 + ',' + 10
        const countSql = "select COUNT(*) from (" + sql + ") AS table200"
        const result = await mysqlservice.find({
            sql: realSql,
            count: count,
            countSql: countSql
        })
        console.log(result)
        ctx.body = {
            code: 0,
            msg: '获取成功',
            file: result[0],
            count: result[1] ? result[1][0]['COUNT(*)'] : ''
        };
    }

    async detail(ctx) {
        const selectId = ctx.query.id ? ctx.query.id : '*'
        const sql = 'SELECT * FROM '+ mtsqlTableName +' WHERE ' + 'id=' + selectId
        const result = await mysqlservice.find({
            sql: sql
        })

        const resultData = result[0][0]

        ctx.body = {
            code: 0,
            msg: '获取成功',
            file: resultData,
            count: result[1] ? result[1][0]['COUNT(*)'] : ''
        };
    }

    async addDetail(ctx) {
        let userData = ctx.request.body
        const insertData = []
        for (let i = 0; i < config.titleEN.length; i++){
            if(userData[config.titleEN[i]] == ''){
                insertData.push('null')
            }else if(config.titleEN[i] == 'id'){
                insertData.push(0)
            }else{
                insertData.push(userData[config.titleEN[i]])
            }
        }
        const sql = `INSERT INTO ${mtsqlTableName} ( ${config.titleEN.toString()} ) VALUES ( ${insertData.toString()} );`
        const result = await mysqlservice.insert({
            sql: sql
        })
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: result
        };
    }
    

}

module.exports = new FileController();