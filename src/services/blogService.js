// 导入系统基本配置
const bsconf = require("../config/bsconf.json");
// 获取数据操作层函数
const blogDao =  bsconf.useDB 
    ? require("../dao/blogDao-DataBase") 
    : require("../dao/blogDao-FileSys");
// 获取响应结果Vo
const ResponseVo = require("../model/ResponseVo");

const blogService = {
    // 获取博客列表
    async findBlogList() {
        // 定义返回结果
        const resultVo = new ResponseVo();
        // 获取博客列表
        const blogList = await blogDao.findBlogList();
        // 成功
        resultVo.success(blogList)
        // 返回结果
        return resultVo;        
    },
    // 获取博客详情
    async findBlogDetail(requestVo) {
        // 定义返回结果
        const resultVo = new ResponseVo();
        // 获取查询数据ID
        const sid = requestVo && requestVo.queryParams ? requestVo.queryParams.sid : "";
        // 获取博客详情
        const blogDetail = await blogDao.findBlogDetail(sid);
        // 成功
        resultVo.success(blogDetail);
        // 返回结果
        return resultVo;
    },
    // 新增博客
    async newBlog(requestVo) {
        // 定义返回结果
        const resultVo = new ResponseVo();
        // 初始化结果
        resultVo.error();
        if (requestVo && requestVo.postData) {
            // 新增博客
            const newBlog = await blogDao.newBlog(requestVo.postData);
            // 成功
            resultVo.success(newBlog);
        }
        // 返回结果
        return resultVo;
    },
    // 更新博客
    async updateBlog(requestVo) {
        // 定义返回结果
        const resultVo = new ResponseVo();
        // 初始化结果
        resultVo.error();
        if (requestVo && requestVo.postData) {
            // 更新博客
            const updateBlog = await blogDao.updateBlog(requestVo.postData);
            // 成功
            resultVo.success(updateBlog);
        }
        // 返回结果
        return resultVo;
    },
    // 删除博客
    async deleteBlog(requestVo) {
        // 定义返回结果
        const resultVo = new ResponseVo();
        // 初始化结果
        resultVo.error();
        if (requestVo && requestVo.postData) {
            // 删除博客
            const deleteBlog = await blogDao.deleteBlog(requestVo.postData);
            // 成功
            resultVo.success(deleteBlog)
        }
        // 返回结果
        return resultVo;
    }

}

module.exports = blogService;