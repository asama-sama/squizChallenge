import { Downloader } from "../floods/Downloader";
import { parseXml } from "./parser";

export class FloodWarningParser {
  // fix: change any to a type
  // fix: rather than parsing the xml in each statement, we could parse it once in the constructor
  // and reuse this
  constructor(private xmlString: any) {}

  async getWarning() {
    // fix: change any to a type
    // fix: use reject to handle the error from parseXml
    const obj: any = await new Promise((resolve, reject) => {
      parseXml(this.xmlString, (data) => {
        resolve(data);
      });
    });

    // fix: change productType to const and output the result from the switch into a new variable
    let productType = (obj.amoc["product-type"] || [])[0];

    // possible fix: probably breaks were intended here? 
    switch (productType) {
      case "A":
        productType = "Advice";
      case "B":
        productType = "Bundle";
      case "C":
        productType = "Climate";
      case "D":
        productType = "Metadata";
      case "E":
        productType = "Analysis";
      case "F":
        productType = "Forecast";
      case "M":
        productType = "Numerical Weather Prediction";
      case "O":
        productType = "Observation";
      case "Q":
        productType = "Reference";
      case "R":
        productType = "Radar";
      case "S":
        productType = "Special";
      case "T":
        productType = "Satellite";
      case "W":
        productType = "Warning";
      case "X":
        productType = "Mixed";
    }

    // fix: same as above, use const and a different variable for the result of the switch
    let service = (obj.amoc["service"] || [])[0];

    switch (service) {
      case "COM":
        service = "Commercial Services";
        break;
      case "HFW":
        service = "Flood Warning Service";
        break;
      case "TWS":
        service = "Tsunami Warning Services";
        break;
      case "WAP":
        service = "Analysis and Prediction";
        break;
      case "WSA":
        service = "Aviation Weather Services";
        break;
      case "WSD":
        service = "Defence Weather Services";
        break;
      case "WSF":
        service = "Fire Weather Services";
        break;
      case "WSM":
        service = "Marine Weather Services";
        break;
      case "WSP":
        service = "Public Weather Services";
        break;
      case "WSS":
        service = "Cost Recovery Services";
        break;
      case "WSW":
        service = "Disaster Mitigation";
        break;
    }

    return {
      productType,
      service,
      start: await this.getIssueTime(),
      expiry: await this.getEndTime(),
    };
  }
  async getIssueTime() {
    // fix: duplicate code
    const obj: any = await new Promise((resolve, reject) => {
      parseXml(this.xmlString, (data) => {
        resolve(data);
      });
    });

    // fix: use const
    let issuetime = (obj.amoc["issue-time-utc"] || [])[0];

    return issuetime;
  }

  async getEndTime() {
    // fix: duplicate code
    const obj: any = await new Promise((resolve, reject) => {
      parseXml(this.xmlString, (data) => {
        resolve(data);
      });
    });

    let issuetime = (obj.amoc["expiry-time"] || [])[0];

    return issuetime;
  }

  // fix: unused code
  async getWarningText(): Promise<string> {
    const obj: any = await new Promise((resolve, reject) => {
      parseXml(this.xmlString, (data) => {
        resolve(data);
      });
    });
    const downloader = new Downloader();

    // fix: possible 'cannot read property of undefined' error here
    const warningText = await downloader.downloadText(obj.amoc.identifier[0]);

    return warningText;
  }
}
