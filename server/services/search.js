const { querySql } = require('../db')

function getHotWords() {
	const sql = `SELECT * FROM ds_hot_search ORDER BY times limit 10;`
	return querySql(sql)
}

function searchGoods(word) {
	const sql = `SELECT * FROM ds_goods
	WHERE LOWER(goodsName) LIKE LOWER('%${word}%')
	OR LOWER(goodsModel) LIKE LOWER('%${word}%')
	OR LOWER(blongType) LIKE LOWER('%${word}%')`
	return querySql(sql)
}

function getGoodsDetail(id) {
	const sql = `SELECT * FROM ds_goods WHERE goodsId = '${id}';
	SELECT * FROM ds_goods_carousel WHERE blongGoods = '${id}';
	SELECT * FROM ds_goods_detail WHERE blongGoods = '${id}';
	SELECT * FROM ds_goods_comment WHERE goodsId = '${id}';`
	return querySql(sql)
}

module.exports = {
	getHotWords,
	searchGoods,
	getGoodsDetail
}