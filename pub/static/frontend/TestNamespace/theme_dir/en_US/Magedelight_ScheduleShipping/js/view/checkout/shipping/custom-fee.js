

/**
 * Magedelight
 * Copyright (C) 2016 Magedelight <info@magedelight.com>
 *
 * NOTICE OF LICENSE
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://opensource.org/licenses/gpl-3.0.html.
 *
 * @category Magedelight
 * @package Magedelight_ScheduleShipping
 * @copyright Copyright (c) 2016 Mage Delight (http://www.magedelight.com/)
 * @license http://opensource.org/licenses/gpl-3.0.html GNU General Public License,version 3 (GPL-3.0)
 * @author Magedelight <info@magedelight.com>
 */

define([
    'ko',
    'uiComponent',
    'Magento_Checkout/js/model/quote',
    'Magento_Catalog/js/price-utils'

], function (ko, Component, quote, priceUtils) {
    'use strict';
    var show_hide_customfee_blockConfig = window.checkoutConfig.show_hide_customfee_shipblock;
    var fee_label = window.checkoutConfig.fee_label;
    var custom_fee_amount = window.checkoutConfig.custom_fee_amount;

    return Component.extend({
        defaults: {
            template: 'Magedelight_ScheduleShipping/checkout/shipping/custom-fee'
        },
        canVisibleCustomFeeBlock: show_hide_customfee_blockConfig,
        getFormattedPrice: ko.observable(priceUtils.formatPrice(custom_fee_amount, quote.getPriceFormat())),
        getFeeLabel: ko.observable(fee_label)
    });
});
