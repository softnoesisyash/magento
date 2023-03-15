require.config({"config": {
        "text":{"Magento_Paypal/template/payment/payflow-express.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n-->\n<div class=\"payment-method\" data-bind=\"css: {'_active': (getCode() == isChecked())}\">\n    <div class=\"payment-method-title field choice\">\n        <input type=\"radio\"\n               name=\"payment[method]\"\n               class=\"radio\"\n               data-bind=\"attr: {'id': getCode()}, value: getCode(), checked: isChecked, click: selectPaymentMethod, visible: isRadioButtonVisible()\" />\n        <label data-bind=\"attr: {'for': getCode()}\" class=\"label\">\n            <!-- PayPal Logo -->\n            <img data-bind=\"attr: {src: getPaymentAcceptanceMarkSrc(), alt: $t('Acceptance Mark')}\" class=\"payment-icon\"/>\n            <!-- PayPal Logo -->\n            <span data-bind=\"text: getTitle()\"></span>\n            <a data-bind=\"attr: {href: getPaymentAcceptanceMarkHref()}, click: showAcceptanceWindow\"\n               class=\"action action-help\">\n                <!-- ko i18n: 'What is PayPal?' --><!-- /ko -->\n            </a>\n        </label>\n    </div>\n    <div class=\"payment-method-content\">\n        <!-- ko foreach: getRegion('messages') -->\n        <!-- ko template: getTemplate() --><!-- /ko -->\n        <!--/ko-->\n        <fieldset class=\"fieldset\" data-bind='attr: {id: \"payment_form_\" + getCode()}'>\n            <div class=\"payment-method-note\">\n                <!-- ko i18n: 'You will be redirected to the PayPal website.' --><!-- /ko -->\n            </div>\n        </fieldset>\n        <div class=\"checkout-agreements-block\">\n            <!-- ko foreach: $parent.getRegion('before-place-order') -->\n                <!-- ko template: getTemplate() --><!-- /ko -->\n            <!--/ko-->\n        </div>\n        <div class=\"payment-method-extra-content\">\n            <each args=\"$parent.getRegion('paypal-method-extra-content')\" render=\"\"></each>\n        </div>\n        <div class=\"actions-toolbar\">\n            <div class=\"primary\">\n                <button class=\"action primary checkout\"\n                        type=\"submit\"\n                        data-bind=\"click: continueToPayPal, enable: (getCode() == isChecked())\"\n                        disabled>\n                    <span data-bind=\"i18n: 'Continue to PayPal'\"></span>\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n"}
}});