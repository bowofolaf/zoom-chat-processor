export default class Chat {

    constructor(author, message) {
        this.author = author;
        this.message = message;
    }

    appendLine(line) {
        this.message = this.message + '\n' + line;
    }
}