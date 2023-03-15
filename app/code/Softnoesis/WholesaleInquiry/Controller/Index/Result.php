<?php

namespace Softnoesis\WholesaleInquiry\Controller\Index;

use Magento\Framework\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\Mail\Template\TransportBuilder;
use Magento\Framework\Translate\Inline\StateInterface;
use Magento\Store\Model\StoreManagerInterface;
use Magento\Framework\Math\Random;
use Psr\Log\LoggerInterface;
use Magento\Framework\Controller\ResultFactory;
use Magento\Framework\Json\Helper\Data;
use Softnoesis\WholesaleInquiry\Model\ExtensionFactory;

class Result extends \Magento\Framework\App\Action\Action
{

     /**
     * @var Magento\Framework\View\Result\PageFactory
     */
    protected $resultPageFactory;
    protected $resultJsonFactory;
    protected $transportBuilder;
    protected $storeManager;
    protected $inlineTranslation; 
    protected $mathRandom;
    protected $logger;
    protected $resultFactory;
    protected $jsonHelper;
    protected $extensionFactory;

    /**
     * @param Context     $context
     * @param PageFactory $resultPageFactory
     */
    public function __construct(
        Context $context,
        PageFactory $resultPageFactory,
        JsonFactory $resultJsonFactory,
        TransportBuilder $transportBuilder,
        StoreManagerInterface $storeManager,
        StateInterface $state,
        Random $mathRandom,
        LoggerInterface $logger,
        ResultFactory $resultFactory,
        Data $jsonHelper,
        ExtensionFactory $extensionFactory
        )
    {
        $this->mathRandom = $mathRandom;
        $this->resultPageFactory = $resultPageFactory;
        $this->resultJsonFactory = $resultJsonFactory; 
        $this->transportBuilder = $transportBuilder;
        $this->storeManager = $storeManager;
        $this->inlineTranslation = $state;
        $this->logger = $logger;
        $this->resultFactory = $resultFactory;
        $this->jsonHelper = $jsonHelper;
        $this->extensionFactory = $extensionFactory;
        return parent::__construct($context);
    }

    public function getRandomNumber($min = 1000, $max = 9999)
    {
        return $this->mathRandom->getRandomNumber($min, $max);
    }
    
    public function execute()
    {
        $Data=array();
        $resultJson = $this->resultJsonFactory->create();
        $otp = $this->getRandomNumber();
        $email = $this->getRequest()->getParam('email');
        $fname = $this->getRequest()->getParam('fname');
        $lname = $this->getRequest()->getParam('lname');
        $phone_no = $this->getRequest()->getParam('phone');
        $comment = $this->getRequest()->getParam('comment');

        $Data['fname']= $fname;
        $Data['lname']= $lname;
        $Data['email']= $email;
        $Data['phone_no']= $phone_no;
        $Data['comment']= $comment;
        $Data['otp']= $otp;

        // echo $fname,$lname,$email,$phone_no,$comment;

        // if (!empty($email) && !empty($lname) && !empty($email) && !empty($phone_no) && !empty($comment)){
            if (!empty($email)){
            $model = $this->extensionFactory->create();
            $model->setData($Data)->save();
        }
        else{
            $resultJson = $this->resultJsonFactory->create();
            return $resultJson->setData(['status' => 0, 'message' => 'Fill all data']);
        }


        // this is an example and you can change template id,fromEmail,toEmail,etc as per your need.
        $templateId = 'emailsend_template'; // template id
        $fromEmail = 'admin@gmail.com';  // sender Email id
        $fromName = 'Admin';             // sender Name
        $toEmail = $email; // receiver email id
        $result=array();

        $msg=0;
        try {
            // template variables pass here
            $templateVars = [
                'otp' => $otp,
                'msg' => 'hello',
                'msg1' => 'this is test mail sent'
            ];

            $storeId = $this->storeManager->getStore()->getId();

            $from = ['email' => $fromEmail, 'name' => $fromName];
            $this->inlineTranslation->suspend();

            $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
            $templateOptions = [
                'area' => \Magento\Framework\App\Area::AREA_FRONTEND,
                'store' => $storeId
            ];
            $transport = $this->transportBuilder->setTemplateIdentifier($templateId, $storeScope)
                ->setTemplateOptions($templateOptions)
                ->setTemplateVars($templateVars)
                ->setFrom($from)
                ->addTo($toEmail)
                ->getTransport();
            $transport->sendMessage();
            $this->inlineTranslation->resume();
            $msg=1;
            // $resultJson = $this->resultJsonFactory->create();
            // return $resultJson->setData(['status' => 1]);
        } catch (\Exception $e) {
            $this->logger->info($e->getMessage());
        }

        $response = $this->resultFactory->create(ResultFactory::TYPE_RAW);
        $response->setHeader('Content-type', 'text/plain');

        if($msg == '1'){
            $response->setContents(
                $this->jsonHelper->jsonEncode(
                    [
                        'status' => '1'
                    ]
                )
            );
        }else{
            $response->setContents(
                $this->jsonHelper->jsonEncode(
                    [
                        'status' => '0',
                        'message' => 'Something went wrong. Try again later.'
                    ]
                )
            );
        }
        return $response;
    } 
}