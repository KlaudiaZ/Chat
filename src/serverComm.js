import $ from 'jquery';
import config from './config';

export const bindEnterChatButton = () => {
    $('#enter-chat').click((e) => {
        validateUsername();
    })
}

const validateUsername = () => {
    ($('#username').val().trim() === "") ?
    alert("User field cannot be empty!"):
        authenticate($('#username').val());
}

const authenticate = (login) => {
    $.post(config.url.chatLogin, {
            alias: login
        })
        .then((response) => {
            sessionStorage.token = response.data.token;
        })
        .catch((error) => {
            alert("There was a problem with logging in:" + error);
        });
}