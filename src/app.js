import { processChats } from './parse/zoom-chat-parser.js';
import JsonExporter from './export/json-exporter.js';
import CsvExporter from './export/csv-exporter.js';

export const OUTPUT_CONTENT_TYPES = ['csv', 'json'];
const EXPORTER_MAP = {
    csv: (chatProcessorOptions) => new CsvExporter(chatProcessorOptions.group, chatProcessorOptions.outputFile, chatProcessorOptions.delimiter),
    json: (chatProcessorOptions) => new JsonExporter(chatProcessorOptions.group, chatProcessorOptions.outputFile)
}

export function run(chatProcessorOptions) {
    if (OUTPUT_CONTENT_TYPES.indexOf(chatProcessorOptions.outputContentType.toLowerCase()) == -1) {
        throw new Error(`Output content type: [${chatProcessorOptions.outputContentType}] not supported. Please provide
        one of the following: ${OUTPUT_CONTENT_TYPES}`)
    }

    processChats(chatProcessorOptions.input)
        .then(chats => {
            let exporter = getExporter(chatProcessorOptions);
            exporter.write(chats);
        })
        .catch(console.error)
}

function getExporter(chatProcessorOptions) {
    let exporterFactory = EXPORTER_MAP[chatProcessorOptions.outputContentType];

    if (!exporterFactory) {
        throw new Error(`Output content type: [${chatProcessorOptions.outputContentType}] not supported. Please provide
        one of the following: ${OUTPUT_CONTENT_TYPES}`)
    }

    return exporterFactory(chatProcessorOptions);
}

export class ChatProcessorOptions {
    constructor(input, outputFile, group, outputContentType) {
        this.input = input;
        this.outputFile = outputFile;
        this.group = group;
        this.outputContentType = outputContentType;
    }
}
