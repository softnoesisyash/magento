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

namespace Magedelight\ScheduleShipping\Cron;

use Magento\Framework\App\ResourceConnection;

class ReminderEmail
{

    /**
     * @var \Magento\Framework\App\ResourceConnection
     */
    protected $_resource;

    /**
     * @var \Magento\Framework\App\Config\ScopeConfigInterface
     */
    protected $_scopeConfig;

    /**
     * @var \Magento\Framework\Stdlib\DateTime\DateTimeFactory
     */
    protected $_dateFactory;

    /**
     * @var \Magento\Customer\Model\Customer
     */
    protected $_customer;

    /**
     * @var \Zend\Log\Writer
     */
    protected $_logger;
    protected $_emailSender;

    /**
     * @var subscriptionProfile
     */
    protected $_subscriptionProfile;

    /**
     *
     * @param ResourceConnection $_resource
     * @param \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
     * @param \Magento\Framework\Stdlib\DateTime\DateTimeFactory $dateFactory
     * @param \Magento\Customer\Model\Customer $_customer
     * @param \Magedelight\ScheduleShipping\Model\Email\SenderFactory $_emailSender
     * @param \Magento\Sales\Model\Order $orderCollection
     */
    public function __construct(
        \Magento\Framework\App\ResourceConnection $_resource,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Framework\Stdlib\DateTime\DateTimeFactory $dateFactory,
        \Magento\Customer\Model\Customer $_customer,
        \Magedelight\ScheduleShipping\Model\Email\SenderFactory $_emailSender,
        \Magento\Sales\Model\Order $orderCollection
    ) {
        /* cron */
        $this->_resource = $_resource;
        $this->_scopeConfig = $scopeConfig;
        $this->_dateFactory = $dateFactory;
        $this->_customer = $_customer;
        $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/order_email_reminder.log');
        $this->_logger = new \Zend\Log\Logger();
        $this->_logger->addWriter($writer);
        $this->_emailSender = $_emailSender;
        $this->_order = $orderCollection;
    }

    /**
     * Retrieve write connection instance.
     *
     * @return bool|\Magento\Framework\DB\Adapter\AdapterInterface
     */
    protected function _getConnection()
    {
        if (null === $this->_connection) {
            $this->_connection = $this->_resource->getConnection();
        }

        return $this->_connection;
    }

    /**
     * Place subscription order using cron job.
     */
    public function execute()
    {

        /*
         * ##########  CRON JOB ##########
         */

        $enableEmail = $this->_scopeConfig->getValue(
            'magedelight_ScheduleShipping/general/enable_emailnotification',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        $emailBeforeDays = $this->_scopeConfig->getValue(
            'magedelight_ScheduleShipping/general/emailreminder_occurrence_before',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        if ($enableEmail) {
            if (is_numeric($emailBeforeDays)) {
                $readAdapter = $this->_resource->getConnection();
                $salesTable = $this->_resource->getTableName('sales_order');

                $from = date('Y-m-d', strtotime("+" . $emailBeforeDays . " days"));
                $emailBeforeDays = $emailBeforeDays + 15;
                $to = date('Y-m-d', strtotime("+" . $emailBeforeDays . " days"));

                $query = "SELECT `entity_id` FROM $salesTable WHERE state IN('" . \Magento\Sales\Model\Order::STATE_NEW . "','" . \Magento\Sales\Model\Order::STATE_PENDING_PAYMENT . "','" . \Magento\Sales\Model\Order::STATE_PROCESSING . "','" . \Magento\Sales\Model\Order::STATE_HOLDED . "','" . \Magento\Sales\Model\Order::STATE_PAYMENT_REVIEW . "') AND `delivery_date` BETWEEN '" . $from . "' AND '" . $to . "'";

                $queryResult = $readAdapter->fetchAll($query);

                if (is_array($queryResult) && count($queryResult) > 0) {
                    foreach ($queryResult as $queryData) {
                        $orderIds[] = $queryData['entity_id'];

                        $this->_logger->info("Reminder email Processing start.");
                    }

                    $orderCollection = $this->_order->getCollection()
                        ->addAttributeToFilter('entity_id', ['in' => $orderIds]);
                    $orderCollection->setOrder('Delivery_date', 'ASC');

                    $this->_emailSender->create()->sendReminderEmail($orderCollection);

                    $this->_logger->info("Order reminder email processed");
                }
            }
        }
    }
}
