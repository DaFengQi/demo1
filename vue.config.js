const path = require("path"); // 引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(_dirname)设置绝对路径
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      //第一个参数：别名 第二个参数：路径
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"))
      .set("assets", resolve("./src/assets"))
      .set("common", resolve("./src/common"))
      .set("network", resolve("./src/network"))
      .set("views", resolve("./src/views"));
  }
};
