<?php
namespace Softnoesis\WholesaleInquiry\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;
class Extension extends AbstractDb
{
    protected function _construct()
    {
        $this->_init('otp_verification', 'id');
    }
}