export function pathSetup(path, callback) {
  const pathArray = path.split("/");
  const params = {};

  for (let element of pathArray) {
    if (element.includes(":")) {
      params[element.slice(1)] = "";
    }
  }

  let newRegex = regexBuilder(pathArray);

  return [
    newRegex,
    function controller(req, res) {
      pathController(req, params);
      callback(req, res);
    },
  ];
}

function pathController(req, params) {
  let queryArray = req.url.split("/");

  let index = 2;
  for (let key in params) {
    params[key] = Number(queryArray[index]) || queryArray[index];
    index++;
  }
  req.params = params;
}

function regexBuilder(pathArray) {
  let regex = "";
  for (let element of pathArray) {
    if (element.length > 0 && !element.includes(":")) {
      regex += `/${element}`;
    } else if (element.length > 0 && element.includes(":")) {
      regex += "/([0-9]+|[a-z]+|[A-Z]+)";
    }
  }
  if (regex) {
    return new RegExp(regex);
  }
  return new RegExp("^/(?:[a-zA-Z]+|d+)?$");
}
