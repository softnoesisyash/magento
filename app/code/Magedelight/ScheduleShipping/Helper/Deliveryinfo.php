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

namespace Magedelight\ScheduleShipping\Helper;

use Magento\Framework\App\Filesystem\DirectoryList;

class Deliveryinfo
{

    public function __construct(
        \Magento\Framework\Filesystem $filesystem
    ) {
        $this->_mediaDirectory = $filesystem->getDirectoryWrite(DirectoryList::MEDIA);
        $this->_rootDirectory = $filesystem->getDirectoryRead(DirectoryList::ROOT);
    }

    public function getDeliveryInformation($y, $page, $order)
    {
        //start Delivery Information
        $this->y = $y;
        $page->setFillColor(new \Zend_Pdf_Color_Rgb(0.93, 0.92, 0.92));
        $page->setLineWidth(0.5);
        $page->drawRectangle(25, $this->y, 570, $this->y - 25);

        $this->y -= 15;
        $this->_setFontBold($page, 12);
        $page->setFillColor(new \Zend_Pdf_Color_GrayScale(0));
        $page->drawText(__('Delivery Information'), 35, $this->y, 'UTF-8');

        $this->y -= 10;
        $page->setFillColor(new \Zend_Pdf_Color_GrayScale(1));

        $this->_setFontRegular($page, 10);
        $page->setFillColor(new \Zend_Pdf_Color_GrayScale(0));

        $paymentLeft = 35;
        $yPayments = $this->y - 15;

        if ($order->getDeliveryDate() != '') {
            if ($order->getDeliveryTimeslot()) {
                $date = date_create($order->getDeliveryDate());
                $deliveryDate = date_format($date, "Y-m-d");

                $page->drawText(strip_tags(trim('Delivery Date: ' . $deliveryDate)), $paymentLeft, $yPayments, 'UTF-8');
                $yPayments -= 15;
                $page->drawText(strip_tags(trim('Delivery Time: ' . $order->getDeliveryTimeslot())), $paymentLeft, $yPayments, 'UTF-8');
                $yPayments -= 15;
            } else {
                $page->drawText(strip_tags(trim('Delivery Date: ' . $order->getDeliveryDate())), $paymentLeft, $yPayments, 'UTF-8');
                $yPayments -= 15;
            }

            $deliveryFee = __(
                'Delivery Charges: '
            ) . " " . $order->formatPriceTxt(
                $order->getFee()
            );
            $page->drawText($deliveryFee, $paymentLeft, $yPayments, 'UTF-8');
            $yPayments -= 15;
        }

        $topMargin = 15;
        $methodStartY = $this->y;
        $this->y -= 15;

        if ($order->getDeliveryCall()) {
            $page->drawText(strip_tags(trim('Call before delivery: Yes')), 285, $this->y, 'UTF-8');
        }


        $yShipments = $this->y;
        $deliveryComment = __(
            'Delivery Comment: '
        ) .
                $order->getDeliveryComment();

        $page->drawText($deliveryComment, 285, $yShipments - $topMargin, 'UTF-8');
        $yShipments -= $topMargin + 10;

        $currentY = min($yPayments, $yShipments);

        // replacement of Shipments-Payments rectangle block
        $page->drawLine(25, $methodStartY, 25, $currentY);
        //left
        $page->drawLine(25, $currentY, 570, $currentY);
        //bottom
        $page->drawLine(570, $currentY, 570, $methodStartY);
        //right

        $this->y = $currentY;
        $this->y -= 15;

        return $this->y;



        //End Delivery informaation
    }

    /**
     * Set font as bold
     *
     * @param  \Zend_Pdf_Page $object
     * @param  int $size
     * @return \Zend_Pdf_Resource_Font
     */
    protected function _setFontBold($object, $size = 7)
    {
        $font = \Zend_Pdf_Font::fontWithPath(
            $this->_rootDirectory->getAbsolutePath('lib/internal/LinLibertineFont/LinLibertine_Bd-2.8.1.ttf')
        );
        $object->setFont($font, $size);
        return $font;
    }

    /**
     * Set font as regular
     *
     * @param  \Zend_Pdf_Page $object
     * @param  int $size
     * @return \Zend_Pdf_Resource_Font
     */
    protected function _setFontRegular($object, $size = 7)
    {
        $font = \Zend_Pdf_Font::fontWithPath(
            $this->_rootDirectory->getAbsolutePath('lib/internal/LinLibertineFont/LinLibertine_Re-4.4.1.ttf')
        );
        $object->setFont($font, $size);
        return $font;
    }
}
