const RequestVo = require("../model/RequestVo");

const common = require("../constant/common");

// 处理请求数据
async function handleRequestDataSync(request) {

    // 初始化请求数据
    const requestVo = new RequestVo();
    // 获取请求路径和请求参数
    // 处理请求路径
    const [path, strQueryParams] = request.url.split('?');
    // 请求路径
    requestVo.path = path;
    // 请求参数
    requestVo.strQueryParams = strQueryParams;
    // 解析请求参数
    requestVo.parseStrQueryParams();
    // 解析请求数据
    requestVo.postData = await getPostData(request);
    // 打印解析到的请求参数
    console.debug("handleRequestDataSync => requestVo: ", requestVo)
    // 挂载请求Vo
    request.requestVo = requestVo;
}
// 获取请求数据
function getPostData(request) {
    // 返回异步处理结果
    return new Promise((resolve, reject) => {
        // 初始化请求数据
        let postData = {};
        // 处理请求
        if (request.method == common.REQUEST_METHOD_POST 
            && request.headers['content-type'] == "application/json") {

            // 请求数据字串
            let strPostData = "";
            // 获取到数据
            request.on('data', chunk => {
                strPostData += chunk.toString();
            })
            // 请求结束
            request.on('end', () => {
                // 如果获取到数据字串
                if (strPostData) {
                    postData = JSON.parse(strPostData);
                }
                resolve(postData);
            })
        } else {
            resolve(postData)
        }
    })
}

module.exports = {
    handleRequestDataSync
};