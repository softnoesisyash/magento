require.config({"config": {
        "text":{"PayPal_Braintree/template/payment/form.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n-->\n<div data-bind=\"attr: {class: 'payment-method payment-method-' + getCode()}, css: {'_active': isActive()}\">\n    <div class=\"payment-method-title field choice\">\n        <input type=\"radio\"\n               name=\"payment[method]\"\n                class=\"radio\"\n                data-bind=\"\n                    attr: {'id': getCode()},\n                    value: getCode(),\n                    checked: isChecked,\n                    click: selectPaymentMethod,\n                    visible: isRadioButtonVisible()\">\n        <label class=\"label\" data-bind=\"attr: {'for': getCode()}\">\n            <span data-bind=\"text: getTitle()\"></span>\n        </label>\n    </div>\n    <div class=\"payment-method-content\">\n        <!-- ko foreach: getRegion('messages') -->\n        <!-- ko template: getTemplate() --><!-- /ko -->\n        <!--/ko-->\n        <div class=\"payment-method-billing-address\">\n            <!-- ko foreach: $parent.getRegion(getBillingAddressFormName()) -->\n            <!-- ko template: getTemplate() --><!-- /ko -->\n            <!--/ko-->\n        </div>\n        <form id=\"co-transparent-form-braintree\"\n              class=\"form\"\n              data-bind=\"\"\n              method=\"post\"\n              action=\"#\"\n              novalidate=\"novalidate\">\n            <fieldset data-bind=\"attr: {class: 'fieldset payment items ccard ' + getCode(), id: 'payment_form_' + getCode()}\">\n                <legend class=\"legend\">\n                    <span><!-- ko i18n: 'Credit Card Information'--><!-- /ko --></span>\n                </legend>\n                <br>\n                <div class=\"field number required\">\n                    <label data-bind=\"attr: {for: getCode() + '_cc_number'}\" class=\"label\">\n                        <span><!-- ko i18n: 'Credit Card Number'--><!-- /ko --></span>\n                    </label>\n                    <div class=\"control braintree-card-control\">\n                        <!-- ko if: !selectedCardType() -->\n                            <img data-bind=\"attr: {'src': getIcons('NONE').url}\" class=\"braintree-credit-card-selected\">\n                        <!--/ko-->\n                        <!-- ko if: selectedCardType() -->\n                            <img data-bind=\"attr: {'src': getIcons(selectedCardType()).url}\" class=\"braintree-credit-card-selected\">\n                        <!--/ko-->\n\n                        <div data-bind=\"attr: {id: getCode() + '_cc_number'}\" class=\"hosted-control\"></div>\n                        <div class=\"hosted-error\"><!-- ko i18n: 'Please, enter valid Credit Card Number'--><!-- /ko --></div>\n                    </div>\n                    <div>\n                        <ul class=\"credit-card-types braintree-credit-card-types\">\n                            <!-- ko foreach: {data: getCcAvailableTypes(), as: 'item'} -->\n                            <li class=\"item\">\n                                <!--ko if: $parent.getIcons(item) -->\n                                <img data-bind=\"attr: {\n                                    'src': $parent.getIcons(item).url\n                                }\">\n                                <!--/ko-->\n                            </li>\n                            <!--/ko-->\n                        </ul>\n                        <input type=\"hidden\"\n                               name=\"payment[cc_type]\"\n                               class=\"input-text\"\n                               value=\"\"\n                               data-bind=\"attr: {id: getCode() + '_cc_type', 'data-container': getCode() + '-cc-type'},\n                                    value: creditCardType\n                        \">\n                    </div>\n                </div>\n\n                <div class=\"field number required\">\n                    <label data-bind=\"attr: {for: getCode() + '_expiration'}\" class=\"label\">\n                        <span><!-- ko i18n: 'Expiration Date'--><!-- /ko --></span>\n                    </label>\n                    <div class=\"control\">\n                        <div>\n                            <div data-bind=\"attr: {id: getCode() + '_expirationDate'}\"\n                                 class=\"hosted-control\"></div>\n\n                            <div class=\"hosted-error\"><!-- ko i18n: 'Please, enter valid Expiration Date'--><!-- /ko --></div>\n                        </div>\n                    </div>\n                </div>\n                <!-- ko if: (hasVerification())-->\n                <div class=\"field cvv required\" data-bind=\"attr: {id: getCode() + '_cc_type_cvv_div'}\">\n                    <label data-bind=\"attr: {for: getCode() + '_cc_cid'}\" class=\"label\">\n                        <span><!-- ko i18n: 'Card Verification Number'--><!-- /ko --></span>\n                    </label>\n                    <div class=\"control _with-tooltip\">\n                        <div data-bind=\"attr: {id: getCode() + '_cc_cid'}\" class=\"hosted-control hosted-cid\"></div>\n                        <div class=\"hosted-error\"><!-- ko i18n: 'Please, enter valid Card Verification Number'--><!-- /ko --></div>\n\n                        <div class=\"field-tooltip toggle\">\n                            <span class=\"field-tooltip-action action-cvv\"\n                                  tabindex=\"0\"\n                                  data-toggle=\"dropdown\"\n                                  data-bind=\"attr: {title: $t('What is this?')}, mageInit: {'dropdown':{'activeClass': '_active'}}\">\n                                <span><!-- ko i18n: 'What is this?'--><!-- /ko --></span>\n                            </span>\n                            <div class=\"field-tooltip-content\"\n                                 data-target=\"dropdown\"\n                                 data-bind=\"html: getCvvImageHtml()\"></div>\n                        </div>\n                    </div>\n                </div>\n                <!-- /ko -->\n                <!-- ko if: (isVaultEnabled())-->\n                <div class=\"field choice\">\n                    <input type=\"checkbox\"\n                           name=\"vault[is_enabled]\"\n                           class=\"checkbox\"\n                           data-bind=\"attr: {'id': getCode() + '_enable_vault'}, checked: vaultEnabler.isActivePaymentTokenEnabler\">\n                    <label class=\"label\" data-bind=\"attr: {'for': getCode() + '_enable_vault'}\">\n                        <span><!-- ko i18n: 'Save for later use.'--><!-- /ko --></span>\n                    </label>\n                    <div class=\"field-tooltip toggle\">\n                            <span class=\"field-tooltip-action action-vault\"\n                                  tabindex=\"0\"\n                                  data-toggle=\"dropdown\"\n                                  data-bind=\"attr: {title: $t('What is this?')}, mageInit: {'dropdown':{'activeClass': '_active'}}\">\n                                <span translate=\"'What is this?'\"></span>\n                            </span>\n                        <div class=\"field-tooltip-content\"\n                             data-target=\"dropdown\"\n                             translate=\"'We store you payment information securely on Braintree servers via SSL.'\"></div>\n                    </div>\n                </div>\n                <!-- /ko -->\n            </fieldset>\n            <input type=\"submit\" id=\"braintree_submit\"  style=\"display:none\">\n        </form>\n        <div class=\"checkout-agreements-block\">\n            <!-- ko foreach: $parent.getRegion('before-place-order') -->\n            <!-- ko template: getTemplate() --><!-- /ko -->\n            <!--/ko-->\n        </div>\n        <!-- ko foreach: $parent.getRegion('braintree-recaptcha') -->\n        <!-- ko template: getTemplate() --><!-- /ko -->\n        <!--/ko-->\n        <div class=\"actions-toolbar\">\n            <div class=\"primary\">\n                <button class=\"action primary checkout\"\n                        type=\"submit\"\n                        data-bind=\"\n                            click: placeOrderClick,\n                            attr: {title: $t('Place Order')},\n                            css: {disabled: !isPlaceOrderActionAllowed()},\n                            enable: (getCode() == isChecked())\"\n                        disabled\n                >\n                    <span data-bind=\"i18n: 'Place Order'\"></span>\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n"}
}});