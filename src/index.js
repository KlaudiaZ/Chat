import './css/index.css';
import './css/other.css';
import axios from 'axios';
import $ from 'jquery';
import { initRouting } from './routing';
import { bindEnterChatButton } from './serverComm'
console.log('JavaScript was attached to the page!');

$(() => {
    console.log('content loaded');
    initRouting();
    bindEnterChatButton();
});