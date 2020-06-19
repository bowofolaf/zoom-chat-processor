import { processChat } from './parse/zoom-chat-parser.js'
import JsonExporter from './export/json-exporter.js'

export function run(inputFile, group, outputFile) {
    processChat(inputFile).then(chats => {
        let exporter = new JsonExporter(group, outputFile);
        exporter.write(chats);
    });
    
}
