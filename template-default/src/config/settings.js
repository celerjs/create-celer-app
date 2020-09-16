/**
 * @description 全局变量配置
 */
module.exports = {
  // 开发以及部署时的URL
  publicPath: "",
  // 生产环境构建文件的目录名
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  title: "vue3-ant-admin",
  //简写
  abbreviation: "vaa",
  //开发环境端口号
  devPort: "9420",
  //版本号
  version: process.env.VUE_APP_VERSION,
  //是否显示顶部进度条
  progressBar: true,
  //缓存路由的最大数量
  keepAliveMaxNum: 99,
  // 路由模式，可选值为 history 或 hash
  routerMode: "hash",
  //不经过token校验的路由
  routesWhiteList: ["/login", "/register", "/404", "/401"],
  //加载时显示文字
  loadingText: "正在加载中...",
  //token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  //是否显示logo，不显示时设置false，显示时请填写
  logo: "",
  // 是否需要全局置顶按钮
  backtop: true,
  //是否国定头部 固定fixed 不固定noFixed
  header: "fixed",
  //横纵布局 horizontal vertical
  layout: "vertical",
  //是否显示多标签页
  tagsBar: true,
  //是否显示骨架屏
  skeleton: true,
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  //需要加loading层的请求，防止重复提交
  debounce: ["doEdit"],
  //npm run build时是否自动生成压缩包
  buildZip: true,
};
