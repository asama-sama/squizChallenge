import { Downloader } from "../floods/Downloader";
import { parseXml } from "./parser";

// todo: these should all be typed
export type Warning = {
  productType: any,
  service: any,
  start: any,
  expiry: any
}

export class FloodWarningParser {
  private parsedXml: Object | null = null 

  // fix: change any to a type
  constructor(private xmlString: string | undefined) { }
  
  async parse() {
    if (this.xmlString){
      this.parsedXml = await parseXml(this.xmlString);
    }
  }

  async getParsedXml() {
    if (!this.parsedXml) {
      await this.parse()
    }
    return this.parsedXml
  }

  async getWarning(): Promise<Warning> {
    // fix: change any to a type
    const obj: any = await this.getParsedXml()

    // fix: change productType to const and output the result from the switch into a new variable
    // fix: possibly undefined
    if (!obj || !obj.amoc) return {
      productType: null,
      service: null,
      start: null,
      expiry: null
    }
    let productType = (obj.amoc["product-type"] || [])[0];
    // fix: need breaks
    switch (productType) {
      case "A":
        productType = "Advice";
        break;
      case "B":
        productType = "Bundle";
        break;
      case "C":
        productType = "Climate";
        break;
      case "D":
        productType = "Metadata";
        break;
      case "E":
        productType = "Analysis";
        break;
      case "F":
        productType = "Forecast";
        break;
      case "M":
        productType = "Numerical Weather Prediction";
        break;
      case "O":
        productType = "Observation";
        break;
      case "Q":
        productType = "Reference";
        break;
      case "R":
        productType = "Radar";
        break;
      case "S":
        productType = "Special";
        break;
      case "T":
        productType = "Satellite";
        break;
      case "W":
        productType = "Warning";
        break;
      case "X":
        productType = "Mixed";
        break;
    }
    console.log(productType)

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
    const obj: any = await this.getParsedXml()

    // fix: use const
    let issuetime = (obj.amoc["issue-time-utc"] || [])[0];

    return issuetime;
  }

  async getEndTime() {
    const obj: any = await this.getParsedXml()

    let issuetime = (obj.amoc["expiry-time"] || [])[0];

    return issuetime;
  }

  // fix: unused code
  async getWarningText(): Promise<string> {
    const obj: any = await this.getParsedXml()
    const downloader = new Downloader();

    // fix: possible 'cannot read property of undefined' error here
    const warningText = await downloader.downloadText(obj.amoc.identifier[0]);

    return warningText;
  }
}
