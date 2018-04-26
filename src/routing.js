import Navigo from 'navigo';
import { showLoginWindow, showChatWindow } from './chat';

export const router = new Navigo();

export const initRouting = () => {
    router
        .on({
            'chat': (params) => {
                console.log('chat window');
                showChatWindow();
            },
            '*': (params) => {
                console.log('chat login');
                showLoginWindow();
            }
        })
        .resolve();
}