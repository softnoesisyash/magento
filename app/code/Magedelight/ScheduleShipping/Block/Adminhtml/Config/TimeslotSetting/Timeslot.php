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

namespace Magedelight\ScheduleShipping\Block\Adminhtml\Config\TimeslotSetting;

class Timeslot extends \Magento\Framework\View\Element\Html\Select
{

    /**
     * @param \Magento\Framework\View\Element\Context $context
     * @param array                                   $data
     */
    public function __construct(
        \Magento\Framework\View\Element\Context $context,
        array $data = []
    ) {
        parent::__construct($context, $data);
    }

    /**
     * Sets name for input element.
     *
     * @param string $value
     *
     * @return $this
     */
    public function setInputName($value)
    {
        return $this->setName($value);
    }

    /**
     * Render block HTML.
     *
     * @return string
     */
    public function _toHtml()
    {
        if (!$this->getOptions()) {
            $month = ['12:00 AM' => '12:00 AM', '12:30 AM' => '12:30 AM',
                '01:00 AM' => '01:00 AM', '01:30 AM' => '01:30 AM',
                '02:00 AM' => '02:00 AM', '02:30 AM' => '02:30 AM',
                '03:00 AM' => '03:00 AM', '03:30 AM' => '03:30 AM',
                '04:00 AM' => '04:00 AM', '04:30 AM' => '04:30 AM',
                '05:00 AM' => '05:00 AM', '05:30 AM' => '05:30 AM',
                '06:00 AM' => '06:00 AM', '06:30 AM' => '06:30 AM',
                '07:00 AM' => '07:00 AM', '07:30 AM' => '07:30 AM',
                '08:00 AM' => '08:00 AM', '08:30 AM' => '08:30 AM',
                '09:00 AM' => '09:00 AM', '09:30 AM' => '09:30 AM',
                '10:00 AM' => '10:00 AM', '10:30 AM' => '10:30 AM',
                '11:00 AM' => '11:00 AM', '11:30 AM' => '11:30 AM',
                '12:00 PM' => '12:00 PM', '12:30 PM' => '12:30 PM',
                '01:00 PM' => '01:00 PM', '01:30 PM' => '01:30 PM',
                '02:00 PM' => '02:00 PM', '02:30 PM' => '02:30 PM',
                '03:00 PM' => '03:00 PM', '03:30 PM' => '03:30 PM',
                '04:00 PM' => '04:00 PM', '04:30 PM' => '04:30 PM',
                '05:00 PM' => '05:00 PM', '05:30 PM' => '05:30 PM',
                '06:00 PM' => '06:00 PM', '06:30 PM' => '06:30 PM',
                '07:00 PM' => '07:00 PM', '07:30 PM' => '07:30 PM',
                '08:00 PM' => '08:00 PM', '08:30 PM' => '08:30 PM',
                '09:00 PM' => '09:00 PM', '09:30 PM' => '09:30 PM',
                '10:00 PM' => '10:00 PM', '10:30 PM' => '10:30 PM',
                '11:00 PM' => '11:00 PM', '11:30 PM' => '11:30 PM'
            ];

            foreach ($month as $key => $value) {
                $month[] = ['value' => $key, 'label' => __($value)];
            }

            $intervaTypes = $month;
            foreach ($intervaTypes as $intervaType) {
                if (isset($intervaType['value']) && $intervaType['value'] && isset($intervaType['label']) && $intervaType['label']) {
                    $this->addOption($intervaType['value'], $intervaType['label']);
                }
            }
        }

        return parent::_toHtml();
    }
}
