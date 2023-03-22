import { Client } from "basic-ftp";

import fs from "fs";
import { HttpError } from '../HttpError';

export class Downloader {

  async getClient() {
    const client = new Client();
    if (process.env.NODE_ENV !== 'production' && process.env.NODE !== 'test') {
      client.ftp.verbose = true;
    }
    try {
      await client.access({
        host: "ftp.bom.gov.au",
        secure: false,
      });

      await client.cd("/anon/gen/fwo/");
      return client
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        throw new HttpError(e.message, 500)
      }
      throw e // here because typescript does not recognise the above will always occur
    }
  }

  async download(key: string) {
    let data
    const client = await this.getClient()
    try {
      const files = await client.list();

      for (const file in files) {
          if (`${key}.amoc.xml` == files[file].name) {
            await client.downloadTo(`./${key}.xml`, files[file].name); 
        }
      }
      client.close();

      data = this.readData(key);

    } catch (err) {
      if (err instanceof Error) {
        console.error(`key = ${key} ${err.message}`);  
      }
    } 
    client.close(); 

    return data;
  }

  readData(key: string): string {
    return fs.readFileSync(`./${key}.xml`, { encoding: "utf-8" });
  }

  async downloadText(key: string) {
    const client = await this.getClient()
    let warningText = "";
    try {

      await client.downloadTo(`./${key}.txt`, key + ".txt");  

      warningText = fs.readFileSync(`./${key}.txt`, {
        encoding: "utf-8",
      });
    } catch (err) { 
      if (err instanceof Error) {
        console.error(key + " " + err.message); 
      }
    }

    client.close();

    return warningText;
  }
}
