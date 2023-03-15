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

class OrderToQuote implements ObserverInterface
{

    /**
     * Set payment fee to order
     *
     * @param EventObserver $observer
     * @return \Magedelight\ScheduleShipping\Observer\OrderToQuote
     */
    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        $quote = $observer->getQuote();
        $order = $observer->getOrder();
        $deliveryDate = $order->getDeliveryDate();
        if (isset($deliveryDate) && ! empty($deliveryDate)) {
            $quote->setDeliveryDate($deliveryDate);
            $quote->setDeliveryTimeslot($order->getDeliveryTimeslot());
            $quote->setDeliveryComment(htmlentities($order->getDeliveryComment()));
            $quote->setDeliveryCall($order->getDeliveryCall());
            $quote->setFee($order->getFee());
            $quote->setBaseFee($order->getBaseFee());
        }

        return $this;
    }
}
