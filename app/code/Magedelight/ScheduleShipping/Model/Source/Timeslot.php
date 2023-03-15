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

namespace Magedelight\ScheduleShipping\Model\Source;

use Magento\Framework\Option\ArrayInterface;
use Magento\Backend\App\Action\Context;
use Magento\Framework\ObjectManagerInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;

class Timeslot implements ArrayInterface
{
    /**
     * @var Magento\Framework\ObjectManagerInterface
     */
    protected $objectManager;

    public function __construct(
        ObjectManagerInterface $objectManager,
        ScopeConfigInterface $scopeConfig,
        \Magento\Framework\Serialize\Serializer\Json $serialize
    ) {
        $this->_objectManager = $objectManager;
        $this->scopeConfig = $scopeConfig;
        $this->serialize = $serialize;
    }

    /**
     * Return array of options as value-label pairs
     *
     * @return array Format: array(array('value' => '<value>', 'label' => '<label>'), ...)
     */
    public function toOptionArray()
    {
        $_options = [];
        $_disableDays = $this->scopeConfig->getValue(
            'magedelight_ScheduleShipping/timeslot/add_timeslot',
            ScopeInterface::SCOPE_STORES
        );

        if ($_disableDays) {
            $_disableDays = $this->serialize->unserialize($_disableDays);

            $_options = [];
            $_options[] = [
                'value' => "",
                'label' => "No Slots",
            ];
            if ($_disableDays) {
                foreach ($_disableDays as $option) {
                    $_options[] = [
                        'value' => $option['start_time'] . '-' . $option['end_time'],
                        'label' => $option['start_time'] . '-' . $option['end_time'],
                    ];
                }
            }
        }

        return $_options;
    }

    /**
     * get options as key value pair
     *
     * @return array
     */
    public function getOptions()
    {
        $_tmpOptions = $this->toOptionArray();
        $_options = [];
        foreach ($_tmpOptions as $option) {
            $_options[$option['value']] = $option['label'];
        }
        return $_options;
    }
}
