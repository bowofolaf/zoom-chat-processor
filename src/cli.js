#!/usr/bin/env node
import yargs from 'yargs';
import { run, OUTPUT_CONTENT_TYPES, ChatProcessorOptions } from './app.js'

const DEFAULT_OUTPUT_CONTENT_TYPE = 'csv';

const builder = (yargs) => {
    yargs
        .option('input', {
            type: 'string',
            alias: 'i',
            describe: 'absolute path to zoom chat file or directory containing files'
        })
        .option('output', {
            type: 'string',
            alias: 'o',
            describe: 'path to desired output file'
        })
        .option('group', {
            type: 'boolean',
            describe: 'flag specifying whether to group messages by author',
            default: false
        })
        .option('output-content-type', {
            type: 'string',
            describe: 'content type for the output file.',
            default: 'json',
            choices: OUTPUT_CONTENT_TYPES
        })
};

yargs
    .usage('Usage $0 <command> [options]')
    .command(['convert [input] [output] [group] [output-content-type]', '$0'],
        'Parses a zoom chat file and exports in a given format', builder, (argv) => {
            let chatProcessorOptions = new ChatProcessorOptions(
                argv.input, argv.output, argv.group, argv.outputContentType
            )
            run(chatProcessorOptions)
        })
    .demandOption(['i', 'o'])
    .example('convert -i /path/to/chat.txt -o /path/to/export', 'converts the file /path/to/chat.txt to a json array of author, timestamp and message')
    .alias('v', 'version')
    .normalize('input')
    .normalize('output')
    .help('h')
    .argv