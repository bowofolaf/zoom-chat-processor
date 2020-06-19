import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import Chat from '../models/chat.js';

const ENCODING = 'utf8';
const CHAT_BEGINNING_REGEX = () => /[\d]{2}:[\d]{2}:[\d]{2}\s+From\s([^:]+)\s:\s(.+)/
const PRIVATE_CHAT_REGEX = () => /[\d]{2}:[\d]{2}:[\d]{2}\s+From\s.+\sTo\s.+\(privately\)\s:\s.+/

export async function processChat(filePath) {
    let fileStream = createReadStream(filePath, ENCODING);
    let readInterface = createInterface(fileStream);

    let chats = [];
    var chat = null;
    var privateMessage = false;
    for await (let line of readInterface) {
        //TODO: parse chat to sender and body
        if (PRIVATE_CHAT_REGEX().test(line)) {
            // console.log(line);
            privateMessage = true;
            continue;
        } else if (CHAT_BEGINNING_REGEX().test(line)) {
            privateMessage = false;
            if (chat != null) {
                chats.push(chat); // push previous chat then overwrite
            }

            let matches = line.match(CHAT_BEGINNING_REGEX());
            chat = new Chat(matches[1], matches[2]);
        } else if (!privateMessage) {
            chat.appendLine(line);
        }
    }
    chats.push(chat);

    return chats;

}