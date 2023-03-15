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

class Singledayoff extends \Magento\Config\Block\System\Config\Form\Field\FieldArray\AbstractFieldArray
{

    protected $DayRenderer = null;
    protected $MonthRenderer = null;
    protected $YearRenderer = null;

    protected function getDayRenderer()
    {

        if (!$this->DayRenderer) {
            $this->DayRenderer = $this->getLayout()->createBlock(
                '\Magedelight\ScheduleShipping\Block\Adminhtml\Config\DayType',
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->DayRenderer;
    }

    protected function getMonthRenderer()
    {

        if (!$this->MonthRenderer) {
            $this->MonthRenderer = $this->getLayout()->createBlock(
                '\Magedelight\ScheduleShipping\Block\Adminhtml\Config\MonthType',
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->MonthRenderer;
    }

    protected function getYearRenderer()
    {

        if (!$this->YearRenderer) {
            $this->YearRenderer = $this->getLayout()->createBlock(
                '\Magedelight\ScheduleShipping\Block\Adminhtml\Config\YearType',
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->YearRenderer;
    }

    /**
     * Prepare to render.
     */
    protected function _prepareToRender()
    {
        $this->addColumn(
            'day_sort',
            [
            'label' => __('Sort'),
            'style' => 'width:30px',
            'class' => 'validate-number validate-digits required validate-greater-than-zero',
                ]
        );

        $this->addColumn(
            'singledayoff_day',
            [
            'label' => __('Day'),
            'renderer' => $this->getDayRenderer(),
            'style' => 'width:66px',
                ]
        );

        $this->addColumn(
            'singledayoff_month',
            [
            'label' => __('Month'),
            'style' => 'width:116px',
            'renderer' => $this->getMonthRenderer(),
                ]
        );

        $this->addColumn(
            'singledayoff_year',
            [
            'label' => __('Year'),
            'style' => 'width:116px',
            'renderer' => $this->getYearRenderer(),
                ]
        );

        $this->renderCellTemplate('day_sort');

        $this->_addAfter = false;
        $this->_addButtonLabel = __('Add Rule');
    }

    /**
     * Prepare existing row data object.
     *
     * @param \Magento\Framework\DataObject $row
     */
    protected function _prepareArrayRow(\Magento\Framework\DataObject $row)
    {
        $options = [];
        $singledayoffDays = $row->getSingledayoffDay();
        if ($singledayoffDays) {
            if (!is_array($singledayoffDays)) {
                $singledayoffDays = [$singledayoffDays];
            }
            foreach ($singledayoffDays as $singledayoffDay) {
                $options['option_' . $this->getDayRenderer()->calcOptionHash($singledayoffDay)] = 'selected="selected"';
            }
        }

        $singledayoffMonths = $row->getSingledayoffMonth();
        if ($singledayoffMonths) {
            if (!is_array($singledayoffMonths)) {
                $singledayoffMonths = [$singledayoffMonths];
            }
            foreach ($singledayoffMonths as $singledayoffMonth) {
                $options['option_' . $this->getMonthRenderer()->calcOptionHash($singledayoffMonth)] = 'selected="selected"';
            }
        }

        $singledayoffYears = $row->getSingledayoffYear();
        if ($singledayoffYears) {
            if (!is_array($singledayoffYears)) {
                $singledayoffYears = [$singledayoffYears];
            }
            foreach ($singledayoffYears as $singledayoffYear) {
                $options['option_' . $this->getYearRenderer()->calcOptionHash($singledayoffYear)] = 'selected="selected"';
            }
        }

        $row->setData('option_extra_attrs', $options);

        return;
    }
}
