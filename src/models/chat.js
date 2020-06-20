export default class Chat {

    constructor(timestamp, author, message) {
        this.timestamp = timestamp;
        this.author = author;
        this.message = message;
    }

    appendLine(line) {
        this.message = this.message + '\n' + line;
    }
}