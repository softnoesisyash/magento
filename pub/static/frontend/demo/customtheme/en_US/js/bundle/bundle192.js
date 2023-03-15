require.config({"config": {
        "jsbuild":{"Magento_Checkout/js/model/cart/cache.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\n/**\n * Cart adapter for customer data storage.\n * It stores cart data in customer data(localStorage) without saving on server.\n * Adapter is created for shipping rates and totals data caching. It eliminates unneeded calculations requests.\n */\ndefine([\n    'underscore',\n    'Magento_Customer/js/customer-data',\n    'mageUtils'\n], function (_, storage, utils) {\n    'use strict';\n\n    var cacheKey = 'cart-data',\n        cartData = {\n            totals: null,\n            address: null,\n            cartVersion: null,\n            shippingMethodCode: null,\n            shippingCarrierCode: null,\n            rates: null\n        },\n\n        /**\n         * Set data to local storage.\n         *\n         * @param {Object} checkoutData\n         */\n        setData = function (checkoutData) {\n            storage.set(cacheKey, checkoutData);\n        },\n\n        /**\n         * Get data from local storage.\n         *\n         * @param {String} [key]\n         * @returns {*}\n         */\n        getData = function (key) {\n            var data = key ? storage.get(cacheKey)()[key] : storage.get(cacheKey)();\n\n            if (_.isEmpty(storage.get(cacheKey)())) {\n                setData(utils.copy(cartData));\n            }\n\n            return data;\n        },\n\n        /**\n         * Build method name base on name, prefix and suffix.\n         *\n         * @param {String} name\n         * @param {String} prefix\n         * @param {String} suffix\n         * @return {String}\n         */\n        getMethodName = function (name, prefix, suffix) {\n            prefix = prefix || '';\n            suffix = suffix || '';\n\n            return prefix + name.charAt(0).toUpperCase() + name.slice(1) + suffix;\n        };\n\n    /**\n     * Provides get/set/isChanged/clear methods for work with cart data.\n     * Can be customized via mixin functionality.\n     */\n    return {\n        cartData: cartData,\n\n        /**\n         * Array of required address fields\n         */\n        requiredFields: ['countryId', 'region', 'regionId', 'postcode'],\n\n        /**\n         * Get data from customer data.\n         * Concatenate provided key with method name and call method if it exist or makes get by key.\n         *\n         * @param {String} key\n         * @return {*}\n         */\n        get: function (key) {\n            var methodName = getMethodName(key, '_get');\n\n            if (key === cacheKey) {\n                return getData();\n            }\n\n            if (this[methodName]) {\n                return this[methodName]();\n            }\n\n            return getData(key);\n        },\n\n        /**\n         * Set data to customer data.\n         * Concatenate provided key with method name and call method if it exist or makes set by key.\n         * @example _setCustomAddress method will be called, if it exists.\n         *  set('address', customAddressValue)\n         * @example Will set value by provided key.\n         *  set('rates', ratesToCompare)\n         *\n         * @param {String} key\n         * @param {*} value\n         */\n        set: function (key, value) {\n            var methodName = getMethodName(key, '_set'),\n                obj;\n\n            if (key === cacheKey) {\n                _.each(value, function (val, k) {\n                    this.set(k, val);\n                }, this);\n\n                return;\n            }\n\n            if (this[methodName]) {\n                this[methodName](value);\n            } else {\n                obj = getData();\n                obj[key] = value;\n                setData(obj);\n            }\n        },\n\n        /**\n         * Clear data in cache.\n         * Concatenate provided key with method name and call method if it exist or clear by key.\n         * @example _clearCustomAddress method will be called, if it exist.\n         *  clear('customAddress')\n         * @example Will clear data by provided key.\n         *  clear('rates')\n         *\n         * @param {String} key\n         */\n        clear: function (key) {\n            var methodName = getMethodName(key, '_clear');\n\n            if (key === cacheKey) {\n                setData(this.cartData);\n\n                return;\n            }\n\n            if (this[methodName]) {\n                this[methodName]();\n            } else {\n                this.set(key, null);\n            }\n        },\n\n        /**\n         * Check if provided data has difference with cached data.\n         * Concatenate provided key with method name and call method if it exist or makes strict equality.\n         * @example Will call existing _isAddressChanged.\n         *  isChanged('address', addressToCompare)\n         * @example Will get data by provided key and make strict equality with provided value.\n         *  isChanged('rates', ratesToCompare)\n         *\n         * @param {String} key\n         * @param {*} value\n         * @return {Boolean}\n         */\n        isChanged: function (key, value) {\n            var methodName = getMethodName(key, '_is', 'Changed');\n\n            if (this[methodName]) {\n                return this[methodName](value);\n            }\n\n            return this.get(key) !== value;\n        },\n\n        /**\n         * Compare cached address with provided.\n         * Custom method for check object equality.\n         *\n         * @param {Object} address\n         * @returns {Boolean}\n         */\n        _isAddressChanged: function (address) {\n            return JSON.stringify(_.pick(this.get('address'), this.requiredFields)) !==\n                JSON.stringify(_.pick(address, this.requiredFields));\n        },\n\n        /**\n         * Compare cached subtotal with provided.\n         * Custom method for check object equality.\n         *\n         * @param {float} subtotal\n         * @returns {Boolean}\n         */\n        _isSubtotalChanged: function (subtotal) {\n            var cached = parseFloat(this.get('totals').subtotal);\n\n            return subtotal !== cached;\n        }\n    };\n});\n"}
}});