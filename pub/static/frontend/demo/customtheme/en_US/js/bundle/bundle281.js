require.config({"config": {
        "jsbuild":{"Magento_PageBuilder/js/content-type/tabs/appearance/default/widget.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\ndefine([\n    'jquery',\n    'Magento_PageBuilder/js/events',\n    'jquery-ui-modules/tabs'\n], function ($, events) {\n    'use strict';\n\n    return function (config, element) {\n        var $element = $(element);\n\n        // Ignore stage builder preview tabs\n        if ($element.is('.pagebuilder-tabs')) {\n            return;\n        }\n\n        // Disambiguate between the mage/tabs component which is loaded randomly depending on requirejs order.\n        $.ui.tabs({\n            active: $element.data('activeTab') || 0,\n            create:\n\n                /**\n                 * Adjust the margin bottom of the navigation to correctly display the active tab\n                 */\n                function () {\n                    var borderWidth = parseInt($element.find('.tabs-content').css('borderWidth').toString(), 10);\n\n                    $element.find('.tabs-navigation').css('marginBottom', -borderWidth);\n                    $element.find('.tabs-navigation li:not(:first-child)').css('marginLeft', -borderWidth);\n                },\n            activate:\n\n                /**\n                 * Trigger redraw event since new content is being displayed\n                 */\n                function () {\n                    events.trigger('contentType:redrawAfter', {\n                        element: element\n                    });\n                }\n        }, element);\n    };\n});\n"}
}});