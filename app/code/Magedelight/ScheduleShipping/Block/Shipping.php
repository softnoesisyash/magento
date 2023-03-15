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

namespace Magedelight\ScheduleShipping\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\Registry;
use Magento\Framework\View\Element\Template\Context;
use Magento\Framework\UrlFactory;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\View\Result\PageFactory;
use Magento\Checkout\Model\Cart;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\Controller\ResultFactory;
use Magento\Framework\Stdlib\DateTime\DateTime;
use Magento\Sales\Model\ResourceModel\Order\CollectionFactory;
use Magento\Customer\Model\Session;
use Magento\Framework\Serialize\Serializer\Json;

class Shipping extends Template
{

    protected $urlFactory;
    protected $pageFactory;
    protected $orderCollectionFactory;
    protected $customerSession;
    protected $serialize;
    
    /**
     * @ Schedule Shipping is enable or not
     */
    const XML_PATH_STORE_ENABLE_EXTENSION = 'magedelight_ScheduleShipping/general/enable';

    /**
     * @ Schedule Shipping is enable or not
     */
    const XML_PATH_STORE_ENABLE_EXTENSION_FOR_CUSTOMER = 'magedelight_ScheduleShipping/general/customer_groups';

    /**
     * @ Delivery Type
     */
    const XML_PATH_STORE_DELIVERY_TYPE = 'magedelight_ScheduleShipping/calender_view/delivery_type';

    /**
     * @ Disable Day
     */
    const XML_PATH_STORE_DISABLE_DAY = 'magedelight_ScheduleShipping/dayoff/days';

    /**
     * @ Disable Single Date
     */
    const XML_PATH_STORE_DISABLE_SINGLE_DATE = 'magedelight_ScheduleShipping/dayoff/singleday_off';

    /**
     * @ Disable To-From Date
     */
    const XML_PATH_STORE_DISABLE_PERIOD_DATE = 'magedelight_ScheduleShipping/dayoff/periodday_off';

    /**
     * @ Delivery Date label
     */
    const XML_PATH_STORE_DELIVERY_DATE_LABEL = 'magedelight_ScheduleShipping/general/deleverydate_label';

    /**
     * @ Enable Delivery Comment
     */
    const XML_PATH_STORE_DELIVERY_DATE_COMMENT = 'magedelight_ScheduleShipping/general/show_deliverycomment';

    /**
     * @ Enable Delivery Comment Label
     */
    const XML_PATH_STORE_DELIVERY_DATE_COMMENT_LABEL = 'magedelight_ScheduleShipping/general/deliverycomment_label';

    /**
     * @ Enable Call me before.
     */
    const XML_PATH_STORE_ENABLE_CALL_ME_BEFORE_DELIVERY = 'magedelight_ScheduleShipping/general/callme_before_delivery';

    /**
     * @ Enable Time in calender
     */
    const XML_PATH_STORE_ENABLE_TIME_IN_CALENDER = 'magedelight_ScheduleShipping/calender_view/show_time';

    /**
     * @ Deliverydays Interval for Calender Type
     */
    const XML_PATH_STORE_CALENDER_DELIVERY_Interval_Day = 'magedelight_ScheduleShipping/calender_view/deliverydays';

    /**
     * @ Quota Day Interval
     */
    const XML_PATH_STORE_QUOTA_INTERVAL_DAY = 'magedelight_ScheduleShipping/calender_view/maximum_quota_day';

    /**
     * @ Quota Time Interval
     */
    const XML_PATH_STORE_QUOTA_INTERVAL_TIME = 'magedelight_ScheduleShipping/calender_view/maximum_quota_time';

    /**
     * @ Maximum Deliverydays Interval for Calender Type
     */
    const XML_PATH_STORE_CALENDER_MAXIMUM_DELIVERY_Interval_Day = 'magedelight_ScheduleShipping/calender_view/maximumdeliverydays';

    /**
     * @ SameDay Delivery Enable Yes/No
     */
    const XML_PATH_STORE_SAMEDAY_DELIVERY = 'magedelight_ScheduleShipping/calender_view/sameday';

    /**
     * @ SameDay Delivery Charge
     */
    const XML_PATH_STORE_SAMEDAY_DELIVERY_CHARGE = 'magedelight_ScheduleShipping/calender_view/sameday_fees';

