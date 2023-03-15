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

class Day implements ArrayInterface
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
                'value' => '',
                'label' => __('No Day')
            ], [
                'value' => '0',
                'label' => __('Sunday')
            ], [
                'value' => '1',
                'label' => __('Monday')
            ], [
                'value' => '2',
                'label' => __('Tuesday')
            ], [
                'value' => '3',
                'label' => __('Wedenesday')
            ], [
                'value' => '4',
                'label' => __('Thursday')
            ], [
                'value' => '5',
                'label' => __('Friday')
            ], [
                'value' => '6',
                'label' => __('Saterday')
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
