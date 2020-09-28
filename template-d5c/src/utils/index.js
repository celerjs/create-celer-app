// 去掉输入框中的空格
export function trim(str) {
  if (str !== "") {
    str = str.replace(/^\s+|\s+$/g, "");
  }
  return str;
}
