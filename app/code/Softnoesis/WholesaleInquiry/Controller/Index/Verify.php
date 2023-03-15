<?php
namespace Softnoesis\WholesaleInquiry\Controller\Index;

use Softnoesis\WholesaleInquiry\Model\ResourceModel\Extension\CollectionFactory;
use Magento\Framework\Controller\Result\JsonFactory;

class Verify extends \Magento\Framework\App\Action\Action
{
	protected $_pageFactory;
    private $resultJsonFactory;

	public function __construct(
		\Magento\Framework\App\Action\Context $context,
		\Magento\Framework\View\Result\PageFactory $pageFactory,
		CollectionFactory $collectionFactory,
		JsonFactory $resultJsonFactory
		)
	{
		$this->collection = $collectionFactory;
		$this->_pageFactory = $pageFactory;
		$this->resultJsonFactory = $resultJsonFactory;
		return parent::__construct($context);
	}
	
	public function getLatestid()
    {
        $model = $this->collection->create(); 
        $data = $model->load();
        foreach ($data as $item) {
            $otp = $item->getData('otp');
        }
        return $otp;
    }

	public function execute()
	{
		$lastotp = $this->getLatestid();
		$resultJson = $this->resultJsonFactory->create();
		return $resultJson->setData(['otppassed' => $lastotp]);
        // $otp = $this->getRequest()->getParam('otp');
        // echo $otp;
	}
}