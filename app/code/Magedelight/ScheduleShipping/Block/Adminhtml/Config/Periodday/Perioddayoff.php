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

namespace Magedelight\ScheduleShipping\Block\Adminhtml\Config\Periodday;

class Perioddayoff extends \Magento\Config\Block\System\Config\Form\Field\FieldArray\AbstractFieldArray
{

    protected $FromDayRenderer = null;
    protected $FromMonthRenderer = null;
    protected $FromYearRenderer = null;
    protected $ToDayRenderer = null;
    protected $ToMonthRenderer = null;
    protected $ToYearRenderer = null;

    protected function getFromDayRenderer()
    {

        if (!$this->FromDayRenderer) {
            $this->FromDayRenderer = $this->getLayout()->createBlock(
                \Magedelight\ScheduleShipping\Block\Adminhtml\Config\DayType::class,
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->FromDayRenderer;
    }

    protected function getFromMonthRenderer()
    {

        if (!$this->FromMonthRenderer) {
            $this->FromMonthRenderer = $this->getLayout()->createBlock(
                \Magedelight\ScheduleShipping\Block\Adminhtml\Config\MonthType::class,
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->FromMonthRenderer;
    }

    protected function getFromYearRenderer()
    {

        if (!$this->FromYearRenderer) {
            $this->FromYearRenderer = $this->getLayout()->createBlock(
                \Magedelight\ScheduleShipping\Block\Adminhtml\Config\YearType::class,
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->FromYearRenderer;
    }

    protected function getToDayRenderer()
    {

        if (!$this->ToDayRenderer) {
            $this->ToDayRenderer = $this->getLayout()->createBlock(
                \Magedelight\ScheduleShipping\Block\Adminhtml\Config\DayType::class,
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->ToDayRenderer;
    }

    protected function getToMonthRenderer()
    {

        if (!$this->ToMonthRenderer) {
            $this->ToMonthRenderer = $this->getLayout()->createBlock(
                \Magedelight\ScheduleShipping\Block\Adminhtml\Config\MonthType::class,
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->ToMonthRenderer;
    }

    protected function getToYearRenderer()
    {

        if (!$this->ToYearRenderer) {
            $this->ToYearRenderer = $this->getLayout()->createBlock(
                \Magedelight\ScheduleShipping\Block\Adminhtml\Config\YearType::class,
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->ToYearRenderer;
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
            'perioddayoff_fromday',
            [
            'label' => __('From Day'),
            'renderer' => $this->getFromDayRenderer(),
            'style' => 'width:66px',
                ]
        );

        $this->addColumn(
            'perioddayoff_frommonth',
            [
            'label' => __('From Month'),
            'renderer' => $this->getFromMonthRenderer(),
            'style' => 'width:66px',
                ]
        );

        $this->addColumn(
            'perioddayoff_fromyear',
            [
            'label' => __('From Year'),
            'renderer' => $this->getFromYearRenderer(),
            'style' => 'width:66px',
                ]
        );

        $this->addColumn(
            'perioddayoff_today',
            [
            'label' => __('To Day'),
            'renderer' => $this->getToDayRenderer(),
            'style' => 'width:66px',
                ]
        );

        $this->addColumn(
            'perioddayoff_tomonth',
            [
            'label' => __('To Month'),
            'renderer' => $this->getToMonthRenderer(),
            'style' => 'width:66px',
                ]
        );

        $this->addColumn(
            'perioddayoff_toyear',
            [
            'label' => __('To Year'),
            'renderer' => $this->getToYearRenderer(),
            'style' => 'width:66px',
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
        $perioddayoffFromdays = $row->getPerioddayoffFromday();
        if ($perioddayoffFromdays) {
            if (!is_array($perioddayoffFromdays)) {
                $perioddayoffFromdays = [$perioddayoffFromdays];
            }
            foreach ($perioddayoffFromdays as $perioddayoffFromday) {
                $options['option_' . $this->getFromDayRenderer()
                ->calcOptionHash($perioddayoffFromday)] = 'selected="selected"';
            }
        }

        $perioddayoffFrommonths = $row->getPerioddayoffFrommonth();
        if ($perioddayoffFrommonths) {
            if (!is_array($perioddayoffFrommonths)) {
                $perioddayoffFrommonths = [$perioddayoffFrommonths];
            }
            foreach ($perioddayoffFrommonths as $perioddayoffFrommonth) {
                $options['option_' . $this->getFromMonthRenderer()
                ->calcOptionHash($perioddayoffFrommonth)] = 'selected="selected"';
            }
        }

        $perioddayoffFromyears = $row->getPerioddayoffFromyear();
        if ($perioddayoffFromyears) {
            if (!is_array($perioddayoffFromyears)) {
                $perioddayoffFromyears = [$perioddayoffFromyears];
            }
            foreach ($perioddayoffFromyears as $perioddayoffFromyear) {
                $options['option_' . $this->getFromYearRenderer()
                ->calcOptionHash($perioddayoffFromyear)] = 'selected="selected"';
            }
        }

        $perioddayoffTodays = $row->getPerioddayoffToday();
        if ($perioddayoffTodays) {
            if (!is_array($perioddayoffTodays)) {
                $perioddayoffTodays = [$perioddayoffTodays];
            }
            foreach ($perioddayoffTodays as $perioddayoffToday) {
                $options['option_' . $this->getToDayRenderer()
                ->calcOptionHash($perioddayoffToday)] = 'selected="selected"';
            }
        }

        $perioddayoffTomonths = $row->getPerioddayoffTomonth();
        if ($perioddayoffTomonths) {
            if (!is_array($perioddayoffTomonths)) {
                $perioddayoffTomonths = [$perioddayoffTomonths];
            }
            foreach ($perioddayoffTomonths as $perioddayoffTomonth) {
                $options['option_' . $this->getToMonthRenderer()
                ->calcOptionHash($perioddayoffTomonth)] = 'selected="selected"';
            }
        }

        $perioddayoffToyears = $row->getPerioddayoffToyear();
        if ($perioddayoffToyears) {
            if (!is_array($perioddayoffToyears)) {
                $perioddayoffToyears = [$perioddayoffToyears];
            }
            foreach ($perioddayoffToyears as $perioddayoffToyear) {
                $options['option_' . $this->getToYearRenderer()
                ->calcOptionHash($perioddayoffToyear)] = 'selected="selected"';
            }
        }

        $row->setData('option_extra_attrs', $options);

        return;
    }
}
