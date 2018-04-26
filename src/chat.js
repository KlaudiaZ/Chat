import $ from 'jquery';
import { validateUsername, sendMessageToServer, getMessagesFromServer, sendDeleteRequest } from './serverComm';

export const showLoginWindow = () => {
    $('.main').html(`
    <p id="start-info">LAiT Chat</p>
    <div class="login">
        <div class="form">
            <p>Username</p>
            <input class="input" type="text" id="username" placeholder="Username">
            <br>
            <button class="button" id="enter-chat">Enter Chat</button>
        </div>
    </div>`)
}

export const showChatWindow = () => {
    $('.main').html(`
    <p id="start-info">LAiT Chat</p>
    <div class="chat-window">
        <div class="messages" id="messages">
        </div>
        <div class="new-message">
            <input class="input" type="text" id="new-message" placeholder="New message">
            <button class="button" id="add-message">Add</button>
        </div>
    </div>`)
}

export const showMessages = (messages) => {
    $('#messages').html("");
    JSON.parse(messages).forEach((message) => {
        $('#messages').append($(`<p class="message" data-owner="${message.owner}" id="${message.id}">${message.author}: ${message.message} </p>`));
    });
    $('#messages').scrollTop(0);
    showDeleteButtonNearOwnedMessages();
}

export const bindEnterChatButton = () => {
    $('#enter-chat').click((e) => {
        validateUsername();
    })
}

export const bindAddMessageButton = () => {
    $('#add-message').click((e) => {
        sendMessageToServer($('#new-message').val());
        $('#new-message').val("");
        getMessagesFromServer();
    });
}

const showDeleteButtonNearOwnedMessages = () => {
    $('[data-owner="true"').append($('<img src="/img/delete.png" class="delete" width=20px height=20px>'));
    //.each((message) => {
    //     message.
    //     //message.append($('<img src="/img/delete.png">'));
    // });
    bindDeleteButton();
}

const bindDeleteButton = () => {
    $('.delete').click((e) => {
        sendDeleteRequest(e.target.parentElement.id);
        getMessagesFromServer();
    });
}