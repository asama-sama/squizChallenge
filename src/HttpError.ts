// This class holds an error message as well as a status so that we can keep track of the
// status code to return to the user
export class HttpError extends Error {
  
  constructor(message: string, public status: number) {
    super(message)
  }
}