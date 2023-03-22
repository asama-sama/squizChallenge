import { Downloader } from "../floods/Downloader";
import { parseXml } from "./parser";
import {ParsedWarning} from '../types/bom'

export type Warning = {
  productType: string | undefined,
  service: string | undefined,
  start: string | undefined,
  expiry: string | undefined
}

export class FloodWarningParser {
  private parsedXml: ParsedWarning | null = null 

  constructor(private xmlString: string | undefined) { }
  
  async parse() {
    if (this.xmlString){
      this.parsedXml = await parseXml(this.xmlString) as ParsedWarning;
    }
  }

  async getParsedXml() {
    if (!this.parsedXml) {
      await this.parse()
    }
    return this.parsedXml
  }

  async getWarning(): Promise<Warning> {
    const obj = await this.getParsedXml()

    if (!obj || !obj.amoc) return {
      productType: undefined,
      service: undefined,
      start: undefined,
      expiry: undefined
    }
    const productTypeCode = (obj.amoc["product-type"] || [])[0];
    let productType
    switch (productTypeCode) {
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

    const serviceCode = (obj.amoc["service"] || [])[0];
    let service
    switch (serviceCode) {
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
    const obj = await this.getParsedXml()
    return (obj?.amoc["issue-time-utc"] || [])[0];;
  }

  async getEndTime() {
    const obj = await this.getParsedXml()
    return  (obj?.amoc["expiry-time"] || [])[0];
  }

  async getWarningText(): Promise<string | undefined> {
    const obj = await this.getParsedXml()
    const downloader = new Downloader();

    if (!obj || !obj.amoc) return ""

    const warningText = await downloader.downloadText(obj.amoc.identifier[0]);
    return warningText;
  }
}
