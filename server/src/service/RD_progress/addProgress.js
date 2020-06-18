
const URL = require('url');
const MysqlModel = require('../../model/RD_progress/RD_progress');
const getMysqlConnectionData = MysqlModel.getMysqlConnectionData;
const getMysqlPoolData = MysqlModel.getMysqlPoolData;
const getMysqlDataList = MysqlModel.getMysqlDataList;
const mysqlTableName = 'add_progress'

const distData = {
    "北京": "11",
    "天津": "12",
    "河北": "13",
    "山西": "14",
    "内蒙古": "15",
    "辽宁": "21",
    "吉林": "22",
    "黑龙江": "23",
    "上海": "31",
    "江苏": "32",
    "浙江": "33",
    "安徽": "34",
    "福建": "35",
    "江西": "36",
    "山东": "37",
    "河南": "41",
    "湖北": "42",
    "湖南": "43",
    "广东": "44",
    "广西": "45",
    "海南": "46",
    "重庆": "50",
    "四川": "51",
    "贵州": "52",
    "云南": "53",
    "西藏": "54",
    "陕西": "61",
    "甘肃": "62",
    "青海": "63",
    "宁夏": "64",
    "新疆": "65",
}

class MysqlService {

    async mysqlConnect() {

        const sql = `SELECT * FROM ${mysqlTableName}`

        return getMysqlConnectionData(sql)
    }

    async projectListUseId(obj) {
        const url = obj.request.url
        const data = URL.parse(url, true).query
        let sql
        if(data){
            if(data.id){
                sql = `SELECT * FROM ${mysqlTableName} WHERE ID = ${data.id}`
            }else if(data.viewCode){
                sql = `SELECT * FROM ${mysqlTableName} WHERE viewCode = '${data.viewCode}'`
            }else{
                return false
            }
        }else{
            return false
        }
        return getMysqlPoolData(sql)
    }

    async projectList(obj) {
        const sql = `SELECT * FROM ${mysqlTableName}`
        return getMysqlPoolData(sql)
    }
    
    async add(obj) {
        // let data = obj[0].data;
        const keyArr = []
        const valueArr = []
        const requestData = obj.request.body
        // for(let i in requestData) {
        //     keyArr.push(i)
        //     valueArr.push(requestData[i])
        // }
        const sqlData = this.ObjToSql(requestData)
        const sql = 'INSERT INTO ' + mysqlTableName + ' (' + sqlData.keyArr + ') VALUES ('  + sqlData.valueStr + ')'
        return getMysqlPoolData(sql)
    }

    ObjToSql(obj) {
        const sql = {
            keyArr: '',
            valueStr: ''
        }
        const keyArr = []
        for(let i in obj){
            keyArr.push(i);
            sql.valueStr = sql.valueStr + '"' + obj[i] + '",'
        }
        sql.keyArr = keyArr.toLocaleString()
        sql.valueStr = sql.valueStr.substring(0,sql.valueStr.length-1)
        return sql;
    }
}
module.exports = new MysqlService();
