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

namespace Magedelight\ScheduleShipping\Block\Adminhtml\Sales\Order;

class View extends \Magedelight\ScheduleShipping\Block\Shipping
{

    /**
     * Retrieve current order model instance
     *
     * @return \Magento\Sales\Model\Order
     */
    public function getQuote()
    {
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $createOrderModel = $objectManager->get('Magento\Sales\Model\AdminOrder\Create');
        return $quote = $createOrderModel->getQuote();
    }

    public function checkDisplay()
    {
        if ($this->_request->getFullActionName() == 'sales_order_edit_index') {
            $quote = $this->getQuote();
            if (isset($quote) && $quote->getDeliveryDate()) {
                return true;
            }
        } elseif ($this->_request->getFullActionName() == 'sales_order_create_index') {
            return true;
        }
        return false;
    }
}