    /**
     * @ SameDay Delivery interval of hours between the order placing time and delivery time
     */
    const XML_PATH_STORE_SAMEDAY_DELIVERY_INTERVAL_HOUR = 'magedelight_ScheduleShipping/calender_view/sameday_intervaltime';

    /**
     * @ NextDay Delivery Enable Yes/No
     */
    const XML_PATH_STORE_NEXTDAY_DELIVERY = 'magedelight_ScheduleShipping/calender_view/nextday';

    /**
     * @ NextDay Delivery Charge
     */
    const XML_PATH_STORE_NEXTDAY_DELIVERY_CHARGE = 'magedelight_ScheduleShipping/calender_view/nextday_fees';

    /**
     * @ Show Delivery Day
     */
    const XML_PATH_STORE_SHOW_DELIVERY_DAY = 'magedelight_ScheduleShipping/timeslot/deliverydays';

    /**
     * @ Minimum interval of hours between the order placing time and delivery time
     */
    const XML_PATH_STORE_TIMESLOT_INTERVAL_HOUR = 'magedelight_ScheduleShipping/timeslot/deliveryhours';

    /**
     * @ TimeSlot
     */
    const XML_PATH_STORE_TOTAL_TIMESLOT = 'magedelight_ScheduleShipping/timeslot/add_timeslot';

    /**
     * @ Disabel TimeSlot Day
     */
    const XML_PATH_STORE_DISABEL_DAY_TIMESLOT = 'magedelight_ScheduleShipping/timeslot/disable_timeslot_day';

    /**
     * @ Disabel Date for Timeslot
     */
    const XML_PATH_STORE_DISABEL_DATE_TIMESLOT = 'magedelight_ScheduleShipping/timeslot/disable_timeslot_date';

    /**
     * @ Delivery additional message is enable or not.
     */
    const IS_ENABLE_DELIVERY_MESSAGE = 'magedelight_ScheduleShipping/general/additional_info';

    /**
     * @ Delivery additional message.
     */
    const ADDITIONAL_DELIVERY_MESSAGE = 'magedelight_ScheduleShipping/general/additionalinfo_text';

    /**
     * @ Delivery Date Mandatory or not.
     */
    const IS_DELIVERYDATE_MENDATORY = 'magedelight_ScheduleShipping/general/deliverydate_mandatory';

    /**
     *
     * @param Context $context
     * @param Registry $registry
     * @param UrlFactory $urlFactory
     * @param PageFactory $pageFactory
     * @param ScopeConfigInterface $scopeConfig
     * @param Cart $cart
     * @param DateTime $date
     * @param JsonFactory $resultJsonFactory
     * @param CollectionFactory $orderCollectionFactory
     */
    public function __construct(
        Context $context,
        Registry $registry,
        UrlFactory $urlFactory,
        PageFactory $pageFactory,
        /* ScopeConfigInterface $scopeConfig, */ Cart $cart,
        DateTime $date,
        JsonFactory $resultJsonFactory,
        CollectionFactory $orderCollectionFactory,
        Session $customerSession,
        \Magento\Store\Model\StoreManager $storeManager,
        Json $serialize
    ) {
        $this->urlFactory = $urlFactory;
        $this->pageFactory = $pageFactory;
        $this->registry = $registry;
        $this->scopeConfig = $context->getScopeConfig();
        $this->cart = $cart;
        $this->date = $date;
        $this->resultJsonFactory = $resultJsonFactory;
        $this->orderCollectionFactory = $orderCollectionFactory;
        $this->customerSession = $customerSession;
        $this->storeManager = $storeManager;
        $this->serialize = $serialize;
        parent::__construct($context);
    }

