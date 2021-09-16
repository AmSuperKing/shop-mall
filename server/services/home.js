const { querySql } = require('../db')

function getTypeList() {
	const sql = `select * from ds_main_type; select * from ds_sub_main_type;`
	return querySql(sql)
}

function getSubTypes() {
	const sql = `SELECT * FROM ds_sub_main_type ORDER BY RAND() LIMIT 5;`
	return querySql(sql)
}

function getGoodsRandom(params) {
	const sql = `SELECT * FROM ds_goods ORDER BY RAND() LIMIT 10;`
	return querySql(sql)
}

function getSaleTypeInfo() {
	const sql = `select * from ds_sale_type;`
	return querySql(sql)
}

function getSaleTypeItem(id) {
	const sql = `select * from ds_sale_type where id = '${id}';
	select * from ds_sale_type_info where blongType = '${id}';`
	return querySql(sql)
}

function getBriefInfo() {
	const sql = `SELECT * FROM ds_goods ORDER BY sale DESC LIMIT 2;
	SELECT * FROM ds_goods WHERE isNew = '1' LIMIT 2; 
	SELECT * FROM ds_goods ORDER BY RAND() LIMIT 2;
	SELECT * FROM ds_goods ORDER BY sale LIMIT 2;`
	return querySql(sql)
}

module.exports = {
  getTypeList,
	getGoodsRandom,
	getSaleTypeInfo,
	getSaleTypeItem,
	getSubTypes,
	getBriefInfo
}