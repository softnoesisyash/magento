require.config({"config": {
        "jsbuild":{"PayPal_Braintree/js/view/payment/adapter.js":"/**\n * Copyright 2013-2017 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n/*browser:true*/\n/*global define*/\ndefine([\n    'jquery',\n    'braintree',\n    'braintreeDataCollector',\n    'braintreeHostedFields',\n    'Magento_Checkout/js/model/full-screen-loader',\n    'Magento_Ui/js/model/messageList',\n    'mage/translate'\n], function ($, client, dataCollector, hostedFields, fullScreenLoader, globalMessageList, $t) {\n    'use strict';\n\n    return {\n        apiClient: null,\n        config: {},\n        checkout: null,\n        deviceData: null,\n        clientInstance: null,\n        hostedFieldsInstance: null,\n        paypalInstance: null,\n        code: 'braintree',\n\n        /**\n         * {Object}\n         */\n        events: {\n            onClick: null,\n            onCancel: null,\n            onError: null\n        },\n\n        /**\n         * Get Braintree api client\n         * @returns {Object}\n         */\n        getApiClient: function () {\n            return this.clientInstance;\n        },\n\n        /**\n         * Set configuration\n         * @param {Object} config\n         */\n        setConfig: function (config) {\n            this.config = config;\n        },\n\n        /**\n         * Get payment name\n         * @returns {String}\n         */\n        getCode: function () {\n            return this.code;\n        },\n\n        /**\n         * Get client token\n         * @returns {String|*}\n         */\n        getClientToken: function () {\n            return window.checkoutConfig.payment[this.getCode()].clientToken;\n        },\n\n        /**\n         * @returns {String}\n         */\n        getEnvironment: function () {\n            return window.checkoutConfig.payment[this.getCode()].environment;\n        },\n\n        getCurrentCode: function (paypalType = null) {\n            var code = 'braintree_paypal';\n            if (paypalType !== 'paypal') {\n                code = code + '_' + paypalType;\n            }\n            return code;\n        },\n\n        /**\n         * @returns {String}\n         */\n        getColor: function (paypalType = null) {\n            return window.checkoutConfig.payment[this.getCurrentCode(paypalType)].style.color;\n        },\n\n        /**\n         * @returns {String}\n         */\n        getShape: function (paypalType = null) {\n            return window.checkoutConfig.payment[this.getCurrentCode(paypalType)].style.shape;\n        },\n\n        /**\n         * @returns {String}\n         */\n        getLayout: function (paypalType = null) {\n            return window.checkoutConfig.payment[this.getCurrentCode(paypalType)].style.layout;\n        },\n\n        /**\n         * @returns {String}\n         */\n        getSize: function (paypalType = null) {\n            return window.checkoutConfig.payment[this.getCurrentCode(paypalType)].style.size;\n        },\n\n        /**\n         * @returns {String}\n         */\n        getLabel: function (paypalType = null) {\n            return window.checkoutConfig.payment[this.getCurrentCode(paypalType)].style.label;\n        },\n\n        /**\n         * @returns {String}\n         */\n        getTagline: function (paypalType = null) {\n            return window.checkoutConfig.payment[this.getCurrentCode(paypalType)].style.tagline;\n        },\n\n        /**\n         * @returns {String}\n         */\n        getBranding: function () {\n            return null;\n        },\n\n        /**\n         * @returns {String}\n         */\n        getFundingIcons: function () {\n            return null;\n        },\n\n        /**\n         * @returns {String}\n         */\n        getDisabledFunding: function () {\n            return window.checkoutConfig.payment[this.getCode()].disabledFunding;\n        },\n\n        /**\n         * Show error message\n         *\n         * @param {String} errorMessage\n         */\n        showError: function (errorMessage) {\n            globalMessageList.addErrorMessage({\n                message: errorMessage\n            });\n            fullScreenLoader.stopLoader(true);\n        },\n\n        /**\n         * Disable submit button\n         */\n        disableButton: function () {\n            // stop any previous shown loaders\n            fullScreenLoader.stopLoader(true);\n            fullScreenLoader.startLoader();\n            $('[data-button=\"place\"]').attr('disabled', 'disabled');\n        },\n\n        /**\n         * Enable submit button\n         */\n        enableButton: function () {\n            $('[data-button=\"place\"]').removeAttr('disabled');\n            fullScreenLoader.stopLoader();\n        },\n\n        /**\n         * Has PayPal been init'd already\n         */\n        getPayPalInstance: function() {\n            if (typeof this.config.paypalInstance !== 'undefined' && this.config.paypalInstance) {\n                return this.config.paypalInstance;\n            }\n\n            return null;\n        },\n\n        setPayPalInstance: function(val) {\n            this.config.paypalInstance = val;\n        },\n\n        /**\n         * Setup Braintree SDK\n         */\n        setup: function (callback) {\n            if (!this.getClientToken()) {\n                this.showError($t('Sorry, but something went wrong.'));\n                return;\n            }\n\n            if (this.clientInstance) {\n                if (typeof this.config.onReady === 'function') {\n                    this.config.onReady(this);\n                }\n\n                if (typeof callback === \"function\") {\n                    callback(this.clientInstance);\n                }\n                return;\n            }\n\n            client.create({\n                authorization: this.getClientToken()\n            }, function (clientErr, clientInstance) {\n                if (clientErr) {\n                    console.error('Braintree Setup Error', clientErr);\n                    return this.showError(\"Sorry, but something went wrong. Please contact the store owner.\");\n                }\n\n                var options = {\n                    client: clientInstance\n                };\n\n                if (typeof this.config.dataCollector === 'object' && typeof this.config.dataCollector.paypal === 'boolean') {\n                    options.paypal = true;\n                }\n\n                dataCollector.create(options, function (err, dataCollectorInstance) {\n                    if (err) {\n                        return console.log(err);\n                    }\n\n                    this.deviceData = dataCollectorInstance.deviceData;\n                    this.config.onDeviceDataRecieved(this.deviceData);\n                }.bind(this));\n\n                this.clientInstance = clientInstance;\n\n                if (typeof this.config.onReady === 'function') {\n                    this.config.onReady(this);\n                }\n\n                if (typeof callback === \"function\") {\n                    callback(this.clientInstance);\n                }\n            }.bind(this));\n        },\n\n        /**\n         * Setup hosted fields instance\n         */\n        setupHostedFields: function () {\n            var self = this;\n\n            if (this.hostedFieldsInstance) {\n                this.hostedFieldsInstance.teardown(function () {\n                    this.hostedFieldsInstance = null;\n                    this.setupHostedFields();\n                }.bind(this));\n                return;\n            }\n\n            hostedFields.create({\n                client: this.clientInstance,\n                fields: this.config.hostedFields,\n                styles: {\n                    \"input\": {\n                        \"font-size\": \"14pt\",\n                        \"color\": \"#3A3A3A\"\n                    },\n                    \":focus\": {\n                        \"color\": \"black\"\n                    },\n                    \".valid\": {\n                        \"color\": \"green\"\n                    },\n                    \".invalid\": {\n                        \"color\": \"red\"\n                    }\n                }\n            }, function (createErr, hostedFieldsInstance) {\n                if (createErr) {\n                    self.showError($t(\"Braintree hosted fields could not be initialized. Please contact the store owner.\"));\n                    console.error('Braintree hosted fields error', createErr);\n                    return;\n                }\n\n                this.config.onInstanceReady(hostedFieldsInstance);\n                this.hostedFieldsInstance = hostedFieldsInstance;\n            }.bind(this));\n        },\n\n        tokenizeHostedFields: function () {\n            this.hostedFieldsInstance.tokenize({}, function (tokenizeErr, payload) {\n                if (tokenizeErr) {\n                    switch (tokenizeErr.code) {\n                        case 'HOSTED_FIELDS_FIELDS_EMPTY':\n                            // occurs when none of the fields are filled in\n                            console.error('All fields are empty! Please fill out the form.');\n                            break;\n                        case 'HOSTED_FIELDS_FIELDS_INVALID':\n                            // occurs when certain fields do not pass client side validation\n                            console.error('Some fields are invalid:', tokenizeErr.details.invalidFieldKeys);\n                            break;\n                        case 'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE':\n                            // occurs when:\n                            //   * the client token used for client authorization was generated\n                            //     with a customer ID and the fail on duplicate payment method\n                            //     option is set to true\n                            //   * the card being tokenized has previously been vaulted (with any customer)\n                            // See: https://developers.braintreepayments.com/reference/request/client-token/generate/#options.fail_on_duplicate_payment_method\n                            console.error('This payment method already exists in your vault.');\n                            break;\n                        case 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED':\n                            // occurs when:\n                            //   * the client token used for client authorization was generated\n                            //     with a customer ID and the verify card option is set to true\n                            //     and you have credit card verification turned on in the Braintree\n                            //     control panel\n                            //   * the cvv does not pass verfication (https://developers.braintreepayments.com/reference/general/testing/#avs-and-cvv/cid-responses)\n                            // See: https://developers.braintreepayments.com/reference/request/client-token/generate/#options.verify_card\n                            console.error('CVV did not pass verification');\n                            break;\n                        case 'HOSTED_FIELDS_FAILED_TOKENIZATION':\n                            // occurs for any other tokenization error on the server\n                            console.error('Tokenization failed server side. Is the card valid?');\n                            break;\n                        case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':\n                            // occurs when the Braintree gateway cannot be contacted\n                            console.error('Network error occurred when tokenizing.');\n                            break;\n                        default:\n                            console.error('Something bad happened!', tokenizeErr);\n                    }\n                } else {\n                    this.config.onPaymentMethodReceived(payload);\n                }\n            }.bind(this));\n        }\n    };\n});\n\n"}
}});