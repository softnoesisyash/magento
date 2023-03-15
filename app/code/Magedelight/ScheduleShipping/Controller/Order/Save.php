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

namespace Magedelight\ScheduleShipping\Controller\Order;

class Save extends \Magento\Framework\App\Action\Action
{
    protected $order;

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Sales\Model\Order $order
    ) {
        parent::__construct($context);
        $this->order = $order;
    }

    /**
     * Save action
     *
     * @SuppressWarnings(PHPMD.CyclomaticComplexity)
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        $data = $this->getRequest()->getPostValue();
        $order = $this->order->load($data['order_id']);
        $resultRedirect = $this->resultRedirectFactory->create();
        try {
            if ($order->getDeliveryDate()) {
                $delivery_date = isset($data['delivery_date']) ? $data['delivery_date'] : '';
                $delivery_timeslot = isset($data['delivery_timeslot']) ? $data['delivery_timeslot'] : '';
                $delivery_comment = isset($data['delivery_comment']) ? $data['delivery_comment'] : '';
                $order->setDeliveryDate($delivery_date);
                $order->setDeliveryTimeslot($delivery_timeslot);
                $order->setDeliveryComment(htmlentities($delivery_comment));
                $delivery_call = 0;
                if (isset($data['delivery_call']) && !empty($data['delivery_call'])
                    && $data['delivery_call'] == 'Yes') {
                    $delivery_call = 1;
                }
                $order->setDeliveryCall($delivery_call);
                $order->addStatusToHistory($order->getStatus(), 'Order delivery updated ');
                $order->save();
                $this->messageManager->addSuccess(__('Order has been updated.'));
            }
        } catch (\Exception $e) {
            $this->messageManager->addError($e->getMessage());
        }
        $resultRedirect->setUrl($this->_redirect->getRefererUrl());
        return $resultRedirect;
    }
}
