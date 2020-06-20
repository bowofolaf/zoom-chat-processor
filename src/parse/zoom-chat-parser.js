import { createReadStream, lstat } from 'fs';
import { createInterface } from 'readline';
import { promisify } from 'util';
import glob from 'glob';
import Chat from '../models/chat.js';

const ENCODING = 'utf8';
const EXTENSION_GLOB = '**/*.txt'

const CHAT_BEGINNING_REGEX = () => /([\d]{2}:[\d]{2}:[\d]{2})\s+From\s([^:]+)\s:\s(.+)/
const PRIVATE_CHAT_REGEX = () => /[\d]{2}:[\d]{2}:[\d]{2}\s+From\s.+\sTo\s.+\(privately\)\s:\s.+/

const lstatAsync = promisify(lstat);

async function processChat(path) {
    let fileStream = createReadStream(path, ENCODING);
    let readInterface = createInterface(fileStream);

    let chats = [];
    var chat = null;
    var privateMessage = false;
    
    for await (let line of readInterface) {
        if (PRIVATE_CHAT_REGEX().test(line)) {
            privateMessage = true;
            continue;
        } else if (CHAT_BEGINNING_REGEX().test(line)) {
            privateMessage = false;
            if (chat !== null) {
                chats.push(chat); // push previous chat then overwrite
            }

            let matches = line.match(CHAT_BEGINNING_REGEX());
            chat = new Chat(matches[1], matches[2], matches[3]);
        } else if (!privateMessage) {
            chat.appendLine(line);
        }
    }

    if (chat !== null) {
        chats.push(chat);
    }

    return chats;
}

export async function processChats(path) {
    let pathStat = await lstatAsync(path);

    let filePaths = pathStat.isDirectory() 
    ? await promisify(glob)(path + EXTENSION_GLOB, {})
    : [path]

    console.log(`Found files to convert: ${filePaths}`);

    return Promise.all(filePaths.map(processChat))
        .then(nestedList => nestedList.flat());
}