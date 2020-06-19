import Exporter from './exporter.js'

export default class CsvExporter extends Exporter {
    write() {
        throw new Error('CSV export not supported yet');
    }
}