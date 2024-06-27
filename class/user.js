import { Utils } from '../utils/utils.js';

export class User {
    constructor(name, iconPath) {
        this.name = name;
        this.iconPath = iconPath;
    }

    sendMessage(message) {
        const messageElement = Utils.createMessageElement(message, 'user-message', this.iconPath);
        document.getElementById('chat-box').appendChild(messageElement);
        Utils.saveMessage(message, 'user-message', this.iconPath);
    }
}