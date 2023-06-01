const BlogController = require("../controller/blogController");

const { handleRequestDataSync } = require("../utils/RequestDataHandler");

const BlogServer = (request, response) => {

    response.setHeader("content-Type", "application/json");

    // 处理请求数据
    handleRequestDataSync(request)
    .then(() => {
        return BlogController(request, response);
    })
    .then((blogData) => {
        // 返回响应数据
        response.end(JSON.stringify(blogData));
    });

}

module.exports = BlogServer;