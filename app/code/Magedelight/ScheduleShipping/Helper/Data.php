<?php

/**
 * Magedelight
 * Copyright (C) 2017 Magedelight <info@magedelight.com>
 *
 * @category Magedelight
 * @package Magedelight_ScheduleShipping
 * @copyright Copyright (c) 2017 Mage Delight (http://www.magedelight.com/)
 * @license http://opensource.org/licenses/gpl-3.0.html GNU General Public License,version 3 (GPL-3.0)
 * @author Magedelight <info@magedelight.com>
 */

namespace Magedelight\ScheduleShipping\Helper;

use Magento\Framework\App\Helper\AbstractHelper;

class Data extends AbstractHelper
{

    /**
     * Custom fee config path
     */
    const CONFIG_MODULE_IS_ENABLED = 'magedelight_ScheduleShipping/general/enable';
    const CONFIG_FEE_LABEL = 'magedelight_ScheduleShipping/general/deliverycharge_label';
    const CONFIG_MINIMUM_ORDER_AMOUNT = 'magedelight_ScheduleShipping/general/minimum_order_amount';

    protected $_storeManager;

    public function __construct(
        \Magento\Framework\App\Helper\Context $context,
        \Magento\Store\Model\StoreManagerInterface $storeManager
    ) {
        $this->_storeManager = $storeManager;
        parent::__construct($context);
    }

    /**
     * @return mixed
     */
    public function isModuleEnabled()
    {

        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $isEnabled = $this->scopeConfig->getValue(self::CONFIG_MODULE_IS_ENABLED, $storeScope);
        return $isEnabled;
    }

    /**
     * Get Delivery Charge Label
     *
     * @return mixed
     */
    public function getFeeLabel()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $feeLabel = $this->scopeConfig->getValue(self::CONFIG_FEE_LABEL, $storeScope);
        if (empty($feeLabel)) {
            $feeLabel = __('Delivery Charge');
        }
        return $feeLabel;
    }

    /**
     * @return mixed
     */
    public function getMinimumOrderAmount()
    {

        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        //$MinimumOrderAmount = $this->scopeConfig->getValue(self::CONFIG_MINIMUM_ORDER_AMOUNT, $storeScope);
        $MinimumOrderAmount = 0;
        return $MinimumOrderAmount;
    }

    public function getFormatedDate($deliveryDate)
    {
        $date = date_create($deliveryDate);
        return date_format($date, "Y-m-d");
    }

    public function isEnabled()
    {

        return $this->getConfig('magedelight_ScheduleShipping/general/enable');
    }

    
    public function getConfig($config_path)
    {
        return $this->scopeConfig->getValue(
            $config_path,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }
}
