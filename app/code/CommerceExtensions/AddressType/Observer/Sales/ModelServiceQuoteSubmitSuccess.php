<?php


namespace CommerceExtensions\AddressType\Observer\Sales;

//Setting CoreSession to access global variable
use Magento\Framework\Session\SessionManagerInterface as CoreSession;
use Magento\Framework\App\ResourceConnection;

class ModelServiceQuoteSubmitSuccess implements \Magento\Framework\Event\ObserverInterface
{

    protected $helper;

    protected $logger;

    protected $quoteRepository;
    protected $_coreSession;
    protected $resourceConnection;

    public function __construct(
        \Magento\Quote\Model\QuoteRepository $quoteRepository,
        \Psr\Log\LoggerInterface $logger,
        \CommerceExtensions\AddressType\Helper\Data $helper,
        CoreSession $coreSession,
        ResourceConnection $resourceConnection,
        \Magento\Customer\Model\Session $customerSession,
        ) {    
        $this->quoteRepository = $quoteRepository;
        $this->logger = $logger;
        $this->helper = $helper;
        $this->_coreSession = $coreSession;
        $this->resourceConnection = $resourceConnection;
        $this->customerSession = $customerSession;
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

        //Accessing Core Session Variable

        $addressTypeForShipping = $this->_coreSession->getAddressTypeForShipping();
        $otherAddressForShipping = $this->_coreSession->getOtherAddressForShipping();
        $addressTypeForBilling = $this ->_coreSession->getAddressTypeForBilling();
        $otherAddressForBilling = $this->_coreSession->getOtherAddressForBilling();


        //Getting customer ID

        $customer_id = $this->customerSession->getCustomer()->getId();
        $this->logger->info("Customer ID");
        $this->logger->info($customer_id);

        //Getting Order ID

        $order = $observer->getOrder();
        $order_id = $order->getId();

        //Direct Query for saving custom attribute in customer address table

        $connection = $this->resourceConnection->getConnection();
        $address_type_query = "update customer_address_entity set  address_type_indicator='".$addressTypeForShipping."', other_address='".$otherAddressForShipping."' where parent_id  = '".$customer_id."'";
        $this->logger->info("Customer address query");
        $this->logger->info($address_type_query);
        $connection->query($address_type_query);


        //Direct Query for saving custom attribute in sales order address table

        if($addressTypeForBilling == ''){
            $sales_order_address_query = "update sales_order_address set address_type_indicator='".$addressTypeForShipping."', other_address='".$otherAddressForShipping."' where parent_id = '".$order_id."' AND address_type ='billing'";
            $connection->query($sales_order_address_query);

        }
        else{

            $sales_order_address_query_diff_address = "update sales_order_address set address_type_indicator='".$addressTypeForBilling."', other_address='".$otherAddressForBilling."' where parent_id = '".$order_id."' AND address_type ='billing'";
            $connection->query($sales_order_address_query_diff_address);

            $sales_order_address_query_for_shipping = "update sales_order_address set other_address='".$otherAddressForShipping."' where parent_id = '".$order_id."' AND address_type ='shipping'";
            $connection->query($sales_order_address_query_for_shipping);
        }

        //Unsetting coresession variable 

        $this->_coreSession->unsAddressTypeForShipping();
        $this->_coreSession->unsAddressTypeForBilling();
        $this->_coreSession->unsOtherAddressForShipping();
        $this->_coreSession->unsOtherAddressForBilling();

    }
}
