const { querySql } = require('../db')

function getTopSell() {
	const sql = `SELECT * FROM ds_goods ORDER BY sale DESC LIMIT 15;`
	return querySql(sql)
}

module.exports = {
	getTopSell
}