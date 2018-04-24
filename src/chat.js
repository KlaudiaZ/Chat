import $ from 'jquery';

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