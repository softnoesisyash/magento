require.config({"config": {
        "jsbuild":{"Magento_Customer/js/action/login.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\ndefine([\n    'jquery',\n    'mage/storage',\n    'Magento_Ui/js/model/messageList',\n    'Magento_Customer/js/customer-data',\n    'mage/translate'\n], function ($, storage, globalMessageList, customerData, $t) {\n    'use strict';\n\n    var callbacks = [],\n\n        /**\n         * @param {Object} loginData\n         * @param {String} redirectUrl\n         * @param {*} isGlobal\n         * @param {Object} messageContainer\n         */\n        action = function (loginData, redirectUrl, isGlobal, messageContainer) {\n            messageContainer = messageContainer || globalMessageList;\n            let customerLoginUrl = 'customer/ajax/login';\n\n            if (loginData.customerLoginUrl) {\n                customerLoginUrl = loginData.customerLoginUrl;\n                delete loginData.customerLoginUrl;\n            }\n\n            return storage.post(\n                customerLoginUrl,\n                JSON.stringify(loginData),\n                isGlobal\n            ).done(function (response) {\n                if (response.errors) {\n                    messageContainer.addErrorMessage(response);\n                    callbacks.forEach(function (callback) {\n                        callback(loginData);\n                    });\n                } else {\n                    callbacks.forEach(function (callback) {\n                        callback(loginData);\n                    });\n                    customerData.invalidate(['customer']);\n\n                    if (response.redirectUrl) {\n                        window.location.href = response.redirectUrl;\n                    } else if (redirectUrl) {\n                        window.location.href = redirectUrl;\n                    } else {\n                        location.reload();\n                    }\n                }\n            }).fail(function () {\n                messageContainer.addErrorMessage({\n                    'message': $t('Could not authenticate. Please try again later')\n                });\n                callbacks.forEach(function (callback) {\n                    callback(loginData);\n                });\n            });\n        };\n\n    /**\n     * @param {Function} callback\n     */\n    action.registerLoginCallback = function (callback) {\n        callbacks.push(callback);\n    };\n\n    return action;\n});\n"}
}});