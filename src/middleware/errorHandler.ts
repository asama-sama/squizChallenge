import { ErrorRequestHandler } from 'express'
import { HttpError } from '../HttpError'

const ERRORMESSAGE = "Something went wrong";  

// Middleware to catch errors and use the given status code if it is of type HttpError
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).send(err.message)
  } else if (err instanceof Error) {
    res.status(500).send(err.message)
  } else {
    res.status(500).send(ERRORMESSAGE)
  }
}
