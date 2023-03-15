<?php
namespace Magento\Framework\Data\Form\Element\Factory;

/**
 * Interceptor class for @see \Magento\Framework\Data\Form\Element\Factory
 */
class Interceptor extends \Magento\Framework\Data\Form\Element\Factory implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\ObjectManagerInterface $objectManager)
    {
        $this->___init();
        parent::__construct($objectManager);
    }

    /**
     * {@inheritdoc}
     */
    public function create($elementType, array $config = [])
    {
        $pluginInfo = $this->pluginList->getNext($this->subjectType, 'create');
        return $pluginInfo ? $this->___callPlugins('create', func_get_args(), $pluginInfo) : parent::create($elementType, $config);
    }
}
