<?php
namespace Magento\Quote\Api;

/**
 * Extension class for @see \Magento\Quote\Api\ShippingMethodManagementInterface
 */
class ShippingMethodManagementExtension extends \Magento\Framework\Api\AbstractSimpleObject implements ShippingMethodManagementExtensionInterface
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
