<?php

namespace CommerceExtensions\AddressType\Plugin\Block;

class LayoutProcessor
{
    /**
     * @param \Magento\Checkout\Block\Checkout\LayoutProcessor $subject
     * @param array $jsLayout
     * @return array
     */
    public function afterProcess(
        \Magento\Checkout\Block\Checkout\LayoutProcessor $subject,
        array $jsLayout
    ) {
        if(isset($jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
            ['shippingAddress']['children']['shipping-address-fieldset'])) {

            $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
            ['children']['shippingAddress']['children']['shipping-address-fieldset']['children']['address_type_indicator']['component'] = "Magento_Ui/js/form/element/checkbox-set";

            $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
            ['children']['shippingAddress']['children']['shipping-address-fieldset']['children']['address_type_indicator']['config']['elementTmpl'] = "ui/form/element/checkbox-set";

            $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
            ['children']['shippingAddress']['children']['shipping-address-fieldset']['children']['address_type_indicator']['config']['multiple'] = false;
        }

        if(isset($jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['payments-list'])) {
            $paymentsList = $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['payments-list']['children'];

            foreach ($paymentsList as $paymentCode => $payment) {
                if(strpos($paymentCode, '-form') === false) {
                    continue;
                }
                $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
                ['payment']['children']['payments-list']['children'][$paymentCode]['children']['form-fields']['children']['address_type_indicator']['component'] = "Magento_Ui/js/form/element/checkbox-set";
                $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
                ['payment']['children']['payments-list']['children'][$paymentCode]['children']['form-fields']['children']['address_type_indicator']['config']['elementTmpl'] = "ui/form/element/checkbox-set";
                $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
                ['payment']['children']['payments-list']['children'][$paymentCode]['children']['form-fields']['children']['address_type_indicator']['config']['multiple'] = false;
            }
        }
        if(isset($jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['afterMethods']['children']['billing-address-form'])) {
            $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['afterMethods']['children']['billing-address-form']['children']['form-fields']['children']['address_type_indicator']['component'] = "Magento_Ui/js/form/element/checkbox-set";

            $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['afterMethods']['children']['billing-address-form']['children']['form-fields']['children']['address_type_indicator']['config']['elementTmpl'] = "ui/form/element/checkbox-set";

            $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['afterMethods']['children']['billing-address-form']['children']['form-fields']['children']['address_type_indicator']['config']['multiple'] = false;
        }
        
        return $jsLayout;
    }
}