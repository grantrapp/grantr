"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { GrantProgram } from '../backend/src/grant.type';
console.log("Starting init");
var data = require("fs").readFileSync("data.csv", "utf8");
data = data.split("\r\n");
for (let i of data) {
    data[i] = data[i].split(",");
}
console.log(data);
// setupENV();
// const redis = createClient({
//   url: process.env.REDIS_URI || 'redis://localhost:6379',
// });
// (async () => {
//   console.log("Connecting to redis");
//   await redis.connect();
//   console.log("Connected!");
//   console.log("Reading file");
// });
