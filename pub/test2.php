<?php
use Magento\Framework\App\Bootstrap;
require  '../app/bootstrap.php';

$bootstrap = Bootstrap::create(BP, $_SERVER);
$obj = $bootstrap->getObjectManager();

$catId = 3; // category id 

$collection = $obj->create('Magento\Catalog\Model\ResourceModel\Category\CollectionFactory')
                ->create()
                ->addAttributeToSelect('*')
                ->addAttributeToFilter('entity_id',['eq'=>$catId])
                ->setPageSize(1);

$catObj = $collection->getFirstItem();
$catData = $catObj->getData(); 

echo $catObj->getHeading();


$category_id = 3;
$objectManager = \Magento\Framework\App\ObjectManager::getInstance();
$_category = $objectManager->create('Magento\Catalog\Model\Category')->load($category_id);  
print($_category->getData('heading'));