    /**
     * Check Schedule Shipping is enable or not
     *
     * @return Boolean
     */
    public function isScheduleShippingEnable()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $_isEnable = $this->scopeConfig->getValue(self::XML_PATH_STORE_ENABLE_EXTENSION, $storeScope);
        return $_isEnable;
    }

    /**
     * Check Schedule Shipping for customer is enable or not
     *
     * @return Boolean
     */
    public function isScheduleShippingEnableForCustomer()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $customer_groups = $this->scopeConfig->getValue(self::XML_PATH_STORE_ENABLE_EXTENSION_FOR_CUSTOMER, $storeScope);
        $customer_groups_array = explode(',', $customer_groups);

        $customerGroupId = $this->customerSession->getCustomer()->getGroupId();

        if ($this->customerSession->isLoggedIn()) {
            if (in_array($customerGroupId, $customer_groups_array)) {
                return true;
            }
        } else {
            $customerGroupId = '0';
            if (in_array($customerGroupId, $customer_groups_array)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Delivery Type Calenderview|TimeSlot
     *
     * @return int
     */
    public function getDeliveryType()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $_deliveryType = $this->scopeConfig->getValue(self::XML_PATH_STORE_DELIVERY_TYPE, $storeScope);
        return $_deliveryType;
    }

    /**
     * Delivery Date Control Label
     *
     * @return string
     */
    public function getDeliveryDateLabel()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $_label = $this->scopeConfig->getValue(self::XML_PATH_STORE_DELIVERY_DATE_LABEL, $storeScope);
        if (empty($_label)) {
            $_label = 'Delivery Date';
        }
        return $_label;
    }

    /**
     * Delivery Date Comment Enable or not
     *
     * @return boolean
     */
    public function getEnableDeliveryDateComment()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue(self::XML_PATH_STORE_DELIVERY_DATE_COMMENT, $storeScope);
    }

    /**
     * Delivery Date Control Label
     *
     * @return string
     */
    public function getDeliveryDateCommentLabel()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $_label = $this->scopeConfig->getValue(self::XML_PATH_STORE_DELIVERY_DATE_COMMENT_LABEL, $storeScope);
        if (empty($_label)) {
            $_label = 'Delivery Comment';
        }
        return $_label;
    }

    /**
     * Enable call me before delivery functionality
     *
     * @return boolean
     */
    public function isEnableCallmeBeforeDelivery()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue(self::XML_PATH_STORE_ENABLE_CALL_ME_BEFORE_DELIVERY, $storeScope);
    }

    /**
     * Enable Time in calender
     *
     * @return boolean
     */
    public function isEnableTimeInCalender()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue(self::XML_PATH_STORE_ENABLE_TIME_IN_CALENDER, $storeScope);
    }

    /**
     * Week offdays
     *
     * @return array
     */
    public function getOffDay()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $_disableDays = $this->scopeConfig->getValue(self::XML_PATH_STORE_DISABLE_DAY, $storeScope);
        $_disableDays = explode(',', $_disableDays);
        return $_disableDays;
    }

    /**
     * Sameday delivery is enable or not
     *
     * @return boolean
     */
    public function getSamedayIsenable()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue(self::XML_PATH_STORE_SAMEDAY_DELIVERY, $storeScope);
    }

    /**
     * Sameday delivery Amount
     *
     * @return int
     */
    public function getSamedayDeliveryAmount()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $_samedayCharge = $this->scopeConfig->getValue(self::XML_PATH_STORE_SAMEDAY_DELIVERY_CHARGE, $storeScope);
        if (empty($_samedayCharge)) {
            $_samedayCharge = 0;
        }
        return $_samedayCharge;
    }

    /**
     * Nextday delivery is enable or not
     *
     * @return boolean
     */
    public function getNextdayIsenable()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue(self::XML_PATH_STORE_NEXTDAY_DELIVERY, $storeScope);
    }

    /**
     * Nextday delivery Amount
     *
     * @return int
     */
    public function getNextdayDeliveryAmount()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $_nextdayCharge = $this->scopeConfig->getValue(self::XML_PATH_STORE_NEXTDAY_DELIVERY_CHARGE, $storeScope);
        if (empty($_nextdayCharge)) {
            $_nextdayCharge = 0;
        }
        return $_nextdayCharge;
    }

    /**
     * Off Date
     *
     * @return Jsonarray
     */
    public function getOffDate()
    {
        $_holidaydays;
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;

        /**
         * SingleDate Holiday Configuration
         */
        $_disableDates = $this->scopeConfig->getValue(self::XML_PATH_STORE_DISABLE_SINGLE_DATE, $storeScope);
        $_disableDates = $this->serialize->unserialize($_disableDates);

        foreach ($_disableDates as $_disableDate) {
            $_singleDate = $_disableDate['singledayoff_year'] . $_disableDate['singledayoff_month'] . $_disableDate['singledayoff_day'];
            $date = date("n-j-Y", strtotime($_singleDate . "+0 days"));
            $_holidaydays[] = $date;
        }




        /**
         * From-TO Period Holiday Configuration
         */
        $_disablePeriodDates = $this->scopeConfig->getValue(self::XML_PATH_STORE_DISABLE_PERIOD_DATE, $storeScope);
        $_disablePeriodDates = $this->serialize->unserialize($_disablePeriodDates);

        foreach ($_disablePeriodDates as $_disablePeriodDate) {
            $holiday_date_from = $_disablePeriodDate['perioddayoff_fromyear'] . $_disablePeriodDate['perioddayoff_frommonth'] . $_disablePeriodDate['perioddayoff_fromday'];
            $holiday_date_to = $_disablePeriodDate['perioddayoff_toyear'] . $_disablePeriodDate['perioddayoff_tomonth'] . $_disablePeriodDate['perioddayoff_today'];

            $from_date = date_create($holiday_date_from);
            $to_date = date_create($holiday_date_to);

            $diff = date_diff($from_date, $to_date);

            if ($diff->format("%a") == 0) {
                $date = date("n-j-Y", strtotime($holiday_date_from . "+0 days"));
                $_holidaydays[] = $date;
            } elseif ($diff->format("%a") > 0) {
                for ($i = 0; $i <= $diff->format("%a"); $i++) {
                    $date = date("n-j-Y", strtotime($holiday_date_from . "+" . $i . "days"));
                    $_holidaydays[] = $date;
                }
            }
        }


        /**
         * Interval Day Holiday Configuration
         */
        $_disabledays = $this->scopeConfig->getValue(self::XML_PATH_STORE_CALENDER_DELIVERY_Interval_Day, $storeScope);

        if ($_disabledays) {
            $_todaydate = date("Y-m-d");
            for ($i = 0; $i < $_disabledays; $i++) {
                $date = date("n-j-Y", strtotime($_todaydate . "+" . $i . "days"));
                $_holidaydays[] = $date;
            }
        }

        /**
         * Sameday Holiday Configuration
         */
        $_disableSameday = $this->getSamedayIsenable();

        if (!$_disableSameday) {
            $_holidaydays[] = date("n-j-Y");
        }

        /**
         * Nextday Holiday Configuration
         */
        $_disableNextday = $this->getNextdayIsenable();

        if (!$_disableNextday) {
            $_holidaydays[] = date("n-j-Y", strtotime(date("Y-m-d") . "+1 days"));
        }

        /**
         * Quota Day Wise Holiday Configuration
         */
        $quotadaylimit = $this->scopeConfig->getValue(self::XML_PATH_STORE_QUOTA_INTERVAL_DAY, $storeScope);


        if (isset($quotadaylimit) && !empty($quotadaylimit)) {

            $orders = $this->orderCollectionFactory->create()
                    ->addFieldToSelect(['entity_id', 'delivery_date'])
                    ->addFieldToFilter('delivery_date', ['neq' => 'NULL']);

            $orders->getSelect()
                    ->columns('count(entity_id) as ord_num')
                    ->group('DATE(delivery_date)');
            foreach ($orders as $order) {
                $deliveryDate = $order->getDeliveryDate();
                if (isset($deliveryDate) && !empty($deliveryDate)) {
                    if (intval($quotadaylimit) <= intval($order->getOrdNum())) {
                        $_holidaydays[] = date("n-j-Y", strtotime($deliveryDate));
                    }
                }
            }
        }

        /**
         * No Date for Holiday
         */
        if (empty($_holidaydays)) {
            return true;
        }

        $resultJson = json_encode($_holidaydays);
        return $resultJson;
    }

    /**
     * Max Interval Date
     */
    public function getMaxIntervalDate()
    {

        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $maxDate = $this->scopeConfig->getValue(self::XML_PATH_STORE_CALENDER_MAXIMUM_DELIVERY_Interval_Day, $storeScope);
        if (isset($maxDate) && !empty($maxDate)) {
            return $maxDate;
        }
        return null;
    }

    /**
     * Timeslot Interval Hour
     *
     * @return int
     */
    public function getTimeslotIntervalHour()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $_intervalHour = $this->scopeConfig->getValue(self::XML_PATH_STORE_TIMESLOT_INTERVAL_HOUR, $storeScope);
        if (empty($_intervalHour)) {
            $_intervalHour = 0;
        }
        return $_intervalHour;
    }

    /**
     *
     * @return Array
     */
    public function getTimeSlot()
    {

        $_timeSlot;
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;

        /**
         * Show DeliveryDay
         */
        $_showDeliveryDay = $this->scopeConfig->getValue(self::XML_PATH_STORE_SHOW_DELIVERY_DAY, $storeScope);
        if (empty($_showDeliveryDay)) {
            $_showDeliveryDay = 6;
        }
        $_timeSlot['deliveryday'] = $_showDeliveryDay;

        /**
         * @ Minimum interval of hours between the order placing time and delivery time
         */
        $_IntervalHour = $this->getTimeslotIntervalHour();

        /**
         * @ TimeSlot
         */
        $_totalTimeSlot = $this->scopeConfig->getValue(self::XML_PATH_STORE_TOTAL_TIMESLOT, $storeScope);
        $_totalTimeSlots = $this->serialize->unserialize($_totalTimeSlot);

        /**
         * @ Disabel TimeSlot Day
         */
        $_disabelDayTimeSlot = $this->scopeConfig->getValue(self::XML_PATH_STORE_DISABEL_DAY_TIMESLOT, $storeScope);
        $_disabelDayTimeSlot = $this->serialize->unserialize($_disabelDayTimeSlot);

        $_daytimeslot;
        foreach ($_disabelDayTimeSlot as $value) {
            if (array_key_exists("time_slot", $value)) {
                $_daytimeslot[$value['disable_day']] = $value['time_slot'];
            }
        }

        /**
         * @ Disabel Date for Timeslot
         */
        $_disabelDateTimeSlot = $this->scopeConfig->getValue(self::XML_PATH_STORE_DISABEL_DATE_TIMESLOT, $storeScope);
        $_disabelDateTimeSlot = $this->serialize->unserialize($_disabelDateTimeSlot);

        $_datetimeslot;
        foreach ($_disabelDateTimeSlot as $value) {
            $_key = $value['singledayoff_day'] . $value['singledayoff_month'] . $value['singledayoff_year'];
            if (array_key_exists("time_slot", $value)) {
                $_datetimeslot[$_key] = $value['time_slot'];
            }
        }

        $_timeSlot['maxtimeslot'] = count($_totalTimeSlots);

        $_IntervalDay = (int) floor($_IntervalHour / 24);

        $today = date("m/d/Y");

        $today = date('m/d/Y', strtotime($today . "+" . $_IntervalDay . " day"));
        $_daySlots;

        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $priceHelper = $objectManager->create('Magento\Framework\Pricing\Helper\Data');

        for ($i = 0; $i < $_showDeliveryDay; $i++) {
            $_slots = null;
            $_slot = null;

            $_slot['label'] = date('d M Y', strtotime($today . "+" . $i . " days"));
            $_slot['value'] = date('Y-m-d', strtotime($today . "+" . $i . " days"));

            $_use_date = date('d M Y', strtotime($today . "+" . $i . " days"));

            $dayofYear = date('z', strtotime($_use_date));
            $_slot['date'] = $dayofYear;

            $_slot['time'] = '';

            $_slot['price'] = 0;
            $_slot['is_enabel'] = 0;

            $_day = date('D', strtotime($_slot['value']));
            $_date = date('dmY', strtotime($_slot['value']));

            $_slots[] = $_slot;

            foreach ($_totalTimeSlots as $_totalTimeSlot) {
                $_slot;
                $_formatedPrice = $formattedPrice = $priceHelper->currency($_totalTimeSlot['timeslot_price'], true, false);
                $_slot['label'] = $_totalTimeSlot['start_time'] . '-' . $_totalTimeSlot['end_time'] . ' ' . $_formatedPrice;
                $_slot['value'] = $_totalTimeSlot['start_time'] . '-' . $_totalTimeSlot['end_time'];


                $dayofYear = date('z', strtotime($_use_date));
                $_slot['date'] = $dayofYear;

                $time_in_24_hour_format = DATE("H:i:s", STRTOTIME($_totalTimeSlot['start_time']));
                $time = $_use_date . ' ' . $time_in_24_hour_format;

                $newTime = new \DateTime($time);
                $time = date_format($newTime, 'Y-m-d H:i:s');

                $exec_date = strtotime($time) . "000";
                $_slot['time'] = (int) $exec_date;

                $_slot['price'] = $_totalTimeSlot['timeslot_price'];
                $_slot['is_enabel'] = 1;

                /**
                 * Day wise disable
                 */
                if (!empty($_daytimeslot)) {
                    if (array_key_exists($_day, $_daytimeslot)) {
                        if (in_array($_slot['value'], $_daytimeslot[$_day])) {
                            $_slot['is_enabel'] = 0;
                        }
                    }
                }

                /**
                 * Date wise disable
                 */
                if (!empty($_datetimeslot)) {
                    if (array_key_exists($_date, $_datetimeslot)) {
                        if (in_array($_slot['value'], $_datetimeslot[$_date])) {
                            $_slot['is_enabel'] = 0;
                        }
                    }
                }

                /*
                 * Quota Time wise disable
                 */
                $quotatimelimit = $this->scopeConfig->getValue(self::XML_PATH_STORE_QUOTA_INTERVAL_TIME, $storeScope);


                if (isset($quotatimelimit) && !empty($quotatimelimit)) {

                    $orders = $this->orderCollectionFactory->create()
                            ->addFieldToSelect(['entity_id', 'delivery_date', 'delivery_timeslot'])
                            ->addFieldToFilter('delivery_timeslot', ['neq' => 'NULL']);

                    $orders->getSelect()
                            ->columns('count(entity_id) as ord_num')
                            ->group(['Date(delivery_date)', 'delivery_timeslot']);

                    foreach ($orders as $order) {
                        $deliveryTime = $order->getDeliveryTimeslot();
                        $deliveryDate = $order->getDeliveryDate();
                        if (isset($deliveryDate) && !empty($deliveryDate)) {
                            if (strtotime($_use_date) == strtotime($deliveryDate)) {
                                if ($deliveryTime == $_slot['value']) {
                                    if ($quotatimelimit <= $order->getOrdNum()) {
                                        $_slot['is_enabel'] = 0;
                                    }
                                }
                            }
                        }
                    }
                }

                /*
                 * Order Page Wise
                 */
                $currentOrder = $this->registry->registry('current_order');
                if (isset($currentOrder) && !empty($currentOrder)) {
                    if ($_slot['price'] != $currentOrder->getFee()) {
                        $_slot['is_enabel'] = 0;
                    }
                }

                $_slots[] = $_slot;
            }
            $_daySlots[] = $_slots;
        }

        $_timeSlot['timeslot'] = $_daySlots;

        if (empty($_timeSlot)) {
            $_timeSlot = 0;
        }

        return $_timeSlot;
    }

    /**
     * Check Additional Delivery message is enable or not
     *
     * @return Boolean
     */
    public function isDeliveryMessageEnable()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $_isEnable = $this->scopeConfig->getValue(self::IS_ENABLE_DELIVERY_MESSAGE, $storeScope);
        return $_isEnable;
    }

    /**
     * Additional Delivery message
     *
     * @return string
     */
    public function getDeliveryMessage()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $_deliveryMessage = $this->scopeConfig->getValue(self::ADDITIONAL_DELIVERY_MESSAGE, $storeScope);
        return $_deliveryMessage;
    }

    /**
     * Delivery Date Mandatory or not
     *
     * @return bollean
     */
    public function IsDeliveryDateMandatory()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue(self::IS_DELIVERYDATE_MENDATORY, $storeScope);
    }
    
    /**
     * Start TIME
     */
    public function starttime()
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $start_time =  $this->scopeConfig->getValue(self::XML_PATH_STORE_TOTAL_TIMESLOT, $storeScope);
        $start_time = json_decode($start_time, true);
        foreach ($start_time as $srt) {
            $str['start_time'] = $srt['start_time'];
        }
        return json_encode($str);
    }
}
