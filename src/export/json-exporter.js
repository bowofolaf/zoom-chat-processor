import { writeFileSync } from 'fs';
import groupChatsByAuthor from '../utils/group-chats.js'

const ENCODING = 'utf8';

export default class JsonExporter {
    constructor(shouldGroup, outputLocation) {
        this.shouldGroup = shouldGroup;
        this.outputLocation = outputLocation;
    }

    write(chats) {
        let output = this.shouldGroup ? groupChatsByAuthor(chats) : chats
        let raw = JSON.stringify(output);

        writeFileSync(this.outputLocation, raw, { encoding: ENCODING });
        console.log(`Chats have been written in JSON format to ${this.outputLocation}`)
    }
}