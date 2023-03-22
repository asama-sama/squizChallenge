// http://www.bom.gov.au/schema/v1.7/amoc.xsd
import {parseString} from "xml2js"

export async function parseXml(xml: string) {
  const parsedXml: Object = await new Promise((resolve, reject) => {
    parseString(xml, function (err, result: Object) {
      if (err) {
        reject(err)
      }
      resolve(result);
    });
  })
  return parsedXml
}
