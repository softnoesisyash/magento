require.config({"config": {
        "jsbuild":{"jquery/bootstrap/dom/data.js":"/**\n * --------------------------------------------------------------------------\n * Bootstrap (v5.1.3): dom/data.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\ndefine([], function() {\n    'use strict';\n\n    /**\n     * ------------------------------------------------------------------------\n     * Constants\n     * ------------------------------------------------------------------------\n     */\n\n    const elementMap = new Map()\n\n    return {\n        set: function (element, key, instance) {\n            if (!elementMap.has(element)) {\n                elementMap.set(element, new Map())\n            }\n\n            const instanceMap = elementMap.get(element)\n\n            // make it clear we only want one instance per element\n            // can be removed later when multiple key/instances are fine to be used\n            if (!instanceMap.has(key) && instanceMap.size !== 0) {\n                // eslint-disable-next-line no-console\n                console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`)\n                return\n            }\n\n            instanceMap.set(key, instance)\n        },\n\n        get: function (element, key) {\n            if (elementMap.has(element)) {\n                return elementMap.get(element).get(key) || null\n            }\n\n            return null\n        },\n\n        remove: function (element, key) {\n            if (!elementMap.has(element)) {\n                return\n            }\n\n            const instanceMap = elementMap.get(element)\n\n            instanceMap.delete(key)\n\n            // free up element references if there are no instances left for an element\n            if (instanceMap.size === 0) {\n                elementMap.delete(element)\n            }\n        }\n    }\n});\n"}
}});