<?php


namespace CommerceExtensions\AddressType\Observer\Sales;

//Setting CoreSession to access global variable
use Magento\Framework\Session\SessionManagerInterface as CoreSession;

class ModelServiceQuoteSubmitBefore implements \Magento\Framework\Event\ObserverInterface
{

    protected $helper;

    protected $logger;

    protected $quoteRepository;
    protected $_coreSession;

    public function __construct(
        \Magento\Quote\Model\QuoteRepository $quoteRepository,
        \Psr\Log\LoggerInterface $logger,
        \CommerceExtensions\AddressType\Helper\Data $helper,
        CoreSession $coreSession
        ) {    
        $this->quoteRepository = $quoteRepository;
        $this->logger = $logger;
        $this->helper = $helper;
        $this->_coreSession = $coreSession;
    }

    /**
     * Execute observer get order change
     *
     * @param \Magento\Framework\Event\Observer $observer
     * @return void
     */
    public function execute(
        \Magento\Framework\Event\Observer $observer
    ) {

        /** @var \Magento\Sales\Model\Order $order object */
        $order = $observer->getOrder();

        //Accessing Core Session Variable

        // $addressType = $this->_coreSession->getAddressType();
        // $this->logger->info("Observer-ModelServiceQuoteSubmitBefore");
        // $this->logger->info($addressType);

        //Accessing Core Session Variable

        $quote = $this->quoteRepository->get($order->getQuoteId());
        $this->helper->transportFieldsFromExtensionAttributesToObject(
            $quote->getBillingAddress(),
            $order->getBillingAddress(),
            'address_type_indicator'
        );

        $this->helper->transportFieldsFromExtensionAttributesToObject(
            $quote->getShippingAddress(),
            $order->getShippingAddress(),
            'address_type_indicator'
        );

        //Saving 'other_address' value

        $this->helper->OtherAddresstransportFieldsFromExtensionAttributesToObject(
            $quote->getBillingAddress(),
            $order->getBillingAddress(),
            'other_address'
        );

        $this->helper->OtherAddresstransportFieldsFromExtensionAttributesToObject(
            $quote->getShippingAddress(),
            $order->getShippingAddress(),
            'other_address'
        );

    }
}
