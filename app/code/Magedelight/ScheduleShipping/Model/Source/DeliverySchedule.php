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

class DeliverySchedule implements ArrayInterface
{

    /**
     * get options as key value pair
     *
     * @return array
     */
    public function toOptionArray()
    {
        return [
            [
                'value' => '1',
                'label' => __('Calender View')
            ], [
                'value' => '2',
                'label' => __('TimeSlot View')
            ],
        ];
    }

    /**
     * @param array $options
     * @return array
     */
    public function getOptions(array $options = [])
    {
        $countryOptions = $this->toOptionArray($options);
        $_options = [];
        foreach ($countryOptions as $option) {
            $_options[$option['value']] = $option['label'];
        }
        return $_options;
    }
}
