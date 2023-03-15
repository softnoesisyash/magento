require.config({"config": {
        "text":{"Magento_Ui/template/messages.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n-->\n<div data-role=\"checkout-messages\" class=\"messages\" data-bind=\"visible: isVisible(), click: removeAll\">\n    <!-- ko foreach: messageContainer.getErrorMessages() -->\n    <div aria-atomic=\"true\" role=\"alert\" class=\"message message-error error\">\n        <div data-ui-id=\"checkout-cart-validationmessages-message-error\" data-bind=\"text: $data\"></div>\n    </div>\n    <!--/ko-->\n    <!-- ko foreach: messageContainer.getSuccessMessages() -->\n    <div aria-atomic=\"true\" role=\"alert\" class=\"message message-success success\">\n        <div data-ui-id=\"checkout-cart-validationmessages-message-success\" data-bind=\"text: $data\"></div>\n    </div>\n    <!--/ko-->\n</div>\n"}
}});