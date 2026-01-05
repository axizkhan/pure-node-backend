export function regexBuilder(pathArray) {
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
  return new RegExp("/([0-9]+|[a-z]+|[A-Z]+)");
}
