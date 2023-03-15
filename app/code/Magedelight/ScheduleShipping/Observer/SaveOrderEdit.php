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

use Magento\Framework\App\RequestInterface;
use Magento\Framework\Event\Observer as EventObserver;
use Magento\Framework\Event\ObserverInterface;

class SaveOrderEdit implements ObserverInterface
{

    /**
     * @var \Magento\Framework\App\RequestInterface
     */
    protected $_request;

    /**
     * @param Context $context
     */
    public function __construct(
        RequestInterface $request
    ) {
        $this->_request = $request;
    }

    /**
     * Set payment fee to order
     *
     * @param EventObserver $observer
     * @return \Magedelight\ScheduleShipping\Observer\SaveOrderEdit
     */
    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        $quote = $observer->getQuote();
        $order = $observer->getOrder();
        $delivery_date = $this->_request->getPost('delivery_date');

        if (isset($delivery_date) && ! empty($delivery_date)) {

            $order->setDeliveryDate($delivery_date);
            $delivery_comment = $this->_request->getPost('delivery_comment');
            $delivery_call = $this->_request->getPost('delivery_call');
            $delivery_timeslot = $this->_request->getPost('delivery_timeslot');
            $order->setDeliveryComment(htmlentities($delivery_comment));
            $order->setDeliveryCall($delivery_call);
            $quote->setDeliveryDate($delivery_date);
            $quote->setDeliveryComment(htmlentities($delivery_comment));
            $quote->setDeliveryCall($delivery_call);
            $quote->setDeliveryTimeslot($delivery_timeslot);
            $order->save();
        }
        return $this;
    }
}
