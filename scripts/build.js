//! build是做构建的，把packages下的所有包都构建一遍
const fs = require("fs");
//! 用来开启子进程进行打包，最终还是使用rollup进行打包
const execa = require('execa');

//* 这里打包了所有的packages下的包
const targets = fs.readdirSync("packages").filter(f => {
    if(!fs.statSync(`packages/${f}`).isDirectory()){
        return false;
    }
    return true;
});
//! 对目标进行依次打包，并行打包
async function build(target){
    console.log(target);
    await execa("rollup",["-c","--environment",`TARGET:${target}`],{stdio:"inherit"});

}

function runParallel(targets,iteratorFn){
    const res = [];
    for(const item of targets){
        //! 并行打包
        const p = iteratorFn(item);
        res.push(p);
    }
    return Promise.all(res);
}

runParallel(targets,build).then(()=>{}).catch(()=>{});