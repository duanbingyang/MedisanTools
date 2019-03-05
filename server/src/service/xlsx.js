const xlsx  = require('node-xlsx');
// // Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
// // Parse a file
// const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);


class XlsxController {

    async xlsxToObj(file) {
       
        const obj = xlsx.parse(file)

        return obj;
    }

}

module.exports = new XlsxController();