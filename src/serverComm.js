import $ from 'jquery';
import Navigo from 'navigo';
import config from './config';
import axios from 'axios';
import { router } from './routing';

export const bindEnterChatButton = () => {
    $('#enter-chat').click((e) => {
        validateUsername();
    })
}

const validateUsername = () => {
    if ($('#username').val().trim() === "") {
        alert("User field cannot be empty!")
    } else {
        authenticate($('#username').val());
        router.navigate('/chat');
        getMessagesFromServer();
    }
}

const authenticate = (login) => {
    $.post(config.url.chatLogin, {
            alias: login
        })
        .then((response) => {
            sessionStorage.token = response.token;
        })
        .catch((error) => {
            alert("There was a problem with logging in:" + error);
        });
}

const getMessagesFromServer = () => {
    $.ajax({
            type: "GET",
            url: config.url.getMessages,
            dataType: "json",
            headers: {
                Authorization: "Bearer " + sessionStorage.token
            }
        }).then((results) => {
            console.log(results);
        })
        .catch((error) => {
            alert(error);
        });
}