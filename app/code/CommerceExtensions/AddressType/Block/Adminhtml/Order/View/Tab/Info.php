<?php
namespace CommerceExtensions\AddressType\Block\Adminhtml\Order\View\Tab;

class Info extends \Magento\Sales\Block\Adminhtml\Order\View\Tab\Info implements
    \Magento\Backend\Block\Widget\Tab\TabInterface
{
    /**
     * Sales address model
     *
     * @var \Magento\Sales\Model\Order\Address
     */

    private $salesAddressModel;
    /**
     * Core registry
     *
     * @var \Magento\Framework\Registry
     */
    protected $_coreRegistry = null;

    /**
     * Admin helper
     *
     * @var \Magento\Sales\Helper\Admin
     */
    protected $_adminHelper;

    /**
     * @param \Magento\Backend\Block\Template\Context $context
     * @param \Magento\Framework\Registry $registry
     * @param \Magento\Sales\Helper\Admin $adminHelper
     */
    public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\Framework\Registry $registry,
        \Magento\Sales\Helper\Admin $adminHelper,
        \Magento\Sales\Model\Order\Address $salesAddressModel,
        array $data = []
    ) {
        $this->_adminHelper = $adminHelper;
        $this->_coreRegistry = $registry;
        $this->salesAddressModel = $salesAddressModel;
        parent::__construct($context, $registry, $adminHelper, $data);
    }

    public function getSalesAddressModel()
    {
        return $this->salesAddressModel;
    }
}
