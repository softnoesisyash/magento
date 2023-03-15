require.config({"config": {
        "text":{"Magento_Ui/templates/grid/sticky/sticky.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n-->\n<div style=\"display: none;\" css=\"stickyClass\" afterRender=\"setStickyNode\">\n    <span class=\"data-grid-cap-left\" afterRender=\"setLeftCap\"></span>\n    <span class=\"data-grid-cap-right\" afterRender=\"setRightCap\"></span>\n\n    <div afterRender=\"setStickyToolbarNode\">\n        <div class=\"admin__data-grid-header\">\n            <div class=\"admin__data-grid-header-row\">\n                <scope args=\"requestChild('listing_massaction')\" render=\"\"></scope>\n                <scope args=\"requestChild('listing_paging')\" render=\"totalTmpl\"></scope>\n                <each args=\"getRegion('dataGridFilters')\" render=\" $data.stickyTmpl || getTemplate()\"></each>\n                <div class=\"admin__data-grid-actions-wrap\" each=\"getRegion('dataGridActions')\" render=\"\"></div>\n                <scope args=\"requestChild('listing_paging')\" render=\"\"></scope>\n            </div>\n        </div>\n\n        <scope args=\"requestChild('listing_filters_chips')\" render=\"$data.stickyTmpl || getTemplate()\"></scope>\n\n        <scope args=\"columnsProvider\" render=\"stickyTmpl\"></scope>\n    </div>\n</div>\n"}
}});