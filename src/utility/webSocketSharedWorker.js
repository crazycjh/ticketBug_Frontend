import cookies from 'js-cookie';

let isConnected = false; // 用來記錄 WebSocket 連線是否已經建立
let socket;
let ports = [];
let email = null;

function connectWebSocket(email) {
    if (!isConnected) {
        // 只有當沒有連線時才建立新的 WebSocket 連線
        try{
            socket = new WebSocket(`ws://${import.meta.env.VITE_BACKEND_URL}/`);
            console.log('建立websocket');
            socket.onopen = () => {
                console.log('WebSocket connected');
                // broadcastMessage({type: 'MESSAGE', message: 'connect success'});
                isConnected = true; // 更新標誌為已連線
                console.log('送出資料');
                socket.send(JSON.stringify({type: 'auth', email: email }));
            };
            // 設置其他事件處理器...
            socket.onmessage = (event) => {

                const receivedData = JSON.parse(event.data)

                // 要加入重新連線機制，當網路斷線
                broadcastMessage(receivedData);
                // broadcastMessage(event.data, socket);
                // console.log(event.data);
                // setInterval(()=> {
                //     socket.send(JSON.stringify('測試文字'));
                // },2000)
            }
            socket.onerror = (error) => {
                console.error(error,'連線發生錯誤')
            }
            socket.onclose = () => {
                console.log('WebSocket disconnected, attemping to reconnect');
                isConnected = false; // 更新為未連線
                setTimeout(connectWebSocket(email), 5000);
            };
        }catch(error) {
            console.error('發生某種錯誤');
            isConnected = false;
            // setTimeout(connectWebSocket(email), 5000);
        }
    }else {
        console.log('已經連線過了');
    }
}

self.onconnect = (e) => {
    const port = e.ports[0];
    ports.push(port);

    port.onmessage = (e) => {
        if(e.data.type === 'websocket'){
            email = e.data.email;
            connectWebSocket(email);
        }
    }
    // }, 2000);
    // port.onmessage = (event) => {
    //     // 現在這裡會檢查 isConnected 標誌來避免重複連線
    //     // 
    // };
};



function broadcastMessage(message, socket) {
    // 使用 self.clients.matchAll() 獲取所有連接的客戶端
    const type = 'MESSAGE';
    ports.forEach((port) => {
        // 使用 client.postMessage 向每個客戶端（標籤）發送消息
        port.postMessage({type ,message});
    });

}