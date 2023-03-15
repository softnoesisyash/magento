<?php
namespace Magento\Checkout\Api;

/**
 * ExtensionInterface class for @see \Magento\Checkout\Api\PaymentInformationManagementInterface
 */
interface PaymentInformationManagementExtensionInterface extends \Magento\Framework\Api\ExtensionAttributesInterface
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
