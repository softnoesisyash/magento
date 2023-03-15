<?php
/**
 * Softnoesis
 * Copyright(C) 03/2023 Softnoesis <ideveloper1990@gmail.com>
 * @package Softnoesis_Sitemapexclusion
 * @copyright Copyright(C) 2015 Softnoesis (ideveloper1990@gmail.com)
 * @author Softnoesis <ideveloper1990@gmail.com>
 */
declare (strict_types = 1);

namespace Softnoesis\Sitemapexclusion\Setup\Patch\Data;

use Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface;
use Magento\Eav\Setup\EavSetup;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Catalog\Setup\CategorySetupFactory;
use Magento\Catalog\Model\Category;
use Magento\Catalog\Model\Product;

/**
 * Class CreateCustomAttr for Create Custom Product Attribute using Data Patch.
 */
class Customattribute implements DataPatchInterface
{
    /**
     * ModuleDataSetupInterface
     *
     * @var ModuleDataSetupInterface
     */
    private $moduleDataSetup;
    /**
     * EavSetupFactory
     *
     * @var EavSetupFactory
     */
    private $eavSetupFactory;
    /**
     * @param ModuleDataSetupInterface $moduleDataSetup
     * @param EavSetupFactory          $eavSetupFactory
     */
        /**
         * @var CategorySetupFactory
         */
    protected $categorySetupFactory;

    public function __construct(
        ModuleDataSetupInterface $moduleDataSetup,
        EavSetupFactory $eavSetupFactory,
        CategorySetupFactory $categorySetupFactory
    ) {
        $this->moduleDataSetup = $moduleDataSetup;
        $this->eavSetupFactory = $eavSetupFactory;
        $this->categorySetupFactory = $categorySetupFactory;
    }
    /**
     * {@inheritdoc}
     */
    public function apply()
    {
        /** @var EavSetup $eavSetup */
        $eavSetup = $this->eavSetupFactory->create(['setup' => $this->moduleDataSetup]);
        $eavSetup->addAttribute('catalog_product', 'sitemap_exclude', [
            'type' => 'int',
            'backend' => '',
            'frontend' => '',
            'label' => 'Exclude From Sitemap/Set Header 410',
            'note'  => 'Added by Softnoesis Sitemap',
            'input' => 'boolean',
            'class' => '',
            'source' => \Magento\Eav\Model\Entity\Attribute\Source\Boolean::class,
            'global' => ScopedAttributeInterface::SCOPE_GLOBAL,
            'visible' => true,
            'required' => false,
            'user_defined' => false,
            'default' => '0',
            'searchable' => false,
            'filterable' => false,
            'group' => 'Product Details',
            'comparable' => false,
            'visible_on_front' => false,
            'used_in_product_listing' => true,
            'unique' => false,
            'apply_to' => '',
            'is_used_in_grid'        => true,
            'is_visible_in_grid'      => true,
            'is_filterable_in_grid'   => true,
            'is_searchable_in_grid'   => true,
            'is_visible_on_front'     => true,
        ]);


         /**
         * Category attribute
         */
        $categorySetup = $this->categorySetupFactory->create(['setup' => $this->moduleDataSetup]);

        $categorySetup->addAttribute(
            Category::ENTITY,
            'sitemap_exclude',
            [
                'type'      => 'int',
                'label'     => 'Exclude From Sitemap',
                'input'     => 'boolean',
                'sort_order' => 100,
                'default' =>   '0',
                'source'    => 'Magento\Eav\Model\Entity\Attribute\Source\Boolean',
                'global'    => ScopedAttributeInterface::SCOPE_STORE,
                'visible'   => true,
                'required'  => false,
                'user_defined' => false,
                'default'   => null,
                'group'     => 'General Information',
                'backend'   => ''
            ]
        );
    }
    /**
     * {@inheritdoc}
     */
    public static function getDependencies()
    {
        return [];
    }
    /**
     * {@inheritdoc}
     */
    public function getAliases()
    {
        return [];
    }
}
