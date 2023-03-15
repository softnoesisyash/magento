require.config({"config": {
        "jsbuild":{"Magento_PaypalCaptcha/js/view/payment/method-renderer/payflowpro-method-mixin.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\ndefine([\n    'Magento_PaypalCaptcha/js/model/skipRefreshCaptcha'\n], function (skipRefreshCaptcha) {\n    'use strict';\n\n    var payflowProMethodMixin = {\n        /**\n         * @override\n         */\n        placeOrder: function () {\n            skipRefreshCaptcha.skip(true);\n            this._super();\n        }\n    };\n\n    return function (payflowProMethod) {\n        return payflowProMethod.extend(payflowProMethodMixin);\n    };\n});\n"}
}});