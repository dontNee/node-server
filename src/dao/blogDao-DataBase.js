// 博客类
const Blog = require("../model/Blog");

// 获取数据操作工具函数
const DataBaseOperater = require("../utils/DataBaseUtils");

// 查询表格
const TAB_BLOG = "TAB_BLOG";

const blogDao = {
    // 获取博客列表
    async findBlogList() {
        // 获取查询SQL
        const querySQL = DataBaseOperater.createQuerySql(TAB_BLOG);
        // 获取查询结果
        const resultList = await DataBaseOperater.execQuerySync(querySQL);
        // 返回结果
        return resultList;
    },
    // 获取博客详情
    async findBlogDetail(sid) {
        // 获取查询SQL
        const querySQL = DataBaseOperater.createQuerySql(TAB_BLOG, sid);
        // 获取查询结果
        const resultList = await DataBaseOperater.execQuerySync(querySQL);
        // 返回结果
        return resultList;
    },
    // 创建博客
    async newBlog(postData) {
        // 创建博客对象
        const insertBlog = new Blog();
        // 初始化值
        insertBlog.initValue(postData);
        // 获取插入SQL
        const InsertSQL = DataBaseOperater.createInsertSql(TAB_BLOG, insertBlog.createInsertModel());
        // 执行插入语句
        const result = await DataBaseOperater.execQuerySync(InsertSQL);
        // 返回结果
        return result;
    },
    // 更新博客
    async updateBlog(postData) {
        // 创建博客对象
        const updateBlog = new Blog();
        // 初始化值
        updateBlog.initValue(postData);
        // 获取更新SQL
        const UpdateSQL = DataBaseOperater.createUpdateSql(TAB_BLOG, updateBlog.createUpdateModel(), postData.sid);
        // 执行更新语句
        const result = await DataBaseOperater.execQuerySync(UpdateSQL);
        // 返回结果
        return result;
    },
    // 删除博客
    async deleteBlog(postData) {
        // 获取删除SQL
        const DeleteSQL = DataBaseOperater.createDeleteSql(TAB_BLOG, postData.sid);
        // 执行删除语句
        const result = await DataBaseOperater.execQuerySync(DeleteSQL);
        // 返回结果
        return result;
    } 
}

module.exports = blogDao;