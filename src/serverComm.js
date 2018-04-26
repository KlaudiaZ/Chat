import $ from 'jquery';
import Navigo from 'navigo';
import config from './config';
import axios from 'axios';
import { router } from './routing';
import { showMessages } from './chat';

export const validateUsername = () => {
    if ($('#username').val().trim() === "") {
        alert("User field cannot be empty!")
    } else {
        authenticate($('#username').val());
        router.navigate('/chat');
        getMessagesFromServer();
    }
}

const authenticate = (login) => {
    // $.post(config.url.chatLogin, {
    //         alias: login
    //     })
    //     .then((response) => {
    //         sessionStorage.token = response.token;
    //     })
    //     .catch((error) => {
    //         alert("There was a problem with logging in:" + error);
    //     });

    axios.post(config.url.chatLogin, {
            alias: login
        })
        .then((response) => {
            sessionStorage.token = response.data.token;
        })
        .catch((error) => {
            alert("There was a problem with logging in: " + error);
        });
}

export const getMessagesFromServer = () => {
    $.ajax({
            type: "GET",
            url: config.url.getMessages,
            dataType: "json",
            headers: {
                Authorization: "Bearer " + sessionStorage.token
            }
        }).then((results) => {
            sessionStorage.messages = JSON.stringify(results);
            showMessages(sessionStorage.messages);
        })
        .catch((error) => {
            alert(error);
        });
}

export const sendMessageToServer = (message) => {
    // $.ajax({
    //     type: "POST",
    //     url: config.url.sendMessage,
    //     data: { message: message },
    //     dataType: "json",
    //     headers: {
    //         Authorization: "Bearer " + sessionStorage.token
    //     }
    // }).then(() => {
    //     console.log('message sent!');
    // }).catch((error) => {
    //     alert(error);
    // })

    axios.post(config.url.sendMessage, { message: message }, {
        headers: {
            Authorization: "Bearer " + sessionStorage.token
        }
    }).then(() => {
        console.log('message sent!');
    }).catch((error) => {
        alert(error);
    });
}

export const refreshMessages = () => {
    setInterval(getMessagesFromServer, 5000);
}

export const sendDeleteRequest = (id) => {
    axios.delete(config.url.deleteMessage + id, {
        headers: {
            Authorization: "Bearer " + sessionStorage.token
        }
    }).then(() => {
        console.log('message deleted!');
    }).catch((error) => {
        alert(error);
    });
}