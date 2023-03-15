require.config({"config": {
        "jsbuild":{"jquery/jquery.parsequery.js":"/**\n * Copyright (c) 2010 Conrad Irwin <conrad@rapportive.com> MIT license.\n * Based loosely on original: Copyright (c) 2008 mkmanning MIT license.\n *\n * Parses CGI query strings into javascript objects.\n *\n * See the README for details.\n **/\ndefine([\n    \"jquery\"\n], function($){\n    $.parseQuery = function (options) {\n\n        var config = {query: window.location.search || \"\"},\n            params = {};\n\n        if (typeof options === 'string') {\n            options = {query: options};\n        }\n        $.extend(config, $.parseQuery, options);\n        config.query = config.query.replace(/^\\?/, '');\n\n        if (config.query.length > 0) {\n            $.each(config.query.split(config.separator), function (i, param) {\n                var pair = param.split('='),\n                    key = config.decode(pair.shift(), null).toString(),\n                    value = config.decode(pair.length ? pair.join('=') : null, key);\n\n                if (config.array_keys.test ? config.array_keys.test(key) : config.array_keys(key)) {\n                    params[key] = params[key] || [];\n                    params[key].push(value);\n                } else {\n                    params[key] = value;\n                }\n            });\n        }\n        return params;\n    };\n    $.parseQuery.decode = $.parseQuery.default_decode = function (string) {\n        return decodeURIComponent((string || \"\").replace(/\\+/g, ' '));\n    };\n    $.parseQuery.array_keys = function () {\n        return false;\n    };\n    $.parseQuery.separator = \"&\";\n});\n"}
}});