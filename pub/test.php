<?php 

use Magento\Framework\App\Bootstrap;
require  '../app/bootstrap.php';

$bootstrap = Bootstrap::create(BP, $_SERVER);
$objectManager = $bootstrap->getObjectManager();

$objectManager = \Magento\Framework\App\ObjectManager::getInstance();

$storeManager = $objectManager->Create('\Magento\Store\Model\StoreRepository');    

        $categoryFactory = $objectManager->create('Magento\Catalog\Model\ResourceModel\Category\CollectionFactory');
        $categories = $categoryFactory->create()->addAttributeToSelect('*');
        $registry = \Magento\Framework\App\ObjectManager::getInstance()->get(\Magento\Framework\Registry::class);
        $registry->register("isSecureArea", true);
        foreach ($categories as $category){
                echo "<pre>";
            // echo $category->getId();
            if($category->getId() == 52){
                $category->delete();    
                }
        }
        echo "category deleted";
?>