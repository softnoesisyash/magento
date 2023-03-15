<?php
namespace CommerceExtensions\AddressType\Setup;

use Magento\Customer\Setup\CustomerSetupFactory;
use Magento\Customer\Model\Customer;
use Magento\Eav\Model\Entity\Attribute\Set as AttributeSet;
use Magento\Eav\Model\Entity\Attribute\SetFactory as AttributeSetFactory;
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
 
/**
 * @codeCoverageIgnore
 */
class InstallData implements InstallDataInterface
{
    
    /**
     * @var CustomerSetupFactory
     */
    protected $customerSetupFactory;
    
    /**
     * @var AttributeSetFactory
     */
    private $attributeSetFactory;
    
    /**
     * @param CustomerSetupFactory $customerSetupFactory
     * @param AttributeSetFactory $attributeSetFactory
     */
    public function __construct(
        CustomerSetupFactory $customerSetupFactory,
        AttributeSetFactory $attributeSetFactory
    ) {
        $this->customerSetupFactory = $customerSetupFactory;
        $this->attributeSetFactory = $attributeSetFactory;
    }
 
    
    /**
     * {@inheritdoc}
     */
    public function install(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        
        /** @var CustomerSetup $customerSetup */
        $customerSetup = $this->customerSetupFactory->create(['setup' => $setup]);
        
        $customerEntity = $customerSetup->getEavConfig()->getEntityType('customer');
        $attributeSetId = $customerEntity->getDefaultAttributeSetId();
        
        /** @var $attributeSet AttributeSet */
        $attributeSet = $this->attributeSetFactory->create();
        $attributeGroupId = $attributeSet->getDefaultGroupId($attributeSetId);
        
        $customerSetup->addAttribute('customer_address', 
            'address_type_indicator', 
            [
            'type' => 'text',
                'label' => 'Address Type',
                'input' => 'select',
                'source' => 'CommerceExtensions\AddressType\Model\Config\Source\AddressType',
                'required' => false,
                'sort_order' => 0,
                'system' => false,
                'position' => 100,
                'is_user_defined' => true
            ],        
        );

        $attribute = $customerSetup->getEavConfig()->getAttribute('customer_address', 'address_type_indicator')
        ->addData([
            'attribute_set_id' => $attributeSetId,
            'attribute_group_id' => $attributeGroupId,
            'used_in_forms' => ['adminhtml_customer_address','adminhtml_customer','customer_address_edit', 'customer_register_address','customer_address','adminhtml_checkout','checkout_register'],
        ]);
        
        $attribute->save();

        // Second Attribute for addressType = Other
        
        $customerSetup->addAttribute('customer_address', 
            'other_address', 
            [
                'type' => 'text',
                /*'label' => 'Other Address',*/
                'input' => 'text',
                'source' => '',
                'required' => false,
                'visible'  => true,
                'sort_order' => 0,
                'system' => false,
                'position' => 102,
                'is_user_defined' => true
            ],        
        );

        $attribute = $customerSetup->getEavConfig()->getAttribute('customer_address', 'other_address')
        ->addData([
            'attribute_set_id' => $attributeSetId,
            'attribute_group_id' => $attributeGroupId,
            'used_in_forms' => ['adminhtml_customer_address','adminhtml_customer','customer_address_edit', 'customer_register_address','customer_address','adminhtml_checkout','checkout_register'],
        ]);
        
        $attribute->save();
    }
}
