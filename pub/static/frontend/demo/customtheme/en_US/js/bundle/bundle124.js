require.config({"config": {
        "jsbuild":{"PayPal_Braintree/js/view/payment/method-renderer/paypal-vault.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n/*browser:true*/\n/*global define*/\ndefine([\n    'jquery',\n    'underscore',\n    'Magento_Vault/js/view/payment/method-renderer/vault',\n    'Magento_Ui/js/model/messageList',\n    'Magento_Checkout/js/model/full-screen-loader'\n], function ($, _, VaultComponent, globalMessageList, fullScreenLoader) {\n    'use strict';\n\n    return VaultComponent.extend({\n        defaults: {\n            template: 'PayPal_Braintree/payment/paypal/vault',\n            additionalData: {}\n        },\n\n        /**\n         * Get PayPal payer email\n         * @returns {String}\n         */\n        getPayerEmail: function () {\n            return this.details.payerEmail;\n        },\n\n        /**\n         * Get type of payment\n         * @returns {String}\n         */\n        getPaymentIcon: function () {\n            return window.checkoutConfig.payment['braintree_paypal'].paymentIcon;\n        },\n\n        /**\n         * Place order\n         */\n        beforePlaceOrder: function () {\n            this.getPaymentMethodNonce();\n        },\n\n        /**\n         * Send request to get payment method nonce\n         */\n        getPaymentMethodNonce: function () {\n            var self = this;\n\n            fullScreenLoader.startLoader();\n            $.getJSON(self.nonceUrl, {\n                'public_hash': self.publicHash\n            })\n                .done(function (response) {\n                    fullScreenLoader.stopLoader();\n                    self.additionalData['payment_method_nonce'] = response.paymentMethodNonce;\n                    self.placeOrder();\n                })\n                .fail(function (response) {\n                    var error = JSON.parse(response.responseText);\n\n                    fullScreenLoader.stopLoader();\n                    globalMessageList.addErrorMessage({\n                        message: error.message\n                    });\n                });\n        },\n\n        /**\n         * Get payment method data\n         * @returns {Object}\n         */\n        getData: function () {\n            var data = {\n                'method': this.code,\n                'additional_data': {\n                    'public_hash': this.publicHash\n                }\n            };\n\n            data['additional_data'] = _.extend(data['additional_data'], this.additionalData);\n\n            return data;\n        }\n    });\n});\n"}
}});