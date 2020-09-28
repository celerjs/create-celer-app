// 打印
const chalk = require("chalk");
console.log(chalk.green(`> 欢迎使用 d5c-admin`));
const {
  title,
  abbreviation,
  publicPath,
  assetsDir,
  outputDir,
  devPort,
  buildZip,
} = require("./src/config/settings");
// 标题
process.env.VUE_APP_TITLE = title || "d5c-admin";

const { FILE_URL } = require("./src/config");

const WebpackBar = require("webpackbar");
const FileManagerPlugin = require("filemanager-webpack-plugin");

// 时间
const dayjs = require("dayjs");
const buildTime = dayjs().format("YYYY_M_D_HH_mm_ss");
process.env.VUE_APP_UPDATE_TIME = dayjs().format("YYYY-M-D HH:mm:ss");

// 版本号
const { version } = require("./package.json");
process.env.VUE_APP_VERSION = version;

const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: devPort,
    open: false,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://192.168.2.121:8084`, //内部地址 http://192.168.2.121:8083
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
      "/file": {
        target: FILE_URL,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/file": "/file", // 重写接口
        },
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext;
          const relativePath = path.relative(rootContext, resourcePath);
          if (
            relativePath.replace(/\\/g, "/") !== "src/styles/variables.scss"
          ) {
            return '@import "~@/styles/variables.scss";' + content;
          }
          return content;
        },
      },
    },
  },

  configureWebpack(config) {
    // 正式环境去除 console.log
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    return {
      resolve: {
        alias: {
          "@": resolve("src"),
          "^": resolve("src/components"),
        },
      },
      plugins: [
        new WebpackBar({
          name: `✈ 疯狂构建中`,
        }),
      ],
    };
  },
  chainWebpack(config) {
    config.plugins.delete("prefetch");
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
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial",
        },
        elementUI: {
          name: "chunk-elementUI",
          priority: 20,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
        },
        fortawesome: {
          name: "chunk-fortawesome",
          priority: 20,
          test: /[\\/]node_modules[\\/]_?@fortawesome(.*)/,
        },
        commons: {
          name: "chunk-commons",
          test: resolve("src/components"),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    });
    // 打包
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
};
