//  对模块的加载行为进行自定义
require.config({
    baseUrl: "js",   // 指定一个目录  requirejs的依赖基于这个目录
    paths: {
        "zepto": "lib/zepto.min",
        "index" : "other/index"
    },
    shim: {      //  shim配置不规范的模块
        "backbone": {
            deps: ["underscore","jquery"],
            export: "backbone"
        }
    }
})

//  模块的加载
require(["index"], function(index) {
    return index.test();
});
