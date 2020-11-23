import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

let stompClient = null;
const handlers = [];

export function connect() {
    const socket = new SockJS('http://localhost:8081/vui-app-websocket');
    stompClient = Stomp.over(socket);
    stompClient.debug= () => {};
    stompClient.connect({}, frame => {
        stompClient.subscribe("/user/" + "user_123" + "/queue/actions", message => {
           handlers.forEach(handler => handler(JSON.parse(message.body)));
        });
    });
}

export function addHandler(handler) {
    handlers.push(handler);
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

export function sendMessage(result) {
    stompClient.send("/app/result", {}, JSON.stringify(result));
}