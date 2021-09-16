const { querySql } = require('../db')

function getNewProductBanner() {
	const sql = `SELECT bannerUrl FROM ds_sale_info WHERE id = '7c3ccc200b9311eca4335bb3f59d5237';`
	return querySql(sql)
}

module.exports = {
	getNewProductBanner
}