require.config({"config": {
        "text":{"Magento_Ui/templates/grid/editing/header-buttons.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n-->\n<div if=\"isMultiEditing || (hasActive() && (hasMessages() || hasErrors() ))\"\n     attr=\"role: (isMultiEditing && multiEditingButtons) ? 'alertdialog' : 'alert'\"\n     class=\"data-grid-info-panel\">\n    <div if=\"hasMessages() || hasErrors()\" class=\"messages\">\n        <div if=\"hasErrors()\" class=\"message message-warning\">\n            <strong><text args=\"countErrorsMessage()\"></text></strong>\n            <span translate=\"'Please make corrections to the errors in the table below and re-submit.'\"></span>\n        </div>\n        <div class=\"message\" outereach=\"messages\" text=\"message\"\n             css=\"\n                 'message-warning': type === 'warning',\n                 'message-error': type === 'error',\n                 'message-success': type === 'success'\"></div>\n    </div>\n    <div if=\"isMultiEditing && multiEditingButtons\" class=\"data-grid-info-panel-actions\">\n        <button class=\"action-tertiary\" type=\"button\" click=\"cancel\">\n            <span translate=\"'Cancel'\"></span>\n        </button>\n        <button class=\"action-primary\" type=\"button\" click=\"save\" disable=\"!canSave()\">\n            <span translate=\"'Save Edits'\"></span>\n        </button>\n    </div>\n</div>\n"}
}});