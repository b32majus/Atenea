#!/usr/bin/env node
const fs = require("fs");
const args = process.argv.slice(2);
fs.appendFileSync(process.env.FAKE_GH_LOG, JSON.stringify(args) + "\n");
const state = JSON.parse(fs.readFileSync(process.env.FAKE_GH_STATE, "utf8"));

function pr() {
  return {
    number: 1,
    url: "https://example.invalid/pr/1",
    baseRefName: process.env.FAKE_BASE_BRANCH,
    baseRefOid: process.env.FAKE_BASE_SHA,
    headRefName: process.env.FAKE_HEAD_BRANCH,
    headRefOid: process.env.FAKE_HEAD_SHA,
    title: "Test PR",
    state: "OPEN"
  };
}

if (args[0] === "api" && args.includes("/user")) {
  process.stdout.write("HTTP/2 200 OK\nX-OAuth-Scopes: " + process.env.FAKE_GH_SCOPES + "\n\n{}");
} else if (args[0] === "api" && args.some((x) => x.includes("/pulls/1/files"))) {
  process.stdout.write(process.env.FAKE_CHANGED_PATHS.split(",").filter(Boolean).join("\n") + "\n");
} else if (args[0] === "pr" && args[1] === "list") {
  process.stdout.write(JSON.stringify(state.created ? [pr()] : []));
} else if (args[0] === "pr" && args[1] === "create") {
  state.created = true;
  fs.writeFileSync(process.env.FAKE_GH_STATE, JSON.stringify(state));
  process.stdout.write("https://example.invalid/pr/1\n");
} else if (args[0] === "pr" && args[1] === "edit") {
  process.stdout.write("");
} else if (args[0] === "pr" && args[1] === "view") {
  process.stdout.write(JSON.stringify(pr()));
} else if (args[0] === "pr" && args[1] === "checks") {
  const bucket = process.env.FAKE_CI_BUCKET || "pass";
  const stateName = bucket === "pass" ? "SUCCESS" : bucket === "pending" ? "PENDING" : "FAILURE";
  process.stdout.write(JSON.stringify([
    { bucket, name: "ci", state: stateName, link: "", workflow: "CI" }
  ]));
} else {
  process.stderr.write("unexpected fake gh args: " + JSON.stringify(args) + "\n");
  process.exit(2);
}
