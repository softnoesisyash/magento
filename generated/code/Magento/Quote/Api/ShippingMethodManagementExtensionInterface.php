<?php
namespace Magento\Quote\Api;

/**
 * ExtensionInterface class for @see \Magento\Quote\Api\ShippingMethodManagementInterface
 */
interface ShippingMethodManagementExtensionInterface extends \Magento\Framework\Api\ExtensionAttributesInterface
{
    /**
     * @return string|null
     */
    public function getAddressTypeIndicator();

    /**
     * @param string $addressTypeIndicator
     * @return $this
     */
    public function setAddressTypeIndicator($addressTypeIndicator);

    /**
     * @return string|null
     */
    public function getOtherAddress();

    /**
     * @param string $otherAddress
     * @return $this
     */
    public function setOtherAddress($otherAddress);
}
