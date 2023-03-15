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

class Daytimeslot extends \Magento\Config\Block\System\Config\Form\Field\FieldArray\AbstractFieldArray
{

    protected $DayRenderer = null;
    protected $TimeSlotRenderer = null;
    protected $TimeSlot = null;

    protected function getDayRenderer()
    {

        if (!$this->DayRenderer) {
            $this->DayRenderer = $this->getLayout()->createBlock(
                '\Magedelight\ScheduleShipping\Block\Adminhtml\Config\TimeslotSetting\Day',
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->DayRenderer;
    }

    protected function getTimeSlotRenderer()
    {

        if (!$this->TimeSlotRenderer) {
            $this->TimeSlotRenderer = $this->getLayout()->createBlock(
                '\Magedelight\ScheduleShipping\Block\Adminhtml\Config\TimeslotSetting\Multiselect',
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->TimeSlotRenderer;
    }

    /**
     * Prepare to render.
     */
    protected function _prepareToRender()
    {

        $this->addColumn(
            'disable_day',
            [
            'label' => __('Day'),
            'renderer' => $this->getDayRenderer(),
            'style' => 'width:266px',
                ]
        );

        $this->addColumn(
            'time_slot',
            [
            'label' => __('Time Slot'),
            'style' => 'width:216px',
            'renderer' => $this->getTimeSlotRenderer(),
                ]
        );

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
        $disableDays = $row->getDisableDay();
        if ($disableDays) {
            if (!is_array($disableDays)) {
                $disableDays = [$disableDays];
            }
            foreach ($disableDays as $disableDay) {
                $options['option_' . $this->getDayRenderer()->calcOptionHash($disableDay)] = 'selected="selected"';
            }
        }

        $timeSlots = $row->getTimeSlot();
        if ($timeSlots) {
            if (!is_array($timeSlots)) {
                $timeSlots = [$timeSlots];
            }
            foreach ($timeSlots as $timeSlot) {
                $options['option_' . $this->getTimeSlotRenderer()->calcOptionHash($timeSlot)] = 'selected="selected"';
            }
        }

        $row->setData('option_extra_attrs', $options);

        return;
    }
}
