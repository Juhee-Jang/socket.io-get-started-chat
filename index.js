const express = require('express');
const app = express();
const http = require('http');
// 1. Express는 app을 HTTP서버에 제공할 수 있는 기능 핸들러로 초기화 한다.
const server = http.createServer(app);
// 4. server 객체(HTTP server)를 전달하여, socket.io의 새 인스턴스를 초기화한다.
const {Server} = require("socket.io");
const io = new Server(server);

// 2. 웹 사이트를 방문하면 호출되는 route handler를 정의한다.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 5. 그런 다음 들어오는 소켓에 대한 connection 이벤트를 듣고, console에 기록한다.
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     // 또한 각 소켓은 특수 연결 해제 이벤트를 발생시킨다.
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     })
// })

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//     })
// })

// 특정 발신 소켓을 제외한 모든 사람에게 메시지를 보낼 경우
// io.on('connection', (socket) => {
//     socket.broadcast.emit('hi');
// });

// 편의를 위해 발신자를 포함한 모든 사람에게 메시지를 보내는 경우
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// 3. 포트 3000에서 http 서버를 수신하도록 한다.
server.listen(3000, () => {
    console.log('listening on *:3000');
});



