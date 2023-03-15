<?php


namespace Magedelight\ScheduleShipping\Plugin\Magento\Backend\Model\Menu;

class Item
{
    public function afterGetUrl($subject, $result)
    {
        $menuId = $subject->getId();

        if ($menuId == 'Magedelight_ScheduleShipping::documentation') {
            $result = 'http://docs.magedelight.com/display/MAG/Delivery+Date+-+Magento+2';
        }

        return $result;
    }
}
