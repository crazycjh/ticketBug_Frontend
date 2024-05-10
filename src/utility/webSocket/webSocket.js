import { ref } from 'vue';
import cookies from 'js-cookie';
import {useNotifyStore} from '../../stores/notification'
const wsStatus = ref('Disconnected');
let port;
let notifyStore;

function callNotifyStore() {
    notifyStore = useNotifyStore();
}


function connectWebSocket() {
    if ('SharedWorker' in window) {
        // worker = new SharedWorker('../utility/webSocketSharedWorker.js');
        // 假设你有一个 Web Worker 或 SharedWorker 脚本位于相对路径
        const worker = new SharedWorker(new URL('../webSocketSharedWorker.js', import.meta.url), { type: 'module' });

        port = worker.port;
        worker.port.onmessage = (event) => {

            if (event.data.message.type === 'NEW') {
                notifyStore.increaseNotifyCount(event.data.message.message);
                console.log('新的推播 ', event.data.message); 
            } else if (event.data.message.type === 'MESSAGE') {
                console.log('Message from WebSocket:', event.data.message);
            }else {
                console.log('else');
            }
        };


        const eMail = cookies.get('email');
        port.postMessage({type: 'websocket', email: eMail});
    } else {
        console.log('Your browser does not support SharedWorkers.');
    }
}


export { connectWebSocket, callNotifyStore }