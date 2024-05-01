const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode:"development",
    entry: path.join(__dirname,"./src/index.js"),//设置入口文件路径
    output:{
       //设置输出文件路径
       path:path.join(__dirname,"./dist"),
       //设置输出文件名称
       filename:"bundle.js"
    },
    devServer: {
        // 本地服务器代理
        compress: true,
        port: 8080, // 配置端口
        hot: true, // 配置热更新
    },
    plugins:[
        new HtmlWebpackPlugin({
            //设置生成预览页面的模板文件
            template:"./src/index.html",
            //设置生成的预览页面名称,该文件存在于内存中,在目录中不显示
            filename:"index.html"
        })
    ]
}
