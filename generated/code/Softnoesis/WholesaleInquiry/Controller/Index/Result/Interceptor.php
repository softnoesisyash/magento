<?php
namespace Softnoesis\WholesaleInquiry\Controller\Index\Result;

/**
 * Interceptor class for @see \Softnoesis\WholesaleInquiry\Controller\Index\Result
 */
class Interceptor extends \Softnoesis\WholesaleInquiry\Controller\Index\Result implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory, \Magento\Framework\Mail\Template\TransportBuilder $transportBuilder, \Magento\Store\Model\StoreManagerInterface $storeManager, \Magento\Framework\Translate\Inline\StateInterface $state, \Magento\Framework\Math\Random $mathRandom, \Psr\Log\LoggerInterface $logger, \Magento\Framework\Controller\ResultFactory $resultFactory, \Magento\Framework\Json\Helper\Data $jsonHelper, \Softnoesis\WholesaleInquiry\Model\ExtensionFactory $extensionFactory)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $resultJsonFactory, $transportBuilder, $storeManager, $state, $mathRandom, $logger, $resultFactory, $jsonHelper, $extensionFactory);
    }

    /**
     * {@inheritdoc}
     */
    public function execute()
    {
        $pluginInfo = $this->pluginList->getNext($this->subjectType, 'execute');
        return $pluginInfo ? $this->___callPlugins('execute', func_get_args(), $pluginInfo) : parent::execute();
    }

    /**
     * {@inheritdoc}
     */
    public function dispatch(\Magento\Framework\App\RequestInterface $request)
    {
        $pluginInfo = $this->pluginList->getNext($this->subjectType, 'dispatch');
        return $pluginInfo ? $this->___callPlugins('dispatch', func_get_args(), $pluginInfo) : parent::dispatch($request);
    }
}
