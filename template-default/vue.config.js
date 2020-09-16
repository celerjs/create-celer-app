// 打印
const chalk = require("chalk");
console.log(chalk.green(`> 欢迎使用 vue3-ant-admin`));

// 配置
const {
  title,
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  devPort,
  buildZip,
  abbreviation,
} = require("./src/config/settings");

// 标题
process.env.VUE_APP_TITLE = title || "vue3-ant-admin";

// 版本号
const { version } = require("./package.json");
process.env.VUE_APP_VERSION = version;

// 进度条
const WebpackBar = require("webpackbar");

// 打包依赖
const FileManagerPlugin = require("filemanager-webpack-plugin");

// 时间
const dayjs = require("dayjs");
const buildTime = dayjs().format("YYYY_M_D_HH_mm_ss");

const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  devServer: {
    port: devPort,
    hot: true,
    open: false,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  // 不需要生产环境的 source map
  productionSourceMap: false,
  configureWebpack(config) {
    // 正式环境去除 console.log
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    return {
      plugins: [
        new WebpackBar({
          name: `✈ 飞速构建中...`,
        }),
      ],
    };
  },
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();

    if (buildZip) {
      config.when(process.env.NODE_ENV === "production", (config) => {
        config
          .plugin("fileManager")
          .use(FileManagerPlugin, [
            {
              onEnd: {
                archive: [
                  {
                    source: `./${outputDir}`,
                    destination: `./backup/${abbreviation}_${buildTime}.zip`,
                  },
                ],
              },
            },
          ])
          .end();
      });
    }
  },
  // 导入全局 scss 变量
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/variables.scss";`,
      },
    },
  },
};
