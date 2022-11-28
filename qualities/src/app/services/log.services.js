import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import config from "../config.json";

function init() {
  Sentry.init({
    dsn: config.SENTRY_DNS,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export const logger = {
  init,
  log,
};
