module.exports = {
  // 产品ID
  productId: 2020,
  // 部署时的URL
  publicPath: "/",
  // 生产环境构建文件的目录名
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: "模板系统",
  //标题简写
  abbreviation: "tpl",
  //开发环境端口号
  devPort: "8282",
  //版本号
  version: process.env.VUE_APP_VERSION,
  //加载时显示文字
  loadingText: "正在加载中...",
  //消息显示时间
  messageDuration: 3000,
  //是否显示logo
  logo: true,
  //是否只保持一个子菜单的展开
  uniqueOpened: true,
  //默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOopeneds: [],
  //需要加loading层的请求，防止重复提交
  debounce: ["doEdit"],
  buildZip: false,
};
