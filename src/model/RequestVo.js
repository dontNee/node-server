const queryString = require("querystring");

class RequestVo {

    constructor() {
        // 请求路径
        this.path = "";
        // 请求参数字串(GET)
        this.strQueryParams = "";
        // 请求参数
        this.queryParams = null;
        // 请求数据(POST)
        this.postData = null;
    }

    parseStrQueryParams() {
        // 解析请求参数字串
        if (!this.strQueryParams) {
            return;
        }
        // 请求参数
        this.queryParams = queryString.parse(this.strQueryParams);
    }
}

module.exports = RequestVo;