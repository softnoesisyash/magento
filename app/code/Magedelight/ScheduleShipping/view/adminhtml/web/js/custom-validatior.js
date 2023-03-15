require([
    'jquery',
    'mage/translate',
    'jquery/validate'],
        function ($) {
            $.validator.addMethod(
                    'validate-max-min-check', function (value) {
                        if (value) {
                            return (value > $('#magedelight_ScheduleShipping_calender_view_deliverydays').val());
                        }
                    }, $.mage.__('The Calender maximum delivery interval days must be more than minimum delivery interval days')
                    );
        }
);