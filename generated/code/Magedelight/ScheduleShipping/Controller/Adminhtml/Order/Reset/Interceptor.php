<?php
namespace Magedelight\ScheduleShipping\Controller\Adminhtml\Order\Reset;

/**
 * Interceptor class for @see \Magedelight\ScheduleShipping\Controller\Adminhtml\Order\Reset
 */
class Interceptor extends \Magedelight\ScheduleShipping\Controller\Adminhtml\Order\Reset implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Sales\Model\Order $order)
    {
        $this->___init();
        parent::__construct($context, $order);
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
