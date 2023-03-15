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

/**
 * Add Delivery information html in order view | Invoice View | Credit memo view | Shipment view
 */
class AddHtmlToOrderShippingView implements ObserverInterface
{

    /**
     * @var \Magento\Framework\ObjectManagerInterface
     */
    protected $_objectManager;

    /**
     * @param \Magento\Framework\ObjectManagerInterface $objectmanager
     */
    public function __construct(\Magento\Framework\ObjectManagerInterface $objectmanager)
    {
        $this->_objectManager = $objectmanager;
    }

    public function execute(EventObserver $observer)
    {
        /* $observer->getElementName() == 'order_shipping_view' || > for show Shipping & Handling Information section */
        if ($observer->getElementName() == 'order_info') {
            $orderShippingViewBlock = $observer->getLayout()->getBlock($observer->getElementName());
            $order = $orderShippingViewBlock->getOrder();

            if ($order->getDeliveryTimeslot()) {
                $date = date_create($order->getDeliveryDate());
                $deliveryDate = date_format($date, "Y-m-d");
            } else {
                $deliveryDate = $order->getDeliveryDate();
            }

            $deliveryTimeslot = $order->getDeliveryTimeslot();
            $deliveryComment = $order->getDeliveryComment();
            $deliveryCall = $order->getDeliveryCall();
            if ($deliveryCall) {
                $deliveryCall = 'Yes';
            } else {
                $deliveryCall = 'No';
            }
            $deliveryFee = $order->getFee();

            $deliveryInfoBlock = $this->_objectManager->create(\Magento\Framework\View\Element\Template::class);
            if (!empty($deliveryDate)) {
                $deliveryInfoBlock->setDeliveryDate($deliveryDate);
                $deliveryInfoBlock->setDeliveryTimeslot($deliveryTimeslot);
                $deliveryInfoBlock->setDeliveryComment(htmlentities($deliveryComment));
                $deliveryInfoBlock->setDeliveryCall($deliveryCall);
                $deliveryInfoBlock->setDeliveryFee($deliveryFee);

                $deliveryInfoBlock->setTemplate('Magedelight_ScheduleShipping::order/view/deliveryinfo.phtml');
                $html = $observer->getTransport()->getOutput() . $deliveryInfoBlock->toHtml();
                $observer->getTransport()->setOutput($html);
            }
        }
    }
}
