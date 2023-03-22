import express, {  Response } from "express";
import { getWarnings } from "./floods/amoc";
import { Downloader } from "./floods/Downloader";
import { getAmocToStateId } from "./getAmocToStateId";
import { HttpError } from './HttpError';
import { errorHandler } from './middleware/errorHandler';
import { FloodWarningParser, Warning } from "./parser/floodWarning";
import { TypedRequesetParams, TypedRequestQuery } from './types/expressTypes';

require("./logger.ts");

const app = express();
const port = 3000; // fix: would set this as an env var

type GetWarningsRequest = TypedRequestQuery<{ state: string }>
type GetWarningsResponse = Response <string[]>

app.get("/", async (req: GetWarningsRequest, res: GetWarningsResponse, next) => {
  try {
    if (typeof req.query.state !== 'string') throw new HttpError('state must be a string', 400)
    const state = getAmocToStateId(req.query.state);  

    const data = await getWarnings();

    let results: string[] = [];
    for (let key in data) {
      if (key.startsWith(state)) {
        results.push(key.replace(/\.amoc\.xml/, ""));
      }
    }

    res.send(results); 
  } catch (error) {
    console.error(error); 
    return next(error)
  }
});

type GetWarningRequest = TypedRequesetParams<{ id: string }>
type GetWarningResponse = Response< Warning & {text: string}>

app.get("/warning/:id", async (req: GetWarningRequest, res: GetWarningResponse, next) => {
  try {
    const downloader = new Downloader();
    const xmlid = req.params.id;

    const warning = await downloader.download(xmlid);
    let warningParser = new FloodWarningParser(warning);
    const text = await downloader.downloadText(xmlid);

    res.send({ ...(await warningParser.getWarning()), text: text || "" });
  } catch (error) {
    console.error(error);     
    return next(error)
  }
});

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
