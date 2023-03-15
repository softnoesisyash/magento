var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/action/set-billing-address': {
                'CommerceExtensions_AddressType/js/action/set-billing-address-mixin': true
            },
            'Magento_Checkout/js/action/set-shipping-information': {
                'CommerceExtensions_AddressType/js/action/set-shipping-information-mixin': true
            },
            'Magento_Checkout/js/action/create-shipping-address': {
                'CommerceExtensions_AddressType/js/action/create-shipping-address-mixin': true
            },
            'Magento_Checkout/js/action/place-order': {
                'CommerceExtensions_AddressType/js/action/set-billing-address-mixin': true
            },
            'Magento_Checkout/js/action/create-billing-address': {
                'CommerceExtensions_AddressType/js/action/set-billing-address-mixin': true
            }
        }
    }
};