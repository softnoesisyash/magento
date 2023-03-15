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

namespace Magedelight\ScheduleShipping\Model\System\Config\Backend;

class MaximumInterval extends \Magento\Framework\App\Config\Value
{

    /**
     * Check against minimum value
     *
     * @return void
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function beforeSave()
    {
        $data = $this->_getData('fieldset_data');
        $minimumDays = $this->getFieldsetDataValue('deliverydays');
        $maximumDays = $this->getValue();
        if (isset($maximumDays) && ! empty($maximumDays)) {
            if ($maximumDays <= $minimumDays) {
                $msg = __('The Calender maximum delivery interval days must be more than minimum delivery interval days');
                $error = new \Magento\Framework\Exception\LocalizedException($msg);
                throw $error;
            }
        }
        parent::beforeSave();
    }
}
