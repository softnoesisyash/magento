<?php
 
namespace Softnoesis\Addtocartpopup\Observer;
 
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
 
class RedirectCheckout implements ObserverInterface
{
    protected $logger;


    public function __construct(

      \Psr\Log\LoggerInterface $logger

      ) {

        $this->logger = $logger;

    }
    /**
     * Below is the method that will fire whenever the event runs!
     *
     * @param Observer $observer
     */
    public function execute(Observer $observer)
    {
        $a = "dipika here";
        $this->logger->info($a);
       /* $product = $observer->getProduct();
        $originalName = $product->getName();
        $modifiedName = $originalName . ' - Modified by Magento 2 Events and Observers';
        $product->setName($modifiedName);*/
    }
}