<?php
namespace Softnoesis\WholesaleInquiry\Block;

use \Magento\Framework\View\Element\Template;
use \Magento\Framework\View\Element\Template\Context;
use Softnoesis\WholesaleInquiry\Model\ResourceModel\Extension\CollectionFactory;


class Inquiryform extends Template
{
    public $collection;

    public function __construct(
        Context $context,
        CollectionFactory $collectionFactory, 
        array $data = []
    )
    {        
        $this->collection = $collectionFactory;
        parent::__construct($context);
    }

    public function getBaseUrl()
	{
		return $this->_storeManager->getStore()->getBaseUrl();
	}

	public function getCollection()
    {
		return $this->collection->create();
    }

    public function getLatestid()
    {
        $model = $this->collection->create(); 
        $data = $model->load();
        foreach ($data as $item) {
            $id = $item->getData('id');
        }
        return $id;
    }

    public function getEmailAddress()
    {
        return $this->getEmail();
    }
}