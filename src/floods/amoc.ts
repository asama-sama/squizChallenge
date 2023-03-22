import { Downloader } from './Downloader';

type Warnings = {
  [key: string]: boolean
}

// This function connects to the BOM api and returns all warnings, 
// ie all filenames in the format <id>.amoc.xml
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
    console.error(err); 
  }

  client.close(); 
  return warns;
}

// gets an individual warning from the BOM api by given id
export function getWarning(id: string) {
  throw new Error("getWarning not implemented")
}
