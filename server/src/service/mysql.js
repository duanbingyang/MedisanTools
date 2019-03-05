const MysqlModel = require('../model/mysql');
const checkModel = require('../model/check');
const getMysqlConnectionData = MysqlModel.getMysqlConnectionData;
const getMysqlPoolData = MysqlModel.getMysqlPoolData;
const getMysqlDataList = MysqlModel.getMysqlDataList;
const mtsqlTableName = 'realdata'

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

// mysqlConnection.connect(function (err) {
//     if (err) {
//         console.error('error connecting: !!!!!!!!!!!!!!!!!!!!!!!!! ' + err.stack);
//         return;
//     }

//     console.log('connected as id =========================== ' + connection.threadId);
// });


class MysqlService {

    async mysqlConnect() {

        const sql = `SELECT * FROM ${mtsqlTableName}`;

        return getMysqlConnectionData(sql)
    }

    async add(obj) {
        let sqlData = '';
        let th = 'id,';
        let data = obj[0].data;
        let dateList = {
            6: true,
            7: true,
            8: true,
            10: true,
            11: true,
            18: true,
            20: true
        }


        for (let i = 0; i < data.length; i++) {
            let sqlDatali = '0,'
            for (let j = 0; j < data[i].length; j++) {
                let item = data[i][j]
                if (i == 0) {
                    item = checkModel.changeTh(item, 'CH')
                    th = th + item + ','
                } else {
                    if (dateList[j]) {
                        item = checkModel.timeExcelToTimeUnix(item)
                    } else if (j == 0) {
                        item = '"' + item + '"'
                    } else if(j == 1 && !!item){
                        let provinceName = item.replace(/[省|市]*/g, '')
                        item = distData[provinceName]
                    } else {
                        item = checkModel.changeWan(item)
                    }
                    
                    item = checkModel.changeMark(item)
                    item = checkModel.checkString(item) ? '"' + item.replace(/(^\s*)|(\s*$)/g, "") + '"' : item
                    sqlDatali = sqlDatali + item + ','
                }
            }
            sqlData = sqlData + '(' + sqlDatali.slice(0, sqlDatali.length - 1) + ')' + ','
        }
        const sql = 'INSERT INTO ' + mtsqlTableName + ' (' + th.slice(0, th.length - 1) + ') VALUES ' + sqlData.slice(4, sqlData.length - 1)
        return getMysqlPoolData(sql)
    }

    async find(obj) {
        const {count, sql, countSql} = obj
        // const countSql = 'SELECT COUNT(*) FROM test_copy'
        let countNum;
        let cbData = []
        let pageData = await getMysqlPoolData(sql)
        cbData.push(pageData)
        if(!!count){
            countNum = await getMysqlPoolData(countSql)
            cbData.push(countNum)
        }
        return cbData
    }

    async insert(obj) {
        const {count, sql, countSql} = obj
        const cbData = await getMysqlPoolData(sql)
        console.log(cbData, '===========================================')
        return cbData
    }

    async remove() {
        return await mysqlConnection.query('SELECT * FROM test', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ===================================', results);
            return results[0];
        });
    }

    async modify() {
        return await mysqlConnection.query('SELECT * FROM test', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ===================================', results);
            return results[0];
        });
    }
}
module.exports = new MysqlService();
