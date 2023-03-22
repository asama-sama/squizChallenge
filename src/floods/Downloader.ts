import { Client } from "basic-ftp";

import fs from "fs";

export class Downloader {
  async download(key: string) {
    const client = new Client();
    client.ftp.verbose = true;
    try {
      await client.access({
        host: "ftp.bom.gov.au",
        secure: false,
      });

      await client.cd("/anon/gen/fwo/");

      const files = await client.list();

      for (var file in files) {
        if (files[file].name.endsWith(".amoc.xml")) { // fix: this if statement is redundant with the one below
          if (`${key}.amoc.xml` == files[file].name) {
            await client.download(`./${key}.xml`, files[file].name);length  // fix: .download is deprecated in favour of .downloadTo
          }
        }
      }
      client.close();

      const data = this.readData(key);

      return data;
    } catch (err) {
      console.log(key + " file not found");   // fix: use console.error
      return "";  // fix: throw error rather than returning empty string
    }

    client.close(); // fix: unreachable code. this would be better in a finally statement and removed above
  }

  readData(key: string): string {
    return fs.readFileSync(`./${key}.xml`, { encoding: "utf-8" });
  }

  async downloadText(key: string) {
    // fix: this code is the same as the other code for connections. refactor it all to use the same code
    const client = new Client();
    client.ftp.verbose = true;
    let warningText = "";
    try {
      await client.access({
        host: "ftp.bom.gov.au",
        secure: false,
      });

      await client.cd("/anon/gen/fwo/");

      await client.download(`./${key}.txt`, key + ".txt");

      warningText = fs.readFileSync(`./${key}.txt`, {
        encoding: "utf-8",
      });
    } catch (err) { // fix: return error rather than catch
      console.log(key + " file not found"); // fix: use console.error
      return "";
    }

    client.close();

    return warningText;
  }
}
