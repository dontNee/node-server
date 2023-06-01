// 导入Node Http模块
const http = require('http');

// 开放端口
const PORT = 5000;

// 引入服务处理
const BlogService = require("../src/servers/blogServer");

// 创建Server服务器
const server = http.createServer(BlogService);

server.listen(PORT, () => {
    // 打印debug日志
    console.debug(`server running at ${ PORT }...`);
})