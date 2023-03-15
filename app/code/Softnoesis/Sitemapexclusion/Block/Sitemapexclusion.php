<?php
/**
 * Softnoesis
 * Copyright(C) 03/2023 Softnoesis <ideveloper1990@gmail.com>
 * @package Softnoesis_Sitemapexclusion
 * @copyright Copyright(C) 2015 Softnoesis (ideveloper1990@gmail.com)
 * @author Softnoesis <ideveloper1990@gmail.com>
 */
namespace Softnoesis\Sitemapexclusion\Block;

use Magento\Framework\Pricing\Helper\Data;

class Sitemapexclusion extends \Magento\Framework\View\Element\Template
{

    protected $registry;

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Magento\Catalog\Model\Product $product,
        \Magento\Framework\Registry $registry,
        array $data = []
    ) {
        $this->registry = $registry;
        $this->product = $product;
        parent::__construct($context, $data);
    }
    public function SetRedirectStatus()
    {
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $productidcollection = $this->registry->registry('current_product');
        $productId = $productidcollection->getId();
        $product = $this->product->load($productId);
        return $productattributevalue =$this->product->getResource()->getAttribute('sitemap_exclude')->getFrontend()->getValue($product);
    }
}
