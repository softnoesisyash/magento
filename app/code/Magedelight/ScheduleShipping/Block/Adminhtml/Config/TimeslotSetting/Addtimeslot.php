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

class Addtimeslot extends \Magento\Config\Block\System\Config\Form\Field\FieldArray\AbstractFieldArray
{

    protected $StartTimeRenderer = null;
    protected $EndTimeRenderer = null;
    protected $PriceRenderer = null;

    protected function getStartTimeRenderer()
    {

        if (!$this->StartTimeRenderer) {
            $this->StartTimeRenderer = $this->getLayout()->createBlock(
                '\Magedelight\ScheduleShipping\Block\Adminhtml\Config\TimeslotSetting\Timeslot',
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->StartTimeRenderer;
    }

    protected function getEndTimeRenderer()
    {

        if (!$this->EndTimeRenderer) {
            $this->EndTimeRenderer = $this->getLayout()->createBlock(
                '\Magedelight\ScheduleShipping\Block\Adminhtml\Config\TimeslotSetting\Timeslot',
                '',
                ['data' => ['is_render_to_js_template' => true]]
            );
        }
        return $this->EndTimeRenderer;
    }

    /*    protected function getPriceRenderer()
      {

      if (!$this->YearRenderer) {
      $this->YearRenderer = $this->getLayout()->createBlock(
      '\Magedelight\ScheduleShipping\Block\Adminhtml\Config\YearType', '', ['data' => ['is_render_to_js_template' => true]]
      );
      }
      return $this->YearRenderer;
      }
     */

    /**
     * Prepare to render.
     */
    protected function _prepareToRender()
    {
        $this->addColumn(
            'timeslot_sort',
            [
            'label' => __('Sort'),
            'style' => 'width:30px',
            'class' => 'validate-number validate-digits required validate-greater-than-zero',
                ]
        );

        $this->addColumn(
            'start_time',
            [
            'label' => __('Start Time'),
            'renderer' => $this->getStartTimeRenderer(),
            'style' => 'width:266px',
                ]
        );

        $this->addColumn(
            'end_time',
            [
            'label' => __('End Time'),
            'style' => 'width:216px',
            'renderer' => $this->getEndTimeRenderer(),
                ]
        );

        $this->addColumn(
            'timeslot_price',
            [
            'label' => __('Price'),
            'style' => 'width:116px'
                ]
        );

        $this->renderCellTemplate('timeslot_sort');

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
        $startTimes = $row->getStartTime();
        if ($startTimes) {
            if (!is_array($startTimes)) {
                $startTimes = [$startTimes];
            }
            foreach ($startTimes as $startTime) {
                $options['option_' . $this->getStartTimeRenderer()->calcOptionHash($startTime)] = 'selected="selected"';
            }
        }

        $endTimes = $row->getEndTime();
        if ($endTimes) {
            if (!is_array($endTimes)) {
                $endTimes = [$endTimes];
            }
            foreach ($endTimes as $endTime) {
                $options['option_' . $this->getEndTimeRenderer()->calcOptionHash($endTime)] = 'selected="selected"';
            }
        }

        $row->setData('option_extra_attrs', $options);

        return;
    }
}
