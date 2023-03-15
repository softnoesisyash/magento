<?php
namespace Magento\Checkout\Api;

/**
 * Extension class for @see \Magento\Checkout\Api\PaymentInformationManagementInterface
 */
class PaymentInformationManagementExtension extends \Magento\Framework\Api\AbstractSimpleObject implements PaymentInformationManagementExtensionInterface
{
    /**
     * @return string|null
     */
    public function getAddressTypeIndicator()
    {
        return $this->_get('address_type_indicator');
    }

    /**
     * @param string $addressTypeIndicator
     * @return $this
     */
    public function setAddressTypeIndicator($addressTypeIndicator)
    {
        $this->setData('address_type_indicator', $addressTypeIndicator);
        return $this;
    }

    /**
     * @return string|null
     */
    public function getOtherAddress()
    {
        return $this->_get('other_address');
    }

    /**
     * @param string $otherAddress
     * @return $this
     */
    public function setOtherAddress($otherAddress)
    {
        $this->setData('other_address', $otherAddress);
        return $this;
    }
}
