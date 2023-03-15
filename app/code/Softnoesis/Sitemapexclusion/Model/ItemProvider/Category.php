<?php
/**
 * Softnoesis
 * Copyright(C) 03/2023 Softnoesis <ideveloper1990@gmail.com>
 * @package Softnoesis_Sitemapexclusion
 * @copyright Copyright(C) 2015 Softnoesis (ideveloper1990@gmail.com)
 * @author Softnoesis <ideveloper1990@gmail.com>
 */
namespace Softnoesis\Sitemapexclusion\Model\ItemProvider;

use Magento\Sitemap\Model\ResourceModel\Catalog\CategoryFactory;
use Magento\Sitemap\Model\SitemapItemInterfaceFactory;

class Category extends \Magento\Sitemap\Model\ItemProvider\Category
{
    /**
     * {@inheritdoc}
     */
    public function getItems($storeId)
    {
        $items = parent::getItems($storeId);
        $CollectionFactory = \Magento\Framework\App\ObjectManager::getInstance();
        $CategoryFactory = $CollectionFactory->create('Magento\Catalog\Model\ResourceModel\Category\CollectionFactory');
        $categories = $CategoryFactory->create()->addAttributeToSelect('sitemap_exclude')
                                                ->addAttributeToFilter('sitemap_exclude', '1');
  
        foreach ($categories as $category) {
            var_dump($category->getId());
            unset($items[$category->getId()]);
        }
        return $items;
    }
}
