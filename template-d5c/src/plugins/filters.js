/* 全局filters */
import { parseTime } from "@/utils";

const install = (Vue) => {
  // 空值则输出--
  Vue.filter("notNull", (value) => {
    return value || "--";
  });
  // 时间处理
  Vue.filter("parseTime", (value, type) => {
    if (!value) return "--";
    return parseTime(value, type);
  });
};
export default install;
