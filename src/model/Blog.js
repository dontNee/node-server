class Blog {

    constructor() {
        // 博客ID
        this.blogId = "";
        // 博客作者
        this.blogAuthor = "";
        // 博客阅览次数
        this.blogViewTimes = 0;
        // 博客标题
        this.blogTitle = "";
        // 博客内容
        this.blogContent = "";
    }
    // 初始化值
    initValue(source) {
        // 将源数据导入到当前对象
        return Object.assign(this, source);
    }
    // 获取数据插入的模型
    createInsertModel() {
        // 插入模型
        const insertModel = {
            // 主键
            S_ID: "",
            // 博客标题
            BLOG_TITLE: this.blogTitle,
            // 博客内容
            BLOG_CONTENT: this.blogContent,
            // 作者名称
            AUTHOR_NAME: this.blogAuthor,
            // 创建时间
            CREATE_TIME: null,
            // 更新时间
            UPDATE_TIME: null
        };
        // 导入uuid
        const { v4: uuidv4 } = require('uuid');
        // 生成主键
        insertModel.S_ID = uuidv4();
        // 导入时间模块
        var moment = require('moment');
        // 生成现在的时间
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        // 设置时间
        insertModel.CREATE_TIME = insertModel.UPDATE_TIME = currentTime;
        // 返回插入模型
        return insertModel;
    }
    // 获取更新模型
    createUpdateModel() {
        // 更新模型
        const updateModel = {}
        if (this.blogTitle) {
            // 设置博客标题
            Object.defineProperty(updateModel, "BLOG_TITLE", {
                // 值
                value: this.blogTitle,
                // 可以被枚举
                enumerable: true
            })
        }
        if (this.blogContent) {
            // 设置博客内容
            Object.defineProperty(updateModel, "BLOG_CONTENT", {
                // 值
                value: this.blogContent,
                // 可以被枚举
                enumerable: true
            })
        }
        if (this.blogAuthor) {
            // 设置博客作者
            Object.defineProperty(updateModel, "AUTHOR_NAME", {
                // 值
                value: this.blogAuthor,
                // 可以被枚举
                enumerable: true
            })
        }
        if ( Object.keys(updateModel).length > 0 ) {
            // 导入时间模块
            var moment = require('moment');
            // 生成现在的时间
            const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
            // 设置博客更新时间
            Object.defineProperty(updateModel, "UPDATE_TIME", {
                // 值
                value: currentTime,
                // 可以被枚举
                enumerable: true
            })
        }
        return updateModel;
    }
}

module.exports = Blog;