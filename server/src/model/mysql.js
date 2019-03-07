/* eslint no-return-await:0 */
const mysql = require('mysql');
mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port : 3306,
    database : 'exceltools'
})

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port : 3306,
    database : 'exceltools'
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
