import { processChat } from './parse/zoom-chat-parser.js';
import JsonExporter from './export/json-exporter.js';
import CsvExporter from './export/csv-exporter.js';

export const OUTPUT_CONTENT_TYPES = ['csv', 'json'];

export function run(chatProcessorOptions) {
    if (OUTPUT_CONTENT_TYPES.indexOf(chatProcessorOptions.outputContentType.toLowerCase()) == -1) {
        throw new Error(`Output content type: [${chatProcessorOptions.outputContentType}] not supported. Please provide
        one of the following: ${OUTPUT_CONTENT_TYPES}`)
    }

    processChat(chatProcessorOptions.input)
        .then(chats => {
            let exporter = getExporter(chatProcessorOptions);
            exporter.write(chats);
        })
        .catch(console.error)
}

function getExporter(chatProcessorOptions) {
    switch (chatProcessorOptions.outputContentType) {
        case 'csv':
            return new CsvExporter(chatProcessorOptions.group, chatProcessorOptions.outputFile, chatProcessorOptions.delimiter);
            break;
        case 'json':
            return new JsonExporter(chatProcessorOptions.group, chatProcessorOptions.outputFile)
            break;
        default:
            throw new Error(`Output content type: [${chatProcessorOptions.outputContentType}] not supported. Please provide
        one of the following: ${OUTPUT_CONTENT_TYPES}`)
    }
}

export class ChatProcessorOptions {
    constructor(input, outputFile, group, outputContentType) {
        this.input = input;
        this.outputFile = outputFile;
        this.group = group;
        this.outputContentType = outputContentType;
    }
}
