class ResponseVo {

    constructor() {
        // 响应结果
        this.data = null;
        // 响应状态
        this.statusCode = "";
        // 响应消息
        this.statusMessage = "";
    }
    // 设置内容
    setContent(data) {
        // 设置响应数据
        this.data = data;
    }

    success(data) {
        // 响应体数据
        this.data = data;
        // 响应状态
        this.statusCode = "OK";
        // 响应消息
        this.statusMessage = "成功";
    }

    error() {
        // 响应体数据
        this.data = "";
        // 响应状态
        this.statusCode = "ERROR";
        // 响应消息
        this.statusMessage = "失败";  
    }
}

module.exports = ResponseVo;