// 引入Node.js文件模块
const fileUtils = require('../../utils/FileUtils');

// 引入Node.js路径模块
const path = require('path');

// 写入的文件名称
const fileName = "blogs.json";

// 文件全文件名称
const fileFullName = path.resolve(__dirname, fileName);

// 读取博客文件
async function readBlogFileSync() {
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
    const blogList = JSON.parse(strFileData);
    // 返回博客列表
    return blogList;
}

// 写入博客文件
async function writeBlogFileSync(data) {
    try {
        // 写入文件
        let result = await fileUtils.writeFileContentSync(fileFullName, data);
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
    readBlogFileSync,
    // 写入博客文件
    writeBlogFileSync
}