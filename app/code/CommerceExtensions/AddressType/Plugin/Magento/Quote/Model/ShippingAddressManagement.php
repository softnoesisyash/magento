<?php
namespace CommerceExtensions\AddressType\Plugin\Magento\Quote\Model;

use Magento\Framework\App\ResourceConnection;
use Magento\Framework\Session\SessionManagerInterface as CoreSession;

class ShippingAddressManagement
{
    protected $helper;
    protected $logger;
    protected $resourceConnection;
    public function __construct(
        \Psr\Log\LoggerInterface $logger,
        \CommerceExtensions\AddressType\Helper\Data $helper,
        \Magento\Customer\Model\Session $customerSession,
        ResourceConnection $resourceConnection,
        CoreSession $coreSession,
    ) {
        $this->logger = $logger;
        $this->helper = $helper;
        $this->customerSession = $customerSession;
        $this->resourceConnection = $resourceConnection;
        $this->_coreSession = $coreSession;
    }
    public function beforeAssign(
        \Magento\Quote\Model\ShippingAddressManagement $subject,
        $cartId,
        \Magento\Quote\Api\Data\AddressInterface $address
    ) {
        $extAttributes = $address->getExtensionAttributes();
        if (!empty($extAttributes)) {
            $address->setAddressTypeIndicator($extAttributes->getAddressTypeIndicator());
            $address->setOtherAddress($extAttributes->getOtherAddress());

            // Starting CoreSession to set global variable

            $this->_coreSession->start();

            $addressType = $extAttributes->getAddressTypeIndicator();
            $otherAddress = $extAttributes->getOtherAddress();

            $this->logger->info($otherAddress);
            $this->_coreSession->setAddressTypeForShipping($addressType);
            $this->_coreSession->setOtherAddressForShipping($otherAddress);

            // Starting CoreSession to set global variable
        }
    }
}
