import { ref } from 'vue';
import cookies from 'js-cookie';

const wsStatus = ref('Disconnected');
let port;

function connectWebSocket() {
    if ('SharedWorker' in window) {
        // worker = new SharedWorker('../utility/webSocketSharedWorker.js');
        // 假设你有一个 Web Worker 或 SharedWorker 脚本位于相对路径
        const worker = new SharedWorker(new URL('../webSocketSharedWorker.js', import.meta.url), { type: 'module' });

        port = worker.port;
        worker.port.onmessage = (event) => {
        const { type, message } = event.data;
        if (type === 'STATUS') {
            wsStatus.value = message;
        } else if (type === 'MESSAGE') {
            console.log('Message from WebSocket:', message);
        }
        };


        const eMail = cookies.get('email');
        port.postMessage({type: 'websocket', email: eMail});
    } else {
        console.log('Your browser does not support SharedWorkers.');
    }
}


export { connectWebSocket }