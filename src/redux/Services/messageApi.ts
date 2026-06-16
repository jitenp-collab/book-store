import { io } from "socket.io-client";


//  https://latin-edition-retired-fired.trycloudflare.com
// https://2f93-59-144-96-161.ngrok-free.app


export const socket = io(
    'https://latin-edition-retired-fired.trycloudflare.com',
    {
        transports: ['websocket'],
        autoConnect: true,
    },
);