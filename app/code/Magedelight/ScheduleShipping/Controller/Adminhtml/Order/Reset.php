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

namespace Magedelight\ScheduleShipping\Controller\Adminhtml\Order;

class Reset extends \Magento\Framework\App\Action\Action
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
     * Retrieve current order model instance
     *
     * @return \Magento\Sales\Model\Order
     */
    public function getQuote()
    {
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $createOrderModel = $objectManager->get(\Magento\Sales\Model\AdminOrder\Create::class);
        return $quote = $createOrderModel->getQuote();
    }

    /**
     * Save action
     *
     * @SuppressWarnings(PHPMD.CyclomaticComplexity)
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        $delivery_data = $this->getRequest()->getPostValue('delivery_data');
        if (!empty($delivery_data)) {
            $delivery_data = json_decode(stripslashes($delivery_data), true);
        }
        $quote = $this->getQuote();
        try {
            if (isset($delivery_data['delivery_date']) && !empty($delivery_data['delivery_date'])) {
                $quote->setDeliveryDate($delivery_data['delivery_date']);
                $quote->setDeliveryTimeslot($delivery_data['delivery_timeslot']);
                $quote->setFee($delivery_data['delivery_fees']);
                $quote->setBaseFee($delivery_data['delivery_fees']);
                $quote->getShippingAddress()->setCollectShippingRates(true);
                $quote->collectTotals()->save();
            }
        } catch (\Exception $e) {
             $this->messageManager->addErrorMessage($e->getMessage());
        }
        $this->getResponse()->setHeader('Content-type', 'text/html');
        $this->getResponse()->setBody(true);
        $this->getResponse()->sendResponse();
    }
}
