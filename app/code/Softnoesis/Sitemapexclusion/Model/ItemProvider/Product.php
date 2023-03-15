<?php
/**
 * Softnoesis
 * Copyright(C) 03/2023 Softnoesis <ideveloper1990@gmail.com>
 * @package Softnoesis_Sitemapexclusion
 * @copyright Copyright(C) 2015 Softnoesis (ideveloper1990@gmail.com)
 * @author Softnoesis <ideveloper1990@gmail.com>
 */
namespace Softnoesis\Sitemapexclusion\Model\ItemProvider;

use Magento\Sitemap\Model\ResourceModel\Catalog\ProductFactory;
use Magento\Sitemap\Model\SitemapItemInterfaceFactory;

class Product extends \Magento\Sitemap\Model\ItemProvider\Product
{
   
    /**
     * {@inheritdoc}
     */
    public function getItems($storeId)
    {
        $items = parent::getItems($storeId);
        $Collection = \Magento\Framework\App\ObjectManager::getInstance();
        $productCollection = $Collection->create('Magento\Catalog\Model\ResourceModel\Product\Collection');
        //remove product from sitmap
        $productId = $productCollection->addAttributeToSelect('sitemap_exclude')
                                       ->addAttributeToFilter('sitemap_exclude', '1');
        foreach ($productId as $product) {
            
            unset($items[$product->getId()]);
        }
       
        return $items;
    }
}
