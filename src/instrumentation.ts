export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_PLAYWRIGHT !== "true"
    ) {
      // Initialize New Relic for Application Performance Monitoring (APM)
      await import("newrelic");
    }
    const NodeCache = (await import("node-cache")).default;
    global.tokenCache = new NodeCache();
  }
}
