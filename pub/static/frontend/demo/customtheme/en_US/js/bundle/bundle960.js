require.config({"config": {
        "jsbuild":{"CommerceExtensions_AddressType/js/manageaddress.js":"define([\n    'jquery',\n    'mage/url'\n], function ($,url) {\n    'use strict';\n    $(document).on('change',\".admin__field-control .admin__field-option input\",function(){\n        var address = $(this).val();\n        if(address == 'Other')\n        {\n            $('.cls-lbl-type-address').show();\n        }\n        else\n        {\n            $('.cls-lbl-type-address').hide();\n        }\n    });\n});"}
}});
