import * as http from "node:http";
import { parser, jsonParser } from "./parser.js";
import { pathSetup } from "./pathController.js";
import Anime from "./animeClass.js";

const anime = new Anime();

const [getPath, getCallback] = pathSetup("/", (req, res) => {
  console.log(req.params, "In callback");
  const allAnime = anime.getAllAnime();

  res.writeHead(200, { "content-type": "application/json" });
  console.log("data got it");
  res.end(
    JSON.stringify({
      data: allAnime,
      message: "Successfull",
      success: true,
    })
  );
});

const server = http.createServer(
  { keepAliveTimeout: 6000 },
  async (req, res) => {
    req = await parser(req, jsonParser);
    console.log(req.url);
    console.log(getPath.test(req.url));

    if (req.method === "GET" && getPath.test(req.url)) {
      getCallback(req, res);
    }
  }
);

server.listen(8000, () => {
  console.log("server is listening at 8000");
});
