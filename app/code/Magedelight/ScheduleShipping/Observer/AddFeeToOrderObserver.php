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

namespace Magedelight\ScheduleShipping\Observer;

use Magento\Framework\Event\Observer as EventObserver;
use Magento\Framework\Event\ObserverInterface;

class AddFeeToOrderObserver implements ObserverInterface
{

    /**
     * Set payment fee to order
     *
     * @param EventObserver $observer
     * @return \Magedelight\ScheduleShipping\Observer\AddFeeToOrderObserver
     */
    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        $quote = $observer->getQuote();
        $deliveryDate = $quote->getDeliveryDate();
        $deliveryTimeslot = $quote->getDeliveryTimeslot();
        $deliveryComment = $quote->getDeliveryComment();
        $deliveryCall = $quote->getDeliveryCall();
        $CustomFeeFee = $quote->getFee();
        $CustomFeeBaseFee = $quote->getBaseFee();

        //Set fee data to order
        $order = $observer->getOrder();
        $order->setData('delivery_date', $deliveryDate);
        $order->setData('delivery_timeslot', $deliveryTimeslot);
        $order->setData('delivery_comment', $deliveryComment);
        $order->setData('delivery_call', $deliveryCall);
        $order->setData('fee', $CustomFeeFee);
        $order->setData('base_fee', $CustomFeeBaseFee);

        return $this;
    }
}
