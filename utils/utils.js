export class Utils {
    static getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    static createMessageElement(message, messageType, iconPath) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `
            <div class="avatar">
                <img src="${iconPath}" />
            </div>
            <div>
                <div class="text">${message}</div>
                <div class="time">${this.getCurrentTime()}</div>
            </div>`;
        messageElement.classList.add(messageType);
        Utils.scrollToBottom();
        return messageElement;
    }

    static saveMessage(message, messageType, iconPath) {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push({ message, messageType, iconPath });
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    static loadMessages() {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        return messages;
    }

    static scrollToBottom() {
        const chatBox = document.querySelector('.chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
