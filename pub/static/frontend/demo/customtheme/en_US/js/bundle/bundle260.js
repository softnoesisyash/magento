require.config({"config": {
        "jsbuild":{"Magento_Weee/js/view/checkout/summary/item/price/row_incl_tax.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\n/**\n * @api\n */\n\ndefine([\n    'Magento_Weee/js/view/checkout/summary/item/price/weee'\n], function (weee) {\n    'use strict';\n\n    return weee.extend({\n        defaults: {\n            template: 'Magento_Weee/checkout/summary/item/price/row_incl_tax',\n            displayArea: 'row_incl_tax'\n        },\n\n        /**\n         * @param {Object} item\n         * @return {Number}\n         */\n        getFinalRowDisplayPriceInclTax: function (item) {\n            var rowTotalInclTax = parseFloat(item['row_total_incl_tax']);\n\n            if (!window.checkoutConfig.getIncludeWeeeFlag) {\n                rowTotalInclTax += this.getRowWeeeTaxInclTax(item);\n            }\n\n            return rowTotalInclTax;\n        },\n\n        /**\n         * @param {Object} item\n         * @return {Number}\n         */\n        getRowDisplayPriceInclTax: function (item) {\n            var rowTotalInclTax = parseFloat(item['row_total_incl_tax']);\n\n            if (window.checkoutConfig.getIncludeWeeeFlag) {\n                rowTotalInclTax += this.getRowWeeeTaxInclTax(item);\n            }\n\n            return rowTotalInclTax;\n        },\n\n        /**\n         * @param {Object}item\n         * @return {Number}\n         */\n        getRowWeeeTaxInclTax: function (item) {\n            var totalWeeeTaxInclTaxApplied = 0,\n                weeeTaxAppliedAmounts;\n\n            if (item['weee_tax_applied']) {\n                weeeTaxAppliedAmounts = JSON.parse(item['weee_tax_applied']);\n                weeeTaxAppliedAmounts.forEach(function (weeeTaxAppliedAmount) {\n                    totalWeeeTaxInclTaxApplied += parseFloat(Math.max(weeeTaxAppliedAmount['row_amount_incl_tax'], 0));\n                });\n            }\n\n            return totalWeeeTaxInclTaxApplied;\n        }\n\n    });\n});\n"}
}});