// 引入Node.js文件模块
const fileUtils = require('../../utils/FileUtils');

// 引入Node.js路径模块
const path = require('path');

// 引入Lodash/array模块
var array = require('lodash/array');

// 写入的文件名称
const fileName = "contact-record.json";

// 文件全文件名称
const fileFullName = path.resolve(__dirname, fileName);

// 列表
let recordList = [];

// 读取博客文件
async function readCustomFileSync() {
    // 初始化结果字串
    let strFileData = "";
    try {
        strFileData = await fileUtils.readFileContentSync(fileFullName);
        // 没有获取到文件中的字串
        if (!strFileData) {
            throw new Error("文件内容为空");
        }
    } catch(err) {
        // 读取文件失败
        console.error("readBlogFile => err: ", err);
        // 返回结果
        return [];
    }
    // 创建对象
    recordList = JSON.parse(strFileData);
    // 返回博客列表
    return recordList;
}

// 写入博客文件
async function writeCustomFileSync(data) {
    try {
        // 写入文件
        let result = await fileUtils.writeFileContentSync(fileFullName, JSON.stringify(array.concat(recordList, data)));
        // 判断结果是否为错误
        if (result instanceof Error) {
            // 抛出异常
            throw result;
        }
        // 返回写入的对象
        return result;
    } catch(error) {
        // 写入错误时
        console.error("writeBlogFileSync => error: ", error);
        return [];
    }
}

module.exports = {
    // 读取博客文件
    readCustomFileSync,
    // 写入博客文件
    writeCustomFileSync
}