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

class CustomerGroups implements ArrayInterface
{

    protected $_options;

    public function __construct(
        \Magento\Customer\Model\Group $customerGroupModel
    ) {
        $this->customerGroupModel = $customerGroupModel;
    }

    public function toOptionArray()
    {
        $groups = $this->customerGroupModel->getCollection()->toOptionHash();
        $tempArray = [];
        foreach ($groups as $key => $value) {
            $tempArray['value'] = $key;
            $tempArray['label'] = $value;
            $this->_options[] = $tempArray;
        }

        return $this->_options;
    }
}
