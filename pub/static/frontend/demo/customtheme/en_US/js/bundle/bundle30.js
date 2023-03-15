require.config({"config": {
        "jsbuild":{"OX_AjaxWishlist/js/ajax-wishlist.js":"define([\n\n    'jquery',\n    'Magento_Customer/js/customer-data',\n    'uiComponent',\n    'ko'\n], function ($, customerData, Component, ko) {\n    'use strict';\n    return Component.extend({\n\n        wishlistitem: ko.observable(),\n\n\n        initialize: function () {\n            this._super();\n            this.wishlistitem = customerData.get('wishlist');\n        },\n\n\n    });\n});\n"}
}});
