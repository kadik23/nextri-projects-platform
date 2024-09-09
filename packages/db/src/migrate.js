require("dotenv").config();
const { execSync } = require("child_process");

execSync("drizzle-kit migrate", { stdio: "inherit" });
