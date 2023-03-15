define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote'
], function ($, wrapper,quote) {
    'use strict';

    return function (setShippingInformationAction) {
        return wrapper.wrap(setShippingInformationAction, function (originalAction, messageContainer) {
            
            if (messageContainer.custom_attributes != undefined) {
                $.each(messageContainer.custom_attributes , function ( key, value ) {
                    if ($.isPlainObject(value)) {
                        value = value['value'];
                    }
                    messageContainer['custom_attributes'][key] = {'attribute_code':key,'value':value};
                });
            }
            console.log(messageContainer.custom_attributes);
            return originalAction(messageContainer);
        });
    }
});