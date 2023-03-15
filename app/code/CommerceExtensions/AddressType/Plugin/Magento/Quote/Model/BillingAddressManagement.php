<?php
namespace CommerceExtensions\AddressType\Plugin\Magento\Quote\Model;

//Setting Coresession variable to set global variable
use Magento\Framework\Session\SessionManagerInterface as CoreSession;
use Magento\Framework\App\ResourceConnection;

class BillingAddressManagement
{
    protected $helper;
    protected $logger;
    protected $_coreSession; //Core Session variable
    public function __construct(
        \Psr\Log\LoggerInterface $logger,
        \CommerceExtensions\AddressType\Helper\Data $helper,
        CoreSession $coreSession,
        ResourceConnection $resourceConnection,
        \Magento\Customer\Model\Session $customerSession,
    ) {
        $this->logger = $logger;
        $this->helper = $helper;
        $this->_coreSession = $coreSession;
        $this->resourceConnection = $resourceConnection;
        $this->customerSession = $customerSession;
    }
    public function beforeAssign(
        \Magento\Quote\Model\BillingAddressManagement $subject,
        $cartId,
        \Magento\Quote\Api\Data\AddressInterface $address,
        $useForShipping = false
    ) {
        $extAttributes = $address->getExtensionAttributes();

        if (!empty($extAttributes)) {
            $address->setAddressTypeIndicator($extAttributes->getAddressTypeIndicator());
            $address->setOtherAddress($extAttributes->getOtherAddress());

            $this->_coreSession->start();

            $addressType = $extAttributes->getAddressTypeIndicator();
            $otherAddress = $extAttributes->getOtherAddress();

            $this->_coreSession->setAddressTypeForBilling($addressType);
            $this->_coreSession->setOtherAddressForBilling($otherAddress);
            // Starting CoreSession to set global variable
        }
    }
}
