require.config({"config": {
        "jsbuild":{"mage/mage.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\ndefine([\n    'jquery',\n    'mage/apply/main'\n], function ($, mage) {\n    'use strict';\n\n    /**\n     * Main namespace for Magento extensions\n     * @type {Object}\n     */\n    $.mage = $.mage || {};\n\n    /**\n     * Plugin mage, initialize components on elements\n     * @param {String} name - Components' path.\n     * @param {Object} config - Components' config.\n     * @returns {JQuery} Chainable.\n     */\n    $.fn.mage = function (name, config) {\n        config = config || {};\n\n        this.each(function (index, el) {\n            mage.applyFor(el, config, name);\n        });\n\n        return this;\n    };\n\n    $.extend($.mage, {\n        /**\n         * Handle all components declared via data attribute\n         * @return {Object} $.mage\n         */\n        init: function () {\n            mage.apply();\n\n            return this;\n        },\n\n        /**\n         * Method handling redirects and page refresh\n         * @param {String} url - redirect URL\n         * @param {(undefined|String)} type - 'assign', 'reload', 'replace'\n         * @param {(undefined|Number)} timeout - timeout in milliseconds before processing the redirect or reload\n         * @param {(undefined|Boolean)} forced - true|false used for 'reload' only\n         */\n        redirect: function (url, type, timeout, forced) {\n            var _redirect;\n\n            forced  = !!forced;\n            timeout = timeout || 0;\n            type    = type || 'assign';\n\n            /**\n             * @private\n             */\n            _redirect = function () {\n                window.location[type](type === 'reload' ? forced : url);\n            };\n\n            timeout ? setTimeout(_redirect, timeout) : _redirect();\n        },\n\n        /**\n         * Checks if provided string is a valid selector.\n         * @param {String} selector - Selector to check.\n         * @returns {Boolean}\n         */\n        isValidSelector: function (selector) {\n            try {\n                document.querySelector(selector);\n\n                return true;\n            } catch (e) {\n                return false;\n            }\n        }\n    });\n\n    /**\n     * Init components inside of dynamically updated elements\n     */\n    $(document).on('contentUpdated', 'body', function () {\n        if (mage) {\n            mage.apply();\n        }\n    });\n\n    return $.mage;\n});\n"}
}});