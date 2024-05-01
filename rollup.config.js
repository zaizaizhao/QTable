//! 根据环境变量中的target属性获取对应模块中的package.json文件
const path = require("path");
const json = require("@rollup/plugin-json");
const ts = require("rollup-plugin-typescript2");
const commonjs = require("@rollup/plugin-commonjs");
// import commonjs from '@rollup/plugin-commonjs';
const resolvePlugin = require("@rollup/plugin-node-resolve").nodeResolve;

const packagesDir = path.resolve(__dirname, "packages");
const packageDir = path.resolve(packagesDir, process.env.TARGET);
//! packageDir是打包的基准目录
//! 永远针对的是packageDir模块
const resolve = (p) => path.resolve(packageDir, p);

//! 获取package.json文件内容
const pkg = require(resolve("package.json"));
//! 获取文件名字
const name = path.basename(packageDir);
//! 对打包类型做一个映射表，根据formats属性来格式化需要打包的内容
const outputConfig = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: "es",
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: "cjs",
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: "iife", //! 立即执行函数
  },
};
//!buildOptions是自定义的打包配置
const options = pkg.buildOptions || {}; //! 获取package.json中的buildOptions属性

const createConfig = (format, output) => {
  output.name = options.name;
  output.sourcemap = true;
  //! 生成rollup配置文件
  return {
    input: resolve("src/index.ts"),
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        rollupCommonJSResolveHack: true,
        clean: true,
      }),
      resolvePlugin(),
      commonjs(),
    ],
    output,
    external: ["fabric"],
    // external: [
    //     "canvas-prebuilt",
    //     "canvas",
    //     "jsdom/lib/jsdom/utils",
    //     "jsdom/lib/jsdom/living/generated/utils",
    //     "jsdom",
    //     "xmldom",
    // ],
  };
};
module.exports = options.formats.map((format) => {
  return createConfig(format, outputConfig[format]);
});
