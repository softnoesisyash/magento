require.config({"config": {
        "jsbuild":{"Magento_ReCaptchaCheckoutSalesRule/js/checkout-sales-rule.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n/* global grecaptcha */\ndefine(\n    [\n        'Magento_ReCaptchaWebapiUi/js/webapiReCaptcha',\n        'Magento_ReCaptchaWebapiUi/js/webapiReCaptchaRegistry',\n        'jquery',\n        'Magento_SalesRule/js/action/set-coupon-code',\n        'Magento_SalesRule/js/action/cancel-coupon',\n        'Magento_Checkout/js/model/quote',\n        'ko'\n    ], function (Component, recaptchaRegistry, $, setCouponCodeAction, cancelCouponAction, quote, ko) {\n        'use strict';\n\n        var totals = quote.getTotals(),\n            couponCode = ko.observable(null),\n            isApplied;\n\n        if (totals()) {\n            couponCode(totals()['coupon_code']);\n        }\n        //Captcha can only be required for adding a coupon so we need to know if one was added already.\n        isApplied = ko.observable(couponCode() != null);\n\n        return Component.extend({\n\n            /**\n             * Initialize parent form.\n             *\n             * @param {Object} parentForm\n             * @param {String} widgetId\n             */\n            initParentForm: function (parentForm, widgetId) {\n                var self = this,\n                    xRecaptchaValue,\n                    captchaId = this.getReCaptchaId();\n\n                this._super();\n\n                if (couponCode() != null) {\n                    if (isApplied) {\n                        self.validateReCaptcha(true);\n                        $('#' + captchaId).hide();\n                    }\n                }\n\n                if (recaptchaRegistry.triggers.hasOwnProperty('recaptcha-checkout-coupon-apply')) {\n                    recaptchaRegistry.addListener('recaptcha-checkout-coupon-apply', function (token) {\n                        //Add reCaptcha value to coupon request\n                        xRecaptchaValue = token;\n                    });\n                }\n\n                setCouponCodeAction.registerDataModifier(function (headers) {\n                    headers['X-ReCaptcha'] = xRecaptchaValue;\n                });\n\n                if (self.getIsInvisibleRecaptcha()) {\n                    grecaptcha.execute(widgetId);\n                    self.validateReCaptcha(true);\n                }\n                //Refresh reCaptcha after failed request.\n                setCouponCodeAction.registerFailCallback(function () {\n                    if (self.getIsInvisibleRecaptcha()) {\n                        grecaptcha.execute(widgetId);\n                        self.validateReCaptcha(true);\n                    } else {\n                        self.validateReCaptcha(false);\n                        grecaptcha.reset(widgetId);\n                        $('#' + captchaId).show();\n                    }\n                });\n                //Hide captcha when a coupon has been applied.\n                setCouponCodeAction.registerSuccessCallback(function () {\n                    self.validateReCaptcha(true);\n                    $('#' + captchaId).hide();\n                });\n                //Show captcha again if it was canceled.\n                cancelCouponAction.registerSuccessCallback(function () {\n                    self.validateReCaptcha(false);\n                    grecaptcha.reset(widgetId);\n                    $('#' + captchaId).show();\n                });\n            }\n        });\n    });\n"}
}});