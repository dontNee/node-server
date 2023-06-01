const Blog = require("../model/Blog");

const blogData = require("../data/blogData/index");

const blogDao = {
    // 获取博客列表
    async findBlogList() {
        // 创建博客
        const resultList = await blogData.readBlogFileSync();
        // 返回结果
        return resultList;
    },
    // 获取博客详情
    findBlogDetail() {

        return new Blog();
    },
    // 创建博客
    async newBlog(blog) {
        // 博客列表
        const blogList = await this.findBlogList();
        // 追加元素
        blogList.push(blog);
        // 重新写入文件
        const resultList = await blogData.writeBlogFileSync(
            JSON.stringify(blogList)
        );
        // 返回写入结果
        return resultList;
    },
    // 更新博客
    updateBlog() {

        return new Blog();
    },
    // 删除博客
    deleteBlog() {

        return new Blog();
    } 
}

module.exports = blogDao;