//! 只针对具体的某个包打包
//! build是做构建的，把packages下的所有包都构建一遍
const fs = require("fs");
//! 用来开启子进程进行打包，最终还是使用rollup进行打包
const execa = require('execa');

//* 只打包一个
// const target = "reactivity";
const target = "render";

build(target);
//! 对目标进行依次打包，并行打包
async function build(target){
    console.log(target);
    await execa("rollup",["-c","--environment",`TARGET:${target}`],{stdio:"inherit"});
}

