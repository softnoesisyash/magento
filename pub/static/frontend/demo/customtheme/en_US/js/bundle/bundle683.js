require.config({"config": {
        "jsbuild":{"Magento_Theme/js/view/messages.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\n/**\n * @api\n */\ndefine([\n    'jquery',\n    'uiComponent',\n    'Magento_Customer/js/customer-data',\n    'underscore',\n    'escaper',\n    'jquery/jquery-storageapi'\n], function ($, Component, customerData, _, escaper) {\n    'use strict';\n\n    return Component.extend({\n        defaults: {\n            cookieMessages: [],\n            messages: [],\n            allowedTags: ['div', 'span', 'b', 'strong', 'i', 'em', 'u', 'a']\n        },\n\n        /**\n         * Extends Component object by storage observable messages.\n         */\n        initialize: function () {\n            this._super();\n\n            this.cookieMessages = _.unique($.cookieStorage.get('mage-messages'), 'text');\n            this.messages = customerData.get('messages').extend({\n                disposableCustomerData: 'messages'\n            });\n\n            // Force to clean obsolete messages\n            if (!_.isEmpty(this.messages().messages)) {\n                customerData.set('messages', {});\n            }\n\n            $.mage.cookies.set('mage-messages', '', {\n                samesite: 'strict',\n                domain: ''\n            });\n        },\n\n        /**\n         * Prepare the given message to be rendered as HTML\n         *\n         * @param {String} message\n         * @return {String}\n         */\n        prepareMessageForHtml: function (message) {\n            return escaper.escapeHtml(message, this.allowedTags);\n        }\n    });\n});\n"}
}});