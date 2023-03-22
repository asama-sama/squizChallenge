import { Client } from "basic-ftp";

// fix: document the intention of this function
export async function getWarnings() {
  // fix: most of this code is the same as in Downloader. refactor to use Downloader
  const client = new Client();
  client.ftp.verbose = true;  // fix: add parameter to switch this off. for example, we don't want this on during tests or production
  try {
    await client.access({
      host: "ftp.bom.gov.au",
      secure: false,
    });

    await client.cd("/anon/gen/fwo/");

    const files = await client.list();

    let warns: any = {};  // fix: this should be a type rather than 'any'
    for (var file in files) { // fix: use 'let' rather than 'var'
      if (files[file].name.endsWith(".amoc.xml")) {
        warns[files[file].name] = true;
      }
    }

    return warns;
  } catch (err) {
    console.log(err); // fix: should return this error rather than catching it so that handler can return the error
                      // fix: prefer console.error rather than console.log
  }

  client.close(); // this is after the return statement, meaning it wont close
}

// fix: this should throw an error to show that this is not implemented
export function getWarning(id: string) {
  //
}
