const { createServer } = require("http");
const { Server } = require("socket.io");
// 创建HTTP 服务器
const httpServer = createServer();
// 时间模块
const moment = require("moment");
// 读取记录
const recordFileUtils = require("../src/data/react-web/index");

// 创建Socket服务端
const io = new Server(httpServer, {
    cors: {
        origin: ["http://43.138.104.32", "https://fengfengyun.cn"],
        credentials: true
    }
});

io.on("connection", async (socket) => {
    // 读取文件
    const fileData = await recordFileUtils.readCustomFileSync();
    // 发送消息给客户端
    socket.emit("down-data", JSON.stringify(fileData));
    // 接收消息
    socket.on("up-data", async (msg) => {
        // 现在的时间
        const now = moment();
        // 处理接收到的消息
        const resultData = {
            // 主键，前台遍历时使用
            id: now.unix(),
            // 记录日期 + 时间
            recordDateTime: now.format('YYYY-MM-DD HH:mm:ss'),
            // 记录日期
            recordDate: now.format("YYYY-MM-DD"),
            // 记录时间
            recordTime: now.format("HH:mm:ss"),
            // 消息体
            data: msg,
            // 发送消息者
            sendBy: "某某同学"
        }
        // 写入文件
        await recordFileUtils.writeCustomFileSync(resultData);
        // 广播接收到的消息
        io.emit("down-data", JSON.stringify(resultData));
    })
    // 断开连接
    socket.on("disconnect", (reason) => {
        console.log("socket::disconnect  reason: ", reason)
    });
});

httpServer.listen(3002);