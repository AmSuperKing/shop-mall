const mysql = require('mysql')
const config = require('./config')
const { debug } = require('../utils/constant')

function connect() {
	return mysql.createConnection({
		host: config.host,
		port: config.port,
		user: config.user,
		password: config.password,
		database: config.database,
		multipleStatements: true,
		timezone: 'Asia/Shanghai'
	})
}

function querySql(sql) {
	const conn = connect()
	debug && console.log(sql)
	return new Promise((resolve, reject) => {
		try {
			conn.query(sql, (err, res) => {
				if (err) {
					debug && console.log('数据库查询失败，原因:' + JSON.stringify(err))
					reject(err)
				} else {
					debug && console.log('数据库查询成功', JSON.stringify(res))
					resolve(res)
				}
			})
		} catch (e) {
			reject(e)
		} finally {
			conn.end()
		}
	})
}

module.exports = {
	querySql
}
