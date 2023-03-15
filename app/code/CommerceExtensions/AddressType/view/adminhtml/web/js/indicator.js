    require(
    [
    "jquery"
    ],
    function (jQuery) {
    
        jQuery(document).ready(
            function () {
                jQuery('.admin__page-section-item.order-billing-address .admin__page-section-item-content').append(jQuery('#address-type-billling').html());
                jQuery('.admin__page-section-item.order-shipping-address .admin__page-section-item-content').append(jQuery('#address-type-shipping').html());

            }
        );
    }
);
