<?php

/**
 * Magedelight
 * Copyright (C) 2017 Magedelight <info@magedelight.com>
 *
 * @category Magedelight
 * @package Magedelight_ScheduleShipping
 * @copyright Copyright (c) 2017 Mage Delight (http://www.magedelight.com/)
 * @license http://opensource.org/licenses/gpl-3.0.html GNU General Public License,version 3 (GPL-3.0)
 * @author Magedelight <info@magedelight.com>
 */

namespace Magedelight\ScheduleShipping\Block\Sales\Order;

class View extends \Magedelight\ScheduleShipping\Block\Shipping
{
    /**
     * Retrieve current order model instance
     *
     * @return \Magento\Sales\Model\Order
     */
    public function getOrder()
    {
        return  $this->registry->registry('current_order');
    }
    
    public function getStoreCurrency()
    {
        
        return $this->storeManager->getStore()->getCurrentCurrency()->getCurrencySymbol();
    }
}
