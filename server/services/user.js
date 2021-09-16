const { querySql } = require('../db')

function login(username, password) {
	const sql = `select * from ds_user where username = '${username}' and password = '${password}'`
	return querySql(sql)
}

function getUserInfo(user_id) {
	const sql = `select * from ds_user where userId = '${user_id}'`
	return querySql(sql)
}

function register(userId, username, usernameCn, password, phone) {
	const sql = `insert into ds_user (userId,username,usernameCn,password,phone)
	values('${userId}', '${username}', '${usernameCn}', '${password}', '${phone}')`
	return querySql(sql)
}

module.exports = {
	login,
	getUserInfo,
	register
}