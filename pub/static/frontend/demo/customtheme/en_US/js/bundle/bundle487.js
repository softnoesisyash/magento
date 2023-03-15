require.config({"config": {
        "jsbuild":{"Magento_Ui/js/lib/knockout/bootstrap.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n/** Loads all available knockout bindings, sets custom template engine, initializes knockout on page */\n\ndefine([\n    'ko',\n    './template/engine',\n    'knockoutjs/knockout-es5',\n    './bindings/bootstrap',\n    './extender/observable_array',\n    './extender/bound-nodes',\n    'domReady!'\n], function (ko, templateEngine) {\n    'use strict';\n\n    ko.uid = 0;\n\n    ko.setTemplateEngine(templateEngine);\n    ko.applyBindings();\n});\n"}
}});