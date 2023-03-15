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

class Checkbox extends \Magento\Framework\View\Element\AbstractBlock
{

    protected function _toHtml()
    {
        $elId = '1';
        $elName = 'dfdd';
        $colName = 'enable';
        $column = 'enable';

        return '<input type="checkbox" value="1" id="' . $elId . '"' .
                ' name="' . $elName . '" <%- ' . $colName . ' %> ' .
                ' class="' .
                (isset($column['class']) ? $column['class'] : 'input-text') . '"' .
                (isset($column['style']) ? ' style="' . $column['style'] . '"' : '') . '/>';
    }
}
