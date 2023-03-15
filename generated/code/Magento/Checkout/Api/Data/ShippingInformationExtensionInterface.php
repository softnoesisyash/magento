<?php
namespace Magento\Checkout\Api\Data;

/**
 * ExtensionInterface class for @see \Magento\Checkout\Api\Data\ShippingInformationInterface
 */
interface ShippingInformationExtensionInterface extends \Magento\Framework\Api\ExtensionAttributesInterface
{
    /**
     * @return string|null
     */
    public function getDeliveryDate();

    /**
     * @param string $deliveryDate
     * @return $this
     */
    public function setDeliveryDate($deliveryDate);

    /**
     * @return string|null
     */
    public function getDeliveryTimeslot();

    /**
     * @param string $deliveryTimeslot
     * @return $this
     */
    public function setDeliveryTimeslot($deliveryTimeslot);

    /**
     * @return string|null
     */
    public function getDeliveryComment();

    /**
     * @param string $deliveryComment
     * @return $this
     */
    public function setDeliveryComment($deliveryComment);

    /**
     * @return integer|null
     */
    public function getDeliveryCall();

    /**
     * @param integer $deliveryCall
     * @return $this
     */
    public function setDeliveryCall($deliveryCall);

    /**
     * @return string|null
     */
    public function getFee();

    /**
     * @param string $fee
     * @return $this
     */
    public function setFee($fee);
}
