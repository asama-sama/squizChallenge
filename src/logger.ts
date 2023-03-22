import { createWriteStream, mkdir} from "fs";

const LOG_DIR = process.cwd() + "/logs"

if (process.env.NODE_ENV == "production") {
  let stdLogger = console.log;
  let stdError = console.error;

  // fix: rotate logs
  mkdir(LOG_DIR, err => {
    if (err && err.code !== 'EEXIST') {
      console.error('error creating logs directory', err)
      return
    }
    const logFile = createWriteStream(LOG_DIR + "/logs.log", { flags: "a" });

    console.log = function (...args) {
      stdLogger(args);
      if (logFile.writable) {
        logFile.write(JSON.stringify(args));
        logFile.write("\n");
      }
    };

    console.error = function (...args) {
      stdError(args);

      if (logFile.writable) {
        logFile.write(JSON.stringify(args));
        logFile.write("\n");
      }
    };
  }
  )
}
  
