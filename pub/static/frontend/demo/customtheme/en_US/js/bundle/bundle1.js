require.config({"config": {
        "jsbuild":{"requirejs-min-resolver.js":"    (function () {\n        var ctx = require.s.contexts._,\n            origNameToUrl = ctx.nameToUrl,\n            baseUrl = ctx.config.baseUrl;\n\n        ctx.nameToUrl = function() {\n            var url = origNameToUrl.apply(ctx, arguments);\n            if (url.indexOf(baseUrl)===0&&!url.match(/\\/tiny_mce\\//)&&!url.match(/\\/v1\\/songbird/)&&!url.match(/\\/pay.google.com\\//)) {\n                url = url.replace(/(\\.min)?\\.js$/, '.min.js');\n            }\n            return url;\n        };\n    })();"}
}});