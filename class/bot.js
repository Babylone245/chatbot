import { Utils } from '../utils/utils.js';

export class Bot {
    constructor(name, iconPath) {
        this.name = name;
        this.iconPath = iconPath;
    }

    sendMessage(message) {
        const messageElement = Utils.createMessageElement(message, 'bot-message', this.iconPath);
        document.getElementById('chat-box').appendChild(messageElement);
        Utils.saveMessage(message, 'bot-message', this.iconPath);
    }
}