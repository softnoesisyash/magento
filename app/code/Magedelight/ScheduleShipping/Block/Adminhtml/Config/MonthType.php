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

class MonthType extends \Magento\Framework\View\Element\Html\Select
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
            $month = ['01' => 'January', '02' => 'February', '03' => 'March', '04' => 'April', '05' => 'May', '06' => 'June', '07' => 'July', '08' => 'August', '09' => 'September', '10' => 'October', '11' => 'November', '12' => 'December'];

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
