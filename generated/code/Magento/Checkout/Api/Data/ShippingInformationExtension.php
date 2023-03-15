<?php
namespace Magento\Checkout\Api\Data;

/**
 * Extension class for @see \Magento\Checkout\Api\Data\ShippingInformationInterface
 */
class ShippingInformationExtension extends \Magento\Framework\Api\AbstractSimpleObject implements ShippingInformationExtensionInterface
{
    /**
     * @return string|null
     */
    public function getDeliveryDate()
    {
        return $this->_get('delivery_date');
    }

    /**
     * @param string $deliveryDate
     * @return $this
     */
    public function setDeliveryDate($deliveryDate)
    {
        $this->setData('delivery_date', $deliveryDate);
        return $this;
    }

    /**
     * @return string|null
     */
    public function getDeliveryTimeslot()
    {
        return $this->_get('delivery_timeslot');
    }

    /**
     * @param string $deliveryTimeslot
     * @return $this
     */
    public function setDeliveryTimeslot($deliveryTimeslot)
    {
        $this->setData('delivery_timeslot', $deliveryTimeslot);
        return $this;
    }

    /**
     * @return string|null
     */
    public function getDeliveryComment()
    {
        return $this->_get('delivery_comment');
    }

    /**
     * @param string $deliveryComment
     * @return $this
     */
    public function setDeliveryComment($deliveryComment)
    {
        $this->setData('delivery_comment', $deliveryComment);
        return $this;
    }

    /**
     * @return integer|null
     */
    public function getDeliveryCall()
    {
        return $this->_get('delivery_call');
    }

    /**
     * @param integer $deliveryCall
     * @return $this
     */
    public function setDeliveryCall($deliveryCall)
    {
        $this->setData('delivery_call', $deliveryCall);
        return $this;
    }

    /**
     * @return string|null
     */
    public function getFee()
    {
        return $this->_get('fee');
    }

    /**
     * @param string $fee
     * @return $this
     */
    public function setFee($fee)
    {
        $this->setData('fee', $fee);
        return $this;
    }
}
