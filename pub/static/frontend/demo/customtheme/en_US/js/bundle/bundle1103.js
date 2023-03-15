require.config({"config": {
        "text":{"Magento_Customer/template/authentication-popup.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n -->\n\n<div class=\"block-authentication\"\n     data-bind=\"afterRender: setModalElement, blockLoader: isLoading\"\n     style=\"display: none\">\n    <div class=\"block block-new-customer\"\n         data-bind=\"attr: {'data-label': $t('or')}\">\n        <div class=\"block-title\">\n            <strong id=\"block-new-customer-heading\"\n                    role=\"heading\"\n                    aria-level=\"2\"\n                    data-bind=\"i18n: 'Checkout as a new customer'\"></strong>\n        </div>\n        <div class=\"block-content\" aria-labelledby=\"block-new-customer-heading\">\n            <p data-bind=\"i18n: 'Creating an account has many benefits:'\"></p>\n            <ul>\n                <li data-bind=\"i18n: 'See order and shipping status'\"></li>\n                <li data-bind=\"i18n: 'Track order history'\"></li>\n                <li data-bind=\"i18n: 'Check out faster'\"></li>\n            </ul>\n            <div class=\"actions-toolbar\">\n                <div class=\"primary\">\n                    <a class=\"action action-register primary\" data-bind=\"attr: {href: registerUrl}\">\n                        <span data-bind=\"i18n: 'Create an Account'\"></span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"block block-customer-login\"\n         data-bind=\"attr: {'data-label': $t('or')}\">\n        <div class=\"block-title\">\n            <strong id=\"block-customer-login-heading\"\n                    role=\"heading\"\n                    aria-level=\"2\"\n                    data-bind=\"i18n: 'Checkout using your account'\"></strong>\n        </div>\n        <!-- ko foreach: getRegion('messages') -->\n        <!-- ko template: getTemplate() --><!-- /ko -->\n        <!--/ko-->\n        <!-- ko foreach: getRegion('before') -->\n        <!-- ko template: getTemplate() --><!-- /ko -->\n        <!-- /ko -->\n        <div class=\"block-content\" aria-labelledby=\"block-customer-login-heading\">\n            <form class=\"form form-login\"\n                  method=\"post\"\n                  data-bind=\"event: {submit: login }\"\n                  id=\"login-form\">\n                <div class=\"fieldset login\" data-bind=\"attr: {'data-hasrequired': $t('* Required Fields')}\">\n                    <div class=\"field email required\">\n                        <label class=\"label\" for=\"customer-email\"><span data-bind=\"i18n: 'Email Address'\"></span></label>\n                        <div class=\"control\">\n                            <input name=\"username\"\n                                   id=\"customer-email\"\n                                   type=\"email\"\n                                   class=\"input-text\"\n                                   data-mage-init='{\"mage/trim-input\":{}}'\n                                   data-bind=\"attr: {autocomplete: autocomplete}\"\n                                   data-validate=\"{required:true, 'validate-email':true}\">\n                        </div>\n                    </div>\n                    <div class=\"field password required\">\n                        <label for=\"pass\" class=\"label\"><span data-bind=\"i18n: 'Password'\"></span></label>\n                        <div class=\"control\">\n                            <input name=\"password\"\n                                   type=\"password\"\n                                   class=\"input-text\"\n                                   id=\"pass\"\n                                   data-bind=\"attr: {autocomplete: autocomplete}\"\n                                   data-validate=\"{required:true}\">\n                        </div>\n                    </div>\n                    <!-- ko foreach: getRegion('additional-login-form-fields') -->\n                    <!-- ko template: getTemplate() --><!-- /ko -->\n                    <!-- /ko -->\n                    <div class=\"actions-toolbar\">\n                        <input name=\"context\" type=\"hidden\" value=\"checkout\" />\n                        <div class=\"primary\">\n                            <button type=\"submit\" class=\"action action-login secondary\" name=\"send\" id=\"send2\">\n                                <span data-bind=\"i18n: 'Sign In'\"></span>\n                            </button>\n                        </div>\n                        <div class=\"secondary\">\n                            <a class=\"action\" data-bind=\"attr: {href: forgotPasswordUrl}\">\n                                <span data-bind=\"i18n: 'Forgot Your Password?'\"></span>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n"}
}});