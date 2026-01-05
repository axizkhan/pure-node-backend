export async function parser(req, callback = undefined) {
  return new Promise((res, rej) => {
    try {
      const content_type = req.headers["content-type"];
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", async () => {
        // req.body = data;
        req.body = callback ? await callback(data, content_type) : data;

        res(req);
      });
    } catch (err) {
      rej(req);
    }
  });
}

export async function jsonParser(data, content_type) {
  if (content_type === "application/json") {
    return JSON.parse(data);
  }
  return data;
}
