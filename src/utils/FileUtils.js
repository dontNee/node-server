// 引入Node.js文件模块
const fs = require('fs');

// 引入Node.js路径模块
const path = require('path');

// 引入常量模块
const common = require("../constant/common");

// 读取文件内容
function readFileContent(fileFullName, callback) {


    fs.readFile(fileFullName, (err, data) => {

        if (err) {
            // 失败时打印失败信息
            return console.error("获取文件失败：", err);
        }
        // 由二进制转为字符串类型
        return callback(data ? data.toString() : "");
    });
}

// 异步读取文件内容
function readFileContentSync(fileFullName) {
    return new Promise((resolve, reject) => {

        fs.readFile(fileFullName, (err, data) => {

            if (err) {
                // 失败时打印失败信息
                return reject(err)
            }
            // 由二进制转为字符串类型
            resolve(data ? data.toString() : "");
        });        
    })
}

// 写入文件内容
function writeFileContent(fileFullName, data, callback) {

    fs.writeFile(fileFullName, data, common.UNICODE_UTF8, (error) => {

        if (error) {
            // 打印错误消息
            console.error("writeFileContent => error: ", error);

            return callback(error);
        }
        callback(data);
    })
}

// 异步写入文件内容
function writeFileContentSync(fileFullName, data) {

    return new Promise(resolve => {

        writeFileContent(fileFullName, data, resolve);
    });
}

module.exports = {
    readFileContent,
    readFileContentSync,
    writeFileContent,
    writeFileContentSync
}