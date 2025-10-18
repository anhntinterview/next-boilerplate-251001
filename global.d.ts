import type NodeCache from "node-cache";
import type messages from "./src/messages/en.json";
import type { ErrorPayload } from "./src/services/error-handling";
import "ky";

declare module "ky" {
  interface HTTPError {
    handledError: ErrorPayload;
  }
}

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var tokenCache: NodeCache;
}