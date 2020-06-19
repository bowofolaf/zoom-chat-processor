import { writeFileSync } from 'fs';
import groupChatsByAuthor from '../utils/group-chats.js'
import Exporter from './exporter.js'

export default class JsonExporter extends Exporter {

    write(chats) {
        let output = this.shouldGroup ? groupChatsByAuthor(chats) : chats
        let raw = JSON.stringify(output);

        writeFileSync(this.outputLocation, raw, { encoding: this.ENCODING });
        console.log(`Chats have been written in JSON format to ${this.outputLocation}`)
    }
}