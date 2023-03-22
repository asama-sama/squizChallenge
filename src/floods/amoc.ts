import { Downloader } from './Downloader';

type Warnings = {
  [key: string]: boolean
}

// fix: document the intention of this function
export async function getWarnings() {
  const downloader = new Downloader()
  const client = await downloader.getClient();
  let warns: Warnings = {}; 
  try {
    const files = await client.list();

    for (const file in files) { 
      if (files[file].name.endsWith(".amoc.xml")) {
        warns[files[file].name] = true;
      }
    }

  } catch (err) {
    console.error(err); // fix: should return this error rather than catching it so that handler can return the error
  }

  client.close(); // fix: wont be reached in error
  return warns;
}

// fix: this should throw an error to show that this is not implemented
export function getWarning(id: string) {
  throw new Error("getWarning not implemented")
}
