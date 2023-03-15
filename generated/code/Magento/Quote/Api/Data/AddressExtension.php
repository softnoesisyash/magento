<?php
namespace Magento\Quote\Api\Data;

/**
 * Extension class for @see \Magento\Quote\Api\Data\AddressInterface
 */
class AddressExtension extends \Magento\Framework\Api\AbstractSimpleObject implements AddressExtensionInterface
{
    /**
     * @return string|null
     */
    public function getPickupLocationCode()
    {
        return $this->_get('pickup_location_code');
    }

    /**
     * @param string $pickupLocationCode
     * @return $this
     */
    public function setPickupLocationCode($pickupLocationCode)
    {
        $this->setData('pickup_location_code', $pickupLocationCode);
        return $this;
    }

    /**
     * @return \Magento\SalesRule\Api\Data\RuleDiscountInterface[]|null
     */
    public function getDiscounts()
    {
        return $this->_get('discounts');
    }

    /**
     * @param \Magento\SalesRule\Api\Data\RuleDiscountInterface[] $discounts
     * @return $this
     */
    public function setDiscounts($discounts)
    {
        $this->setData('discounts', $discounts);
        return $this;
    }

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
