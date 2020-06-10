/* eslint no-return-await:0 */
const mysql = require('mysql');
mysqlConnection = mysql.createConnection({
    host: '49.234.40.20',
    user: 'root',
    password: 'Dby!!0426',
    port : 3306,
    database : 'medisan_crm'
})

const mysqlPool = mysql.createPool({
    host: '49.234.40.20',
    user: 'root',
    password: 'Dby!!0426',
    port : 3306,
    database : 'medisan_crm'
})

class mysqlModel {
    async getMysqlConnectionData(sql) {
        // Similar: return await query('select * from user where uid = ?', uid);
        return new Promise((resolve, reject) => {
            mysqlConnection.connect(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        // 结束会话
                        connection.destroy()
                    })
                }
            })
        })
    }

    async getMysqlPoolData(sql) {
        return new Promise((resolve, reject) => {
            mysqlPool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        // 结束会话
                        connection.release()
                    })
                }
            })
        })
    }
}

module.exports = new mysqlModel();
