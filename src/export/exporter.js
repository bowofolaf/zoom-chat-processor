export default class Exporter {
    ENCODING = 'utf8';

    constructor(shouldGroup, outputLocation) {
        this.shouldGroup = shouldGroup;
        this.outputLocation = outputLocation;
    }

    write(chats) {
        throw new Error('Implement this method!');
    }
}