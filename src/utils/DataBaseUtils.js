// 导入mysql模块
const mysql = require("mysql");

// 导入mysql配置
const mysqlConf = require("../config/dbconf.json");

// 创建连接
function createConnect() {
    // 创建连接
    return mysql.createConnection(mysqlConf);
}

// 关闭连接
function closeConnect(connect) {

    if (connect) connect.end();
}

// 封装SQL执行处理
function execQuery(sql, callback) {
    // 如果sql为空，则返回
    if (!sql) {
        return callback("未获取到数据库执行语句");
    }
    // 创建连接对象
    const connect = createConnect();
    // 开始连接
    connect.connect();
    // 执行查询
    connect.query(sql, (error, result) => {
        // 如果有错误对象
        if (error) {
            return callback(error);
        }
        callback(result);
    })
    // 关闭连接
    closeConnect(connect);
}

// 封装SQL执行的异步操作
function execQuerySync(sql) {

    return new Promise(resolve => {

        execQuery(sql, resolve);
    });
}

// 封装查询语句模板
function createQuerySql(table, sid) {
    // 初始化查询语句
    let querySql = `SELECT * FROM ${ table } WHERE 1 = 1`;
    if (sid) {
        // 拼接查询条件
        let whereSql = `S_ID = '${ sid }'`;
        // 返回结果
        querySql = querySql.concat(" AND ", whereSql);
    }
    return querySql;

}

// 封装插入语句模板
function createInsertSql(table, condition) {
    // 初始化插入语句
    let insertSql = `INSERT INTO ${ table }`;
    // 插入的字段
    let fields = [];
    // 插入的字段值
    let fieldsValue = [];
    // 获取插入字段和字段值
    for (const key in condition) {
        // 放入字段列表
        fields.push(key);
        // 插入的字段值
        fieldsValue.push(`'${condition[key]}'`);
    }
    if (fields.length == 0) {
        console.debug("createInsertSql: 插入字段为空");
        // 没有插入字段值，直接返回
        return;
    }
    // 拼接插入字段
    const strFields = `( ${ fields.join() } )`;
    // 拼接插入字段值
    const strFieldsValue = `( ${ fieldsValue.join() } )`;
    // 返回拼接结果
    return insertSql.concat(" ", strFields, " VALUES ", strFieldsValue);
}

// 创建更新语句模板
function createUpdateSql(table, fields, sid) {
    // 初始化更新语句
    let updateSql = `UPDATE ${ table }`;
    // 初始化更新字段
    let updateFields = [];
    // 获取更新字段
    for (const key in fields) {
        // 处理更新值
        updateFields.push(`${ key } = '${ fields[key] }'`);
    }
    if (updateFields.length == 0) {
        console.debug("createUpdateSql: 更新字段为空");
        // 返回
        return;
    }
    if (!sid) {
        console.debug("createUpdateSql: 更新条件为空");
        // 返回
        return;
    }
    // 拼接更新字段
    const strUpdateFields = updateFields.join();
    // 拼接更新条件
    const strWhereSql = `S_ID = '${ sid }'`;
    // 返回结果
    return updateSql.concat(" SET ", strUpdateFields, " WHERE ", strWhereSql);

}

// 创建删除语句模板
function createDeleteSql(table, sid) {
    // 初始化删除语句
    let deleteSql = `DELETE FROM ${ table }  WHERE 1 = 1`;
    // 创建删除条件
    let deleteCondition = `S_ID = '${ sid }'`;
    if (!sid) {
        console.debug("createDeleteSql: 缺少删除数据的id");
        // 返回
        return;
    }
    return deleteSql.concat(" AND ", deleteCondition);
}

module.exports = {
    execQuery,
    execQuerySync,
    createQuerySql,
    createInsertSql,
    createUpdateSql,
    createDeleteSql
}