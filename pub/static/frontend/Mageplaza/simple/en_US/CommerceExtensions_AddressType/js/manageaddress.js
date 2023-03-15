define([
    'jquery',
    'mage/url'
], function ($,url) {
    'use strict';
    $(document).on('change',".admin__field-control .admin__field-option input",function(){
        var address = $(this).val();
        if(address == 'Other')
        {
            $('.cls-lbl-type-address').show();
        }
        else
        {
            $('.cls-lbl-type-address').hide();
        }
    });
});