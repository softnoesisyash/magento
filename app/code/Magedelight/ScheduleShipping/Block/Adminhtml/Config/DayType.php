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

namespace Magedelight\ScheduleShipping\Block\Adminhtml\Config;

class DayType extends \Magento\Framework\View\Element\Html\Select
{
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
            for ($i = 0; $i < 31; $i++) {
                $val = sprintf("%02d", $i + 1);
                $day[$i] = ['value' => $val, 'label' => __($i + 1)];
            }

            $intervaTypes = $day;
            foreach ($intervaTypes as $intervaType) {
                if (isset($intervaType['value']) && $intervaType['value']
                    && isset($intervaType['label']) && $intervaType['label']) {
                    $this->addOption($intervaType['value'], $intervaType['label']);
                }
            }
        }

        return parent::_toHtml();
    }
}
