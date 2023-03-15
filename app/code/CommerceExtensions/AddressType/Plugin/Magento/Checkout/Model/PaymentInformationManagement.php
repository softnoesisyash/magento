<?php
namespace CommerceExtensions\AddressType\Plugin\Magento\Checkout\Model;

class PaymentInformationManagement
{
    protected $helper;
    protected $logger;
    public function __construct(
        \Psr\Log\LoggerInterface $logger,
        \CommerceExtensions\AddressType\Helper\Data $helper
    ) {
        $this->logger = $logger;
        $this->helper = $helper;
    }
    public function beforeSavePaymentInformation(
        \Magento\Checkout\Model\PaymentInformationManagement $subject,
        $cartId,
        \Magento\Quote\Api\Data\PaymentInterface $paymentMethod,
        \Magento\Quote\Api\Data\AddressInterface $address
    ) {
        $extAttributes = $address->getExtensionAttributes();
        if (!empty($extAttributes)) {
            $address->setAddressTypeIndicator($extAttributes->getAddressTypeIndicator());
            $address->setOtherAddress($extAttributes->getOtherAddress());
        }
    }
}
