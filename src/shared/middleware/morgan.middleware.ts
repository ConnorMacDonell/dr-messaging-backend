import morgan, { StreamOptions } from "morgan";
import Logger from "../../lib/logger";

// Override the stream method to use custom logger
const stream: StreamOptions = {
  // Use http severity level
  write: (message) => Logger.http(message),
};

// Skip Morgan http logging unless in dev mode
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Build morgan middleware
const morganMiddleware = morgan(
  // Define message format string (this same as default).
  ":method :url :status :res[content-length] - :response-time ms",
  // Options: stream and skip overwritten above
  { stream, skip }
);

export default morganMiddleware;