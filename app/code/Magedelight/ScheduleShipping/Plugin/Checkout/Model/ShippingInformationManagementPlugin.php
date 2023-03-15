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

namespace Magedelight\ScheduleShipping\Plugin\Checkout\Model;

class ShippingInformationManagementPlugin
{

    protected $quoteRepository;

    /**
     *
     * @param \Magento\Quote\Model\QuoteRepository $quoteRepository
     */
    public function __construct(
        \Magento\Quote\Model\QuoteRepository $quoteRepository
    ) {
        $this->quoteRepository = $quoteRepository;
    }

    /**
     *
     * @param \Magento\Checkout\Model\ShippingInformationManagement $subject
     * @param type $cartId
     * @param \Magento\Checkout\Api\Data\ShippingInformationInterface $addressInformation
     */
    public function beforeSaveAddressInformation(
        \Magento\Checkout\Model\ShippingInformationManagement $subject,
        $cartId,
        \Magento\Checkout\Api\Data\ShippingInformationInterface $addressInformation
    ) {
        $extAttributes = $addressInformation->getExtensionAttributes();
        $deliverydate = $extAttributes->getDeliveryDate();
        $deliveryTimeslot = $extAttributes->getDeliveryTimeslot();
        $deliveryComment = $extAttributes->getDeliveryComment();
        $deliveryCall = $extAttributes->getDeliveryCall();
        $customFee = $extAttributes->getFee();
        $quote = $this->quoteRepository->getActive($cartId);
        $quote->setDeliveryDate($deliverydate);
        $quote->setDeliveryTimeslot($deliveryTimeslot);
        $quote->setDeliveryComment($deliveryComment);
        $quote->setDeliveryCall($deliveryCall);
        if ($customFee) {
            $quote->setFee($customFee);
        } else {
            $quote->setFee(0);
        }
    }
}
