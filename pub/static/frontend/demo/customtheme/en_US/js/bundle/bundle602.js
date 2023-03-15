require.config({"config": {
        "jsbuild":{"Magento_Captcha/js/action/refresh.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\ndefine([\n    'jquery', 'mage/url'\n], function ($, urlBuilder) {\n    'use strict';\n\n    return function (refreshUrl, formId, imageSource) {\n        return $.ajax({\n            url: urlBuilder.build(refreshUrl),\n            type: 'POST',\n            data: JSON.stringify({\n                'formId': formId\n            }),\n            global: false,\n            contentType: 'application/json'\n        }).done(\n            function (response) {\n                if (response.imgSrc) {\n                    imageSource(response.imgSrc);\n                }\n            }\n        );\n    };\n});\n"}
}});