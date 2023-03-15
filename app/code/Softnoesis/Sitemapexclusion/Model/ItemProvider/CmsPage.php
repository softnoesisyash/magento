<?php
/**
 * Softnoesis
 * Copyright(C) 03/2023 Softnoesis <ideveloper1990@gmail.com>
 * @package Softnoesis_Sitemapexclusion
 * @copyright Copyright(C) 2015 Softnoesis (ideveloper1990@gmail.com)
 * @author Softnoesis <ideveloper1990@gmail.com>
 */
namespace Softnoesis\Sitemapexclusion\Model\ItemProvider;

use Magento\Sitemap\Model\ResourceModel\Cms\PageFactory;
use Magento\Sitemap\Model\SitemapItemInterfaceFactory;

class CmsPage extends \Magento\Sitemap\Model\ItemProvider\CmsPage
{
    /**
     * {@inheritdoc}
     */
    public function getItems($storeId)
    {
        $items = parent::getItems($storeId);
        $CollectionFactory = \Magento\Framework\App\ObjectManager::getInstance();
        $collection = $CollectionFactory->get('\Magento\Cms\Model\ResourceModel\Page\CollectionFactory');
         // add Filter if you want
        $cmsPage = $collection->create()->addFieldToFilter('sitemap_exclude', '1');
        foreach ($cmsPage as $page) {
             unset($items[$page->getId()]);
        }
        return $items;
    }
}
