require.config({"config": {
        "text":{"Magento_Ui/templates/grid/editing/row-buttons.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n-->\n<tr class=\"data-grid-editable-row data-grid-editable-row-actions\">\n    <td>\n        <button class=\"action-tertiary\" type=\"button\" click=\"cancel\">\n            <span translate=\"'Cancel'\"></span>\n        </button>\n        <button class=\"action-primary\" type=\"button\" click=\"save\" disable=\"!canSave()\">\n            <span translate=\"'Save'\"></span>\n        </button>\n    </td>\n</tr>\n"}
}});