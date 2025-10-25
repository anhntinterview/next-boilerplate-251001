import "dotenv/config";
import fs from "fs";
import axios from "axios";

const reportPath = "./reports/axe-report.json";
if (!fs.existsSync(reportPath)) {
  console.error("No accessibility report found!");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const violations = data.violations?.length ?? 0;

const accountId = process.env.NEWRELIC_ACCOUNT_ID;
const apiKey = process.env.NEWRELIC_API_KEY;

await axios.post(
  `https://insights-collector.newrelic.com/v1/accounts/${accountId}/events`,
  [
    {
      eventType: "AccessibilityAudit",
      url: data.url,
      violations,
      timestamp: Date.now(),
    },
  ],
  {
    headers: { "Api-Key": apiKey },
  },
);

console.log(
  `✅ Sent accessibility data (${violations} violations) to New Relic.`,
);
