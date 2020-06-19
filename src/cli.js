#!/usr/bin/env node
import yargs from 'yargs';
import { run } from './app.js'

const builder = (yargs) => {
    yargs
        .positional('input', {
            describe: 'absolute path to zoom chat file'
        })
        .positional('output', {
            describe: 'path to desired output file'
        })
        .option('group', {
            describe: 'flag specifying whether to group messages by author',
            default: false
        })
};

yargs
    .usage('Usage $0 <command> [options]')
    .command(['convert <input> <output> [group]', '$0'],
        'Parses a zoom chat file and exports in a given format', builder, (argv) => {
            run(argv.input, argv.group, argv.output)
        })
    .example('convert -f /path/to/chat.txt', 'converts the file /path/to/chat.txt to a csv of author and message')
    .help('h')
    .alias('v', 'version')
    .alias('f', 'file')
    .demandCommand()
    .argv