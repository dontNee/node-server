const ResponseVo = require("../model/ResponseVo");

const common = require("../constant/common");

// 导入业务层代码
const blogService = require("../services/blogService");

const BlogController = async (request, response) => {

    // 定义处理路由的逻辑
    const method = request.method;
    // 获取请求Vo
    const requestVo = request.requestVo;
    // 获取路由路径
    const path = requestVo.path;

    if (method == common.REQUEST_METHOD_GET && path == '/api/blog/list') {
        // 获取博客列表
        return await blogService.findBlogList()

    }

    if (method == common.REQUEST_METHOD_GET && path == '/api/blog/detail') {
        // 打印参数
        return await blogService.findBlogDetail(requestVo);
    }

    if (method == common.REQUEST_METHOD_POST && path == '/api/blog/new') {
        // 新增博客
        return await blogService.newBlog(requestVo);
    }

    if (method == common.REQUEST_METHOD_POST && path == '/api/blog/update') {
        // 更新博客
        return await blogService.updateBlog(requestVo);
    }

    if (method == common.REQUEST_METHOD_POST && path == '/api/blog/delete') {
        // 删除博客
        return await blogService.deleteBlog(requestVo);
    }

    return new ResponseVo();
}

module.exports = BlogController;