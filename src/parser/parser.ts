// http://www.bom.gov.au/schema/v1.7/amoc.xsd
var parseString = require("xml2js").parseString;

// fix: type the result object
export function parseXml(xml: string, callback: (result: any) => void) {
  // fix: handle the error and also type it
  parseString(xml, function (err: any, result: any) {
    callback(result);
  });
}
