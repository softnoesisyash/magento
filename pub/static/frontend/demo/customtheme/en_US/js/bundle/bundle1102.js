require.config({"config": {
        "text":{"Magento_GiftMessage/template/gift-message-item-level.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n -->\n<!-- ko if: isActive() || hasActiveOptions() -->\n<button class=\"action action-gift\"\n        data-bind=\"\n            click: $data.toggleFormBlockVisibility.bind($data),\n            css: {_active: formBlockVisibility() || resultBlockVisibility()}\n        \">\n    <span data-bind=\"i18n: 'Gift options'\"></span>\n</button>\n<div class=\"gift-content\" data-bind=\"css: {_active: formBlockVisibility() || resultBlockVisibility()}\"> <!-- add class \"active\" to display the content -->\n    <!-- ko ifnot: resultBlockVisibility() -->\n        <div class=\"gift-options\">\n            <!-- ko foreach: getRegion('additionalOptions') -->\n                <!-- ko template: getTemplate() --><!-- /ko -->\n            <!-- /ko -->\n            <!-- ko template: formTemplate --><!--/ko-->\n        </div>\n    <!-- /ko -->\n    <!-- ko if: resultBlockVisibility() -->\n        <div class=\"gift-summary\">\n            <!-- ko foreach: getRegion('additionalOptions') -->\n                <!--ko template: appliedTemplate --><!-- /ko -->\n            <!-- /ko -->\n\n            <!-- ko if: getObservable('message') -->\n                <div class=\"gift-message-summary\">\n                    <span data-bind=\"i18n: 'Message' + ':'\"></span>\n                    <!-- ko text: getObservable('message') --><!-- /ko -->\n                </div>\n            <!-- /ko -->\n\n            <div class=\"actions-toolbar\">\n                <div class=\"secondary\">\n                    <button type=\"submit\" class=\"action action-edit\" data-bind=\"\n                            click: $data.editOptions.bind($data),\n                            attr: {title: $t('Edit')}\">\n                        <span data-bind=\"i18n: 'Edit'\"></span>\n                    </button>\n                    <button class=\"action action-delete\" data-bind=\"\n                            click: $data.deleteOptions.bind($data),\n                            attr: {title: $t('Delete')}\">\n                        <span data-bind=\"i18n: 'Delete'\"></span>\n                    </button>\n                </div>\n            </div>\n        </div>\n    <!-- /ko -->\n</div>\n<!-- /ko -->\n"}
}});