require.config({"config": {
        "text":{"Magento_Ui/templates/grid/toolbar.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n-->\n<div class=\"admin__data-grid-header\" afterRender=\"$data.setToolbarNode\">\n    <div class=\"admin__data-grid-header-row\">\n        <div class=\"admin__data-grid-actions-wrap\" each=\"getRegion('dataGridActions')\" render=\"\"></div>\n        <each args=\"getRegion('dataGridFilters')\" render=\"\"></each>\n    </div>\n    <div class=\"admin__data-grid-header-row row row-gutter\">\n        <div class=\"col-xs-2\" if=\"hasChild('listing_massaction')\" ko-scope=\"requestChild('listing_massaction')\" render=\"\"></div>\n        <div css=\"\n            'col-xs-10': hasChild('listing_massaction'),\n            'col-xs-12': !hasChild('listing_massaction')\">\n            <div class=\"row\" ko-scope=\"requestChild('listing_paging')\">\n                <div class=\"col-xs-3\" render=\"totalTmpl\"></div>\n                <div class=\"col-xs-9\" render=\"\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<render args=\"stickyTmpl\" if=\"$data.sticky\"></render>\n"}
}});