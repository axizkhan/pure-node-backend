import * as http from "node:http";
import { parser, jsonParser } from "./parser.js";
import { pathSetup } from "./pathController.js";

const [getPath, getCallback] = pathSetup("/user/:id", (req, res) => {
  console.log(req.params, "In callback");
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("successfull response");
});

const server = http.createServer(
  { keepAliveTimeout: 6000 },
  async (req, res) => {
    req = await parser(req, jsonParser);

    if (req.method === "GET" && getPath.test(req.url)) {
      getCallback(req, res);
    }
  }
);

server.listen(8000, () => {
  console.log("server is listening at 8000");
});
