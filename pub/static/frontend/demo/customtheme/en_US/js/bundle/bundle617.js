require.config({"config": {
        "jsbuild":{"Magento_Paypal/js/view/payment/method-renderer/paypal-express-abstract.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\ndefine([\n    'jquery',\n    'Magento_Checkout/js/view/payment/default',\n    'Magento_Paypal/js/action/set-payment-method',\n    'Magento_Checkout/js/model/payment/additional-validators',\n    'Magento_Checkout/js/model/quote',\n    'Magento_Customer/js/customer-data'\n], function ($, Component, setPaymentMethodAction, additionalValidators, quote, customerData) {\n    'use strict';\n\n    return Component.extend({\n        defaults: {\n            template: 'Magento_Paypal/payment/payflow-express-bml',\n            billingAgreement: ''\n        },\n\n        /** Init observable variables */\n        initObservable: function () {\n            this._super()\n                .observe('billingAgreement');\n\n            return this;\n        },\n\n        /** Open window with  */\n        showAcceptanceWindow: function (data, event) {\n            window.open(\n                $(event.currentTarget).attr('href'),\n                'olcwhatispaypal',\n                'toolbar=no, location=no,' +\n                ' directories=no, status=no,' +\n                ' menubar=no, scrollbars=yes,' +\n                ' resizable=yes, ,left=0,' +\n                ' top=0, width=400, height=350'\n            );\n\n            return false;\n        },\n\n        /** Returns payment acceptance mark link path */\n        getPaymentAcceptanceMarkHref: function () {\n            return window.checkoutConfig.payment.paypalExpress.paymentAcceptanceMarkHref;\n        },\n\n        /** Returns payment acceptance mark image path */\n        getPaymentAcceptanceMarkSrc: function () {\n            return window.checkoutConfig.payment.paypalExpress.paymentAcceptanceMarkSrc;\n        },\n\n        /** Returns billing agreement data */\n        getBillingAgreementCode: function () {\n            return window.checkoutConfig.payment.paypalExpress.billingAgreementCode[this.item.method];\n        },\n\n        /** Returns payment information data */\n        getData: function () {\n            var parent = this._super(),\n                additionalData = null;\n\n            if (this.getBillingAgreementCode()) {\n                additionalData = {};\n                additionalData[this.getBillingAgreementCode()] = this.billingAgreement();\n            }\n\n            return $.extend(true, parent, {\n                'additional_data': additionalData\n            });\n        },\n\n        /** Redirect to paypal */\n        continueToPayPal: function () {\n            if (additionalValidators.validate()) {\n                //update payment method information if additional data was changed\n                setPaymentMethodAction(this.messageContainer).done(\n                    function () {\n                        customerData.invalidate(['cart']);\n                        $.mage.redirect(\n                            window.checkoutConfig.payment.paypalExpress.redirectUrl[quote.paymentMethod().method]\n                        );\n                    }\n                );\n\n                return false;\n            }\n        }\n    });\n});\n"}
}});