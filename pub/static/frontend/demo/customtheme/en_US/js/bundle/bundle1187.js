require.config({"config": {
        "text":{"Magento_Ui/templates/grid/paging/paging-detailed-total.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n-->\n<div class=\"admin__control-support-text\">\n    <!-- ko if: totalRecords -->\n        <strong>\n            <text args=\"getFirstItemIndex()\"></text> -\n            <text args=\"getLastItemIndex()\"></text>\n        </strong>\n        <!-- ko i18n: 'of' --><!-- /ko -->\n    <!-- /ko -->\n    <strong text=\"totalRecords\"></strong>\n    <!-- ko i18n: 'records found' --><!-- /ko -->\n    <!-- ko if: totalSelected -->\n        (<text args=\"totalSelected\"></text> <!-- ko i18n: 'selected' --><!-- /ko -->)\n    <!-- /ko -->\n</div>\n"}
}});