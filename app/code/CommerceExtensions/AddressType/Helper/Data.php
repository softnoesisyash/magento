<?php

namespace CommerceExtensions\AddressType\Helper;

use Magento\Framework\App\Helper\Context;
use Magento\Framework\App\Helper\AbstractHelper;

class Data extends AbstractHelper
{

    protected $fieldsetConfig;

    protected $logger;

    public function __construct(
        \Magento\Framework\DataObject\Copy\Config $fieldsetConfig,
        \Psr\Log\LoggerInterface $logger
    ) {
        $this->fieldsetConfig = $fieldsetConfig;
        $this->logger = $logger;
    }

    // public function getExtraCheckoutAddressFields($fieldset = 'address_type_indicator', $root = 'global')
    // {

    //     $fields = $this->fieldsetConfig->getFieldset($fieldset, $root);

    //     $extraCheckoutFields = [];

    //     foreach ($fields as $field => $fieldInfo) {
    //         $extraCheckoutFields[] = $field;
    //     }

    //     return $extraCheckoutFields;
    // }

    public function transportFieldsFromExtensionAttributesToObject(
        $fromObject,
        $toObject,
        $fieldset = 'address_type_indicator'
    ) {

            $set = 'set' . str_replace(' ', '', ucwords(str_replace('_', ' ', $fieldset)));
            $get = 'get' . str_replace(' ', '', ucwords(str_replace('_', ' ', $fieldset)));

            $value = $fromObject->$get();
        try {
			if(!empty($toObject)) {
            	$toObject->$set($value);
			}
        } catch (\Exception $e) {
            $this->logger->critical($e->getMessage());
        }

        return $toObject;
    }
    public function OtherAddresstransportFieldsFromExtensionAttributesToObject(
        $fromObject,
        $toObject,
        $fieldset = 'other_address'
    ) {

            $set = 'set' . str_replace(' ', '', ucwords(str_replace('_', ' ', $fieldset)));
            $get = 'get' . str_replace(' ', '', ucwords(str_replace('_', ' ', $fieldset)));

            $value = $fromObject->$get();
        try {
            if(!empty($toObject)) {
                $toObject->$set($value);
            }
        } catch (\Exception $e) {
            $this->logger->critical($e->getMessage());
        }

        return $toObject;
    }
}
