// encode.js
const fs = require("fs");
const key = fs.readFileSync("./smart-deals-71dc2-firebase-adminsdk-fbsvc-170359cf31.json", "utf8");
const base64 = Buffer.from(key).toString("base64");
console.log(base64);
