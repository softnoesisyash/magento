<?php

namespace Softnoesis\WholesaleInquiry\Setup;

use Magento\Eav\Setup\EavSetup;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\UpgradeDataInterface;

class UpgradeData implements UpgradeDataInterface
{

    public function __construct(EavSetupFactory $eavSetupFactory)
    {
       $this->eavSetupFactory = $eavSetupFactory;
    }


    public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    { 
        /** @var EavSetup $eavSetup */
        $eavSetup = $this->eavSetupFactory->create(['product_style' => $setup]);

        if (version_compare($context->getVersion(), '3.0.4', '<')) {

            $entityType = $eavSetup->getEntityTypeId('catalog_product');

            $eavSetup->updateAttribute($entityType, 'product_style', 'frontend_input','select', null);
            $eavSetup->updateAttribute($entityType, 'product_style', 'frontend_label','Product Style', null);
            $eavSetup->updateAttribute($entityType, 'product_style', 'attribute_code','product_style', null);
            $eavSetup->updateAttribute($entityType, 'product_style', 'is_visible_on_front','1', null);

        }
    }
}