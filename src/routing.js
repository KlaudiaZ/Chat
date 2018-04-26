import Navigo from 'navigo';
import { showLoginWindow, showChatWindow } from './chat';
import { getMessagesFromServer } from './serverComm';

export const router = new Navigo();

export const initRouting = () => {
    router
        .on({
            'chat': (params) => {
                showChatWindow();
                getMessagesFromServer();
            },
            '*': (params) => {
                showLoginWindow();
            }
        })
        .resolve();
}