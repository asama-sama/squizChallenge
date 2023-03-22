import { downloadTo } from "basic-ftp/dist/transfer";
import express from "express";
import { getWarnings } from "./floods/amoc";
import { Downloader } from "./floods/Downloader";
import { getAmocToStateId } from "./getAmocToStateId";
import { FloodWarningParser } from "./parser/floodWarning";
import { parseXml } from "./parser/parser";

require("./logger.ts");

const app = express();
const port = 3000; // fix: would set this as an env var

const ERRORMESSAGE = "Something went wrong";  // fix: generic message. Would also keep constants in another location

// fix: document the api parameters and responses
// fix: type the request and response objects
app.get("/", async (req, res) => {
  try {
    const data = await getWarnings();

    const state = getAmocToStateId(req.query.state?.toString() || "");  // fix: as getAmocToStateId only expects a single string (not some string array parsed as a string)
    // calling .toString here is inappropriate. We should check that req.query is of type string and throw
    // an error if not, as it would be an invalid argument otherwise
    // otherwise, we need to refactor getAmotToStateId to parse string arrays

    let results = [];
    for (let key in data) {
      if (key.startsWith(state)) {
        results.push(key.replace(/\.amoc\.xml/, ""));
      }
    }

    res.send(results); 
  } catch (error) {
    console.log(error); // fix: use console.error
    res.send(ERRORMESSAGE); // fix: send error status
                            // fix: send specific error message
  }
});

// fix: describe request parameters and responses for this route
// fix: type request and response objects
app.get("/warning/:id", async (req, res) => {
  try {
    const downloader = new Downloader();
    const xmlid = req.params.id;

    const warning = await downloader.download(xmlid);
    const warningParser = new FloodWarningParser(warning);
    const text = await downloader.downloadText(xmlid);

    res.send({ ...(await warningParser.getWarning()), text: text || "" });
  } catch (error) {
    console.log(error);     // fix: use console.error
    res.send(ERRORMESSAGE); // fix: use a more specific error message
                            // fix: send an http error status
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
