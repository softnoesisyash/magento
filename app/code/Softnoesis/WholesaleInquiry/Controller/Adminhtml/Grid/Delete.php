<?php
namespace Softnoesis\WholesaleInquiry\Controller\Adminhtml\Grid;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;

class Delete extends Action
{
    public $blogFactory;
    
    public function __construct(
        Context $context,
        \Softnoesis\WholesaleInquiry\Model\ResourceModel\Extension\CollectionFactory $blogFactory
    ) {
        $this->blogFactory = $blogFactory;
        parent::__construct($context);
    }

    public function execute()
    {
        $resultRedirect = $this->resultRedirectFactory->create();
        $id = $this->getRequest()->getParam('id');
        try {
            $model = $this->_objectManager->create('Softnoesis\WholesaleInquiry\Model\Extension');
                $model->load($id);
                $model->delete();
            $this->messageManager->addSuccessMessage(__('You deleted the Record.'));
        } catch (\Exception $e) {
            $this->messageManager->addErrorMessage($e->getMessage());
        }
        return $resultRedirect->setPath('*/*/index');
    }

    public function _isAllowed()
    {
        return $this->_authorization->isAllowed('Softnoesis_WholesaleInquiry::delete');
    }
}